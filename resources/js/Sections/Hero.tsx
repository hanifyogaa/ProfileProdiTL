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
    const { locale, t } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // Typewriter effect state
    const sentences = locale === 'id' ? [
        "Pusat Logistik dan Rantai Pasok Digital Berstandar Internasional.",
        "Profesional Rantai Pasok Berbasis Data dan Teknologi Digital.",
        "Mencetak Wirausaha dan Intrapreneur Bidang Logistik.",
        "Inovasi Rantai Pasok yang Mendukung SDGs."
    ] : [
        "International Standard Center for Digital Logistics and Supply Chain.",
        "Data-Driven and Digital Technology Supply Chain Professionals.",
        "Nurturing Entrepreneurs and Intrapreneurs in the Field of Logistics.",
        "Supply Chain Innovation Supporting SDGs."
    ];

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setTypedText("");
        setIsDeleting(false);
        setCurrentSentenceIndex(0);
    }, [locale]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const currentFullText = sentences[currentSentenceIndex];

        if (isDeleting) {
            timer = setTimeout(() => {
                setTypedText((prev) => prev.slice(0, -1));
            }, 30);
        } else {
            timer = setTimeout(() => {
                setTypedText((prev) => currentFullText.slice(0, prev.length + 1));
            }, 60);
        }

        if (!isDeleting && typedText === currentFullText) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 2500);
        }

        if (isDeleting && typedText === "") {
            setIsDeleting(false);
            setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, currentSentenceIndex, locale]);

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
    // Mid-layer moves at an intermediate speed — creates true 3-layer depth
    const yMid = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : 70],
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

            {/* ── MID LAYER: Floating amber decorative shapes ── */}
            {/* Moves at +50px vs background (+120px) and text (-80px) — true 3-layer depth */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-[11]"
                style={{ y: yMid }}
                aria-hidden="true"
            >
                {/* Large soft amber orb — upper-left */}
                <div
                    className="absolute left-[5%] top-[10%] size-80 rounded-full opacity-[0.22]"
                    style={{
                        background:
                            'radial-gradient(circle at 40% 40%, #D99F60 0%, transparent 60%)',
                    }}
                />
                {/* Medium orb — lower-right */}
                <div
                    className="absolute right-[8%] bottom-[18%] size-56 rounded-full opacity-[0.18]"
                    style={{
                        background:
                            'radial-gradient(circle, #C08A4C 0%, transparent 65%)',
                    }}
                />
                {/* Small accent orb — mid-screen */}
                <div
                    className="absolute left-[55%] top-[30%] size-32 rounded-full opacity-[0.14]"
                    style={{
                        background:
                            'radial-gradient(circle, #8C6441 0%, transparent 70%)',
                    }}
                />
                {/* Diagonal amber line — brand texture */}
                <div
                    className="absolute left-[28%] top-[42%] h-px w-64 opacity-[0.28]"
                    style={{
                        background:
                            'linear-gradient(to right, transparent, #D99F60 40%, #D99F60 60%, transparent)',
                        transform: 'rotate(-12deg)',
                    }}
                />
                {/* Second thinner line — rhythm */}
                <div
                    className="absolute left-[30%] top-[46%] h-px w-36 opacity-[0.16]"
                    style={{
                        background:
                            'linear-gradient(to right, transparent, #AC9587, transparent)',
                        transform: 'rotate(-12deg)',
                    }}
                />
            </motion.div>

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
                        {/* Main heading */}
                        <h1 className="font-display text-surface-0 text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] font-bold min-h-[180px] sm:min-h-[150px] md:min-h-[130px] lg:min-h-[115px]">
                            <span>{typedText}</span>
                            <span className="ml-1 inline-block w-[3px] h-[0.85em] bg-amber-500 animate-pulse align-middle" style={{ animationDuration: '0.8s' }} />
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
