<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    protected $fillable = ['metric', 'year', 'value', 'unit', 'label_id', 'label_en', 'order'];
}
