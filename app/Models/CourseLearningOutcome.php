<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CourseLearningOutcome extends Model
{
    protected $fillable = [
        'course_id', 'code', 'description_id', 'description_en', 'order',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function plos(): BelongsToMany
    {
        return $this->belongsToMany(ProgramLearningOutcome::class, 'clo_plo', 'clo_id', 'plo_id');
    }
}
