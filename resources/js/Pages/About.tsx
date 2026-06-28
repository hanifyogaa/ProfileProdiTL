import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { KaprodiWelcomeSection } from '@/Sections/KaprodiWelcomeSection';
import { StatsStrip } from '@/Sections/StatsStrip';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, CheckCircle2, ExternalLink, GraduationCap, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { useRef } from 'react';

interface BilingualStr { id: string; en: string }

interface AboutContent {
    visi?: BilingualStr;
    misi?: BilingualStr[];
    history?: BilingualStr;
    tujuan?: { title: BilingualStr; description: BilingualStr }[];
    strategi?: BilingualStr[];
}

interface GreetingData {
    name?: string | null;
    link_href?: string;
    quote?: BilingualStr;
    attribution?: BilingualStr;
    photo?: string | null;
    full_message?: BilingualStr;
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

    const tujuanItems = aboutContent?.tujuan ?? [
        {
            title: { id: 'Logistics Engineer', en: 'Logistics Engineer' },
            description: {
                id: 'Ahli yang mampu merancang, memperbaiki, dan menginstalasi sistem logistik kompleks berbasis data.',
                en: 'An expert capable of designing, improving, and installing complex data-driven logistics systems.',
            },
        },
        {
            title: { id: 'Researcher', en: 'Researcher' },
            description: {
                id: 'Akademisi yang solutif, adaptif terhadap TIK, dan berkomitmen pada pembelajaran sepanjang hayat.',
                en: 'A solution-oriented academic who is adaptive to ICT and committed to lifelong learning.',
            },
        },
        {
            title: { id: 'Technopreneur', en: 'Technopreneur' },
            description: {
                id: 'Wirausahawan inovatif yang mampu menciptakan nilai ekonomi baru dalam ekosistem rantai pasok.',
                en: 'An innovative entrepreneur capable of creating new economic value within the supply chain ecosystem.',
            },
        },
    ];


    const strategiItems = aboutContent?.strategi?.map(s => s[l]) ?? (l === 'id' ? [
        'Pendidikan: Meningkatkan kualitas pendidikan berbasis Logistics 4.0, rantai pasok digital, dan Outcome-Based Education (OBE).',
        'Riset: Meningkatkan kualitas dan kuantitas penelitian, publikasi internasional, serta kolaborasi riset global.',
        'SDM: Mengembangkan kapasitas dosen dan tenaga kependidikan agar kompeten dan berdaya saing internasional.',
        'Internasionalisasi: Mendorong mobilitas global, dual degree, dan kerja sama akademik global.',
        'Inovasi: Mengembangkan ekosistem inovasi, technopreneurship, dan hilirisasi riset sesuai kebutuhan industri dan masyarakat.',
        'Tata Kelola: Memperkuat tata kelola, implementasi VMTS, dan sistem penjaminan mutu berbasis digital dan outcome.',
        'Daya Saing Lulusan: Meningkatkan daya saing melalui sertifikasi profesional, MBKM industri, dan pengalaman global.',
    ] : [
        'Education: Enhancing education quality based on Logistics 4.0, digital supply chain, and Outcome-Based Education (OBE).',
        'Research: Improving research quality and quantity, international publications, and global collaborations.',
        'HR: Developing faculty and staff capacity to be internationally competent and competitive.',
        'Internationalization: Promoting global mobility, dual degree programs, and global academic cooperation.',
        'Innovation: Developing an innovation ecosystem, technopreneurship, and research commercialization.',
        'Governance: Strengthening governance, VMTS implementation, and digital quality assurance systems.',
        'Graduate Competitiveness: Enhancing competitiveness through professional certifications, industry MBKM, and global experience.',
    ]);

    const iabeeDesc  = prodiStats?.iabee_desc?.[l]  ?? (l === 'id'
        ? 'Program Studi S1 Teknik Logistik Telkom University telah mendapatkan General Accreditation IABEE sebagai pengakuan mutu pendidikan teknik bertaraf internasional.'
        : 'The S1 Logistics Engineering Study Program at Telkom University has been awarded General Accreditation by IABEE, recognizing our internationally-standard engineering education quality.');
    const iabeeNo    = prodiStats?.iabee_number ?? '';
    const iabeeBadge = prodiStats?.iabee_badge  ?? null;

    const unggulDesc  = prodiStats?.unggul_desc?.[l] ?? (l === 'id'
        ? 'Program Studi S1 Teknik Logistik Telkom University telah mendapatkan akreditasi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) dengan peringkat B, sebagaimana ditetapkan dalam SK No. 10735/SK/BAN-PT/Akred/S/IX/2021.'
        : 'The S1 Logistics Engineering Study Program at Telkom University has been accredited by the National Accreditation Board for Higher Education (BAN-PT) with a B rating, as stipulated in Decree No. 10735/SK/BAN-PT/Akred/S/IX/2021.');
    const unggulSK    = prodiStats?.unggul_sk   ?? '10735/SK/BAN-PT/Akred/S/IX/2021';
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
                                        { val: 'B', desc: l === 'id' ? 'Akreditasi BAN-PT' : 'BAN-PT Accreditation' },
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
                <KaprodiWelcomeSection greeting={{
                    name:         greeting?.name         ?? null,
                    photo:        greeting?.photo        ?? null,
                    quote:        greeting?.quote        ?? { id: '', en: '' },
                    attribution:  greeting?.attribution  ?? { id: '', en: '' },
                    link_href:    greeting?.link_href    ?? '/profil',
                    full_message: greeting?.full_message ?? { id: '', en: '' },
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

                {/* BAN-PT National — full width */}
                <Reveal delay={0.05}>
                    <div className="mb-20 flex flex-col rounded-3xl border p-8 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:gap-10"
                        style={{ borderColor: 'rgba(140,100,65,0.25)', background: 'rgba(140,100,65,0.04)' }}>
                        {/* Icon / Badge */}
                        <div className="mb-6 shrink-0 sm:mb-0">
                            {unggulBadge ? (
                                <img src={unggulBadge} alt="BAN-PT" className="h-24 w-24 object-contain drop-shadow-lg" />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl"
                                    style={{ background: 'rgba(140,100,65,0.10)' }}>
                                    <ShieldCheck className="size-10" style={{ color: '#8C6441' }} />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                                    {l === 'id' ? 'Nasional' : 'National'}
                                </span>
                                <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#C08A4C' }}>
                                    {l === 'id' ? 'Peringkat B' : 'Rank B'}
                                </span>
                            </div>
                            <h3 className="font-display text-ink-900 mb-2 text-2xl font-bold">
                                {l === 'id' ? 'Akreditasi BAN-PT' : 'BAN-PT Accreditation'}
                            </h3>
                            <p className="text-navy-700 mb-5 max-w-2xl text-sm leading-relaxed">{unggulDesc}</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5"
                                    style={{ borderColor: 'rgba(140,100,65,0.25)', background: 'rgba(140,100,65,0.05)' }}>
                                    <CheckCircle2 className="size-4 shrink-0" style={{ color: '#8C6441' }} />
                                    <p className="text-ink-900 text-xs font-bold">{unggulSK}</p>
                                </div>
                                <a href="/profil/akreditasi"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                                    style={{ color: '#8C6441' }}>
                                    <ExternalLink className="size-3.5" />
                                    {l === 'id' ? 'Lihat riwayat SK lengkap' : 'View full decree history'}
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>

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

                {/* ── PROFIL LULUSAN (TUJUAN) ── */}
                <section id="profil-lulusan" className="mb-20 scroll-mt-24">
                    <Reveal>
                        <div className="mb-8">
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(217,159,96,0.12)', color: '#C08A4C' }}>
                                <GraduationCap className="size-3" />
                                {l === 'id' ? 'Profil Lulusan' : 'Graduate Profiles'}
                            </span>
                            <h2 className="font-display text-ink-900 mt-2 text-2xl font-semibold sm:text-3xl">
                                {l === 'id' ? 'Tujuan Pendidikan' : 'Educational Objectives'}
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Program studi ini menghasilkan tiga profil lulusan utama yang siap berkontribusi di industri, akademia, dan ekosistem kewirausahaan.'
                                    : 'This study program produces three main graduate profiles ready to contribute in industry, academia, and the entrepreneurship ecosystem.'}
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            { icon: <Target className="size-6" />, color: '#D99F60' },
                            { icon: <BookOpen className="size-6" />, color: '#8C6441' },
                            { icon: <Lightbulb className="size-6" />, color: '#C08A4C' },
                        ].map(({ icon, color }, i) => {
                            const item = tujuanItems[i];
                            if (!item) return null;
                            return (
                                <Reveal key={i} delay={0.06 * i}>
                                    <div className="flex h-full flex-col rounded-3xl border p-7 transition-shadow hover:shadow-lg"
                                        style={{ borderColor: 'rgba(172,149,135,0.20)', background: 'rgba(255,253,251,0.7)' }}>
                                        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl"
                                            style={{ background: `rgba(${color === '#D99F60' ? '217,159,96' : color === '#8C6441' ? '140,100,65' : '192,138,76'},0.12)`, color }}>
                                            {icon}
                                        </div>
                                        <h3 className="font-display text-ink-900 mb-3 text-base font-bold">{item.title[l]}</h3>
                                        <p className="flex-1 text-sm leading-relaxed" style={{ color: '#505666' }}>{item.description[l]}</p>
                                        <div className="mt-5 h-0.5 w-10 rounded-full" style={{ background: color }} />
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* ── STRATEGI PENGEMBANGAN ── */}
                <section id="strategi" className="mb-20 scroll-mt-24">
                    <Reveal>
                        <div className="mb-8">
                            <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                                {l === 'id' ? 'Strategi Pengembangan' : 'Development Strategy'}
                            </span>
                            <h2 className="font-display text-ink-900 mt-2 text-2xl font-semibold sm:text-3xl">
                                {l === 'id' ? '7 Tujuan Strategis' : '7 Strategic Objectives'}
                            </h2>
                        </div>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="rounded-3xl border p-8" style={{ borderColor: 'rgba(172,149,135,0.18)', background: 'rgba(255,253,251,0.7)' }}>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {strategiItems.map((item, i) => (
                                    <div key={i} className="flex gap-3 rounded-2xl p-4 transition-colors hover:bg-amber-50/60">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                                            style={{ background: 'rgba(217,159,96,0.18)', color: '#C08A4C' }}>
                                            {i + 1}
                                        </span>
                                        <p className="text-sm leading-relaxed" style={{ color: '#24141F' }}>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>
            </div>

            {/* ── SEJARAH — dark band with photo bg ── */}
            <section id="sejarah" className="relative scroll-mt-24 overflow-hidden py-24">
                <div className="absolute inset-0">
                    <img src={HISTORY_BG} alt="" className="size-full object-cover" style={{ opacity: 0.20 }} loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.93) 0%, rgba(110,78,51,0.82) 60%, rgba(36,20,31,0.90) 100%)' }} />
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
                        <p className="max-w-3xl text-base leading-[1.9] text-justify text-white/95">
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
