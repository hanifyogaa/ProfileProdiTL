<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    protected $fillable = [
        'name', 'nidn', 'nip', 'functional_position', 'position_id', 'position_en',
        'bio_id', 'bio_en', 'expertise', 'education', 'teaching_history',
        'photo', 'scholar_url', 'scholar_id', 'sinta_url', 'sinta_id',
        'scopus_url', 'scopus_id', 'email', 'order', 'is_active',
    ];

    protected $casts = [
        'expertise'        => 'array',
        'education'        => 'array',
        'teaching_history' => 'array',
        'is_active'        => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
