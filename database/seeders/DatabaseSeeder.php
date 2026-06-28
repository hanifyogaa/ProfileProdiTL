<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Achievement;
use App\Models\Activity;
use App\Models\CommunityService;
use App\Models\Course;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Lab;
use App\Models\Lecturer;
use App\Models\News;
use App\Models\Partner;
use App\Models\Research;
use App\Models\Stat;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign keys and clear data
        Schema::disableForeignKeyConstraints();
        Achievement::truncate();
        Activity::truncate();
        CommunityService::truncate();
        Course::truncate();
        Faq::truncate();
        Gallery::truncate();
        Lab::truncate();
        Lecturer::truncate();
        News::truncate();
        Partner::truncate();
        Research::truncate();
        Stat::truncate();
        Setting::truncate();

        // Keep only admin user, delete others
        User::where('email', '!=', 'admin@proditl.ac.id')->delete();
        Schema::enableForeignKeyConstraints();

        $this->call([
            AdminSeeder::class,
            HomeContentSeeder::class,
            GallerySeeder::class,
            FaqSeeder::class,
            NewsSeeder::class,
        ]);
    }
}
