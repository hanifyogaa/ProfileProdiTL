import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatItem {
    id: number;
    metric: string;
    value: string;
    label_id: string;
    label_en: string;
}

function StatCounter({ value }: { value: string }) {
    const shouldReduceMotion = useReducedMotion();
    const spanRef = useRef<HTMLSpanElement>(null);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const match = value.match(/^(\d+)(.*)$/);
    const animatedRef = useRef(false);

    useEffect(() => {
        if (!inView || animatedRef.current || !match || !spanRef.current) {
            return;
        }

        animatedRef.current = true;
        const target = Number(match[1]);

        if (shouldReduceMotion) {
            spanRef.current.textContent = value;
            return;
        }

        const controls = animate(0, target, {
            duration: 1.6,
            ease: 'easeOut',
            onUpdate: (latest) => {
                if (spanRef.current) {
                    spanRef.current.textContent = `${Math.round(latest)}${match[2]}`;
                }
            },
        });

        return () => controls.stop();
    }, [inView, match, shouldReduceMotion, value]);

    if (!match) {
        return <span ref={ref}>{value}</span>;
    }

    return (
        <span ref={ref}>
            <span ref={spanRef}>0{match[2]}</span>
        </span>
    );
}

export function StatsStrip({ stats: _stats }: { stats: StatItem[] }) {
    const { locale } = useLocale();

    const displayStats = [
        {
            id: 1,
            metric: 'lecturer_count',
            value: '14',
            label_id: 'Dosen',
            label_en: 'Lecturers',
        },
        {
            id: 2,
            metric: 'active_students',
            value: '457',
            label_id: 'Mahasiswa',
            label_en: 'Students',
        },
        {
            id: 3,
            metric: 'alumni',
            value: '200+',
            label_id: 'Lulusan',
            label_en: 'Graduates',
        },
    ];

    return (
        <section
            className="relative overflow-hidden py-14 sm:py-20"
        >
            {/* Base fill — 10% opaque (90% transparent) brown */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'rgba(110,78,51,0.10)' }}
                aria-hidden="true"
            />

            {/* Left shading — fades in from edge */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{
                    background: 'linear-gradient(to right, rgba(110,78,51,0.28) 0%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            {/* Right shading — fades in from edge */}
            <div
                className="pointer-events-none absolute inset-y-0 right-0 w-1/3"
                style={{
                    background: 'linear-gradient(to left, rgba(110,78,51,0.28) 0%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            {/* Top & bottom edge fade */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-12"
                style={{ background: 'linear-gradient(to bottom, rgba(110,78,51,0.18), transparent)' }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                style={{ background: 'linear-gradient(to top, rgba(110,78,51,0.18), transparent)' }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-[1000px] px-6">
                <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 sm:gap-x-24">
                    {displayStats.map((stat, index) => (
                        <Reveal key={stat.id} delay={index * 0.12} variant="zoom-in">
                            <div className="flex flex-col items-center text-center min-w-[160px]">
                                <div
                                    className="font-display text-4xl font-semibold sm:text-5xl"
                                    style={{ color: '#8C6441' }}
                                >
                                    <StatCounter value={stat.value} />
                                </div>
                                <div className="mt-3 h-[2px] w-8 rounded-full bg-amber-500/60" />
                                <p
                                    className="mt-4 text-xs font-semibold tracking-[0.15em] uppercase sm:text-sm"
                                    style={{ color: 'rgba(110,78,51,0.65)' }}
                                >
                                    {locale === 'id' ? stat.label_id : stat.label_en}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
