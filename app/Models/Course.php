<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'code', 'name_id', 'name_en', 'sks', 'semester', 'type',
        'cpl', 'description_id', 'description_en', 'is_signature',
    ];

    protected $casts = [
        'is_signature' => 'boolean',
    ];
}
