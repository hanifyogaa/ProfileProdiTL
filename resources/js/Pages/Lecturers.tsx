import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink, GraduationCap, Mail, X } from 'lucide-react';
import { useState } from 'react';

interface Education {
    degree: string;
    institution: string;
    year?: number;
    major?: string;
}

interface TeachingTerm {
    semester: string;
    courses: string[];
}

interface LecturerItem {
    id: number;
    name: string;
    nidn: string | null;
    functional_position: string | null;
    position_id: string | null;
    position_en: string | null;
    bio_id: string | null;
    bio_en: string | null;
    expertise: string[] | null;
    education: Education[] | null;
    teaching_history: TeachingTerm[] | null;
    photo: string | null;
    scholar_url: string | null;
    scholar_id: string | null;
    sinta_url: string | null;
    sinta_id: string | null;
    scopus_url: string | null;
    scopus_id: string | null;
    email: string | null;
}

// Fallback data jika DB kosong
const FALLBACK_LECTURERS: LecturerItem[] = [
    {
        id: 1,
        name: 'Dr. Ir. Muhammad Akbar, S.T., M.T.',
        nidn: '0412038701',
        functional_position: 'Lektor Kepala',
        position_id: 'Ketua Program Studi',
        position_en: 'Head of Study Program',
        bio_id: 'Dr. Akbar adalah pakar di bidang e-logistik dan sistem rantai pasok digital. Beliau aktif dalam riset integrasi teknologi informasi dalam manajemen logistik modern dan telah mempublikasikan lebih dari 30 artikel ilmiah di jurnal internasional bereputasi.',
        bio_en: 'Dr. Akbar is an expert in e-logistics and digital supply chain systems. He is active in researching IT integration in modern logistics management and has published over 30 papers in reputable international journals.',
        expertise: ['Smart Warehousing', 'Digital Logistics', 'e-Logistics Systems', 'IoT in Supply Chain'],
        education: [
            { degree: 'S3', institution: 'Institut Teknologi Bandung', year: 2015, major: 'Teknik Industri' },
            { degree: 'S2', institution: 'Universitas Indonesia', year: 2010, major: 'Manajemen Sistem Informasi' },
            { degree: 'S1', institution: 'Telkom University', year: 2007, major: 'Teknik Industri' },
        ],
        teaching_history: [
            { semester: 'Ganjil 2024/2025', courses: ['Logistik Digital', 'Sistem e-Logistik', 'Manajemen Rantai Pasok'] },
            { semester: 'Genap 2023/2024', courses: ['Otomasi Gudang', 'Sistem Informasi Logistik'] },
            { semester: 'Ganjil 2023/2024', courses: ['Logistik Digital', 'Kapita Selekta Logistik'] },
        ],
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: 'https://scholar.google.com', scholar_id: 'MpktzzcAAAAJ',
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '6016350',
        scopus_url: null, scopus_id: null,
        email: 'akbar@telkomuniversity.ac.id',
    },
    {
        id: 2,
        name: 'Dr. Guntur Halim, M.T.',
        nidn: '0419088602',
        functional_position: 'Lektor',
        position_id: 'Dosen Tetap',
        position_en: 'Full-time Lecturer',
        bio_id: 'Dr. Guntur berfokus pada desain sistem rantai pasok dan otomasi industri. Risetnya mencakup penerapan simulasi sistem dinamis dalam optimalisasi alur logistik di lingkungan industri manufaktur berskala besar.',
        bio_en: 'Dr. Guntur focuses on supply chain system design and industrial automation. His research spans the application of system dynamics simulation in optimizing logistics flows in large-scale manufacturing environments.',
        expertise: ['Supply Chain Design', 'Systems Dynamics', 'Industrial Automation'],
        education: [
            { degree: 'S3', institution: 'Universitas Gadjah Mada', year: 2017, major: 'Teknik Mesin' },
            { degree: 'S2', institution: 'Institut Teknologi Sepuluh Nopember', year: 2012, major: 'Teknik Industri' },
        ],
        teaching_history: [
            { semester: 'Ganjil 2024/2025', courses: ['Simulasi Sistem', 'Perancangan Tata Letak Fasilitas', 'Riset Operasi'] },
            { semester: 'Genap 2023/2024', courses: ['Perancangan Sistem Produksi', 'Simulasi Sistem'] },
        ],
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: 'https://scholar.google.com', scholar_id: null,
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '5021890',
        scopus_url: 'https://www.scopus.com', scopus_id: '55315386600',
        email: null,
    },
    {
        id: 3,
        name: 'Rian Pradana, S.T., M.Sc.',
        nidn: '0422119103',
        functional_position: 'Asisten Ahli',
        position_id: 'Dosen Tetap',
        position_en: 'Full-time Lecturer',
        bio_id: 'Rian Pradana merupakan dosen muda yang aktif dalam riset analitika logistik dan machine learning untuk prediksi permintaan. Beliau meraih gelar M.Sc. dari Eindhoven University of Technology, Belanda.',
        bio_en: 'Rian Pradana is a young lecturer active in logistics analytics and machine learning for demand forecasting. He obtained his M.Sc. from Eindhoven University of Technology, Netherlands.',
        expertise: ['Logistics Analytics', 'Operations Research', 'Machine Learning', 'Demand Forecasting'],
        education: [
            { degree: 'S2', institution: 'Eindhoven University of Technology', year: 2019, major: 'Operations Management' },
            { degree: 'S1', institution: 'Telkom University', year: 2016, major: 'Teknik Industri' },
        ],
        teaching_history: [
            { semester: 'Ganjil 2024/2025', courses: ['Analitika Data Logistik', 'Pemrograman Python untuk Logistik'] },
            { semester: 'Genap 2023/2024', courses: ['Statistika Industri', 'Analitika Data Logistik'] },
        ],
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: null, scholar_id: null,
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '7098234',
        scopus_url: null, scopus_id: null,
        email: 'rian.pradana@telkomuniversity.ac.id',
    },
    {
        id: 4,
        name: 'Sarah Clarissa, M.Eng.',
        nidn: '0405028904',
        functional_position: 'Asisten Ahli',
        position_id: 'Dosen Tetap',
        position_en: 'Full-time Lecturer',
        bio_id: 'Sarah Clarissa adalah dosen dengan keahlian di bidang cold chain logistics dan manajemen risiko rantai pasok. Pengalamannya mencakup konsultasi untuk perusahaan fast-moving consumer goods terkemuka di Indonesia.',
        bio_en: 'Sarah Clarissa is a lecturer with expertise in cold chain logistics and supply chain risk management. Her experience includes consulting for leading FMCG companies in Indonesia.',
        expertise: ['Cold Chain Logistics', 'Inventory Control', 'Risk Management'],
        education: [
            { degree: 'S2', institution: 'Institut Teknologi Bandung', year: 2014, major: 'Teknik Industri' },
            { degree: 'S1', institution: 'Universitas Padjadjaran', year: 2011, major: 'Manajemen' },
        ],
        teaching_history: [
            { semester: 'Ganjil 2024/2025', courses: ['Manajemen Persediaan', 'Logistik Rantai Dingin', 'Manajemen Risiko'] },
            { semester: 'Genap 2023/2024', courses: ['Manajemen Persediaan', 'Distribusi & Transportasi'] },
        ],
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: 'https://scholar.google.com', scholar_id: 'AbcXyzAAAAJ',
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '8034512',
        scopus_url: null, scopus_id: null,
        email: 'sarah.clarissa@telkomuniversity.ac.id',
    },
];

function LecturerModal({ dosen, onClose }: { dosen: LecturerItem; onClose: () => void }) {
    const { locale } = useLocale();
    const bio = locale === 'id' ? dosen.bio_id : dosen.bio_en;
    const position = locale === 'id' ? dosen.position_id : dosen.position_en;
    const photoSrc = dosen.photo?.startsWith('http')
        ? dosen.photo
        : dosen.photo
          ? `/storage/${dosen.photo}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.name)}&background=8C6441&color=fff&size=400`;

    const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({});
    const toggleSemester = (i: number) =>
        setOpenSemesters((prev) => ({ ...prev, [i]: !prev[i] }));

    const hasPublications = dosen.scopus_id || dosen.scholar_id || dosen.sinta_id ||
        dosen.scopus_url || dosen.scholar_url || dosen.sinta_url;

    const pubRows = [
        {
            label: 'Scopus',
            id: dosen.scopus_id,
            idLabel: locale === 'id' ? 'Author ID' : 'Author ID',
            url: dosen.scopus_url,
        },
        {
            label: 'Google Scholar',
            id: dosen.scholar_id,
            idLabel: 'Profile Key',
            url: dosen.scholar_url,
        },
        {
            label: 'SINTA',
            id: dosen.sinta_id,
            idLabel: locale === 'id' ? 'Author ID' : 'Author ID',
            url: dosen.sinta_url,
        },
    ].filter((r) => r.id || r.url);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
                style={{ background: 'rgba(36,20,31,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={onClose}
            >
                {/* Modal box */}
                <motion.div
                    className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl"
                    style={{
                        background: '#FFFDFB',
                        boxShadow: '0 32px 80px -16px rgba(36,20,31,0.55), 0 8px 24px -8px rgba(36,20,31,0.25)',
                    }}
                    initial={{ opacity: 0, scale: 0.90, y: 28 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.90, y: 28 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                    aria-modal="true"
                    role="dialog"
                    aria-label={dosen.name}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup"
                        className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                        style={{ background: 'rgba(36,20,31,0.50)', backdropFilter: 'blur(8px)', color: 'white' }}
                    >
                        <X className="size-4" />
                    </button>

                    {/* Two-column layout */}
                    <div className="flex flex-col sm:flex-row">

                        {/* ── Left sidebar: photo (capped) + identity + bio ───── */}
                        <div className="shrink-0 sm:w-[272px] sm:overflow-y-auto" style={{ maxHeight: '600px' }}>

                            {/* Photo — fixed height, not full stretch */}
                            <div className="relative h-[260px] w-full overflow-hidden">
                                <img
                                    src={photoSrc}
                                    alt={dosen.name}
                                    className="absolute inset-0 size-full object-cover object-top"
                                />
                                {/* Scrim bottom for name legibility */}
                                <div
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(36,20,31,0.88) 0%, rgba(36,20,31,0.30) 50%, transparent 80%)',
                                    }}
                                />
                                {/* Identity over photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    {dosen.functional_position && (
                                        <span className="mb-1 block text-[9px] font-bold tracking-[0.20em] uppercase" style={{ color: '#D99F60' }}>
                                            {dosen.functional_position}
                                        </span>
                                    )}
                                    <h2 className="font-display text-base font-bold leading-snug text-white">
                                        {dosen.name}
                                    </h2>
                                    {position && (
                                        <p className="mt-0.5 text-xs font-medium" style={{ color: 'rgba(172,149,135,0.9)' }}>
                                            {position}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Below photo: NIDN, email, bio */}
                            <div className="flex flex-col gap-4 p-5" style={{ background: '#FFFDFB' }}>
                                {/* NIDN + email */}
                                <div className="flex flex-col gap-1.5">
                                    {dosen.nidn && (
                                        <span className="inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                                            style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                            NIDN {dosen.nidn}
                                        </span>
                                    )}
                                    {dosen.email && (
                                        <a href={`mailto:${dosen.email}`}
                                            className="inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-semibold tracking-wide transition-opacity hover:opacity-75"
                                            style={{ background: 'rgba(140,100,65,0.07)', color: '#8C6441' }}>
                                            <Mail className="size-2.5" />
                                            {dosen.email}
                                        </a>
                                    )}
                                </div>

                                {/* Profil / bio di bawah foto */}
                                {bio && (
                                    <div>
                                        <p className="mb-1.5 text-[9px] font-bold tracking-[0.16em] uppercase" style={{ color: '#AC9587' }}>
                                            {locale === 'id' ? 'Profil' : 'Profile'}
                                        </p>
                                        <p className="text-[12.5px] leading-relaxed" style={{ color: '#505666' }}>{bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Right scrollable content ────────────────────────── */}
                        <div className="flex-1 overflow-y-auto border-l" style={{ maxHeight: '600px', borderColor: 'rgba(172,149,135,0.18)' }}>
                            <div className="flex flex-col gap-7 p-7">

                                {/* Bidang Keahlian */}
                                {dosen.expertise && dosen.expertise.length > 0 && (
                                    <section>
                                        <SectionLabel icon={<span className="size-2.5 rounded-full inline-block" style={{ background: '#D99F60' }} />}>
                                            {locale === 'id' ? 'Bidang Keahlian' : 'Areas of Expertise'}
                                        </SectionLabel>
                                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                                            {dosen.expertise.map((exp, i) => (
                                                <span key={i}
                                                    className="rounded-full px-3 py-1 text-[11px] font-semibold"
                                                    style={{ background: '#ECEBE9', color: '#505666' }}>
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Riwayat Pendidikan */}
                                {dosen.education && dosen.education.length > 0 && (
                                    <section>
                                        <SectionLabel icon={<GraduationCap className="size-3" />}>
                                            {locale === 'id' ? 'Riwayat Pendidikan' : 'Education'}
                                        </SectionLabel>
                                        <div className="mt-2.5 flex flex-col gap-3">
                                            {dosen.education.map((edu, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[9px] font-black tracking-wide"
                                                        style={{ background: '#8C6441', color: '#FFFDFB' }}>
                                                        {edu.degree}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-semibold leading-snug" style={{ color: '#24141F' }}>
                                                            {edu.institution}
                                                        </p>
                                                        {edu.major && <p className="text-xs mt-0.5" style={{ color: '#505666' }}>{edu.major}</p>}
                                                        {edu.year && <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#AC9587' }}>{edu.year}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Publikasi — table-style grid */}
                                {hasPublications && (
                                    <section>
                                        <SectionLabel icon={<ExternalLink className="size-3" />}>
                                            {locale === 'id' ? 'Publikasi & Profil Akademik' : 'Publications & Academic Profiles'}
                                        </SectionLabel>
                                        <div className="mt-3 overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(172,149,135,0.25)' }}>
                                            {pubRows.map((row, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between gap-4 px-4 py-3"
                                                    style={{
                                                        borderTop: i > 0 ? '1px solid rgba(172,149,135,0.18)' : undefined,
                                                        background: i % 2 === 0 ? 'rgba(236,235,233,0.40)' : '#FFFDFB',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span className="shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold"
                                                            style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                                            {row.label}
                                                        </span>
                                                        {row.id && (
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#AC9587' }}>
                                                                    {row.idLabel}
                                                                </p>
                                                                <p className="text-xs font-mono font-semibold truncate" style={{ color: '#24141F' }}>
                                                                    {row.id}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {row.url && (
                                                        <a href={row.url} target="_blank" rel="noopener noreferrer"
                                                            className="shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-sm"
                                                            style={{ borderColor: 'rgba(140,100,65,0.30)', color: '#8C6441' }}>
                                                            {locale === 'id' ? 'Buka Profil' : 'View Profile'}
                                                            <ExternalLink className="size-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Riwayat Mengajar — accordion per semester */}
                                {dosen.teaching_history && dosen.teaching_history.length > 0 && (
                                    <section>
                                        <SectionLabel icon={<BookOpen className="size-3" />}>
                                            {locale === 'id' ? 'Riwayat Mengajar' : 'Teaching History'}
                                        </SectionLabel>
                                        <div className="mt-3 flex flex-col gap-2">
                                            {dosen.teaching_history.map((term, i) => (
                                                <div key={i} className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(172,149,135,0.25)' }}>
                                                    {/* Accordion header */}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleSemester(i)}
                                                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-50"
                                                        style={{ background: openSemesters[i] ? 'rgba(140,100,65,0.06)' : undefined }}
                                                    >
                                                        <span className="text-sm font-semibold" style={{ color: '#24141F' }}>
                                                            {term.semester}
                                                        </span>
                                                        <div className="flex shrink-0 items-center gap-2">
                                                            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                                                style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                                                {term.courses.length} {locale === 'id' ? 'MK' : 'courses'}
                                                            </span>
                                                            <motion.span
                                                                animate={{ rotate: openSemesters[i] ? 180 : 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <ChevronDown className="size-4" style={{ color: '#8C6441' }} />
                                                            </motion.span>
                                                        </div>
                                                    </button>
                                                    {/* Accordion body */}
                                                    <AnimatePresence initial={false}>
                                                        {openSemesters[i] && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                                                style={{ overflow: 'hidden' }}
                                                            >
                                                                <div className="flex flex-col gap-1 px-4 pb-4 pt-1"
                                                                    style={{ borderTop: '1px solid rgba(172,149,135,0.18)' }}>
                                                                    {term.courses.map((course, ci) => (
                                                                        <div key={ci} className="flex items-center gap-2 py-1">
                                                                            <span className="size-1.5 shrink-0 rounded-full" style={{ background: '#D99F60' }} />
                                                                            <span className="text-sm" style={{ color: '#505666' }}>{course}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <h3 className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: '#8C6441' }}>
            {icon}
            {children}
        </h3>
    );
}

export default function Lecturers({ lecturers }: { lecturers?: LecturerItem[] }) {
    const { locale } = useLocale();
    const [selected, setSelected] = useState<LecturerItem | null>(null);

    const data = lecturers && lecturers.length > 0 ? lecturers : FALLBACK_LECTURERS;
    const title = locale === 'id' ? 'Dosen & Staf Akademik' : 'Faculty & Staff';

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1100px] px-6 py-16">
                <Reveal variant="fade-down">
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-xl text-base">
                            {locale === 'id'
                                ? 'Dosen-dosen kami aktif dalam riset internasional dan memiliki kedekatan erat dengan kebutuhan industri logistik.'
                                : 'Our lecturers are active in international research circles and highly aligned with supply chain industries.'}
                        </p>
                    </div>
                </Reveal>

                {/* Grid kartu dosen */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((dosen, index) => {
                        const photoSrc = dosen.photo?.startsWith('http')
                            ? dosen.photo
                            : dosen.photo
                              ? `/storage/${dosen.photo}`
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.name)}&background=8C6441&color=fff&size=400`;
                        const position = locale === 'id' ? dosen.position_id : dosen.position_en;

                        return (
                            <Reveal key={dosen.id} delay={index * 0.08} variant="fade-up">
                                <button
                                    type="button"
                                    onClick={() => setSelected(dosen)}
                                    className="group w-full text-left"
                                    aria-label={`Lihat profil ${dosen.name}`}
                                >
                                    <div
                                        className="overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(36,20,31,0.2)]"
                                        style={{
                                            background: 'rgba(255,253,251,0.65)',
                                            backdropFilter: 'blur(16px) saturate(160%)',
                                            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                                            borderColor: 'rgba(172,149,135,0.2)',
                                            boxShadow: '0 4px 20px -8px rgba(36,20,31,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
                                        }}
                                    >
                                        {/* Foto */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={photoSrc}
                                                alt={dosen.name}
                                                className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div
                                                className="pointer-events-none absolute inset-0"
                                                style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.5) 0%, transparent 50%)' }}
                                            />
                                            {/* Jabatan fungsional */}
                                            {dosen.functional_position && (
                                                <span
                                                    className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                                                    style={{ background: 'rgba(110,78,51,0.75)', backdropFilter: 'blur(8px)', color: '#D99F60' }}
                                                >
                                                    {dosen.functional_position}
                                                </span>
                                            )}
                                            {/* "Lihat profil" hint */}
                                            <div
                                                className="absolute bottom-3 right-3 translate-y-2 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                                style={{ background: 'rgba(217,159,96,0.9)', color: '#24141F' }}
                                            >
                                                {locale === 'id' ? 'Lihat Profil →' : 'View Profile →'}
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5">
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-base font-semibold leading-snug transition-colors">
                                                {dosen.name}
                                            </h3>
                                            {position && (
                                                <p className="mt-1 text-xs font-medium" style={{ color: '#8C6441' }}>
                                                    {position}
                                                </p>
                                            )}
                                            {dosen.nidn && (
                                                <p className="mt-1 font-mono text-[10px] font-bold tracking-wider" style={{ color: '#AC9587' }}>
                                                    NIDN: {dosen.nidn}
                                                </p>
                                            )}
                                            {dosen.expertise && dosen.expertise.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {dosen.expertise.slice(0, 3).map((exp, i) => (
                                                        <span
                                                            key={i}
                                                            className="rounded px-2 py-0.5 text-[10px] font-semibold"
                                                            style={{ background: '#ECEBE9', color: '#505666' }}
                                                        >
                                                            {exp}
                                                        </span>
                                                    ))}
                                                    {dosen.expertise.length > 3 && (
                                                        <span className="rounded px-2 py-0.5 text-[10px] font-semibold" style={{ color: '#AC9587' }}>
                                                            +{dosen.expertise.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* Modal detail dosen */}
            <AnimatePresence>
                {selected && (
                    <LecturerModal
                        dosen={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
