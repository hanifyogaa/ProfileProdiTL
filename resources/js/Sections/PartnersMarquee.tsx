import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

interface PartnerItem {
    id: number;
    name: string;
    logo: string | null;
    url: string | null;
    type: 'industry' | 'academic';
}

export function PartnersMarquee({ partners }: { partners: PartnerItem[] }) {
    const { locale, t } = useLocale();
    const shouldReduceMotion = useReducedMotion();
    const [paused, setPaused] = useState(false);

    if (!partners || partners.length === 0) {
        return null;
    }

    // Duplicate list of partners to create a seamless infinite loop in the marquee
    const marqueeItems = [...partners, ...partners, ...partners, ...partners];
    const isPlaying = !paused && !shouldReduceMotion;

    return (
        <section className="bg-surface-0 overflow-hidden py-20">
            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    display: flex;
                    width: max-content;
                }
                .marquee-container.is-playing {
                    animation: marquee-scroll 35s linear infinite;
                }
                .marquee-container.is-playing:hover {
                    animation-play-state: paused;
                }
                .partner-card {
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .partner-card:hover {
                    transform: perspective(800px) rotateY(0deg) translateZ(12px) scale(1.04) !important;
                }
            `}</style>

            <div className="mx-auto max-w-[1200px] px-6 text-center">
                <Reveal>
                    <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                        {locale === 'id'
                            ? 'Dipercaya oleh Industri & Mitra Akademik'
                            : 'Trusted by Leading Industry & Academic Partners'}
                    </h2>
                    <p className="text-navy-700 mx-auto mt-4 max-w-2xl text-base">
                        {locale === 'id'
                            ? 'Kami bekerja sama dengan berbagai BUMN, logistik multinasional, dan universitas global untuk riset dan magang.'
                            : 'We collaborate with state-owned enterprises, multinational logistics giants, and global universities for research and internships.'}
                    </p>
                </Reveal>
            </div>

            {/* Marquee viewport — perspective fan, light theme */}
            <div
                className="relative mt-16 w-full overflow-hidden py-10"
                style={{ perspective: '1200px' }}
            >
                {/* Scrims to fade edges */}
                <div className="from-surface-0 via-surface-0/60 pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r to-transparent sm:w-40" />
                <div className="from-surface-0 via-surface-0/60 pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l to-transparent sm:w-40" />

                <div
                    className={`marquee-container gap-6 ${isPlaying ? 'is-playing' : ''}`}
                >
                    {marqueeItems.map((partner, index) => {
                        // Fan tilt based on position within each group of 4 visible-ish cards
                        const tiltStep = index % 4;
                        const rotateY =
                            tiltStep === 0
                                ? 10
                                : tiltStep === 1
                                  ? 4
                                  : tiltStep === 2
                                    ? -4
                                    : -10;

                        return (
                            <div
                                key={`${partner.id}-${index}`}
                                className="partner-card border-cream-300/30 bg-surface-0 text-navy-700/60 flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border px-8 text-sm font-semibold tracking-wider uppercase shadow-[0_10px_28px_-12px_rgba(36,20,31,0.14)] select-none"
                                style={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              transform: `perspective(800px) rotateY(${rotateY}deg)`,
                                          }
                                }
                            >
                                {partner.logo ? (
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-8 max-w-[120px] object-contain grayscale filter transition-all hover:grayscale-0"
                                    />
                                ) : (
                                    <span>{partner.name}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Pause / play toggle */}
                {!shouldReduceMotion && (
                    <button
                        type="button"
                        onClick={() => setPaused((p) => !p)}
                        aria-label={paused ? 'Play marquee' : 'Pause marquee'}
                        className="border-cream-300/40 bg-surface-0 text-brand-700 hover:bg-brand-700 hover:text-surface-0 absolute bottom-0 left-6 z-20 flex size-9 items-center justify-center rounded-full border shadow-[0_4px_16px_-6px_rgba(36,20,31,0.18)] transition-colors"
                    >
                        {paused ? (
                            <Play className="size-3.5" />
                        ) : (
                            <Pause className="size-3.5" />
                        )}
                    </button>
                )}
            </div>

            <div className="mt-10 text-center">
                <Reveal delay={0.2}>
                    <a
                        href="/kemitraan"
                        className="text-brand-700 text-sm font-semibold hover:underline"
                    >
                        {t({
                            id: 'Lihat seluruh jejaring mitra →',
                            en: 'Explore our partner network →',
                        })}
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
