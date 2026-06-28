import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink, GraduationCap, Mail, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
    nip: string | null;
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

// ── Fallbacks ──────────────────────────────────────────────────────────────

const FALLBACK_KAPRODI: LecturerItem = {
    id: 1,
    name: 'Dr. Ir. Muhammad Akbar, S.T., M.T.',
    nidn: '0412038701',
    nip: null,
    functional_position: 'Lektor Kepala',
    position_id: 'Ketua Program Studi (Kaprodi)',
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
    ],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500',
    scholar_url: 'https://scholar.google.com', scholar_id: 'MpktzzcAAAAJ',
    sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '6016350',
    scopus_url: null, scopus_id: null,
    email: 'akbar@telkomuniversity.ac.id',
};

const FALLBACK_LAB_HEADS: LecturerItem[] = [
    {
        id: 2,
        name: 'Dr. Guntur Halim, M.T.',
        nidn: '0419088602',
        nip: null,
        functional_position: 'Lektor',
        position_id: 'Pembina Lab Sistem Logistik',
        position_en: 'Lab Head – Logistics Systems',
        bio_id: 'Dr. Guntur berfokus pada desain sistem rantai pasok dan otomasi industri.',
        bio_en: 'Dr. Guntur focuses on supply chain system design and industrial automation.',
        expertise: ['Supply Chain Design', 'Systems Dynamics', 'Industrial Automation'],
        education: [{ degree: 'S3', institution: 'Universitas Gadjah Mada', year: 2017, major: 'Teknik Mesin' }],
        teaching_history: [],
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: null, scholar_id: null,
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '5021890',
        scopus_url: 'https://www.scopus.com', scopus_id: '55315386600',
        email: null,
    },
    {
        id: 3,
        name: 'Rian Pradana, S.T., M.Sc.',
        nidn: '0422119103',
        nip: null,
        functional_position: 'Asisten Ahli',
        position_id: 'Pembina Lab Analitika Data',
        position_en: 'Lab Head – Data Analytics',
        bio_id: 'Rian Pradana aktif dalam riset analitika logistik dan machine learning untuk prediksi permintaan.',
        bio_en: 'Rian Pradana is active in logistics analytics and machine learning for demand forecasting.',
        expertise: ['Logistics Analytics', 'Operations Research', 'Machine Learning'],
        education: [{ degree: 'S2', institution: 'Eindhoven University of Technology', year: 2019, major: 'Operations Management' }],
        teaching_history: [],
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: null, scholar_id: null,
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '7098234',
        scopus_url: null, scopus_id: null,
        email: 'rian.pradana@telkomuniversity.ac.id',
    },
];

const FALLBACK_LECTURERS: LecturerItem[] = [
    {
        id: 4,
        name: 'Sarah Clarissa, M.Eng.',
        nidn: '0405028904',
        nip: null,
        functional_position: 'Asisten Ahli',
        position_id: 'Dosen Tetap',
        position_en: 'Full-time Lecturer',
        bio_id: 'Sarah Clarissa adalah dosen dengan keahlian di bidang cold chain logistics dan manajemen risiko rantai pasok.',
        bio_en: 'Sarah Clarissa is a lecturer with expertise in cold chain logistics and supply chain risk management.',
        expertise: ['Cold Chain Logistics', 'Inventory Control', 'Risk Management'],
        education: [{ degree: 'S2', institution: 'Institut Teknologi Bandung', year: 2014, major: 'Teknik Industri' }],
        teaching_history: [],
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
        scholar_url: 'https://scholar.google.com', scholar_id: 'AbcXyzAAAAJ',
        sinta_url: 'https://sinta.kemdikbud.go.id', sinta_id: '8034512',
        scopus_url: null, scopus_id: null,
        email: 'sarah.clarissa@telkomuniversity.ac.id',
    },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function photoSrc(dosen: LecturerItem) {
    if (!dosen.photo) return `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.name)}&background=8C6441&color=fff&size=400`;
    if (dosen.photo.startsWith('http') || dosen.photo.startsWith('/storage/') || dosen.photo.startsWith('/images/')) return dosen.photo;
    return `/storage/${dosen.photo}`;
}

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <h3 className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: '#8C6441' }}>
            {icon}{children}
        </h3>
    );
}

// ── Modal ──────────────────────────────────────────────────────────────────

function LecturerModal({ dosen, onClose }: { dosen: LecturerItem; onClose: () => void }) {
    const { locale } = useLocale();
    const bio = locale === 'id' ? dosen.bio_id : dosen.bio_en;
    const src = photoSrc(dosen);
    const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({});
    const toggleSemester = (i: number) => setOpenSemesters((p) => ({ ...p, [i]: !p[i] }));

    const hasPublications = dosen.scopus_id || dosen.scholar_id || dosen.sinta_id || dosen.scopus_url || dosen.scholar_url || dosen.sinta_url;
    const pubRows = [
        { label: 'Scopus',         id: dosen.scopus_id,  idLabel: 'Author ID',   url: dosen.scopus_url },
        { label: 'Google Scholar', id: dosen.scholar_id, idLabel: 'Profile Key', url: dosen.scholar_url },
        { label: 'SINTA',          id: dosen.sinta_id,   idLabel: 'Author ID',   url: dosen.sinta_url },
    ].filter((r) => r.id || r.url);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
            style={{ background: 'rgba(36,20,31,0.65)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
        >
            <motion.div
                className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl"
                style={{ background: '#FFFDFB', boxShadow: '0 32px 80px -16px rgba(36,20,31,0.55)' }}
                initial={{ opacity: 0, scale: 0.90, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.90, y: 28 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                aria-modal="true" role="dialog" aria-label={dosen.name}
            >
                <button type="button" onClick={onClose} aria-label="Tutup"
                    className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(36,20,31,0.50)', color: 'white' }}>
                    <X className="size-4" />
                </button>

                <div className="flex flex-col sm:flex-row">
                    {/* Left sidebar — foto + identitas + publikasi */}
                    <div className="shrink-0 sm:w-[272px] sm:overflow-y-auto border-r" style={{ maxHeight: '600px', borderColor: 'rgba(172,149,135,0.18)' }}>
                        <div className="h-[260px] w-full overflow-hidden">
                            <img src={src} alt={dosen.name} className="size-full object-cover object-top" />
                        </div>
                        <div className="flex flex-col gap-4 p-5" style={{ background: '#FFFDFB' }}>
                            {/* Nama & badge */}
                            <div>
                                {dosen.functional_position && (
                                    <span className="mb-1 block text-[9px] font-bold tracking-[0.20em] uppercase" style={{ color: '#D99F60' }}>{dosen.functional_position}</span>
                                )}
                                <h2 className="font-display text-base font-bold leading-snug" style={{ color: '#24141F' }}>{dosen.name}</h2>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {dosen.nidn && (
                                    <span className="inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase" style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>NIDN {dosen.nidn}</span>
                                )}
                                {dosen.nip && (
                                    <span className="inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase" style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>NIP {dosen.nip}</span>
                                )}
                                {dosen.email && (
                                    <a href={`mailto:${dosen.email}`} className="inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-semibold tracking-wide hover:opacity-75" style={{ background: 'rgba(140,100,65,0.07)', color: '#8C6441' }}>
                                        <Mail className="size-2.5" />{dosen.email}
                                    </a>
                                )}
                            </div>

                            {/* Publikasi */}
                            {hasPublications && (
                                <div>
                                    <p className="mb-2 text-[9px] font-bold tracking-[0.16em] uppercase" style={{ color: '#AC9587' }}>{locale === 'id' ? 'Profil Akademik' : 'Academic Profiles'}</p>
                                    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(172,149,135,0.25)' }}>
                                        {pubRows.map((row, i) => {
                                            const inner = (
                                                <div className="flex items-center justify-between gap-2 px-3 py-2.5 w-full"
                                                    style={{ borderTop: i > 0 ? '1px solid rgba(172,149,135,0.18)' : undefined, background: i % 2 === 0 ? 'rgba(236,235,233,0.40)' : '#FFFDFB' }}>
                                                    <span className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>{row.label}</span>
                                                    {row.id && <p className="text-[11px] font-mono font-semibold truncate" style={{ color: '#24141F' }}>{row.id}</p>}
                                                    {row.url && <ExternalLink className="size-3 shrink-0" style={{ color: '#AC9587' }} />}
                                                </div>
                                            );
                                            return row.url ? (
                                                <a key={i} href={row.url} target="_blank" rel="noopener noreferrer"
                                                    className="block transition-opacity hover:opacity-75">
                                                    {inner}
                                                </a>
                                            ) : (
                                                <div key={i}>{inner}</div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right — profil + keahlian + pendidikan + riwayat mengajar */}
                    <div className="flex-1 overflow-y-auto" style={{ maxHeight: '600px' }}>
                        <div className="flex flex-col gap-7 p-7">
                            {bio && (
                                <section>
                                    <SectionLabel icon={<Users className="size-3" />}>{locale === 'id' ? 'Profil' : 'Profile'}</SectionLabel>
                                    <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: '#505666' }}>{bio}</p>
                                </section>
                            )}
                            {dosen.expertise && dosen.expertise.length > 0 && (
                                <section>
                                    <SectionLabel icon={<span className="size-2.5 rounded-full inline-block" style={{ background: '#D99F60' }} />}>{locale === 'id' ? 'Bidang Keahlian' : 'Areas of Expertise'}</SectionLabel>
                                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                                        {dosen.expertise.map((exp, i) => (
                                            <span key={i} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: '#ECEBE9', color: '#505666' }}>{exp}</span>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {dosen.education && dosen.education.length > 0 && (
                                <section>
                                    <SectionLabel icon={<GraduationCap className="size-3" />}>{locale === 'id' ? 'Riwayat Pendidikan' : 'Education'}</SectionLabel>
                                    <div className="mt-2.5 flex flex-col gap-3">
                                        {dosen.education.map((edu, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <span className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[9px] font-black tracking-wide" style={{ background: '#8C6441', color: '#FFFDFB' }}>{edu.degree}</span>
                                                <div>
                                                    <p className="text-sm font-semibold leading-snug" style={{ color: '#24141F' }}>{edu.institution}</p>
                                                    {edu.major && <p className="text-xs mt-0.5" style={{ color: '#505666' }}>{edu.major}</p>}
                                                    {edu.year && <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#AC9587' }}>{edu.year}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {dosen.teaching_history && dosen.teaching_history.length > 0 && (
                                <section>
                                    <SectionLabel icon={<BookOpen className="size-3" />}>{locale === 'id' ? 'Riwayat Mengajar' : 'Teaching History'}</SectionLabel>
                                    <div className="mt-3 flex flex-col gap-2">
                                        {dosen.teaching_history.map((term, i) => (
                                            <div key={i} className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(172,149,135,0.25)' }}>
                                                <button type="button" onClick={() => toggleSemester(i)}
                                                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-50"
                                                    style={{ background: openSemesters[i] ? 'rgba(140,100,65,0.06)' : undefined }}>
                                                    <span className="text-sm font-semibold" style={{ color: '#24141F' }}>{term.semester}</span>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                                            {term.courses.length} {locale === 'id' ? 'MK' : 'courses'}
                                                        </span>
                                                        <motion.span animate={{ rotate: openSemesters[i] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                            <ChevronDown className="size-4" style={{ color: '#8C6441' }} />
                                                        </motion.span>
                                                    </div>
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {openSemesters[i] && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
                                                            <div className="flex flex-col gap-1 px-4 pb-4 pt-1" style={{ borderTop: '1px solid rgba(172,149,135,0.18)' }}>
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
                            {!bio && (!dosen.teaching_history || dosen.teaching_history.length === 0) && (
                                <p className="text-sm italic" style={{ color: '#AC9587' }}>
                                    {locale === 'id' ? 'Belum ada informasi tambahan.' : 'No additional information available.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Lecturer Card (grid) ───────────────────────────────────────────────────

function LecturerCard({ dosen, onClick, index }: { dosen: LecturerItem; onClick: () => void; index: number }) {
    const { locale } = useLocale();
    const src = photoSrc(dosen);
    const position = locale === 'id' ? dosen.position_id : dosen.position_en;

    return (
        <Reveal key={dosen.id} delay={index * 0.08} variant="fade-up">
            <button type="button" onClick={onClick} className="group w-full text-left" aria-label={`Lihat profil ${dosen.name}`}>
                <div className="overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(36,20,31,0.2)]"
                    style={{ background: 'rgba(255,253,251,0.65)', backdropFilter: 'blur(16px) saturate(160%)', borderColor: 'rgba(172,149,135,0.2)', boxShadow: '0 4px 20px -8px rgba(36,20,31,0.10)' }}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={src} alt={dosen.name} className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.5) 0%, transparent 50%)' }} />
                        {dosen.functional_position && (
                            <span className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                                style={{ background: 'rgba(110,78,51,0.75)', backdropFilter: 'blur(8px)', color: '#D99F60' }}>
                                {dosen.functional_position}
                            </span>
                        )}
                        <div className="absolute bottom-3 right-3 translate-y-2 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                            style={{ background: 'rgba(217,159,96,0.9)', color: '#24141F' }}>
                            {locale === 'id' ? 'Lihat Profil →' : 'View Profile →'}
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-base font-semibold leading-snug transition-colors">{dosen.name}</h3>
                        {position && <p className="mt-1 text-xs font-medium" style={{ color: '#8C6441' }}>{position}</p>}
                        {dosen.nidn && <p className="mt-1 font-mono text-[10px] font-bold tracking-wider" style={{ color: '#AC9587' }}>NIDN: {dosen.nidn}</p>}
                        {dosen.expertise && dosen.expertise.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {dosen.expertise.slice(0, 3).map((exp, i) => (
                                    <span key={i} className="rounded px-2 py-0.5 text-[10px] font-semibold" style={{ background: '#ECEBE9', color: '#505666' }}>{exp}</span>
                                ))}
                                {dosen.expertise.length > 3 && (
                                    <span className="rounded px-2 py-0.5 text-[10px] font-semibold" style={{ color: '#AC9587' }}>+{dosen.expertise.length - 3}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </button>
        </Reveal>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────

interface LecturersProps {
    kaprodi?: LecturerItem | null;
    labHeads?: LecturerItem[];
    lecturers?: LecturerItem[];
}

const LECTURER_HERO_BG = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=85&w=1920';

export default function Lecturers({ kaprodi, labHeads, lecturers }: LecturersProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const [selected, setSelected] = useState<LecturerItem | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const hasDbData = !!kaprodi || (labHeads && labHeads.length > 0) || (lecturers && lecturers.length > 0);

    const kaprodiData  = kaprodi  ?? (hasDbData ? null : FALLBACK_KAPRODI);
    const labHeadsData = labHeads && labHeads.length > 0 ? labHeads : (hasDbData ? [] : FALLBACK_LAB_HEADS);
    const staffData    = lecturers && lecturers.length > 0 ? lecturers : (hasDbData ? [] : FALLBACK_LECTURERS);

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;
        const el = document.getElementById(hash.slice(1));
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    }, []);

    const title = l === 'id' ? 'Dosen & Staf Akademik' : 'Faculty & Academic Staff';
    const totalStaff = labHeadsData.length + staffData.length + 1;

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── CINEMATIC HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[64vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={LECTURER_HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.35 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.50) 55%, rgba(36,20,31,0.15) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-36"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <div className="grid items-end gap-10 md:grid-cols-12">
                        <div className="md:col-span-8">
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                    <Users className="size-3.5" />
                                    {l === 'id' ? 'Struktur & SDM' : 'Structure & Faculty'}
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
                                <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {l === 'id'
                                        ? 'Dikelola oleh tim akademik berpengalaman yang aktif dalam riset internasional dan memiliki kedekatan erat dengan industri logistik.'
                                        : 'Led by an experienced academic team active in international research and closely aligned with the logistics industry.'}
                                </p>
                            </Reveal>
                        </div>
                        <div className="md:col-span-4">
                            <Reveal delay={0.15}>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { val: String(totalStaff) + '+', desc: l === 'id' ? 'Tenaga Pengajar' : 'Faculty Members' },
                                        { val: 'S3', desc: l === 'id' ? 'Kualifikasi' : 'Qualification' },
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

            <div className="mx-auto max-w-[1100px] px-6 pb-24 pt-16">

                {/* ── 1. Kaprodi ── */}
                {kaprodiData && (
                    <div id="org" className="scroll-mt-24">
                        <Reveal>
                            <h2 className="font-display text-ink-900 mb-6 text-xl font-semibold">
                                {l === 'id' ? 'Ketua Program Studi' : 'Head of Study Program'}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <button type="button" onClick={() => setSelected(kaprodiData)} className="group mb-16 w-full text-left" aria-label={`Lihat profil ${kaprodiData.name}`}>
                                <div className="overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.22)]"
                                    style={{ background: 'rgba(255,253,251,0.80)', backdropFilter: 'blur(16px)', borderColor: 'rgba(172,149,135,0.25)', boxShadow: '0 6px 24px -8px rgba(36,20,31,0.12)' }}>
                                    <div className="grid md:grid-cols-12">
                                        {/* Photo */}
                                        <div className="relative overflow-hidden rounded-t-3xl md:col-span-4 md:rounded-l-3xl md:rounded-tr-none" style={{ minHeight: 300 }}>
                                            <img src={photoSrc(kaprodiData)} alt={kaprodiData.name}
                                                className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.6) 0%, transparent 55%)' }} />
                                            {kaprodiData.functional_position && (
                                                <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
                                                    style={{ background: 'rgba(110,78,51,0.80)', backdropFilter: 'blur(8px)', color: '#D99F60' }}>
                                                    {kaprodiData.functional_position}
                                                </span>
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-col justify-center gap-5 p-8 md:col-span-8 md:p-12">
                                            <div>
                                                <p className="text-brand-700 mb-2 text-xs font-bold uppercase tracking-widest">
                                                    {l === 'id' ? kaprodiData.position_id : kaprodiData.position_en}
                                                </p>
                                                <h3 className="font-display text-ink-900 text-2xl font-bold leading-snug sm:text-3xl">{kaprodiData.name}</h3>
                                                {kaprodiData.nidn && (
                                                    <p className="mt-1 font-mono text-xs font-semibold" style={{ color: '#AC9587' }}>NIDN: {kaprodiData.nidn}</p>
                                                )}
                                            </div>
                                            {kaprodiData.expertise && kaprodiData.expertise.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {kaprodiData.expertise.map((exp, i) => (
                                                        <span key={i} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>{exp}</span>
                                                    ))}
                                                </div>
                                            )}
                                            {(kaprodiData.bio_id || kaprodiData.bio_en) && (
                                                <p className="text-navy-700 text-sm leading-relaxed line-clamp-3">
                                                    {l === 'id' ? kaprodiData.bio_id : kaprodiData.bio_en}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-4">
                                                {kaprodiData.email && (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#8C6441' }}>
                                                        <Mail className="size-3.5" />{kaprodiData.email}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition-all group-hover:bg-brand-700 group-hover:text-white group-hover:border-brand-700"
                                                    style={{ borderColor: 'rgba(140,100,65,0.35)', color: '#8C6441' }}>
                                                    {l === 'id' ? 'Lihat Profil Lengkap →' : 'View Full Profile →'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </Reveal>
                    </div>
                )}

                {/* ── 2. Pembina Lab ── */}
                {labHeadsData.length > 0 && (
                    <div id="labs" className="scroll-mt-24">
                        <Reveal>
                            <h2 className="font-display text-ink-900 mb-6 text-xl font-semibold">
                                {l === 'id' ? 'Pembina Laboratorium' : 'Laboratory Supervisors'}
                            </h2>
                        </Reveal>
                        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {labHeadsData.map((dosen, i) => (
                                <LecturerCard key={dosen.id} dosen={dosen} onClick={() => setSelected(dosen)} index={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Divider ── */}
                <div id="staff" className="scroll-mt-24">
                <Reveal>
                    <div className="mb-14 flex items-center gap-4">
                        <div className="h-px flex-1 bg-cream-300/40" />
                        <span className="text-xs font-bold uppercase tracking-widest text-navy-700/40">
                            {l === 'id' ? 'Staf Pengajar' : 'Teaching Staff'}
                        </span>
                        <div className="h-px flex-1 bg-cream-300/40" />
                    </div>
                </Reveal>

                {/* ── 3. Dosen Staff ── */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {staffData.map((dosen, i) => (
                        <LecturerCard key={dosen.id} dosen={dosen} onClick={() => setSelected(dosen)} index={i} />
                    ))}
                </div>
                </div>{/* end #staff */}

            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && <LecturerModal dosen={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </MainLayout>
    );
}
