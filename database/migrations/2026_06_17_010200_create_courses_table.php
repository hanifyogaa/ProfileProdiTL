<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name_id');
            $table->string('name_en');
            $table->unsignedTinyInteger('sks');
            $table->unsignedTinyInteger('semester');
            $table->enum('type', ['wajib', 'pilihan'])->default('wajib');
            $table->text('cpl')->nullable();
            $table->text('description_id')->nullable();
            $table->text('description_en')->nullable();
            $table->boolean('is_signature')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
