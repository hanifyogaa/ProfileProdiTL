<?php

namespace App\Models;

use App\Models\Concerns\SanitizesHtmlFields;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use SanitizesHtmlFields;

    protected function htmlFields(): array
    {
        return ['body_id', 'body_en'];
    }

    protected $fillable = [
        'title_id', 'title_en', 'slug', 'excerpt_id', 'excerpt_en',
        'body_id', 'body_en', 'category', 'metadata', 'featured_image', 'status',
        'is_featured', 'published_at', 'views',
    ];

    protected $casts = [
        'is_featured'  => 'boolean',
        'published_at' => 'datetime',
        'metadata'     => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
