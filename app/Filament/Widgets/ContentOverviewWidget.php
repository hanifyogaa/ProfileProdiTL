<?php

namespace App\Filament\Widgets;

use App\Models\Achievement;
use App\Models\Activity;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Lecturer;
use App\Models\News;
use App\Models\Partner;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ContentOverviewWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected int|string|array $columnSpan = 'full';

    protected function getStats(): array
    {
        return [
            Stat::make('Dosen Aktif', Lecturer::active()->count())
                ->description('Dosen & staf pengajar aktif')
                ->color('primary')
                ->icon(Heroicon::OutlinedAcademicCap),

            Stat::make('Berita Terpublikasi', News::where('status', 'published')->count())
                ->description(News::where('status', 'draft')->count() . ' masih draft')
                ->color('success')
                ->icon(Heroicon::OutlinedNewspaper),

            Stat::make('Agenda Kegiatan', Activity::count())
                ->description('Total kegiatan terdaftar')
                ->color('info')
                ->icon(Heroicon::OutlinedCalendarDays),

            Stat::make('Prestasi', Achievement::count())
                ->description('Nasional & internasional')
                ->color('warning')
                ->icon(Heroicon::OutlinedTrophy),

            Stat::make('Galeri Foto', Gallery::where('is_published', true)->count())
                ->description('Foto terpublikasi')
                ->color('primary')
                ->icon(Heroicon::OutlinedPhoto),

            Stat::make('Mitra', Partner::count())
                ->description('Industri & akademik')
                ->color('gray')
                ->icon(Heroicon::OutlinedBuildingOffice2),

            Stat::make('FAQ Aktif', Faq::where('is_active', true)->count())
                ->description('Pertanyaan yang ditampilkan')
                ->color('success')
                ->icon(Heroicon::OutlinedQuestionMarkCircle),
        ];
    }
}
