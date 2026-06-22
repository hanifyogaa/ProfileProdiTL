import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LangText } from '@/components/LangText';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import { Boxes, Cog, LineChart } from 'lucide-react';

const ICONS = [Boxes, LineChart, Cog];

interface DistinctivenessPoint {
    title: Bilingual;
    description: Bilingual;
}

interface DistinctivenessData {
    heading: Bilingual;
    body: Bilingual;
    points: DistinctivenessPoint[];
    link_href: string;
}

export function Distinctiveness({
    distinctiveness,
}: {
    distinctiveness: DistinctivenessData;
}) {
    const { locale, t } = useLocale();

    return (
        <section className="bg-surface-0 pt-20 pb-32 sm:pb-40">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
                    {/* Left Panel */}
                    <div className="lg:sticky lg:top-24 lg:col-span-5">
                        <Reveal>
                            <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Warna Keilmuan E-Logistik Kami'
                                    : 'Our E-Logistics Specialization'}
                            </h2>
                            <p className="text-navy-700 mt-6 text-base leading-relaxed">
                                <LangText text={distinctiveness.body} />
                            </p>
                            <div className="mt-8">
                                <Button
                                    href={distinctiveness.link_href}
                                    variant="tertiary"
                                >
                                    {t({
                                        id: 'Tentang program',
                                        en: 'About the program',
                                    })}
                                    <span className="inline-block transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right column: one featured point in a dark filled card, rest as a compact list */}
                    <div className="flex flex-col gap-6 lg:col-span-7">
                        {distinctiveness.points[0] &&
                            (() => {
                                const point = distinctiveness.points[0];
                                return (
                                    <Reveal>
                                        <Card className="border-cream-300/30 bg-surface-0 relative overflow-hidden p-8 shadow-[0_16px_36px_-12px_rgba(36,20,31,0.1),0_4px_12px_-4px_rgba(36,20,31,0.04)] sm:p-10">
                                            {/* Corner flag motif: deliberate larger signature */}
                                            <div className="absolute top-0 left-0 z-10 size-8 bg-amber-500 [clip-path:polygon(0_0,100%_0,0_100%)]" />

                                            {/* Large amber numeral in corner */}
                                            <div className="font-display absolute top-8 right-8 text-5xl font-semibold text-amber-500 select-none">
                                                01
                                            </div>

                                            <h3 className="font-display text-ink-900 mt-4 text-2xl font-semibold sm:text-[1.75rem]">
                                                <LangText text={point.title} />
                                            </h3>
                                            <p className="text-navy-700 mt-3 max-w-xl text-sm leading-relaxed">
                                                <LangText
                                                    text={point.description}
                                                />
                                            </p>
                                        </Card>
                                    </Reveal>
                                );
                            })()}

                        <div className="grid gap-4 sm:grid-cols-2">
                            {distinctiveness.points
                                .slice(1)
                                .map((point, index) => {
                                    const Icon =
                                        ICONS[(index + 1) % ICONS.length];
                                    return (
                                        <Reveal
                                            key={index}
                                            delay={(index + 1) * 0.1}
                                        >
                                            <Card className="border-cream-300/30 bg-surface-0 h-full border p-6 transition-shadow duration-300 hover:shadow-[0_18px_36px_-16px_rgba(36,20,31,0.12)]">
                                                <Icon
                                                    className="text-brand-700/80 size-5"
                                                    strokeWidth={1.25}
                                                />
                                                <h3 className="font-display text-ink-900 mt-4 text-base font-semibold">
                                                    <LangText
                                                        text={point.title}
                                                    />
                                                </h3>
                                                <p className="text-navy-700 mt-2 text-sm leading-relaxed">
                                                    <LangText
                                                        text={point.description}
                                                    />
                                                </p>
                                            </Card>
                                        </Reveal>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
