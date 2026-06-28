<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Activity;
use App\Models\Course;
use App\Models\Lab;
use App\Models\News;
use App\Models\Partner;
use App\Models\Setting;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $signatureCourses = Course::where('is_signature', true)->get(['name_id', 'name_en']);
        $curriculumSummary = Setting::getValue('curriculum_summary', []);
        $curriculumSummary['signature_courses'] = $signatureCourses;

        $featured = News::published()
            ->orderByDesc('is_featured')
            ->orderByDesc('published_at')
            ->limit(6)
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'title_id' => $news->title_id,
                    'title_en' => $news->title_en,
                    'slug' => $news->slug,
                    'type' => $news->category ?: 'berita',
                    'date' => $news->published_at ? $news->published_at->format('Y-m-d') : $news->created_at->format('Y-m-d'),
                    'location' => null,
                    'cover' => $news->featured_image,
                ];
            });

        return Inertia::render('Home', [
            'hero' => Setting::getValue('hero'),
            'stats' => Stat::whereIn('metric', [
                'active_students',
                'alumni',
                'lecturer_count',
                'research_count'
            ])->orderBy('order')->get(),
            'distinctiveness' => Setting::getValue('distinctiveness'),
            'greeting' => Setting::getValue('greeting'),
            'featured' => $featured,
            'latestNews' => News::published()->orderByDesc('published_at')->limit(4)->get(),
            'curriculumSummary' => $curriculumSummary,
            'prospects' => Setting::getValue('prospects'),
            'achievements' => Achievement::orderBy('order')->limit(6)->get(),
            'tracerStats' => Setting::getValue('tracer_stats'),
            'labs' => Lab::orderBy('order')->limit(6)->get(),
            'partners' => Partner::orderBy('order')->get(),
            'settings' => [
                'site_meta' => Setting::getValue('site_meta'),
                'socials' => Setting::getValue('socials'),
                'contact' => Setting::getValue('contact'),
            ],
        ]);
    }
}
