import { Button } from '@/components/Button';
import { useLocale } from '@/contexts/LocaleContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ActivityItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    type: 'visit' | 'workshop' | 'lecture';
    date: string;
    location: string | null;
    cover: string | null;
}

// Fallback images for seed data activities
const ACTIVITY_IMAGES: Record<string, string> = {
    'kunjungan-industri-havi-logistics':
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920&h=1080',
    'workshop-asean-logistics-business-readiness':
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=1080',
    'kunjungan-pertamina-ru-v-balikpapan':
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920&h=1080',
    'kunjungan-garuda-food':
        'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=1920&h=1080',
};

const DEFAULT_BG =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920&h=1080';

const TYPE_LABELS: Record<string, { id: string; en: string }> = {
    visit: { id: 'Kunjungan Industri', en: 'Industry Visit' },
    workshop: { id: 'Workshop', en: 'Workshop' },
    lecture: { id: 'Kuliah Tamu', en: 'Guest Lecture' },
    berita: { id: 'Berita', en: 'News' },
    pengumuman: { id: 'Pengumuman', en: 'Announcement' },
};

export function FeaturedCarousel({ featured }: { featured: ActivityItem[] }) {
    const { locale, t } = useLocale();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [progressActive, setProgressActive] = useState(false);

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi],
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi],
    );
    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi],
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    // Reset the progress bar fill, then trigger the transition on the next frame
    useEffect(() => {
        setProgressActive(false);
        const raf = requestAnimationFrame(() => setProgressActive(true));
        return () => cancelAnimationFrame(raf);
    }, [selectedIndex]);

    // Autoplay implementation (7 seconds)
    useEffect(() => {
        if (!emblaApi || isHovered) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 7000);
        return () => clearInterval(interval);
    }, [emblaApi, isHovered]);

    if (!featured || featured.length === 0) {
        return null;
    }

    const currentItem = featured[selectedIndex];
    const currentImg =
        currentItem?.cover || ACTIVITY_IMAGES[currentItem?.slug] || DEFAULT_BG;

    return (
        <section
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ minHeight: '100svh' }}
        >
            {/* ── FULL-BLEED BACKGROUND (crossfades with slide) ── */}
            <div
                className="pointer-events-none absolute inset-0 z-0 scale-105 bg-cover bg-center transition-all duration-[1200ms] ease-out"
                style={{ backgroundImage: `url(${currentImg})` }}
            />
            {/* Cinematic overlay stack */}
            <div className="from-ink-900/90 via-ink-900/60 pointer-events-none absolute inset-0 z-0 bg-gradient-to-t to-transparent" />
            <div className="from-ink-900/80 pointer-events-none absolute inset-0 z-0 bg-gradient-to-r to-transparent via-transparent" />
            {/* Warm amber glow */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 z-0 h-[60%] w-[70%]"
                style={{
                    background:
                        'radial-gradient(ellipse at bottom left, rgba(217,159,96,0.15) 0%, transparent 65%)',
                }}
            />

            {/* ── CONTENT ── */}
            <div className="relative z-10 flex h-full min-h-[100svh] flex-col justify-between px-6 py-24 sm:px-10">

                {/* Section label */}
                <div className="mx-auto w-full max-w-[1200px]">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
                            {locale === 'id'
                                ? 'Kegiatan & Kunjungan'
                                : 'Activities & Visits'}
                        </span>
                    </div>
                    <h2 className="font-display text-surface-0 mt-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                        {locale === 'id'
                            ? 'Sorotan & Kunjungan Industri'
                            : 'Highlights & Industry Visits'}
                    </h2>
                </div>

                {/* Carousel strip — full-width peek */}
                <div className="mt-10 w-full flex-1 flex flex-col justify-end">
                    <div
                        className="overflow-hidden"
                        ref={emblaRef}
                        style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
                    >
                        <div className="flex" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                            {featured.map((item, index) => {
                                const title =
                                    locale === 'id'
                                        ? item.title_id
                                        : item.title_en;
                                const coverImg =
                                    item.cover ||
                                    ACTIVITY_IMAGES[item.slug] ||
                                    DEFAULT_BG;
                                const isActive = index === selectedIndex;
                                const typeLabel =
                                    TYPE_LABELS[item.type]?.[locale as 'id' | 'en'] || item.type;

                                return (
                                    <div
                                        key={item.id}
                                        className="relative flex-none pr-4 transition-all duration-700"
                                        style={{
                                            width: 'min(78vw, 900px)',
                                            opacity: isActive ? 1 : 0.45,
                                            transform: isActive
                                                ? 'scale(1)'
                                                : 'scale(0.97)',
                                        }}
                                    >
                                        <div
                                            className="relative overflow-hidden"
                                            style={{
                                                aspectRatio: '16/9',
                                                borderRadius: '0px',
                                            }}
                                        >
                                            <img
                                                src={coverImg}
                                                alt={title}
                                                className={`absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ${isActive ? 'scale-105' : 'scale-100'}`}
                                            />
                                            <div className="from-ink-900/95 via-ink-900/40 absolute inset-0 bg-gradient-to-t to-transparent" />

                                            {/* Card content */}
                                            <div className="text-surface-0 absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8 md:p-10">
                                                <div className="flex-1">
                                                    {/* Type + date row */}
                                                    <div className="mb-3 flex items-center gap-3">
                                                        <span className="text-ink-900 rounded-none bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold tracking-widest uppercase">
                                                            {typeLabel}
                                                        </span>
                                                        <span className="text-surface-0/60 text-xs font-medium">
                                                            {new Date(
                                                                item.date,
                                                            ).toLocaleDateString(
                                                                locale === 'id'
                                                                    ? 'id-ID'
                                                                    : 'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-display max-w-2xl text-xl leading-tight font-bold sm:text-2xl md:text-3xl">
                                                        {title}
                                                    </h3>
                                                </div>

                                                {isActive && (
                                                    <div className="shrink-0">
                                                        <Button
                                                            href={`/berita/${item.slug}`}
                                                            variant="primary"
                                                        >
                                                            {t({
                                                                id: 'Lihat Detail',
                                                                en: 'View Details',
                                                            })}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom controls row */}
                    <div className="mx-auto mt-6 flex w-full max-w-[1200px] items-center justify-between px-6 sm:px-0">
                        {/* Progress bars */}
                        <div className="flex flex-1 items-center gap-2 pr-6">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => scrollTo(index)}
                                    className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/20"
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <span
                                        className={`absolute inset-y-0 left-0 rounded-full bg-amber-500 transition-[width] ${
                                            index === selectedIndex
                                                ? `${progressActive ? 'w-full' : 'w-0'} ${isHovered ? 'duration-300' : 'duration-[7000ms] ease-linear'}`
                                                : 'w-0 duration-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Arrow controls */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={scrollPrev}
                                className="border-surface-0/20 bg-surface-0/10 text-surface-0 hover:bg-amber-500 hover:border-amber-500 hover:text-ink-900 flex size-11 items-center justify-center border backdrop-blur-sm transition-all duration-200"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={scrollNext}
                                className="border-surface-0/20 bg-surface-0/10 text-surface-0 hover:bg-amber-500 hover:border-amber-500 hover:text-ink-900 flex size-11 items-center justify-center border backdrop-blur-sm transition-all duration-200"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
