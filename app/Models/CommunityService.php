<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityService extends Model
{
    protected $fillable = [
        'title_id', 'title_en', 'category', 'year', 'location', 'partners',
        'description_id', 'description_en', 'image', 'team', 'order',
    ];
}
