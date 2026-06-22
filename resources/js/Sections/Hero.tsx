import { Button } from '@/components/Button';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface HeroData {
    eyebrow: Bilingual;
    title: Bilingual;
    subtitle: Bilingual;
    image: string | null;
    primary_cta: { label: Bilingual; href: string };
    secondary_cta: { label: Bilingual; href: string };
}

// Logistics-themed hero images
const HERO_SLIDES = [
    {
        src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1920&h=1080',
        alt: 'Logistics warehouse operations',
    },
    {
        src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=85&w=1920&h=1080',
        alt: 'Supply chain management',
    },
    {
        src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=85&w=1920&h=1080',
        alt: 'Digital logistics technology',
    },
];

// Animated floating number/metric component
function FloatingMetric({
    value,
    label,
    delay,
    position,
}: {
    value: string;
    label: string;
    delay: number;
    position: string;
}) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            className={`absolute ${position} z-20 hidden lg:block`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
        >
            <div className="bg-surface-0/10 border-surface-0/20 backdrop-blur-sm rounded-2xl border px-5 py-3">
                <div className="font-display text-surface-0 text-2xl font-bold leading-none">
                    {value}
                </div>
                <div className="text-surface-0/70 mt-1 text-xs font-medium tracking-wider uppercase">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

export function Hero({ hero }: { hero: HeroData }) {
    const { t } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // Track scroll progress of the hero section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const yText = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : -80],
    );
    const yBg = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : 120],
    );
    const scaleOverlay = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    // Auto-advance slides
    useEffect(() => {
        setLoaded(true);
        if (shouldReduceMotion) return;
        const timer = setInterval(() => {
            setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [shouldReduceMotion]);

    const currentSlide = HERO_SLIDES[slideIndex];

    return (
        <section
            ref={ref}
            className="relative h-[100svh] min-h-[640px] overflow-hidden"
        >
            {/* ── BACKGROUND SLIDESHOW ── */}
            {HERO_SLIDES.map((slide, i) => (
                <motion.div
                    key={slide.src}
                    className="absolute inset-0"
                    style={{ y: i === slideIndex ? yBg : 0 }}
                    animate={{ opacity: i === slideIndex ? 1 : 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                >
                    <img
                        src={slide.src}
                        alt={slide.alt}
                        className="size-full object-cover"
                        fetchPriority={i === 0 ? 'high' : 'low'}
                    />
                </motion.div>
            ))}

            {/* ── CINEMATIC OVERLAYS ── */}
            {/* Dark gradient from bottom */}
            <div className="from-ink-900/95 via-ink-900/60 pointer-events-none absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
            {/* Dark gradient from left for text contrast */}
            <div className="from-ink-900/80 pointer-events-none absolute inset-0 z-10 bg-gradient-to-r to-transparent via-transparent" />
            {/* Subtle warm amber tint at bottom-left */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 z-10 h-[50%] w-[60%]"
                style={{
                    background:
                        'radial-gradient(ellipse at bottom left, rgba(217,159,96,0.18) 0%, transparent 70%)',
                }}
            />

            {/* ── AMBER GEOMETRIC ACCENT (top-right) ── */}
            <div
                className="pointer-events-none absolute top-0 right-0 z-20 h-[280px] w-[280px] opacity-80"
                style={{
                    background:
                        'linear-gradient(225deg, rgba(217,159,96,0.35) 0%, transparent 60%)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
            />
            <div
                className="pointer-events-none absolute top-0 right-0 z-20 h-[140px] w-[140px]"
                style={{
                    background: 'rgba(217,159,96,0.6)',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
            />

            {/* ── SLIDE INDICATORS ── */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIndex(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-[3px] rounded-full transition-all duration-500 ${
                            i === slideIndex
                                ? 'w-8 bg-amber-500'
                                : 'bg-surface-0/40 w-4'
                        }`}
                    />
                ))}
            </div>

            {/* ── FLOATING METRICS ── */}
            <FloatingMetric
                value="4,200+"
                label="Alumni"
                delay={1.2}
                position="right-24 top-[28%]"
            />
            <FloatingMetric
                value="95%"
                label="Absorption Rate"
                delay={1.5}
                position="right-10 top-[45%]"
            />

            {/* ── MAIN TEXT CONTENT ── */}
            <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-end"
                style={{ y: yText }}
            >
                <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 sm:pb-28">
                    <motion.div
                        initial={
                            shouldReduceMotion ? {} : { opacity: 0, y: 30 }
                        }
                        animate={
                            loaded
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                    >
                        {/* Eyebrow label */}
                        <div className="mb-5 flex items-center gap-3">
                            <div className="h-px w-10 bg-amber-500" />
                            <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
                                Telkom University · FRI
                            </span>
                        </div>

                        {/* Main heading */}
                        <h1 className="font-display text-surface-0 text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] font-bold">
                            {t(hero.title)}
                        </h1>

                        {/* Amber underline stroke */}
                        <div className="mt-5 h-[3px] w-20 bg-amber-500" />

                        {/* Subtitle */}
                        <p className="text-surface-0/75 mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                            {t(hero.subtitle)}
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href={hero.primary_cta.href}
                                className="inline-flex items-center gap-2 rounded-none bg-amber-500 px-7 py-3.5 text-sm font-bold tracking-wide text-ink-900 transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_8px_24px_-6px_rgba(217,159,96,0.6)]"
                                style={{
                                    clipPath:
                                        'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                                }}
                            >
                                {t(hero.primary_cta.label)}
                                <span className="ml-1">→</span>
                            </a>
                            <a
                                href={hero.secondary_cta.href}
                                className="text-surface-0/90 hover:text-surface-0 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-sm font-semibold transition-all hover:border-white/70"
                            >
                                {t(hero.secondary_cta.label)}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── SCROLL INDICATOR ── */}
            <motion.div
                className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={shouldReduceMotion ? {} : { opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-surface-0/40 text-[10px] font-medium tracking-[0.2em] uppercase">
                        Scroll
                    </span>
                    <motion.div
                        className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent"
                        animate={
                            shouldReduceMotion
                                ? {}
                                : {
                                      scaleY: [0, 1, 0],
                                      transformOrigin: 'top',
                                  }
                        }
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
