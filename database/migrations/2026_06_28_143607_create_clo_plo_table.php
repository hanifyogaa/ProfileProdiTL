<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clo_plo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clo_id')->constrained('course_learning_outcomes')->cascadeOnDelete();
            $table->foreignId('plo_id')->constrained('program_learning_outcomes')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['clo_id', 'plo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clo_plo');
    }
};
