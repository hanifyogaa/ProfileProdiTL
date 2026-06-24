<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = ['title_id', 'title_en', 'level', 'date', 'holder', 'category', 'description_id', 'description_en', 'cover', 'order'];

    protected $casts = [
        'date' => 'date',
    ];
}
