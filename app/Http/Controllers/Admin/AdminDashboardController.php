<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Lecturer;
use App\Models\Course;
use App\Models\Activity;
use App\Models\Achievement;
use App\Models\Lab;
use App\Models\Partner;
use App\Models\Stat;
use App\Models\Gallery;
use App\Models\Faq;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'news_count' => News::count(),
                'lecturer_count' => Lecturer::count(),
                'course_count' => Course::count(),
                'activity_count' => Activity::count(),
                'achievement_count' => Achievement::count(),
                'lab_count' => Lab::count(),
                'partner_count' => Partner::count(),
                'stat_count' => Stat::count(),
                'gallery_count' => Gallery::count(),
                'faq_count' => Faq::count(),
            ]
        ]);
    }
}
