<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = ['title_id', 'title_en', 'level', 'date', 'holder', 'cover', 'order'];

    protected $casts = [
        'date' => 'date',
    ];
}
