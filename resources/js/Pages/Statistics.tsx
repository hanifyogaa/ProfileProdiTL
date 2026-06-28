import { MainLayout } from '@/Layouts/MainLayout';
import { TracerChart } from '@/Sections/TracerChart';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
    Award,
    BarChart2,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    Clock,
    FlaskConical,
    GraduationCap,
    Hash,
    ScrollText,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface StatItem {
    id: number;
    metric: string;
    value: string;
    label_id: string;
    label_en: string;
}

interface StatisticsProps {
    tracerStats: any;
    stats: StatItem[];
}

const HERO_BG =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920';

/* Map DB metric keys → icon + accent color */
const METRIC_CONFIG: Record<string, { Icon: React.ElementType; accent: string; bg: string; label?: { id: string; en: string } }> = {
    // Metric keys dari DB
    active_students:   { Icon: Users,            accent: '#D99F60', bg: 'rgba(217,159,96,0.14)' },
    alumni:            { Icon: GraduationCap,     accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    lecturer_count:    { Icon: BookOpen,          accent: '#AC9587', bg: 'rgba(172,149,135,0.14)' },
    research_count:    { Icon: FlaskConical,      accent: '#C08A4C', bg: 'rgba(192,138,76,0.14)' },
    accreditation:     { Icon: Award,             accent: '#D99F60', bg: 'rgba(217,159,96,0.14)' },
    sks:               { Icon: Hash,              accent: '#AC9587', bg: 'rgba(172,149,135,0.14)' },
    partners:          { Icon: BriefcaseBusiness, accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    employment:        { Icon: TrendingUp,        accent: '#6E9B8C', bg: 'rgba(110,155,140,0.14)' },
    certified_students:{ Icon: ScrollText,        accent: '#C08A4C', bg: 'rgba(192,138,76,0.14)' },
    study_duration:    { Icon: Clock,             accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    // Legacy / old keys
    alumni_count:      { Icon: GraduationCap,     accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    mahasiswa:         { Icon: Users,             accent: '#D99F60', bg: 'rgba(217,159,96,0.14)' },
    dosen:             { Icon: BookOpen,          accent: '#AC9587', bg: 'rgba(172,149,135,0.14)' },
    mitra:             { Icon: BriefcaseBusiness, accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    riset:             { Icon: FlaskConical,      accent: '#C08A4C', bg: 'rgba(192,138,76,0.14)' },
    sertifikasi:       { Icon: ScrollText,        accent: '#D99F60', bg: 'rgba(217,159,96,0.14)' },
    kelulusan:         { Icon: Clock,             accent: '#AC9587', bg: 'rgba(172,149,135,0.14)' },
    akreditasi:        { Icon: Award,             accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
    prestasi:          { Icon: Star,              accent: '#D99F60', bg: 'rgba(217,159,96,0.14)' },
    default:           { Icon: BarChart2,         accent: '#8C6441', bg: 'rgba(140,100,65,0.14)' },
};

/* Homepage top-4 metric keys (matches HomeController) */
const HOME_METRICS = ['active_students', 'alumni', 'lecturer_count', 'research_count'];

/* Keys shown as featured large cards */
const FEATURED_KEYS = ['active_students', 'alumni', 'lecturer_count'];

/* Animated counter that counts up when scrolled into view */
function AnimatedValue({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState('0');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) { setDisplay(value); return; }

        // Extract numeric portion
        const numeric = parseFloat(value.replace(/[^\d.]/g, ''));
        if (isNaN(numeric)) { setDisplay(value); return; }

        const prefix = value.match(/^[^\d]*/)?.[0] ?? '';
        const suffix = value.match(/[^\d.]+$/)?.[0] ?? '';
        const decimals = value.includes('.') ? (value.split('.')[1]?.replace(/[^\d]/g, '').length ?? 0) : 0;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();

            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
                const elapsed = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - elapsed, 3);
                const current = eased * numeric;
                setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
                if (elapsed < 1) requestAnimationFrame(tick);
                else setDisplay(value);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, shouldReduceMotion]);

    return <span ref={ref}>{display}</span>;
}

/* Horizontal progress bar for key metrics */
const PROGRESS_ITEMS = [
    { label: { id: 'Lulusan Terserap < 6 Bulan', en: 'Graduates Employed < 6 Months' }, pct: 92 },
    { label: { id: 'Tingkat Kepuasan Alumni', en: 'Alumni Satisfaction Rate' }, pct: 88 },
    { label: { id: 'Mahasiswa Aktif Berprestasi', en: 'High-Achieving Active Students' }, pct: 75 },
    { label: { id: 'Kerjasama Industri Aktif', en: 'Active Industry Partnerships' }, pct: 85 },
];

function ProgressBar({ pct, accent, delay }: { pct: number; accent: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) { setWidth(pct); return; }
        const observer = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            observer.disconnect();
            setTimeout(() => setWidth(pct), delay * 1000);
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [pct, delay, shouldReduceMotion]);

    return (
        <div ref={ref} className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'rgba(172,149,135,0.15)' }}>
            <div
                className="h-full rounded-full transition-all"
                style={{
                    width: `${width}%`,
                    background: `linear-gradient(to right, ${accent}, ${accent}88)`,
                    transitionDuration: '1200ms',
                    transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                }}
            />
        </div>
    );
}

export default function Statistics({ tracerStats, stats }: StatisticsProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const title    = l === 'id' ? 'Fakta & Statistik' : 'Facts & Statistics';
    const subtitle = l === 'id'
        ? 'Data dan capaian nyata Program Studi Digital Supply Chain Telkom University dalam angka.'
        : 'Real data and achievements of the Digital Supply Chain Program at Telkom University.';

    // Hero band: same 4 metrics shown on Homepage (active_students, alumni, lecturer_count, research_count)
    const heroStats = HOME_METRICS
        .map(key => stats.find(s => s.metric === key))
        .filter(Boolean) as StatItem[];

    // Featured 3 (mahasiswa, alumni, dosen) for dedicated big-card section
    const featuredStats = FEATURED_KEYS
        .map(key => stats.find(s => s.metric === key))
        .filter(Boolean) as StatItem[];

    // Employment rate for progress bar
    const employmentStat = stats.find(s => s.metric === 'employment');
    const employmentPct  = employmentStat ? parseInt(employmentStat.value.replace(/[^\d]/g, ''), 10) : 92;

    return (
        <MainLayout fullHero>
            <Head title={`${title} — Digital Supply Chain`} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[62vh] items-end overflow-hidden" style={{ background: '#18101A' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.22 }} fetchPriority="high" />
                </motion.div>
                {/* Gradient overlays */}
                <div className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(24,16,26,0.97) 0%, rgba(24,16,26,0.50) 55%, rgba(24,16,26,0.15) 100%)' }} />
                {/* Decorative orbs */}
                <div className="pointer-events-none absolute -top-24 -right-24 size-[500px] rounded-full opacity-[0.18]"
                    style={{ background: 'radial-gradient(circle, rgba(217,159,96,0.70) 0%, transparent 70%)', filter: 'blur(70px)' }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(24,16,26,0.5) 30%, #ECEBE9 100%)' }} />
                {/* Gold left line */}
                <div className="absolute left-0 top-0 h-full w-1"
                    style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                            style={{ background: 'rgba(217,159,96,0.12)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                            📊 &nbsp;{l === 'id' ? 'Data & Capaian' : 'Data & Achievements'}&nbsp; ·&nbsp; Telkom University
                        </span>
                        <h1 className="font-display mt-3 text-5xl font-bold leading-tight text-white sm:text-6xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                            {subtitle}
                        </p>
                    </Reveal>
                </motion.div>
            </section>

            {/* ── HERO STATS BAND — same 4 metrics as Homepage ── */}
            <section className="relative border-b" style={{ background: '#24141F', borderColor: 'rgba(172,149,135,0.08)' }}>
                <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(rgba(217,159,96,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-10">
                    <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: 'rgba(172,149,135,0.10)', borderRadius: '1.5rem', overflow: 'hidden' }}>
                        {heroStats.map((s, i) => {
                            const cfg = METRIC_CONFIG[s.metric] ?? METRIC_CONFIG.default;
                            const Icon = cfg.Icon;
                            return (
                                <Reveal key={s.id} delay={i * 0.06}>
                                    <div className="flex flex-col items-center gap-2 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-0.5"
                                        style={{ background: '#24141F' }}>
                                        <div className="flex size-10 items-center justify-center rounded-xl"
                                            style={{ background: cfg.bg, color: cfg.accent }}>
                                            <Icon className="size-4" />
                                        </div>
                                        <span className="font-display text-3xl font-black leading-none" style={{ color: cfg.accent }}>
                                            <AnimatedValue value={s.value} />
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(172,149,135,0.60)' }}>
                                            {l === 'id' ? s.label_id : s.label_en}
                                        </span>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── MAHASISWA · DOSEN · ALUMNI — Featured 3 ── */}
            <section className="py-20 border-b" style={{ background: '#FFFDFB', borderColor: 'rgba(172,149,135,0.10)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12 text-center">
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                style={{ background: 'rgba(217,159,96,0.10)', color: '#C08A4C', border: '1px solid rgba(217,159,96,0.20)' }}>
                                {l === 'id' ? 'Civitas Akademika' : 'Academic Community'}
                            </span>
                            <h2 className="font-display mt-3 text-4xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Mahasiswa, Dosen & Alumni' : 'Students, Faculty & Alumni'}
                            </h2>
                            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Komunitas belajar yang dinamis dengan komposisi mahasiswa aktif, tenaga pengajar profesional, dan alumni yang tersebar luas di industri nasional.'
                                    : 'A dynamic learning community with active students, professional faculty, and alumni spread across the national industry.'}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            {
                                metric: 'active_students',
                                heading: { id: 'Mahasiswa', en: 'Students' },
                                desc: { id: 'Mahasiswa aktif yang sedang menempuh studi S1 Digital Supply Chain di Fakultas Rekayasa Industri, Telkom University.', en: 'Active students currently enrolled in the S1 Digital Supply Chain program at the Faculty of Industrial Engineering, Telkom University.' },
                                highlights: [
                                    { id: 'Program S1 · 8 Semester', en: 'S1 Program · 8 Semesters' },
                                    { id: 'Sistem Fulltime · FRI Telkom', en: 'Full-time · FRI Telkom' },
                                    { id: 'Beasiswa & Non-Beasiswa', en: 'Scholarship & Non-Scholarship' },
                                ],
                            },
                            {
                                metric: 'alumni',
                                heading: { id: 'Lulusan', en: 'Graduates' },
                                desc: { id: 'Lulusan Digital Supply Chain yang berkarir di industri logistik, supply chain, e-commerce, konsultan, dan instansi pemerintahan nasional.', en: 'DSC graduates working in logistics, supply chain, e-commerce, consulting, and government institutions nationwide.' },
                                highlights: [
                                    { id: `${employmentPct}% terserap < 6 bulan`, en: `${employmentPct}% employed < 6 months` },
                                    { id: 'Berkarir di industri nasional', en: 'Working in national industries' },
                                    { id: 'Wirausaha & Profesional', en: 'Entrepreneurs & Professionals' },
                                ],
                            },
                            {
                                metric: 'lecturer_count',
                                heading: { id: 'Dosen', en: 'Lecturers' },
                                desc: { id: 'Dosen tetap berpengalaman dengan spesialisasi di bidang e-logistik, manajemen rantai pasok digital, dan rekayasa industri.', en: 'Experienced full-time lecturers specializing in e-logistics, digital supply chain management, and industrial engineering.' },
                                highlights: [
                                    { id: 'Berkualifikasi S2 & S3', en: 'Master & Doctoral Qualified' },
                                    { id: 'Aktif Riset & Pengabdian', en: 'Active in Research & Service' },
                                    { id: 'Praktisi & Akademisi', en: 'Practitioners & Academics' },
                                ],
                            },
                        ].map((card, i) => {
                            const stat = stats.find(s => s.metric === card.metric);
                            const cfg  = METRIC_CONFIG[card.metric] ?? METRIC_CONFIG.default;
                            const Icon = cfg.Icon;
                            return (
                                <Reveal key={i} delay={i * 0.09}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_48px_-12px_rgba(36,20,31,0.18)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#FFFDFB' }}>
                                        {/* Top coloured strip */}
                                        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${cfg.accent}80, ${cfg.accent}20)` }} />
                                        {/* Hover glow */}
                                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{ background: `radial-gradient(circle at 50% 0%, ${cfg.accent}0A 0%, transparent 60%)` }} />

                                        <div className="flex flex-1 flex-col p-7">
                                            {/* Icon + value */}
                                            <div className="mb-5 flex items-end justify-between">
                                                <div className="flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                                                    style={{ background: cfg.bg, color: cfg.accent }}>
                                                    <Icon className="size-7" />
                                                </div>
                                                {stat && (
                                                    <span className="font-display text-4xl font-black leading-none" style={{ color: cfg.accent }}>
                                                        <AnimatedValue value={stat.value} />
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-display mb-2 text-xl font-bold" style={{ color: '#24141F' }}>
                                                {card.heading[l]}
                                            </h3>
                                            <p className="mb-5 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                                {card.desc[l]}
                                            </p>
                                            {/* Highlights */}
                                            <ul className="mt-auto space-y-2">
                                                {card.highlights.map((h, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-xs" style={{ color: '#505666' }}>
                                                        <CheckCircle2 className="size-3.5 shrink-0" style={{ color: cfg.accent }} />
                                                        {h[l]}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── METRIC CARDS GRID ── */}
            <section className="relative overflow-hidden py-24" style={{ background: '#FFFDFB' }}>
                {/* Faint background pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'radial-gradient(rgba(140,100,65,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-14 flex flex-col items-center text-center">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441', border: '1px solid rgba(140,100,65,0.20)' }}>
                                {l === 'id' ? 'Indikator Kinerja Utama' : 'Key Performance Indicators'}
                            </span>
                            <h2 className="font-display text-4xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Angka Berbicara' : 'The Numbers Speak'}
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Setiap angka merupakan cerminan dari kerja keras, dedikasi, dan komitmen civitas akademika Program Studi Digital Supply Chain.'
                                    : 'Every number reflects the hard work, dedication, and commitment of the Digital Supply Chain Program academic community.'}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, idx) => {
                            const cfg = METRIC_CONFIG[stat.metric] ?? METRIC_CONFIG.default;
                            const Icon = cfg.Icon;
                            return (
                                <Reveal key={stat.id} delay={idx * 0.055} variant="fade-up">
                                    <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border p-8 text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_48px_-12px_rgba(36,20,31,0.18)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        {/* Hover radial glow */}
                                        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{ background: `radial-gradient(circle at 50% 0%, ${cfg.accent}0F 0%, transparent 65%)` }} />
                                        {/* Top accent bar */}
                                        <div className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                                            style={{ background: `linear-gradient(to right, transparent, ${cfg.accent}, transparent)` }} />

                                        <div className="relative mb-5 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                                            style={{ background: cfg.bg, color: cfg.accent }}>
                                            <Icon className="size-6" />
                                        </div>
                                        <span className="font-display relative block text-4xl font-black leading-none" style={{ color: cfg.accent }}>
                                            <AnimatedValue value={stat.value} />
                                        </span>
                                        <div className="relative mt-3 h-px w-8 rounded-full transition-all duration-300 group-hover:w-12"
                                            style={{ background: cfg.accent + '60' }} />
                                        <span className="relative mt-3 block text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: '#505666' }}>
                                            {l === 'id' ? stat.label_id : stat.label_en}
                                        </span>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── PROGRESS BARS SECTION ── */}
            <section className="relative overflow-hidden py-20 border-t" style={{ background: '#FAF9F6', borderColor: 'rgba(172,149,135,0.12)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        {/* Left: title */}
                        <Reveal>
                            <span className="mb-4 inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(217,159,96,0.10)', color: '#C08A4C' }}>
                                {l === 'id' ? 'Performa Program Studi' : 'Program Performance'}
                            </span>
                            <h2 className="font-display text-3xl font-bold leading-snug" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Indikator Kualitas & Relevansi' : 'Quality & Relevance Indicators'}
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Capaian terukur yang mencerminkan kualitas lulusan, kepuasan pemangku kepentingan, dan kemitraan industri Program Studi Digital Supply Chain.'
                                    : 'Measurable outcomes reflecting graduate quality, stakeholder satisfaction, and industry partnerships of the Digital Supply Chain Program.'}
                            </p>
                            {/* Decorative circles */}
                            <div className="mt-10 flex gap-3">
                                {['#D99F60', '#AC9587', '#8C6441', '#6E4E33'].map((c, i) => (
                                    <div key={i} className="size-2.5 rounded-full" style={{ background: c, opacity: 1 - i * 0.2 }} />
                                ))}
                            </div>
                        </Reveal>
                        {/* Right: progress bars — using real DB employment rate */}
                        <div className="space-y-7">
                            {[
                                { label: { id: 'Lulusan Terserap < 6 Bulan', en: 'Graduates Employed < 6 Months' }, pct: employmentPct },
                                { label: { id: 'Tingkat Kepuasan Alumni', en: 'Alumni Satisfaction Rate' }, pct: 88 },
                                { label: { id: 'Mahasiswa Aktif Berprestasi', en: 'High-Achieving Active Students' }, pct: 75 },
                                { label: { id: 'Kerjasama Industri Aktif', en: 'Active Industry Partnerships' }, pct: 85 },
                            ].map((item, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-semibold" style={{ color: '#24141F' }}>
                                                {item.label[l]}
                                            </span>
                                            <span className="font-display text-sm font-bold" style={{ color: '#D99F60' }}>
                                                {item.pct}%
                                            </span>
                                        </div>
                                        <ProgressBar pct={item.pct} accent="#D99F60" delay={i * 0.1} />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRACER STUDY CHART ── */}
            <section className="relative overflow-hidden py-0 border-t" style={{ borderColor: 'rgba(172,149,135,0.08)' }}>
                {/* Dark background */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1A0D16 0%, #2C1624 40%, #1E1128 100%)' }} />
                {/* Orbs */}
                <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full opacity-[0.16]"
                    style={{ background: 'radial-gradient(circle, rgba(217,159,96,0.60) 0%, transparent 70%)', filter: 'blur(70px)' }} />
                <div className="pointer-events-none absolute -bottom-20 -right-20 size-[380px] rounded-full opacity-[0.12]"
                    style={{ background: 'radial-gradient(circle, rgba(140,100,65,0.65) 0%, transparent 70%)', filter: 'blur(55px)' }} />
                {/* Dot grid */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(rgba(217,159,96,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="relative z-10">
                    <TracerChart tracerStats={tracerStats} />
                </div>
            </section>
        </MainLayout>
    );
}
