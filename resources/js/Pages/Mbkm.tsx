import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Briefcase, Globe, Lightbulb, Users } from 'lucide-react';
import { useRef } from 'react';

const HERO_BG = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1920';

interface MbkmScheme {
    icon: React.ReactNode;
    title: { id: string; en: string };
    desc: { id: string; en: string };
    sks: string;
    accent: string;
}

const SCHEMES: MbkmScheme[] = [
    {
        icon: <Briefcase className="size-6" />,
        title: { id: 'Magang Industri Bersertifikat', en: 'Certified Industry Internship' },
        desc: { id: 'Magang terstruktur 6 bulan di BUMN, startup teknologi logistik, dan perusahaan supply chain partner.', en: 'Six-month structured internship at state corporations, logistics tech startups, and supply chain partners.' },
        sks: '20 SKS',
        accent: '#D99F60',
    },
    {
        icon: <Globe className="size-6" />,
        title: { id: 'Pertukaran Mahasiswa', en: 'Student Exchange' },
        desc: { id: 'Studi di universitas mitra nasional maupun global yang memiliki program rekayasa logistik.', en: 'Study at leading national or global partner universities offering logistics science programs.' },
        sks: '20 SKS',
        accent: '#8C6441',
    },
    {
        icon: <Lightbulb className="size-6" />,
        title: { id: 'Proyek Independen', en: 'Independent Project' },
        desc: { id: 'Kerjakan proyek riset atau produk inovasi logistik secara mandiri bersama tim, dibimbing dosen dan mentor industri.', en: 'Execute a research or logistics innovation product independently with a team, guided by faculty and industry mentors.' },
        sks: '20 SKS',
        accent: '#6E4E33',
    },
    {
        icon: <Users className="size-6" />,
        title: { id: 'Wirausaha Merdeka', en: 'Entrepreneurship Program' },
        desc: { id: 'Bangun startup logistik dengan pendampingan dari ekosistem kewirausahaan Telkom University.', en: 'Build a logistics startup with mentorship from the Telkom University entrepreneurship ecosystem.' },
        sks: '20 SKS',
        accent: '#505666',
    },
    {
        icon: <BookOpen className="size-6" />,
        title: { id: 'Riset & PKM', en: 'Research & Student Creativity' },
        desc: { id: 'Ikut serta dalam Program Kreativitas Mahasiswa (PKM) atau proyek riset dosen dengan publikasi ilmiah.', en: 'Participate in Student Creativity Programs (PKM) or faculty research projects with scientific publications.' },
        sks: '10 SKS',
        accent: '#AC9587',
    },
    {
        icon: <Award className="size-6" />,
        title: { id: 'Asistensi Mengajar', en: 'Teaching Assistance' },
        desc: { id: 'Menjadi asisten dosen atau instruktur di satuan pendidikan, membantu persiapan materi dan praktikum.', en: 'Become a teaching assistant or instructor at an educational institution, supporting course material and practicum preparation.' },
        sks: '10 SKS',
        accent: '#C08A4C',
    },
];

export default function Mbkm() {
    const { locale } = useLocale();
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const l = locale as 'id' | 'en';

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const title = l === 'id' ? 'Merdeka Belajar Kampus Merdeka' : 'Kampus Merdeka (MBKM)';

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[60vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.32 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.55) 55%, rgba(36,20,31,0.15) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <div className="grid gap-8 md:grid-cols-12">
                        <div className="md:col-span-8">
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                    <BookOpen className="size-3.5" />
                                    MBKM
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                                <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {l === 'id'
                                        ? 'Program nasional yang memfasilitasi mahasiswa belajar di luar kampus hingga 2 semester, diperkuat dengan konversi SKS terstruktur.'
                                        : 'A national program enabling students to learn outside campus for up to 2 semesters, backed by structured credit conversion pathways.'}
                                </p>
                            </Reveal>
                        </div>
                        {/* Quick stats */}
                        <div className="flex items-end md:col-span-4">
                            <Reveal delay={0.15}>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { val: '40 SKS', label: l === 'id' ? 'Maks. Konversi' : 'Max Credit Conv.' },
                                        { val: '2 Sem', label: l === 'id' ? 'Durasi Program' : 'Program Duration' },
                                        { val: '6+', label: l === 'id' ? 'Skema Program' : 'Program Schemes' },
                                        { val: '100+', label: l === 'id' ? 'Mitra Industri' : 'Industry Partners' },
                                    ].map((s, i) => (
                                        <div key={i} className="rounded-2xl p-4 text-center"
                                            style={{ background: 'rgba(255,253,251,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(172,149,135,0.15)' }}>
                                            <p className="font-display text-xl font-bold" style={{ color: '#D99F60' }}>{s.val}</p>
                                            <p className="mt-0.5 text-[10px] leading-tight" style={{ color: 'rgba(172,149,135,0.75)' }}>{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── INTRO DARK BAND ── */}
            <section className="py-16" style={{ background: 'linear-gradient(135deg, rgba(46,28,39,0.97) 0%, rgba(36,20,31,0.94) 100%)', borderTop: '1px solid rgba(172,149,135,0.08)', borderBottom: '1px solid rgba(172,149,135,0.08)' }}>
                <Reveal>
                    <div className="mx-auto max-w-[760px] px-6 text-center">
                        <p className="font-display text-xl font-medium italic leading-relaxed" style={{ color: 'rgba(172,149,135,0.90)' }}>
                            {l === 'id'
                                ? '"MBKM memberi mahasiswa kebebasan belajar melalui pengalaman nyata — magang, riset, pertukaran, wirausaha, dan lebih banyak lagi."'
                                : '"MBKM gives students the freedom to learn through real experience — internships, research, exchange, entrepreneurship, and much more."'}
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* ── SKEMA PROGRAM ── */}
            <section className="py-20" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12 flex items-end justify-between gap-6">
                            <div>
                                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                    {l === 'id' ? 'Pilihan Program' : 'Available Schemes'}
                                </span>
                                <h2 className="font-display text-3xl font-bold" style={{ color: '#24141F' }}>
                                    {l === 'id' ? 'Skema MBKM' : 'MBKM Pathways'}
                                </h2>
                                <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: '#505666' }}>
                                    {l === 'id'
                                        ? 'Pilih skema yang paling sesuai dengan tujuan karir dan minat Anda.'
                                        : 'Choose the pathway that best aligns with your career goals and interests.'}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {SCHEMES.map((scheme, i) => (
                            <Reveal key={i} delay={i * 0.07} variant="fade-up">
                                <div className="flex h-full flex-col rounded-3xl border p-6 transition-shadow hover:shadow-[0_12px_32px_-8px_rgba(36,20,31,0.16)]"
                                    style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                    {/* Accent bar top */}
                                    <div className="mb-5 flex items-center justify-between">
                                        <div className="flex size-11 items-center justify-center rounded-xl"
                                            style={{ background: `${scheme.accent}18`, color: scheme.accent }}>
                                            {scheme.icon}
                                        </div>
                                        <span className="rounded-full px-3 py-1 text-[11px] font-bold"
                                            style={{ background: 'rgba(236,235,233,0.80)', color: '#505666' }}>
                                            {scheme.sks}
                                        </span>
                                    </div>
                                    <h3 className="font-display mb-2 text-base font-semibold" style={{ color: '#24141F' }}>
                                        {scheme.title[l]}
                                    </h3>
                                    <p className="flex-1 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                        {scheme.desc[l]}
                                    </p>
                                    <div className="mt-5 h-0.5 rounded-full" style={{ background: `${scheme.accent}30` }} />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA DARK BAND ── */}
            <section className="py-20" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.98) 0%, rgba(58,36,48,0.95) 50%, rgba(36,20,31,0.98) 100%)' }}>
                <Reveal>
                    <div className="mx-auto max-w-[640px] px-6 text-center">
                        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(217,159,96,0.12)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.20)' }}>
                            {l === 'id' ? 'Mulai Perjalananmu' : 'Start Your Journey'}
                        </span>
                        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                            {l === 'id' ? 'Siap Belajar di Luar Kampus?' : 'Ready to Learn Beyond Campus?'}
                        </h2>
                        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.80)' }}>
                            {l === 'id'
                                ? 'Daftarkan diri ke program MBKM dan raih pengalaman nyata bersama mitra industri terbaik.'
                                : 'Register for the MBKM program and gain real experience with top industry partners.'}
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <a
                                href="https://smb.telkomuniversity.ac.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-85"
                                style={{ background: '#D99F60', color: '#24141F' }}
                            >
                                {l === 'id' ? 'Informasi Pendaftaran' : 'Registration Info'}
                                <ArrowRight className="size-4" />
                            </a>
                            <a
                                href="/kontak"
                                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-85"
                                style={{ background: 'rgba(255,253,251,0.08)', color: 'rgba(255,253,251,0.90)', border: '1px solid rgba(172,149,135,0.20)' }}
                            >
                                {l === 'id' ? 'Tanya Tim Prodi' : 'Ask Our Team'}
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>
        </MainLayout>
    );
}
