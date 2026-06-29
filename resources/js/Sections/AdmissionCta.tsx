import { useLocale } from '@/contexts/LocaleContext';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

function CtaContent() {
    const { locale, t } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="relative z-10 mx-auto max-w-[760px] px-6 text-center"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-surface-0/50" />
                <span className="text-surface-0/70 text-xs font-bold tracking-[0.22em] uppercase">
                    {locale === 'id' ? 'Penerimaan Mahasiswa Baru' : 'Admissions Open'}
                </span>
                <div className="h-px w-8 bg-surface-0/50" />
            </div>

            {/* Heading */}
            <h2 className="font-display text-surface-0 text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.75rem]">
                {locale === 'id'
                    ? 'Siap Menjadi Ahli Logistik Masa Depan?'
                    : 'Ready to Become a Future Logistics Engineer?'}
            </h2>

            {/* Amber rule — visual anchor */}
            <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-amber-300/60" />

            {/* Subtext */}
            <p className="text-surface-0/80 mx-auto mt-6 max-w-lg text-base leading-relaxed sm:text-lg">
                {locale === 'id'
                    ? 'Bergabunglah di Prodi Teknik Logistik Telkom University — kuasai rantai pasok digital dan buka karier global.'
                    : 'Join Logistics Engineering at Telkom University — master digital supply chains and unlock a global career.'}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {/* Primary: white pill on amber bg */}
                <a
                    href="https://smb.telkomuniversity.ac.id/"
                    className="inline-flex items-center gap-2 rounded-none bg-surface-0 px-8 py-4 text-sm font-bold tracking-wide text-brand-800 transition-all duration-200 hover:bg-surface-50 hover:shadow-[0_8px_28px_-8px_rgba(36,20,31,0.4)]"
                    style={{
                        clipPath:
                            'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                    }}
                >
                    {t({ id: 'Daftar Sekarang', en: 'Apply Now' })}
                    <span aria-hidden="true">→</span>
                </a>

                {/* Secondary: ghost underline */}
                <a
                    href="/kontak"
                    className="text-surface-0/85 hover:text-surface-0 inline-flex items-center gap-1.5 border-b border-white/35 pb-0.5 text-sm font-semibold transition-all hover:border-white/75"
                >
                    {t({ id: 'Hubungi Kami', en: 'Contact Us' })}
                </a>
            </div>
        </motion.div>
    );
}

export function AdmissionCta() {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Background parallax: shifts up slightly as section scrolls into view
    const yBg = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : -50],
    );

    // Decorative circle drifts opposite direction for depth
    const yDecor = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : 30],
    );

    return (
        <section
            ref={ref}
            className="relative overflow-hidden py-24 sm:py-32"
            aria-labelledby="cta-heading"
        >
            {/* ── PARALLAX AMBER GRADIENT BACKGROUND ── */}
            <motion.div
                className="absolute inset-0 origin-center"
                style={{ y: yBg }}
            >
                {/* Main amber gradient — Nawasena Sancaya brand */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(135deg, #D99F60 0%, #C08A4C 40%, #8C6441 80%, #6E4E33 100%)',
                    }}
                />
                {/* Warm noise texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                        backgroundSize: '300px 300px',
                    }}
                />
            </motion.div>

            {/* ── PARALLAX DECORATIVE ELEMENTS ── */}
            {/* Top-right soft circle */}
            <motion.div
                className="pointer-events-none absolute -top-16 -right-16 size-72 rounded-full opacity-20"
                style={{
                    y: yDecor,
                    background:
                        'radial-gradient(circle, rgba(255,253,251,0.5) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />
            {/* Bottom-left triangle motif (echoing hero accent) */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 size-52 opacity-15"
                style={{
                    background: '#6E4E33',
                    clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
                }}
                aria-hidden="true"
            />
            {/* Thin amber line — horizontal rule motif */}
            <div
                className="pointer-events-none absolute top-8 left-1/2 h-px w-[120px] -translate-x-1/2 opacity-30"
                style={{
                    background:
                        'linear-gradient(to right, transparent, rgba(255,253,251,0.8), transparent)',
                }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute bottom-8 left-1/2 h-px w-[120px] -translate-x-1/2 opacity-30"
                style={{
                    background:
                        'linear-gradient(to right, transparent, rgba(255,253,251,0.8), transparent)',
                }}
                aria-hidden="true"
            />

            {/* ── CONTENT ── */}
            <CtaContent />
        </section>
    );
}
