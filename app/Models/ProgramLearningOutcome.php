<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProgramLearningOutcome extends Model
{
    protected $fillable = [
        'code', 'description_id', 'description_en', 'order',
    ];

    public function clos(): BelongsToMany
    {
        return $this->belongsToMany(CourseLearningOutcome::class, 'clo_plo', 'plo_id', 'clo_id');
    }
}
