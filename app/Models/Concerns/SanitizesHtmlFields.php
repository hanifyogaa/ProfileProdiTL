<?php

namespace App\Models\Concerns;

use App\Support\HtmlSanitizer;

/**
 * Strips dangerous HTML from rich-text fields on every save path (Filament,
 * legacy Admin controllers, tinker) so no write path can leave unsanitized
 * markup in a field that's later rendered via dangerouslySetInnerHTML.
 */
trait SanitizesHtmlFields
{
    public static function bootSanitizesHtmlFields(): void
    {
        static::saving(function ($model) {
            foreach ($model->htmlFields() as $field) {
                if ($model->isDirty($field)) {
                    $model->{$field} = HtmlSanitizer::clean($model->{$field});
                }
            }
        });
    }
}
