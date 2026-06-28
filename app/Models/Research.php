<?php

namespace App\Models;

use App\Models\Concerns\SanitizesHtmlFields;
use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    use SanitizesHtmlFields;

    protected $table = 'researches';

    protected function htmlFields(): array
    {
        return ['description_id', 'description_en'];
    }

    protected $fillable = [
        'title_id', 'title_en', 'category', 'year',
        'description_id', 'description_en', 'image', 'team', 'order',
    ];
}
