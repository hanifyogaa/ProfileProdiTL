import { MainLayout } from '@/Layouts/MainLayout';
import { PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Award, Calendar, Tag, Trophy, Users } from 'lucide-react';
import { useState } from 'react';

interface AchievementItem {
    id: number;
    title_id: string;
    title_en: string;
    level: 'national' | 'international';
    date: string;
    holder: string;
    cover: string | null;
    category?: string | null;
    description_id?: string | null;
    description_en?: string | null;
}

interface AchievementsListProps {
    achievements: AchievementItem[];
}

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1600&h=900';

type FilterLevel = 'all' | 'national' | 'international';

export default function AchievementsList({ achievements }: AchievementsListProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const [filter, setFilter] = useState<FilterLevel>('all');

    const title = l === 'id' ? 'Prestasi & Penghargaan' : 'Competition & Awards';
    const subtitle = l === 'id'
        ? 'Pencapaian terbaik mahasiswa dan dosen Program Studi Teknik Logistik Telkom University dalam berbagai kompetisi nasional dan internasional.'
        : 'The finest achievements of Logistics Engineering students and faculty at Telkom University in national and international competitions.';

    const national      = achievements.filter(a => a.level === 'national');
    const international = achievements.filter(a => a.level === 'international');

    const filtered = filter === 'all'
        ? achievements
        : achievements.filter(a => a.level === filter);

    const heroStats = [
        { value: `${international.length}+`, label: l === 'id' ? 'Juara Internasional' : 'International Awards' },
        { value: `${national.length}+`,      label: l === 'id' ? 'Juara Nasional' : 'National Awards' },
        { value: `${achievements.length}+`,  label: l === 'id' ? 'Total Prestasi' : 'Total Achievements' },
    ];

    const FILTER_OPTS: { key: FilterLevel; label: string }[] = [
        { key: 'all',           label: l === 'id' ? 'Semua' : 'All' },
        { key: 'international', label: l === 'id' ? 'Internasional' : 'International' },
        { key: 'national',      label: l === 'id' ? 'Nasional' : 'National' },
    ];

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Prestasi Prodi' : 'Program Achievements'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Award ceremony podium"
                stats={heroStats}
            />

            {/* ── List ── */}
            <section className="py-16 sm:py-20" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1000px] px-6">
                    {/* Level filter pills below hero */}
                    <Reveal variant="fade-up">
                        <div className="mb-12 flex flex-wrap justify-center gap-2">
                            {FILTER_OPTS.map(opt => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setFilter(opt.key)}
                                    className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                                    style={
                                        filter === opt.key
                                            ? { background: '#8C6441', color: '#FFFDFB', boxShadow: '0 4px 14px -4px rgba(140,100,65,0.45)' }
                                            : { background: '#ECEBE9', color: '#505666' }
                                    }
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="mb-10">
                            <PillLabel>{l === 'id' ? 'Daftar Prestasi' : 'Achievement List'}</PillLabel>
                            <h2 className="font-display mt-2 text-3xl font-bold" style={{ color: '#24141F' }}>
                                {filter === 'all'
                                    ? (l === 'id' ? 'Semua Prestasi' : 'All Achievements')
                                    : filter === 'international'
                                        ? (l === 'id' ? 'Prestasi Internasional' : 'International Achievements')
                                        : (l === 'id' ? 'Prestasi Nasional' : 'National Achievements')}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="space-y-5 pb-10">
                        {filtered.length > 0 ? filtered.map((item, i) => {
                            const titleText = l === 'id' ? item.title_id : item.title_en;
                            const desc      = l === 'id' ? item.description_id : item.description_en;
                            const isIntl    = item.level === 'international';
                            const year      = new Date(item.date).getFullYear();

                            return (
                                <Reveal key={item.id} delay={i * 0.05}>
                                    <article
                                        className="group overflow-hidden rounded-2xl border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.15)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                    >
                                        <div className="flex flex-col sm:flex-row">
                                            {/* Image panel */}
                                            <div className="relative w-full shrink-0 overflow-hidden sm:w-52">
                                                {item.cover ? (
                                                    <img
                                                        src={item.cover}
                                                        alt={titleText}
                                                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div
                                                        className="flex h-44 w-full items-center justify-center sm:h-full"
                                                        style={{ background: 'rgba(140,100,65,0.06)' }}
                                                    >
                                                        <Trophy className="size-12 opacity-20" style={{ color: '#8C6441' }} />
                                                    </div>
                                                )}
                                                {/* Level badge */}
                                                <div
                                                    className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase text-white"
                                                    style={{ background: isIntl ? '#6E4E33' : '#8C6441' }}
                                                >
                                                    {isIntl ? <Trophy className="size-2.5" style={{ color: '#D99F60' }} /> : <Award className="size-2.5" style={{ color: '#D99F60' }} />}
                                                    {isIntl ? (l === 'id' ? 'Internasional' : 'International') : (l === 'id' ? 'Nasional' : 'National')}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-1 flex-col justify-between p-6">
                                                <div>
                                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                                        {item.category && (
                                                            <span
                                                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase"
                                                                style={{ background: 'rgba(217,159,96,0.12)', color: '#C08A4C' }}
                                                            >
                                                                <Tag className="size-2.5" />
                                                                {item.category}
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(80,86,102,0.5)' }}>
                                                            <Calendar className="size-3" />
                                                            {year}
                                                        </span>
                                                    </div>
                                                    <h2
                                                        className="font-display mb-2 text-lg font-semibold leading-snug transition-colors group-hover:opacity-70"
                                                        style={{ color: '#24141F' }}
                                                    >
                                                        {titleText}
                                                    </h2>
                                                    {desc && (
                                                        <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                                            {desc}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mt-4 flex items-center gap-2 border-t pt-4" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                                                    <Users className="size-3.5 opacity-30" style={{ color: '#505666' }} />
                                                    <p className="text-xs font-medium" style={{ color: 'rgba(80,86,102,0.50)' }}>{item.holder}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Reveal>
                            );
                        }) : (
                            <div className="rounded-2xl border py-16 text-center" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                                <Trophy className="mx-auto mb-3 size-10 opacity-20" style={{ color: '#505666' }} />
                                <p className="text-sm" style={{ color: '#505666' }}>
                                    -
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
