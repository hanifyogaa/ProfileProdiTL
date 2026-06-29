import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const AMBIENT_IMAGE =
    'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=1920&h=700';

export function AmbientBand() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);
    const yText = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -30]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ minHeight: '340px' }}
            aria-hidden="true"
        >
            {/* Parallax background image */}
            <motion.div
                className="absolute inset-0 -inset-y-10"
                style={{ y: yBg }}
            >
                <img
                    src={AMBIENT_IMAGE}
                    alt=""
                    className="size-full object-cover object-center"
                    loading="lazy"
                />
            </motion.div>

            {/* Layered overlays — warm amber scrim */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to bottom, #6E4E33 0%, rgba(110,78,51,0.7) 35%, rgba(140,100,65,0.75) 65%, #8C6441 100%)',
                }}
            />
            {/* Subtle vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 30%, rgba(36,20,31,0.35) 100%)',
                }}
            />

            {/* Decorative horizontal lines — brand texture */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-3 opacity-20">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-px w-full"
                        style={{
                            background: 'linear-gradient(to right, transparent 5%, rgba(217,159,96,0.4) 20%, rgba(217,159,96,0.6) 50%, rgba(217,159,96,0.4) 80%, transparent 95%)',
                            opacity: 1 - i * 0.12,
                        }}
                    />
                ))}
            </div>

            {/* Content — centered mission statement */}
            <motion.div
                ref={inViewRef}
                className="relative z-10 flex min-h-[340px] flex-col items-center justify-center px-6 py-20 text-center"
                style={{ y: yText }}
            >
                <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 48 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Decorative element */}
                    <div className="mb-6 flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-amber-400/60" />
                        <div className="size-1.5 rounded-full bg-amber-400/60" />
                        <div className="h-px w-16 bg-amber-400/60" />
                    </div>

                    {/* Mission quote */}
                    <p
                        className="font-display mx-auto max-w-3xl text-2xl leading-snug font-medium italic sm:text-3xl lg:text-[2rem]"
                        style={{ color: 'rgba(255,253,251,0.92)' }}
                    >
                        "Membangun ahli logistik masa depan yang menguasai
                        rantai pasok digital dan memberi dampak nyata bagi industri Indonesia."
                    </p>

                    {/* Bottom decorative */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-amber-400/40" />
                        <span
                            className="text-xs font-bold tracking-[0.22em] uppercase"
                            style={{ color: 'rgba(172,149,135,0.75)' }}
                        >
                            Teknik Logistik · Telkom University
                        </span>
                        <div className="h-px w-8 bg-amber-400/40" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
