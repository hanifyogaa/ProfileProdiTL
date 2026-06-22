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

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About', [
            'greeting' => Setting::getValue('greeting'),
            'distinctiveness' => Setting::getValue('distinctiveness'),
        ]);
    }

    public function accreditation(): Response
    {
        return Inertia::render('Accreditation');
    }

    public function curriculum(): Response
    {
        return Inertia::render('Curriculum', [
            'courses' => Course::orderBy('semester')->orderBy('code')->get(),
        ]);
    }

    public function lecturers(): Response
    {
        return Inertia::render('Lecturers');
    }

    public function news(): Response
    {
        return Inertia::render('NewsList', [
            'news' => News::published()->orderByDesc('published_at')->paginate(9),
        ]);
    }

    public function newsDetail(string $slug): Response
    {
        $item = News::where('slug', $slug)->firstOrFail();
        // Increment views count
        $item->increment('views');

        return Inertia::render('NewsDetail', [
            'item' => $item,
            'related' => News::published()->where('id', '!=', $item->id)->limit(3)->get(),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Gallery');
    }

    public function achievements(): Response
    {
        return Inertia::render('AchievementsList', [
            'achievements' => Achievement::orderBy('order')->get(),
        ]);
    }

    public function activities(): Response
    {
        return Inertia::render('ActivitiesList', [
            'activities' => Activity::orderByDesc('date')->get(),
        ]);
    }

    public function labs(): Response
    {
        return Inertia::render('LabsList', [
            'labs' => Lab::orderBy('order')->get(),
        ]);
    }

    public function partnerships(): Response
    {
        return Inertia::render('Partnerships', [
            'partners' => Partner::orderBy('order')->get(),
        ]);
    }

    public function research(): Response
    {
        return Inertia::render('Research');
    }

    public function mbkm(): Response
    {
        return Inertia::render('Mbkm');
    }

    public function statistics(): Response
    {
        return Inertia::render('Statistics', [
            'tracerStats' => Setting::getValue('tracer_stats'),
            'stats' => Stat::orderBy('order')->get(),
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('Faq');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }
}
