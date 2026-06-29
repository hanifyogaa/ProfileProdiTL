<?php

namespace App\Http\Controllers;

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
use App\Models\ProgramLearningOutcome;
use App\Models\Research;
use App\Models\Setting;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About', [
            'greeting'     => Setting::getValue('greeting'),
            'aboutContent' => Setting::getValue('about_content'),
            'siteMeta'     => Setting::getValue('site_meta'),
            'prodiStats'   => Setting::getValue('prodi_stats'),
            'stats'        => Stat::whereIn('metric', [
                'active_students',
                'alumni',
                'lecturer_count',
                'research_count'
            ])->orderBy('order')->get(),
        ]);
    }

    public function accreditation(): Response
    {
        return Inertia::render('Accreditation', [
            'accreditation' => Setting::getValue('accreditation'),
            'prodiStats' => Setting::getValue('prodi_stats'),
        ]);
    }

    public function orgStructure(): Response
    {
        return Inertia::render('OrgStructure', [
            'orgContent' => Setting::getValue('org_structure'),
        ]);
    }

    public function curriculum(): Response
    {
        return Inertia::render('Curriculum', [
            'courses'        => Course::orderBy('semester')->orderBy('code')->get(),
            'curriculumMeta' => Setting::getValue('curriculum_summary'),
        ]);
    }

    public function learningOutcomes(): Response
    {
        return Inertia::render('LearningOutcomes', [
            'plos' => ProgramLearningOutcome::with('clos.course')->orderBy('order')->get(),
        ]);
    }

    public function lecturers(): Response
    {
        $all = Lecturer::active()->orderBy('order')->get();
        return Inertia::render('Lecturers', [
            'kaprodi'   => $all->filter(fn($l) => str_contains(strtolower($l->position_id ?? ''), 'kaprodi'))->first(),
            'labHeads'  => $all->filter(fn($l) => str_contains(strtolower($l->position_id ?? ''), 'pembina lab') || str_contains(strtolower($l->position_id ?? ''), 'lab head'))->values(),
            'lecturers' => $all->filter(fn($l) => !str_contains(strtolower($l->position_id ?? ''), 'kaprodi') && !str_contains(strtolower($l->position_id ?? ''), 'pembina lab') && !str_contains(strtolower($l->position_id ?? ''), 'lab head'))->values(),
        ]);
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
        return Inertia::render('Gallery', [
            'photos' => Gallery::published()->orderBy('order')->get(),
        ]);
    }

    public function achievements(): Response
    {
        $achievements = News::published()
            ->where('category', 'prestasi')
            ->orderByDesc('published_at')
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'title_id' => $news->title_id,
                    'title_en' => $news->title_en,
                    'level' => 'national',
                    'date' => $news->published_at ? $news->published_at->format('Y-m-d') : $news->created_at->format('Y-m-d'),
                    'holder' => 'Himpunan Mahasiswa FRI',
                    'cover' => $news->featured_image,
                    'category' => 'PPKO',
                    'description_id' => $news->excerpt_id,
                    'description_en' => $news->excerpt_en,
                ];
            });

        return Inertia::render('AchievementsList', [
            'achievements' => $achievements,
        ]);
    }

    public function activities(): Response
    {
        return Inertia::render('ActivitiesList', [
            'activities' => Activity::orderByDesc('date')->get(),
        ]);
    }

    public function activityDetail(string $slug): Response
    {
        $item = Activity::where('slug', $slug)->firstOrFail();
        return Inertia::render('ActivityDetail', [
            'item'    => $item,
            'related' => Activity::where('id', '!=', $item->id)->orderByDesc('date')->limit(3)->get(),
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
        return Inertia::render('Research', [
            'researches' => Research::orderByDesc('year')->orderBy('order')->get(),
        ]);
    }

    public function researchDetail(int $id): Response
    {
        $item = Research::findOrFail($id);
        return Inertia::render('ResearchDetail', [
            'item' => $item,
            'related' => Research::where('id', '!=', $item->id)->orderByDesc('year')->limit(3)->get(),
        ]);
    }

    public function communityService(): Response
    {
        return Inertia::render('CommunityService', [
            'services' => CommunityService::orderByDesc('year')->orderBy('order')->get(),
        ]);
    }

    public function communityServiceDetail(int $id): Response
    {
        $item = CommunityService::findOrFail($id);
        return Inertia::render('CommunityServiceDetail', [
            'item' => $item,
            'related' => CommunityService::where('id', '!=', $item->id)->orderByDesc('year')->limit(3)->get(),
        ]);
    }

    public function studentAssociation(): Response
    {
        return Inertia::render('StudentAssociation', [
            'orgContent' => Setting::getValue('student_association'),
        ]);
    }

    public function mbkm(): Response
    {
        return Inertia::render('Mbkm', [
            'mbkmContent' => Setting::getValue('mbkm_content'),
        ]);
    }

    public function statistics(): Response
    {
        $visibleSections = Setting::getValue('visible_sections', []);

        return Inertia::render('Statistics', [
            'tracerStats' => Setting::getValue('tracer_stats'),
            'stats' => Stat::orderBy('order')->get(),
            'showTracer' => $visibleSections['tracer'] ?? false,
        ]);
    }

    public function kalenderAkademik(): Response
    {
        return Inertia::render('AkademikEmbed', [
            'title' => ['id' => 'Kalender Akademik', 'en' => 'Academic Calendar'],
            'url'   => '/panduan/kalender-akademik-2025-2026.pdf',
            'description' => [
                'id' => 'Jadwal kegiatan akademik resmi Telkom University, termasuk masa perkuliahan, ujian, dan libur semester.',
                'en' => 'Official Telkom University academic calendar, including lecture periods, exams, and semester breaks.',
            ],
        ]);
    }

    public function pedomanAkademik(): Response
    {
        return Inertia::render('AkademikEmbed', [
            'title' => ['id' => 'Pedoman Akademik', 'en' => 'Academic Handbook'],
            'url'   => '/panduan/pedoman-akademik-telkom.pdf',
            'description' => [
                'id' => 'Panduan lengkap peraturan dan tata tertib akademik Telkom University untuk mahasiswa dan dosen.',
                'en' => 'Complete guide to academic regulations and rules at Telkom University for students and faculty.',
            ],
        ]);
    }

    public function kodeEtik(): Response
    {
        return Inertia::render('AkademikEmbed', [
            'title' => ['id' => 'Kode Etik', 'en' => 'Code of Ethics'],
            'url'   => '/panduan/kode-etik-telkom.pdf',
            'description' => [
                'id' => 'Kode etik dan tata nilai yang berlaku bagi seluruh civitas akademika Telkom University.',
                'en' => 'Code of ethics and values applicable to all members of the Telkom University academic community.',
            ],
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('Faq', [
            'faqs' => Faq::active()->orderBy('order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Contact', [
            'contact'  => Setting::getValue('contact'),
            'siteMeta' => Setting::getValue('site_meta'),
            'socials'  => Setting::getValue('socials'),
        ]);
    }
}
