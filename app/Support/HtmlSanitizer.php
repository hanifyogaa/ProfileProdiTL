<?php

namespace App\Support;

use DOMDocument;
use DOMElement;
use DOMNode;

/**
 * Strips tags/attributes that aren't needed for rich-text content (news body,
 * activity body, research/community-service descriptions) before it's persisted,
 * since those fields are rendered as raw HTML on public pages.
 */
class HtmlSanitizer
{
    private const ALLOWED_TAGS = [
        'p', 'br', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li',
        'h2', 'h3', 'h4', 'blockquote', 'a', 'img', 'figure', 'figcaption',
        'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ];

    private const ALLOWED_ATTRIBUTES = [
        'a' => ['href', 'title', 'target', 'rel'],
        'img' => ['src', 'alt', 'width', 'height'],
    ];

    public static function clean(?string $html): ?string
    {
        if ($html === null || trim($html) === '') {
            return $html;
        }

        $dom = new DOMDocument();
        @$dom->loadHTML(
            '<?xml encoding="utf-8" ?><div id="__root">'.$html.'</div>',
            LIBXML_NOERROR | LIBXML_NOWARNING,
        );

        $root = $dom->getElementById('__root');

        if ($root === null) {
            return '';
        }

        self::sanitizeNode($root, $dom);

        $inner = '';
        foreach (iterator_to_array($root->childNodes) as $child) {
            $inner .= $dom->saveHTML($child);
        }

        return trim($inner);
    }

    private static function sanitizeNode(DOMNode $node, DOMDocument $dom): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            if (! $child instanceof DOMElement) {
                continue;
            }

            $tag = strtolower($child->tagName);

            if ($tag === 'script' || $tag === 'style' || $tag === 'iframe' || $tag === 'object' || $tag === 'embed') {
                $node->removeChild($child);

                continue;
            }

            if (! in_array($tag, self::ALLOWED_TAGS, true)) {
                self::unwrap($child, $node, $dom);

                continue;
            }

            self::sanitizeAttributes($child, $tag);
            self::sanitizeNode($child, $dom);
        }
    }

    private static function sanitizeAttributes(DOMElement $element, string $tag): void
    {
        $allowed = self::ALLOWED_ATTRIBUTES[$tag] ?? [];

        foreach (iterator_to_array($element->attributes ?? []) as $attribute) {
            $name = strtolower($attribute->name);

            if (str_starts_with($name, 'on') || ! in_array($name, $allowed, true)) {
                $element->removeAttribute($attribute->name);

                continue;
            }

            if (in_array($name, ['href', 'src'], true) && self::hasDangerousScheme($attribute->value)) {
                $element->removeAttribute($attribute->name);
            }
        }
    }

    private static function hasDangerousScheme(string $value): bool
    {
        $value = strtolower(trim($value));

        return str_starts_with($value, 'javascript:') || str_starts_with($value, 'data:') || str_starts_with($value, 'vbscript:');
    }

    private static function unwrap(DOMElement $child, DOMNode $parent, DOMDocument $dom): void
    {
        while ($child->firstChild) {
            $parent->insertBefore($child->firstChild, $child);
        }

        $parent->removeChild($child);
    }
}
