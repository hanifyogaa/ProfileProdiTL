<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    protected $table = 'researches';

    protected $fillable = [
        'title_id', 'title_en', 'category', 'year',
        'description_id', 'description_en', 'image', 'team', 'order',
    ];
}
