import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface TracerSeriesItem {
    year: number;
    employment_rate: number;
}

interface TracerStatsData {
    caption: Bilingual;
    series: TracerSeriesItem[];
}

export function TracerChart({ tracerStats }: { tracerStats: TracerStatsData }) {
    const { locale, t } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        setWidth(containerRef.current.clientWidth || 500);

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                if (w > 0) {
                    setWidth(w);
                }
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const formattedData = tracerStats.series.map((item) => ({
        year: String(item.year),
        rate: item.employment_rate,
    }));

    // Custom tool tip component to fit Nawasena Sancaya design
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-ink-900 border-brand-800 text-surface-0 rounded-lg border p-3 text-xs shadow-md">
                    <p className="font-semibold">
                        {locale === 'id'
                            ? `Tahun ${payload[0].payload.year}`
                            : `Year ${payload[0].payload.year}`}
                    </p>
                    <p className="mt-1 font-bold text-amber-500">
                        {payload[0].value}%{' '}
                        {locale === 'id' ? 'Terserap' : 'Employed'}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    {/* Text Details / Left Side */}
                    <div className="lg:col-span-5">
                        <Reveal>
                            <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Tingkat Penyerapan Kerja Lulusan Cepat'
                                    : 'Fast-Track Graduate Employment Rates'}
                            </h2>

                            <p className="text-navy-700 mt-6 text-base leading-relaxed">
                                {locale === 'id'
                                    ? 'Survei penelusuran lulusan (tracer study) kami menunjukkan keterserapan lulusan yang terus meningkat. Kurang dari 6 bulan setelah kelulusan, sebagian besar lulusan kami telah terserap di industri digital logistik, manufaktur, e-commerce, maupun instansi pemerintahan.'
                                    : 'Our tracer study survey indicates a consistently high and growing graduate employment rate. Within less than 6 months post-graduation, the vast majority of our alumni secure professional roles in digital supply chain, logistics automation, and government sectors.'}
                            </p>

                            <p className="text-navy-700/70 mt-4 text-xs italic">
                                * {t(tracerStats.caption)}
                            </p>

                            <div className="mt-8">
                                <Button href="/statistik" variant="primary">
                                    {t({
                                        id: 'Lihat Statistik Lengkap',
                                        en: 'View All Statistics',
                                    })}
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    {/* Chart Container / Right Side */}
                    <div className="min-w-0 lg:col-span-7">
                        <Reveal delay={0.2}>
                            <Card className="border-cream-300/20 bg-surface-0 border p-6 md:p-8">
                                <div
                                    ref={containerRef}
                                    className="h-[300px] w-full sm:h-[350px]"
                                >
                                    {width > 0 && (
                                        <AreaChart
                                            width={width}
                                            height={350}
                                            data={formattedData}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: -20,
                                                bottom: 0,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="colorRate"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="#D99F60"
                                                        stopOpacity={0.4}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="#D99F60"
                                                        stopOpacity={0.0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#ECEBE9"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="year"
                                                stroke="#505666"
                                                fontSize={12}
                                                fontWeight={500}
                                                tickLine={false}
                                                axisLine={false}
                                                dy={10}
                                            />
                                            <YAxis
                                                stroke="#505666"
                                                fontSize={12}
                                                fontWeight={500}
                                                tickLine={false}
                                                axisLine={false}
                                                domain={[50, 100]}
                                                tickFormatter={(value) =>
                                                    `${value}%`
                                                }
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="rate"
                                                stroke="#C08A4C"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorRate)"
                                                isAnimationActive={
                                                    !shouldReduceMotion
                                                }
                                                animationDuration={1500}
                                            />
                                        </AreaChart>
                                    )}
                                </div>
                            </Card>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
