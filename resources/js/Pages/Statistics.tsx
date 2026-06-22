import { MainLayout } from '@/Layouts/MainLayout';
import { TracerChart } from '@/Sections/TracerChart';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

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

export default function Statistics({ tracerStats, stats }: StatisticsProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Fakta & Statistik Program Studi'
            : 'Facts & Statistics';

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                    </div>
                </Reveal>

                {/* Key Metrics cards grid */}
                <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <Reveal key={stat.id} delay={idx * 0.05}>
                            <Card className="border-cream-300/20 bg-surface-0 flex flex-col justify-center border p-6 text-center shadow-sm">
                                <span className="font-display text-brand-700 block text-3xl font-bold">
                                    {stat.value}
                                </span>
                                <span className="text-navy-700/80 mt-2 block text-xs font-semibold tracking-wider uppercase">
                                    {locale === 'id'
                                        ? stat.label_id
                                        : stat.label_en}
                                </span>
                            </Card>
                        </Reveal>
                    ))}
                </div>

                {/* Recharts Tracer Study Area Graph */}
                <TracerChart tracerStats={tracerStats} />
            </div>
        </MainLayout>
    );
}
