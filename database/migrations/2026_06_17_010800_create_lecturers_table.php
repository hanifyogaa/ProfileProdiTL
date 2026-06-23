<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nidn')->nullable();
            $table->string('functional_position')->nullable(); // e.g., Lektor Kepala
            $table->string('position_id')->nullable();         // e.g., Dosen Tetap / Kaprodi
            $table->string('position_en')->nullable();
            $table->text('bio_id')->nullable();
            $table->text('bio_en')->nullable();
            $table->json('expertise')->nullable();   // ["Smart Warehousing", ...]
            $table->json('education')->nullable();   // [{"degree":"S3","institution":"ITB","year":2015}]
            $table->string('photo')->nullable();
            $table->string('scholar_url')->nullable();
            $table->string('sinta_url')->nullable();
            $table->string('scopus_url')->nullable();
            $table->string('email')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};
