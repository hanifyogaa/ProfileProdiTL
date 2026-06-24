import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { KaprodiGreeting } from '@/Sections/KaprodiGreeting';
import { StatsStrip } from '@/Sections/StatsStrip';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

interface BilingualStr { id: string; en: string }

interface AboutContent {
    visi?: BilingualStr;
    misi?: BilingualStr[];
    history?: BilingualStr;
}

interface GreetingData {
    name?: string | null;
    link_href?: string;
    quote?: BilingualStr;
    attribution?: BilingualStr;
    photo?: string | null;
}

interface SiteMeta {
    name?: string;
    accreditation_badge?: string | null;
}

interface StatItem {
    id: number;
    metric: string;
    value: string;
    label_id: string;
    label_en: string;
}

interface AboutProps {
    greeting?: GreetingData;
    distinctiveness?: any;
    aboutContent?: AboutContent;
    siteMeta?: SiteMeta;
    prodiStats?: {
        iabee_desc?: BilingualStr;
        iabee_badge?: string | null;
        iabee_number?: string;
        unggul_desc?: BilingualStr;
        unggul_sk?: string;
        unggul_badge?: string | null;
    };
    stats: StatItem[];
}

const HERO_BG = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1920';
const HISTORY_BG = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1600';

export default function About({ greeting, aboutContent, siteMeta, prodiStats, stats }: AboutProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const title = l === 'id' ? 'Profil Program Studi' : 'Study Program Profile';

    const visi = aboutContent?.visi?.[l] ?? (l === 'id'
        ? 'Menjadi Program Studi S1 Teknik Logistik berstandar internasional yang unggul dalam keilmuan e-logistik dan rantai pasok digital untuk mendukung kemajuan bangsa.'
        : 'To become an internationally standardized Logistics Engineering Study Program that excels in e-logistics and digital supply chains to support national development.');

    const misiItems = aboutContent?.misi?.map(m => m[l]) ?? (l === 'id' ? [
        'Menyelenggarakan pendidikan berkualitas internasional di bidang rekayasa logistik berbasis teknologi informasi.',
        'Mengembangkan riset inovatif di bidang e-logistik, pergudangan pintar, dan manajemen rantai pasok digital.',
        'Melaksanakan pengabdian masyarakat guna memberikan solusi nyata bagi permasalahan logistik nasional.',
        'Membangun kerjasama strategis dengan industri, pemerintah, dan lembaga pendidikan bertaraf internasional.',
    ] : [
        'To organize internationally certified logistics engineering education based on information technology.',
        'To develop innovative research in e-logistics, smart warehousing, and digital supply chain systems.',
        'To conduct community service to provide tangible solutions to national logistics bottlenecks.',
        'To build strategic partnerships with industry, government, and international educational institutions.',
    ]);

    const history = aboutContent?.history?.[l] ?? (l === 'id'
        ? 'Program Studi S1 Teknik Logistik Universitas Telkom didirikan di bawah Fakultas Rekayasa Industri (FRI) untuk merespons kebutuhan masif industri akan tenaga ahli logistik yang melek teknologi. Kurikulum kami memadukan fondasi teknik industri dengan kemampuan analitik sistem informasi logistik terkini, menghasilkan lulusan yang siap bersaing di era Digital Supply Chain.'
        : "Telkom University's S1 Logistics Engineering program was established under the Faculty of Industrial Engineering (FRI) to address the critical industry shortage of tech-savvy logistics engineers. Our curriculum bridges traditional industrial engineering with state-of-the-art information systems, producing graduates ready to compete in the Digital Supply Chain era.");

    const iabeeDesc  = prodiStats?.iabee_desc?.[l]  ?? (l === 'id'
        ? 'Program Studi S1 Teknik Logistik Telkom University telah mendapatkan General Accreditation IABEE sebagai pengakuan mutu pendidikan teknik bertaraf internasional.'
        : 'The S1 Logistics Engineering Study Program at Telkom University has been awarded General Accreditation by IABEE, recognizing our internationally-standard engineering education quality.');
    const iabeeNo    = prodiStats?.iabee_number ?? '';
    const iabeeBadge = prodiStats?.iabee_badge  ?? null;

    const unggulDesc  = prodiStats?.unggul_desc?.[l] ?? (l === 'id'
        ? 'Berdasarkan Keputusan LAM Teknik, Program Studi S1 Teknik Logistik Telkom University memperoleh Akreditasi Unggul — peringkat tertinggi dalam sistem akreditasi nasional.'
        : 'Based on the Decree of LAM Teknik, the S1 Logistics Engineering Study Program at Telkom University has been awarded the "Unggul" (Excellent) Accreditation — the highest national accreditation rank.');
    const unggulSK    = prodiStats?.unggul_sk   ?? '';
    const unggulBadge = prodiStats?.unggul_badge ?? null;

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── CINEMATIC HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[72vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                {/* Background photo */}
                <motion.div
                    className="absolute inset-0"
                    style={shouldReduceMotion ? {} : { y: yBg }}
                >
                    <img
                        src={HERO_BG}
                        alt=""
                        className="size-full object-cover"
                        style={{ opacity: 0.40 }}
                        fetchPriority="high"
                    />
                </motion.div>

                {/* Gradient scrim */}
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.96) 0%, rgba(36,20,31,0.55) 50%, rgba(36,20,31,0.20) 100%)',
                }} />
                {/* fade bottom edge to page background */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                {/* Left amber accent bar */}
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-36 pt-40"
                    style={shouldReduceMotion ? {} : { y: yText }}
                >
                    <div className="grid items-end gap-10 md:grid-cols-12">
                        {/* Left — text (7 cols) */}
                        <div className="md:col-span-7">
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                    <ShieldCheck className="size-3.5" />
                                    {l === 'id' ? 'Tentang Prodi' : 'About the Program'}
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                                    {title}
                                </h1>
                                <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {l === 'id'
                                        ? 'Program Studi S1 Teknik Logistik · Digital Supply Chain — Fakultas Rekayasa Industri, Telkom University.'
                                        : 'S1 Logistics Engineering · Digital Supply Chain — Faculty of Industrial Engineering, Telkom University.'}
                                </p>
                            </Reveal>
                        </div>

                        {/* Right — quick-facts strip (5 cols) */}
                        <div className="md:col-span-5">
                            <Reveal delay={0.15}>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { val: 'S1', desc: l === 'id' ? 'Jenjang' : 'Degree Level' },
                                        { val: '145', desc: l === 'id' ? 'Total SKS' : 'Total Credits' },
                                        { val: '8', desc: l === 'id' ? 'Semester' : 'Semesters' },
                                        { val: 'Unggul', desc: l === 'id' ? 'Akreditasi' : 'Accreditation' },
                                    ].map(({ val, desc }, i) => (
                                        <div key={i} className="rounded-2xl p-4 text-center"
                                            style={{ background: 'rgba(255,253,251,0.07)', border: '1px solid rgba(172,149,135,0.18)', backdropFilter: 'blur(12px)' }}>
                                            <p className="font-display text-2xl font-bold" style={{ color: '#D99F60' }}>{val}</p>
                                            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(172,149,135,0.7)' }}>{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── SAMBUTAN KAPRODI ── */}
            <div className="mt-0">
                <KaprodiGreeting greeting={{
                    name:        greeting?.name        ?? null,
                    photo:       greeting?.photo       ?? null,
                    quote:       greeting?.quote       ?? { id: '', en: '' },
                    attribution: greeting?.attribution ?? { id: '', en: '' },
                    link_href:   greeting?.link_href   ?? '/profil',
                }} />
            </div>

            {/* ── PRODI DALAM ANGKA ── */}
            <div className="mb-20">
                <StatsStrip stats={stats} />
            </div>

            {/* ── AKREDITASI ── */}
            <div className="mx-auto max-w-[1000px] px-6">

                {/* Dark band intro akreditasi */}
                <Reveal>
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                            {l === 'id' ? 'Pengakuan Mutu' : 'Quality Recognition'}
                        </span>
                        <h2 className="font-display text-ink-900 text-2xl font-semibold sm:text-3xl">
                            {l === 'id' ? 'Akreditasi & Sertifikasi' : 'Accreditation & Certification'}
                        </h2>
                    </div>
                </Reveal>

                {/* IABEE + Unggul side-by-side cards */}
                <div className="mb-20 grid gap-6 md:grid-cols-2">
                    {/* IABEE */}
                    <Reveal delay={0.05}>
                        <div className="flex h-full flex-col rounded-3xl border p-8 transition-shadow hover:shadow-lg"
                            style={{ borderColor: 'rgba(217,159,96,0.25)', background: 'rgba(217,159,96,0.04)' }}>
                            <div className="mb-6 flex items-center justify-between">
                                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#C08A4C' }}>
                                    {l === 'id' ? 'Internasional' : 'International'}
                                </span>
                                {iabeeBadge ? (
                                    <img src={iabeeBadge} alt="IABEE" className="h-16 w-16 object-contain drop-shadow-lg" />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                        style={{ background: 'rgba(217,159,96,0.12)' }}>
                                        <Award className="size-8" style={{ color: '#D99F60' }} />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-display text-ink-900 mb-3 text-xl font-bold">Akreditasi IABEE</h3>
                            <p className="text-navy-700 flex-1 text-sm leading-relaxed">{iabeeDesc}</p>
                            {iabeeNo && (
                                <div className="mt-5 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5"
                                    style={{ borderColor: 'rgba(217,159,96,0.30)', background: 'rgba(217,159,96,0.06)' }}>
                                    <Award className="size-4 shrink-0" style={{ color: '#C08A4C' }} />
                                    <p className="text-ink-900 text-xs font-bold">No. {iabeeNo}</p>
                                </div>
                            )}
                            <a href="https://iabee.or.id" target="_blank" rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                                style={{ color: '#8C6441' }}>
                                <ExternalLink className="size-3.5" />
                                {l === 'id' ? 'Pelajari lebih lanjut' : 'Learn more about IABEE'}
                            </a>
                        </div>
                    </Reveal>

                    {/* Unggul */}
                    <Reveal delay={0.10}>
                        <div className="flex h-full flex-col rounded-3xl border p-8 transition-shadow hover:shadow-lg"
                            style={{ borderColor: 'rgba(140,100,65,0.25)', background: 'rgba(140,100,65,0.04)' }}>
                            <div className="mb-6 flex items-center justify-between">
                                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                                    {l === 'id' ? 'Nasional' : 'National'}
                                </span>
                                {unggulBadge ? (
                                    <img src={unggulBadge} alt="Unggul" className="h-16 w-16 object-contain drop-shadow-lg" />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                        style={{ background: 'rgba(140,100,65,0.10)' }}>
                                        <ShieldCheck className="size-8" style={{ color: '#8C6441' }} />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-display text-ink-900 mb-3 text-xl font-bold">
                                {l === 'id' ? 'Akreditasi "Unggul"' : '"Unggul" Accreditation'}
                            </h3>
                            <p className="text-navy-700 flex-1 text-sm leading-relaxed">{unggulDesc}</p>
                            {unggulSK && (
                                <div className="mt-5 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5"
                                    style={{ borderColor: 'rgba(140,100,65,0.25)', background: 'rgba(140,100,65,0.05)' }}>
                                    <CheckCircle2 className="size-4 shrink-0" style={{ color: '#8C6441' }} />
                                    <p className="text-ink-900 text-xs font-bold">{unggulSK}</p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>

                {/* ── VISI & MISI ── */}
                <section id="visi-misi" className="mb-20 scroll-mt-24">
                    <Reveal>
                        <div className="mb-8">
                            <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                                {l === 'id' ? 'Arah & Tujuan' : 'Direction & Purpose'}
                            </span>
                            <h2 className="font-display text-ink-900 mt-2 text-2xl font-semibold sm:text-3xl">
                                {l === 'id' ? 'Visi & Misi' : 'Vision & Mission'}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid items-stretch gap-6 md:grid-cols-12">
                        {/* Visi — 5 cols dark */}
                        <div className="md:col-span-5">
                            <Reveal delay={0.08}>
                                <div className="flex h-full flex-col rounded-3xl p-8 shadow-xl"
                                    style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.96) 0%, rgba(110,78,51,0.18) 100%)', backdropFilter: 'blur(2px)', border: '1px solid rgba(217,159,96,0.12)' }}>
                                    <span className="mb-4 block text-xs font-bold uppercase tracking-widest" style={{ color: '#D99F60' }}>
                                        {l === 'id' ? 'Visi' : 'Vision'}
                                    </span>
                                    <p className="font-display flex-1 text-base font-medium italic leading-relaxed text-white sm:text-lg">
                                        "{visi}"
                                    </p>
                                    <div className="mt-6 h-px w-16" style={{ background: '#D99F60' }} />
                                </div>
                            </Reveal>
                        </div>

                        {/* Misi — 7 cols */}
                        <div className="md:col-span-7">
                            <Reveal delay={0.14}>
                                <div className="border-cream-300/20 bg-surface-0 flex h-full flex-col rounded-3xl border p-8 shadow-sm">
                                    <span className="text-brand-700 mb-5 block text-xs font-bold uppercase tracking-widest">
                                        {l === 'id' ? 'Misi' : 'Mission'}
                                    </span>
                                    <ol className="text-navy-700 flex-1 list-none space-y-4 text-sm leading-relaxed">
                                        {misiItems.map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#C08A4C' }}>
                                                    {i + 1}
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── SEJARAH — dark band with photo bg ── */}
            <section id="sejarah" className="relative scroll-mt-24 overflow-hidden py-24">
                <div className="absolute inset-0">
                    <img src={HISTORY_BG} alt="" className="size-full object-cover" style={{ opacity: 0.22 }} loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.93) 0%, rgba(110,78,51,0.70) 60%, rgba(36,20,31,0.90) 100%)' }} />
                </div>
                <div className="relative mx-auto max-w-[1000px] px-6">
                    <Reveal>
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.20)' }}>
                            {l === 'id' ? 'Latar Belakang' : 'Background'}
                        </span>
                        <h2 className="font-display mb-8 mt-2 text-2xl font-semibold text-white sm:text-3xl">
                            {l === 'id' ? 'Sejarah & Legalitas' : 'History & Legal Framework'}
                        </h2>
                        <p className="max-w-3xl text-sm leading-[1.9]" style={{ color: 'rgba(172,149,135,0.90)' }}>
                            {history}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* bottom breathing room */}
            <div className="h-20" />
        </MainLayout>
    );
}
