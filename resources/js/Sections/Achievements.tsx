import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import useEmblaCarousel from 'embla-carousel-react';
import { Award, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface AchievementItem {
    id: number;
    title_id: string;
    title_en: string;
    level: 'national' | 'international';
    date: string;
    holder: string;
    cover: string | null;
    order: number;
}

const ACHIEVEMENT_FALLBACKS = [
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500&h=350',
];

export function Achievements({
    achievements,
}: {
    achievements: AchievementItem[];
}) {
    const { locale, t } = useLocale();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        dragFree: true,
        skipSnaps: true,
    });

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi],
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi],
    );

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.reInit();
    }, [emblaApi]);

    if (!achievements || achievements.length === 0) {
        return null;
    }

    return (
        <section className="bg-surface-0 overflow-hidden py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <Reveal>
                    <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="font-display text-ink-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Prestasi Mahasiswa & Dosen'
                                    : 'Student & Faculty Achievements'}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={scrollPrev}
                                className="border-cream-300/40 bg-surface-0 text-ink-900 hover:bg-brand-700 hover:text-surface-0 flex size-11 items-center justify-center rounded-full border transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={scrollNext}
                                className="border-cream-300/40 bg-surface-0 text-ink-900 hover:bg-brand-700 hover:text-surface-0 flex size-11 items-center justify-center rounded-full border transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    </div>
                </Reveal>

                {/* Peek Carousel Viewport */}
                <Reveal delay={0.15}>
                    <div
                        className="overflow-hidden"
                        ref={emblaRef}
                        style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
                    >
                        <div className="flex" style={{ paddingLeft: '1.5rem' }}>
                            {achievements.map((item, index) => {
                                const title =
                                    locale === 'id'
                                        ? item.title_id
                                        : item.title_en;
                                const coverImg =
                                    item.cover ||
                                    ACHIEVEMENT_FALLBACKS[
                                        index % ACHIEVEMENT_FALLBACKS.length
                                    ];
                                const isIntl = item.level === 'international';

                                return (
                                    <div
                                        key={item.id}
                                        className="w-[80%] flex-none shrink-0 pr-5 sm:w-[44%] md:w-[31%]"
                                    >
                                        <Card className="group border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-all duration-300 hover:shadow-[0_16px_36px_-12px_rgba(36,20,31,0.15)]">
                                            {/* Photo block */}
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={coverImg}
                                                    alt={title}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="bg-brand-800 text-surface-0 absolute top-4 left-4 flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md">
                                                    {isIntl ? (
                                                        <>
                                                            <Trophy className="size-3 text-amber-500" />
                                                            <span>
                                                                {locale === 'id'
                                                                    ? 'Internasional'
                                                                    : 'International'}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Award className="size-3 text-amber-500" />
                                                            <span>
                                                                {locale === 'id'
                                                                    ? 'Nasional'
                                                                    : 'National'}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content block */}
                                            <div className="flex flex-1 flex-col justify-between p-6">
                                                <div>
                                                    <span className="text-navy-700 mb-2 block text-xs font-semibold tracking-wider uppercase">
                                                        {new Date(
                                                            item.date,
                                                        ).getFullYear()}
                                                    </span>
                                                    <h3 className="font-display text-ink-900 group-hover:text-brand-700 line-clamp-2 text-base font-semibold transition-colors">
                                                        {title}
                                                    </h3>
                                                    <p className="text-navy-700 mt-3 text-xs font-medium">
                                                        {item.holder}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="mt-12 text-center">
                        <Button
                            href="/prestasi"
                            variant="tertiary"
                            className="text-brand-700 group mx-auto flex items-center justify-center gap-1 font-semibold"
                        >
                            {t({
                                id: 'Lihat semua prestasi',
                                en: 'All achievements',
                            })}
                            <span className="inline-block transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
