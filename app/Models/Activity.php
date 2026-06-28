<?php

namespace App\Models;

use App\Models\Concerns\SanitizesHtmlFields;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use SanitizesHtmlFields;

    protected function htmlFields(): array
    {
        return ['body_id', 'body_en'];
    }

    protected $fillable = [
        'title_id', 'title_en', 'slug', 'body_id', 'body_en',
        'type', 'date', 'location', 'cover', 'is_featured',
    ];

    protected $casts = [
        'date' => 'date',
        'is_featured' => 'boolean',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
