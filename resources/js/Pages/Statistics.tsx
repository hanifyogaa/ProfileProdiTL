import { MainLayout } from '@/Layouts/MainLayout';
import { TracerChart } from '@/Sections/TracerChart';
import { Card } from '@/components/Card';
import { DarkBand, PageHero, PillLabel, StatsRow } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { BarChart2, BookOpen, GraduationCap, Users } from 'lucide-react';

interface StatItem {
    id: number;
    metric: string;
    value: string;
    label_id: string;
    label_en: string;
}

interface StatisticsProps {
    tracerStats: any;
    stats: StatItem[];
}

const STAT_ICONS: Record<string, React.ElementType> = {
    alumni:    GraduationCap,
    mahasiswa: Users,
    dosen:     BookOpen,
    default:   BarChart2,
};

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600&h=900';

export default function Statistics({ tracerStats, stats }: StatisticsProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title     = l === 'id' ? 'Fakta & Statistik Program Studi' : 'Facts & Statistics';
    const subtitle  = l === 'id'
        ? 'Data dan capaian nyata Program Studi Teknik Logistik Telkom University dalam angka.'
        : 'Real data and achievements of the Logistics Engineering Program at Telkom University.';

    // Build hero stats from dynamic data (first 4 items)
    const heroStats = stats.slice(0, 4).map(s => ({
        value: s.value,
        label: l === 'id' ? s.label_id : s.label_en,
    }));

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Program Studi' : 'Program'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Data analytics dashboard"
                stats={heroStats.length > 0 ? heroStats : undefined}
            />

            {/* ── Metric Cards Grid ── */}
            <section className="py-20 sm:py-24" style={{ background: '#ECEBE9' }}>
                <div className="mx-auto max-w-[1000px] px-6">
                    <Reveal>
                        <div className="mb-10 text-center">
                            <PillLabel>{l === 'id' ? 'Capaian' : 'Achievements'}</PillLabel>
                            <h2
                                className="font-display mt-3 text-3xl font-bold"
                                style={{ color: '#24141F' }}
                            >
                                {l === 'id' ? 'Indikator Kinerja Utama' : 'Key Performance Indicators'}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, idx) => {
                            const Icon = STAT_ICONS[stat.metric] ?? STAT_ICONS.default;
                            return (
                                <Reveal key={stat.id} delay={idx * 0.06} variant="fade-up">
                                    <Card className="flex flex-col items-center justify-center border bg-surface-0 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
                                        style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                                        <div
                                            className="mb-4 flex size-12 items-center justify-center rounded-2xl"
                                            style={{ background: 'rgba(140,100,65,0.10)' }}
                                        >
                                            <Icon className="size-5" style={{ color: '#8C6441' }} />
                                        </div>
                                        <span
                                            className="font-display block text-4xl font-bold"
                                            style={{ color: '#8C6441' }}
                                        >
                                            {stat.value}
                                        </span>
                                        <span
                                            className="mt-2 block text-xs font-semibold uppercase tracking-widest"
                                            style={{ color: '#505666' }}
                                        >
                                            {l === 'id' ? stat.label_id : stat.label_en}
                                        </span>
                                    </Card>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Tracer Study Chart ── */}
            <DarkBand>
                <div className="mx-auto max-w-[1000px] px-6">
                    <Reveal>
                        <div className="mb-10 text-center">
                            <span
                                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60' }}
                            >
                                {l === 'id' ? 'Tracer Study' : 'Graduate Tracer'}
                            </span>
                            <h2
                                className="font-display mt-3 text-3xl font-bold"
                                style={{ color: '#FFFDFB' }}
                            >
                                {l === 'id' ? 'Sebaran & Karir Alumni' : 'Alumni Distribution & Careers'}
                            </h2>
                            <p
                                className="mx-auto mt-3 max-w-lg text-sm leading-relaxed"
                                style={{ color: 'rgba(172,149,135,0.80)' }}
                            >
                                {l === 'id'
                                    ? 'Data terkini serapan lulusan di industri logistik dan supply chain nasional.'
                                    : 'Latest data on graduate absorption in the national logistics and supply chain industry.'}
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <TracerChart tracerStats={tracerStats} />
                    </Reveal>
                </div>
            </DarkBand>
        </MainLayout>
    );
}
