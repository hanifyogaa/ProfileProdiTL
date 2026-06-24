<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Stores category-specific extra fields as JSON
            // e.g. company_name, participant_count, competition_level, etc.
            $table->json('metadata')->nullable()->after('category');
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('metadata');
        });
    }
};
