<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    protected $fillable = ['name', 'focus', 'description_id', 'description_en', 'photo', 'order'];
}
