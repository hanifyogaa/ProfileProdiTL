import { Reveal } from '@/components/Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

// ─── Pill Label ───────────────────────────────────────────────────────────────

export function PillLabel({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}
        >
            {children}
        </span>
    );
}

// ─── Dark Section Band ────────────────────────────────────────────────────────

export function DarkBand({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <>
            {/* Bridge into dark */}
            <div className="h-6" style={{ background: 'linear-gradient(to bottom, #FFFDFB, #24141F)' }} />
            <section style={{ background: '#24141F' }} className={`py-20 sm:py-28 ${className}`}>
                {children}
            </section>
            {/* Bridge out of dark */}
            <div className="h-6" style={{ background: 'linear-gradient(to bottom, #24141F, #FFFDFB)' }} />
        </>
    );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

interface StatItemType {
    value: string;
    label: string;
}

export function StatsRow({ stats, dark = false }: { stats: StatItemType[]; dark?: boolean }) {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${dark ? '' : ''}`}>
            {stats.map((s, i) => (
                <React.Fragment key={i}>
                    <div className="text-center">
                        <div
                            className="font-display text-4xl font-bold"
                            style={{ color: dark ? '#D99F60' : '#8C6441' }}
                        >
                            {s.value}
                        </div>
                        <div
                            className="mt-1 text-xs font-semibold uppercase tracking-widest"
                            style={{ color: dark ? 'rgba(172,149,135,0.85)' : '#505666' }}
                        >
                            {s.label}
                        </div>
                    </div>
                    {i < stats.length - 1 && (
                        <div
                            className="hidden sm:block h-10 w-px"
                            style={{ background: dark ? 'rgba(172,149,135,0.25)' : 'rgba(172,149,135,0.4)' }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// ─── Hero Cinematic (Level 1) ─────────────────────────────────────────────────

interface PageHeroProps {
    /** Short text above H1 — shown as pill label */
    pillLabel: string;
    /** Page title */
    title: string;
    /** Optional subtitle */
    subtitle?: string;
    /** Hero background photo URL */
    photoUrl: string;
    photoAlt?: string;
    /** Optional stats rendered below subtitle */
    stats?: StatItemType[];
    /** Extra content (e.g. filter pills) rendered at the bottom of hero area */
    children?: React.ReactNode;
}

export function PageHero({ pillLabel, title, subtitle, photoUrl, photoAlt, stats, children }: PageHeroProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[56vh] items-end overflow-hidden"
            style={{ background: '#24141F' }}
        >
            {/* Layer 1 — parallax background photo */}
            <motion.div className="absolute inset-0" style={{ y: yBg }}>
                <img
                    src={photoUrl}
                    alt={photoAlt ?? title}
                    className="size-full object-cover"
                    style={{ opacity: 0.38 }}
                    fetchPriority="high"
                />
            </motion.div>

            {/* Layer 2 — gradient scrim */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.55) 55%, rgba(36,20,31,0.18) 100%)',
                }}
            />

            {/* Layer 3 — fade bottom edge to page background */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{
                background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)',
            }} />

            {/* Amber left accent bar */}
            <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

            {/* Layer 4 — content */}
            <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40">
                <Reveal variant="fade-up">
                    <PillLabel>{pillLabel}</PillLabel>
                    <h1
                        className="font-display mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                        style={{ color: '#FFFDFB' }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
                            style={{ color: 'rgba(172,149,135,0.90)' }}
                        >
                            {subtitle}
                        </p>
                    )}
                </Reveal>

                {stats && stats.length > 0 && (
                    <Reveal delay={0.15} variant="fade-up">
                        <div className="mt-12 pt-10 border-t" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                            <StatsRow stats={stats} dark />
                        </div>
                    </Reveal>
                )}

                {children && (
                    <div className="mt-8">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── Hero Split (Level 1.5) ───────────────────────────────────────────────────

interface PageHeroSplitProps {
    pillLabel: string;
    title: string;
    subtitle?: string;
    photoUrl: string;
    photoAlt?: string;
    stats?: StatItemType[];
    children?: React.ReactNode;
}

export function PageHeroSplit({ pillLabel, title, subtitle, photoUrl, photoAlt, stats, children }: PageHeroSplitProps) {
    return (
        <div className="mx-auto max-w-[1100px] px-6 pt-32 pb-16">
            <div className="grid grid-cols-12 gap-8 items-center">
                {/* Text — 7 cols */}
                <div className="col-span-12 md:col-span-7">
                    <Reveal variant="fade-right">
                        <PillLabel>{pillLabel}</PillLabel>
                        <h1
                            className="font-display mt-3 text-4xl font-bold leading-tight sm:text-5xl"
                            style={{ color: '#24141F' }}
                        >
                            {title}
                        </h1>
                        {subtitle && (
                            <p
                                className="mt-5 max-w-xl text-base leading-relaxed"
                                style={{ color: '#505666' }}
                            >
                                {subtitle}
                            </p>
                        )}
                        {children}
                    </Reveal>

                    {stats && stats.length > 0 && (
                        <Reveal delay={0.15} variant="fade-up">
                            <div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(172,149,135,0.30)' }}>
                                <StatsRow stats={stats} dark={false} />
                            </div>
                        </Reveal>
                    )}
                </div>

                {/* Photo — 5 cols */}
                <div className="col-span-12 md:col-span-5">
                    <Reveal variant="fade-left" delay={0.1}>
                        <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src={photoUrl}
                                alt={photoAlt ?? title}
                                className="size-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
