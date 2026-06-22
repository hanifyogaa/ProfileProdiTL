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

export function StatsStrip({ stats }: { stats: StatItem[] }) {
    const { locale } = useLocale();

    return (
        <section className="bg-surface-0 py-12 sm:py-16">
            <div className="mx-auto max-w-[1200px] px-6">
                <Reveal>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="font-display text-brand-800 text-4xl font-semibold sm:text-5xl">
                                    <StatCounter value={stat.value} />
                                </div>
                                {/* Precise amber-500 underline rule */}
                                <div className="mt-2.5 h-[3px] w-6 rounded-full bg-amber-500" />
                                <p className="text-navy-700 mt-4 text-xs font-semibold tracking-wider uppercase sm:text-sm">
                                    {locale === 'id'
                                        ? stat.label_id
                                        : stat.label_en}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
