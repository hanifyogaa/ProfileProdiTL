import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, ChevronDown, Download, ExternalLink, FileText, Quote } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';

interface CourseItem {
    id: number;
    code: string;
    name_id: string;
    name_en: string;
    sks: number;
    semester: number;
    type: 'wajib' | 'pilihan';
}

interface AlumniTestimonial {
    name: string;
    year: number;
    company: string;
    quote: { id: string; en: string };
}

interface CurriculumMeta {
    profil_lulusan?: { id: string; en: string };
    testimonials?: AlumniTestimonial[];
    peo?: { id: string; en: string };
    peo_url?: string;
    plo?: { id: string; en: string };
    plo_url?: string;
    prerequisite_image?: string;
    pdf_url?: string;
    total_sks?: number;
    semesters?: number;
}

interface CurriculumProps {
    courses: CourseItem[];
    curriculumMeta?: CurriculumMeta;
}

const HERO_BG = 'https://images.unsplash.com/photo-1532153955177-f59af40d6472?auto=format&fit=crop&q=85&w=1920';

const FALLBACK_TESTIMONIALS: AlumniTestimonial[] = [
    {
        name: 'Rizky Ardiansyah', year: 2022, company: 'Shopee Indonesia',
        quote: {
            id: 'Kurikulum yang sangat relevan dengan kebutuhan industri. Ilmu optimasi rantai pasok langsung terpakai di pekerjaan saya sebagai Supply Chain Analyst.',
            en: 'A curriculum highly relevant to industry needs. Supply chain optimization knowledge is directly applicable in my role as a Supply Chain Analyst.',
        },
    },
    {
        name: 'Salsabila Putri', year: 2021, company: 'JNE Logistics',
        quote: {
            id: 'Pengalaman magang yang difasilitasi prodi membuka pintu karir saya. Kini saya mengelola distribusi untuk wilayah Jawa Barat.',
            en: 'The internship opportunities facilitated by the program opened my career doors. I now manage distribution for West Java.',
        },
    },
    {
        name: 'Muhammad Farhan', year: 2023, company: 'McKinsey & Company',
        quote: {
            id: 'Pendekatan data-driven dalam kurikulum Teknik Logistik mempersiapkan saya untuk bersaing di level konsultan internasional.',
            en: 'The data-driven approach in the Logistics Engineering curriculum prepared me to compete at the international consulting level.',
        },
    },
];

function SectionDivider({ label }: { label: string }) {
    return (
        <div className="my-16 flex items-center gap-4">
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(172,149,135,0.25)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(80,86,102,0.40)' }}>{label}</span>
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(172,149,135,0.25)' }} />
        </div>
    );
}

export default function Curriculum({ courses, curriculumMeta }: CurriculumProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const title = l === 'id' ? 'Kurikulum & Daftar Mata Kuliah' : 'Curriculum & Courses';
    const electiveCourses = courses.filter((c) => c.type === 'pilihan');
    const allCoursesSorted = [...courses].sort((a, b) => a.semester - b.semester || a.code.localeCompare(b.code));
    const testimonials = curriculumMeta?.testimonials?.length ? curriculumMeta.testimonials : FALLBACK_TESTIMONIALS;
    const totalSks = curriculumMeta?.total_sks ?? 145;
    const totalSem = curriculumMeta?.semesters ?? 8;

    const [expandedSemesters, setExpandedSemesters] = useState<Record<number, boolean>>({});
    const toggleSemester = (sem: number) =>
        setExpandedSemesters((prev) => ({ ...prev, [sem]: !prev[sem] }));

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── CINEMATIC HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[62vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.35 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.50) 55%, rgba(36,20,31,0.15) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-36"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <div className="grid items-end gap-10 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                    <BookOpen className="size-3.5" />
                                    {l === 'id' ? 'Akademik' : 'Academic'}
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                                <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {l === 'id'
                                        ? `Struktur ${totalSks} SKS dirancang komprehensif selama ${totalSem} semester untuk menghasilkan lulusan siap industri.`
                                        : `A comprehensive ${totalSks}-credit structure across ${totalSem} semesters, producing industry-ready graduates.`}
                                </p>
                                {curriculumMeta?.pdf_url && (
                                    <a href={curriculumMeta.pdf_url} target="_blank" rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                                        style={{ background: '#D99F60', color: '#24141F' }}>
                                        <Download className="size-4" />
                                        {l === 'id' ? 'Unduh Buku Kurikulum' : 'Download Curriculum Book'}
                                    </a>
                                )}
                            </Reveal>
                        </div>
                        <div className="md:col-span-5">
                            <Reveal delay={0.15}>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { val: String(totalSks), desc: 'SKS' },
                                        { val: String(totalSem), desc: l === 'id' ? 'Semester' : 'Semesters' },
                                        { val: String(courses.length || '40+'), desc: l === 'id' ? 'Mata Kuliah' : 'Courses' },
                                    ].map(({ val, desc }, i) => (
                                        <div key={i} className="rounded-2xl p-4 text-center"
                                            style={{ background: 'rgba(255,253,251,0.07)', border: '1px solid rgba(172,149,135,0.18)', backdropFilter: 'blur(12px)' }}>
                                            <p className="font-display text-2xl font-bold" style={{ color: '#D99F60' }}>{val}</p>
                                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(172,149,135,0.7)' }}>{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </motion.div>
            </section>

            <div className="mx-auto max-w-[1100px] px-6 pt-16">

                {/* ── Profil Lulusan ── */}
                <section id="profil-lulusan" className="scroll-mt-24 mb-12">
                    <Reveal>
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                            {l === 'id' ? 'Lulusan' : 'Graduates'}
                        </span>
                        <h2 className="font-display text-ink-900 mb-5 mt-2 text-2xl font-semibold sm:text-3xl">
                            {l === 'id' ? 'Profil Lulusan' : 'Graduate Profile'}
                        </h2>
                        <div className="rounded-3xl border p-8 text-sm leading-relaxed"
                            style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#FFFDFB' }}>
                            <p className="text-navy-700">
                                {curriculumMeta?.profil_lulusan?.[l] ?? (l === 'id'
                                    ? 'Lulusan Teknik Logistik Telkom University adalah sarjana yang kompeten dalam merancang, menganalisis, dan mengoptimalkan sistem logistik dan rantai pasok berbasis teknologi informasi. Mereka siap berkarir di industri logistik, e-commerce, manufaktur, konsultansi, maupun berwirausaha di bidang logistik digital.'
                                    : 'Graduates of Logistics Engineering at Telkom University are competent engineers in designing, analyzing, and optimizing IT-based logistics and supply chain systems. They are ready for careers in logistics, e-commerce, manufacturing, consulting, or entrepreneurship.'
                                )}
                            </p>
                        </div>
                    </Reveal>
                </section>

                {/* ── Alumni Testimonials ── */}
                <div className="mb-16">
                    <Reveal>
                        <h3 className="font-display text-ink-900 mb-6 text-lg font-semibold">
                            {l === 'id' ? 'Kata Alumni' : 'Alumni Voices'}
                        </h3>
                    </Reveal>
                    <div className="grid gap-5 sm:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="flex h-full flex-col gap-4 rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-md"
                                    style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#FFFDFB' }}>
                                    <Quote className="size-6 shrink-0" style={{ color: 'rgba(217,159,96,0.60)' }} />
                                    <p className="text-navy-700 flex-1 text-sm italic leading-relaxed">"{t.quote[l]}"</p>
                                    <div className="border-t pt-4" style={{ borderColor: 'rgba(172,149,135,0.18)' }}>
                                        <p className="font-display text-ink-900 text-sm font-semibold">{t.name}</p>
                                        <p className="mt-0.5 text-xs" style={{ color: 'rgba(80,86,102,0.60)' }}>
                                            {t.company} · {l === 'id' ? 'Lulusan' : 'Class of'} {t.year}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <SectionDivider label={l === 'id' ? 'Struktur Program' : 'Program Structure'} />

                {/* ── PEO & PLO — dark band ── */}
                <div className="mb-16 overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.97) 0%, rgba(46,28,39,0.94) 50%, rgba(36,20,31,0.97) 100%)', border: '1px solid rgba(172,149,135,0.10)' }}>
                    <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0"
                        style={{ '--tw-divide-color': 'rgba(172,149,135,0.12)' } as React.CSSProperties}>
                        {/* PEO */}
                        <section id="peo" className="scroll-mt-24 p-8">
                            <Reveal>
                                <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60' }}>PEO</span>
                                <h2 className="font-display mb-4 mt-2 text-lg font-semibold text-white">
                                    Program Educational Objectives
                                </h2>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {curriculumMeta?.peo?.[l] ?? (l === 'id'
                                        ? 'PEO menggambarkan pencapaian lulusan 3–5 tahun setelah menyelesaikan studi. Tercantum lengkap dalam Buku Kurikulum.'
                                        : 'PEO describes graduate achievements 3–5 years after completing the program. Detailed in the Curriculum Book.'
                                    )}
                                </p>
                                {(curriculumMeta?.peo_url || curriculumMeta?.pdf_url) && (
                                    <a href={curriculumMeta.peo_url ?? curriculumMeta.pdf_url} target="_blank" rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                                        style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                        <ExternalLink className="size-3.5" />
                                        {l === 'id' ? 'Lihat Dokumen PEO' : 'View PEO Document'}
                                    </a>
                                )}
                            </Reveal>
                        </section>
                        {/* PLO */}
                        <section id="plo" className="scroll-mt-24 p-8">
                            <Reveal delay={0.08}>
                                <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(140,100,65,0.20)', color: '#AC9587' }}>PLO</span>
                                <h2 className="font-display mb-4 mt-2 text-lg font-semibold text-white">
                                    Program Learning Outcomes
                                </h2>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {curriculumMeta?.plo?.[l] ?? (l === 'id'
                                        ? 'PLO mendefinisikan kompetensi yang harus dimiliki mahasiswa pada saat lulus. Tercantum lengkap dalam Buku Kurikulum.'
                                        : 'PLO defines the competencies students must possess upon graduation. Detailed in the Curriculum Book.'
                                    )}
                                </p>
                                {(curriculumMeta?.plo_url || curriculumMeta?.pdf_url) && (
                                    <a href={curriculumMeta.plo_url ?? curriculumMeta.pdf_url} target="_blank" rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                                        style={{ background: 'rgba(140,100,65,0.15)', color: '#AC9587', border: '1px solid rgba(172,149,135,0.25)' }}>
                                        <ExternalLink className="size-3.5" />
                                        {l === 'id' ? 'Lihat Dokumen PLO' : 'View PLO Document'}
                                    </a>
                                )}
                            </Reveal>
                        </section>
                    </div>
                </div>

                {/* ── Prasyarat Mata Kuliah ── */}
                <section id="organigram" className="scroll-mt-24 mb-16">
                    <Reveal>
                        <h2 className="font-display text-ink-900 mb-5 text-2xl font-semibold">
                            {l === 'id' ? 'Prasyarat Mata Kuliah' : 'Course Prerequisites'}
                        </h2>
                        {curriculumMeta?.prerequisite_image ? (
                            <div className="overflow-hidden rounded-3xl border p-4"
                                style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#FFFDFB' }}>
                                <img src={curriculumMeta.prerequisite_image}
                                    alt={l === 'id' ? 'Diagram Prasyarat Mata Kuliah' : 'Course Prerequisites Diagram'}
                                    className="w-full rounded-2xl object-contain" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 rounded-3xl border p-6"
                                style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#ECEBE9' }}>
                                <FileText className="size-8 shrink-0" style={{ color: 'rgba(80,86,102,0.30)' }} />
                                <p className="text-sm" style={{ color: 'rgba(80,86,102,0.60)' }}>
                                    {l === 'id'
                                        ? 'Diagram prasyarat tersedia di Buku Kurikulum. Unggah melalui panel admin.'
                                        : 'The prerequisite diagram is available in the Curriculum Book. Upload via admin panel.'}
                                </p>
                            </div>
                        )}
                    </Reveal>
                </section>

                <SectionDivider label={l === 'id' ? 'Daftar Mata Kuliah' : 'Course Listing'} />

                {/* ── Mata Kuliah Pilihan ── */}
                <section id="mata-kuliah-pilihan" className="scroll-mt-24 mb-16">
                    <Reveal>
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(217,159,96,0.12)', color: '#C08A4C' }}>
                            {l === 'id' ? 'Pilihan' : 'Elective'}
                        </span>
                        <h2 className="font-display text-ink-900 mb-6 mt-2 text-2xl font-semibold">
                            {l === 'id' ? 'Mata Kuliah Pilihan' : 'Elective Courses'}
                        </h2>
                        <div className="overflow-hidden rounded-3xl border" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left" style={{ borderColor: 'rgba(172,149,135,0.20)', background: 'rgba(140,100,65,0.06)' }}>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>No</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>{l === 'id' ? 'Kode MK' : 'Code'}</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>{l === 'id' ? 'Nama Mata Kuliah' : 'Course Name'}</th>
                                        <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>SKS</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: '#FFFDFB' }}>
                                    {electiveCourses.length > 0 ? electiveCourses.map((c, i) => (
                                        <tr key={c.id} className="border-b transition-colors hover:bg-amber-500/[0.04]"
                                            style={{ borderColor: 'rgba(172,149,135,0.12)' }}>
                                            <td className="px-4 py-3 font-mono text-xs" style={{ color: 'rgba(80,86,102,0.40)' }}>{i + 1}</td>
                                            <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: '#8C6441' }}>{c.code}</td>
                                            <td className="px-4 py-3 font-medium" style={{ color: '#24141F' }}>{l === 'id' ? c.name_id : c.name_en}</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold" style={{ color: '#505666' }}>{c.sks}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-10 text-center text-sm italic" style={{ color: 'rgba(80,86,102,0.40)' }}>
                                                {l === 'id' ? 'Data mata kuliah pilihan belum tersedia.' : 'Elective course data not yet available.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </section>

                {/* ── Struktur Kurikulum ── */}
                <section id="struktur-kurikulum" className="scroll-mt-24 mb-20">
                    <Reveal>
                        <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
                            {l === 'id' ? 'Struktur' : 'Structure'}
                        </span>
                        <h2 className="font-display text-ink-900 mb-6 mt-2 text-2xl font-semibold">
                            {l === 'id' ? 'Struktur Kurikulum' : 'Curriculum Structure'}
                        </h2>
                    </Reveal>

                    <div className="overflow-hidden rounded-3xl border" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left" style={{ borderColor: 'rgba(172,149,135,0.20)', background: 'rgba(140,100,65,0.06)' }}>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>No</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>{l === 'id' ? 'Kode MK' : 'Code'}</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>{l === 'id' ? 'Nama Mata Kuliah' : 'Course Name'}</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>SKS</th>
                                        <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>Sem.</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(80,86,102,0.60)' }}>{l === 'id' ? 'Jenis' : 'Type'}</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: '#FFFDFB' }}>
                                    {allCoursesSorted.length > 0 ? (() => {
                                        let lastSem = 0;
                                        return allCoursesSorted.map((c, i) => {
                                            const showSemHeader = c.semester !== lastSem;
                                            lastSem = c.semester;
                                            const isExpanded = !!expandedSemesters[c.semester];
                                            return (
                                                <Fragment key={c.id}>
                                                    {showSemHeader && (
                                                        <tr className="cursor-pointer select-none border-y transition-colors hover:bg-brand-700/[0.06]"
                                                            style={{ background: 'rgba(140,100,65,0.03)', borderColor: 'rgba(172,149,135,0.18)' }}
                                                            onClick={() => toggleSemester(c.semester)}>
                                                            <td colSpan={6} className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#8C6441' }}>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="flex items-center gap-2">
                                                                        <BookOpen className="size-3.5" />
                                                                        Semester {c.semester}
                                                                    </span>
                                                                    <ChevronDown className={`size-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                                        style={{ color: 'rgba(140,100,65,0.60)' }} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {isExpanded && (
                                                        <tr className="border-b transition-colors hover:bg-amber-500/[0.04]"
                                                            style={{ borderColor: 'rgba(172,149,135,0.10)' }}>
                                                            <td className="px-4 py-3 font-mono text-xs" style={{ color: 'rgba(80,86,102,0.40)' }}>{i + 1}</td>
                                                            <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: '#8C6441' }}>{c.code}</td>
                                                            <td className="px-4 py-3 font-medium" style={{ color: '#24141F' }}>{l === 'id' ? c.name_id : c.name_en}</td>
                                                            <td className="px-4 py-3 text-center font-mono font-bold" style={{ color: '#505666' }}>{c.sks}</td>
                                                            <td className="px-4 py-3 text-center font-mono text-xs" style={{ color: 'rgba(80,86,102,0.60)' }}>{c.semester}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                                                                    c.type === 'wajib'
                                                                        ? 'bg-brand-700/8 text-brand-700'
                                                                        : 'bg-amber-500/10 text-amber-700'
                                                                }`}>
                                                                    {c.type === 'wajib' ? (l === 'id' ? 'Wajib' : 'Core') : (l === 'id' ? 'Pilihan' : 'Elective')}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Fragment>
                                            );
                                        });
                                    })() : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-12 text-center text-sm italic" style={{ color: 'rgba(80,86,102,0.40)' }}>
                                                {l === 'id' ? 'Data kurikulum belum tersedia.' : 'Curriculum data not yet available.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
