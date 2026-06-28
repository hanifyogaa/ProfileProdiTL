import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, GraduationCap, Target } from 'lucide-react';
import { useRef, useState } from 'react';

interface CloCourse {
    id: number;
    code: string;
    name_id: string;
    name_en: string;
}

interface CloItem {
    id: number;
    code: string;
    description_id: string;
    description_en: string;
    course: CloCourse;
}

interface PloItem {
    id: number;
    code: string;
    description_id: string;
    description_en: string;
    clos: CloItem[];
}

const HERO_BG = 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=85&w=1920';

export default function LearningOutcomes({ plos }: { plos?: PloItem[] }) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const [openId, setOpenId] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const data = plos ?? [];
    const title = l === 'id' ? 'Capaian Pembelajaran' : 'Learning Outcomes';

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[52vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.30 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.55) 55%, rgba(36,20,31,0.18) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[820px] px-6 pb-14 pt-40 text-center" style={shouldReduceMotion ? {} : { y: yText }}>
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                            <Target className="size-3.5" />
                            PLO &amp; CLO
                        </span>
                        <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                            {l === 'id'
                                ? 'Program Learning Outcomes (PLO) yang harus dicapai mahasiswa, dan mata kuliah (Course Learning Outcomes / CLO) yang mendukung setiap PLO.'
                                : 'Program Learning Outcomes (PLO) students must achieve, and the courses (Course Learning Outcomes / CLO) supporting each PLO.'}
                        </p>
                    </Reveal>
                </motion.div>
            </section>

            {/* ── CONTENT ── */}
            <div className="mx-auto max-w-[820px] px-6 py-12">
                {data.length === 0 ? (
                    <Reveal>
                        <p className="rounded-2xl border border-dashed py-12 text-center text-sm" style={{ borderColor: 'rgba(172,149,135,0.30)', color: '#505666' }}>
                            -
                        </p>
                    </Reveal>
                ) : (
                    <div className="flex flex-col gap-3">
                        {data.map((plo, index) => {
                            const isOpen = openId === plo.id;
                            const description = l === 'id' ? plo.description_id : plo.description_en;

                            const grouped = plo.clos.reduce<Record<string, { course: CloCourse; clos: CloItem[] }>>((acc, clo) => {
                                const key = clo.course.code;
                                if (!acc[key]) acc[key] = { course: clo.course, clos: [] };
                                acc[key].clos.push(clo);
                                return acc;
                            }, {});
                            const groups = Object.values(grouped);

                            return (
                                <Reveal key={plo.id} delay={index * 0.06} variant="fade-up">
                                    <div
                                        className="overflow-hidden rounded-2xl border transition-shadow"
                                        style={{
                                            borderColor: isOpen ? 'rgba(140,100,65,0.30)' : 'rgba(172,149,135,0.20)',
                                            background: '#FFFDFB',
                                            boxShadow: isOpen ? '0 4px 20px -4px rgba(140,100,65,0.14)' : undefined,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenId(isOpen ? null : plo.id)}
                                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold"
                                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#8C6441' }}>
                                                    {plo.code}
                                                </span>
                                                <span className="font-display text-ink-900 text-base font-semibold leading-snug">
                                                    {description}
                                                </span>
                                            </div>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="shrink-0"
                                            >
                                                <ChevronDown className="size-5" style={{ color: '#8C6441' }} />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.24, ease: 'easeInOut' }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div
                                                        className="px-6 pb-5 pt-3 space-y-4"
                                                        style={{ borderTop: '1px solid rgba(172,149,135,0.15)' }}
                                                    >
                                                        {groups.length === 0 ? (
                                                            <p className="text-sm italic" style={{ color: '#505666' }}>
                                                                -
                                                            </p>
                                                        ) : (
                                                            groups.map(({ course, clos: courseClos }) => (
                                                                <div key={course.id} className="flex gap-3">
                                                                    <span className="mt-0.5 shrink-0">
                                                                        <GraduationCap className="size-4" style={{ color: '#AC9587' }} />
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-sm font-semibold" style={{ color: '#24141F' }}>
                                                                            {course.code} — {l === 'id' ? course.name_id : course.name_en}
                                                                        </p>
                                                                        <ul className="mt-1 space-y-1">
                                                                            {courseClos.map((clo) => (
                                                                                <li key={clo.id} className="text-sm leading-relaxed" style={{ color: '#505666' }}>
                                                                                    <span className="font-semibold" style={{ color: '#8C6441' }}>{clo.code}: </span>
                                                                                    {l === 'id' ? clo.description_id : clo.description_en}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
