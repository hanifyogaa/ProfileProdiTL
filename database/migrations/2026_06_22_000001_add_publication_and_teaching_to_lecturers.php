<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lecturers', function (Blueprint $table) {
            $table->string('scopus_id')->nullable()->after('scopus_url');
            $table->string('scholar_id')->nullable()->after('scholar_url');
            $table->string('sinta_id')->nullable()->after('sinta_url');
            $table->json('teaching_history')->nullable()->after('education');
            // [{"semester":"Ganjil 2024/2025","courses":["Logistik Digital","Supply Chain"]}]
        });
    }

    public function down(): void
    {
        Schema::table('lecturers', function (Blueprint $table) {
            $table->dropColumn(['scopus_id', 'scholar_id', 'sinta_id', 'teaching_history']);
        });
    }
};
