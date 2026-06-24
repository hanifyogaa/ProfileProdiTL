import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Heart, Instagram, Lightbulb, Target, Users } from 'lucide-react';
import { useRef } from 'react';

const HERO_BG = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=85&w=1920';

interface Division {
    name: string;
    description: { id: string; en: string };
}

interface OrgContent {
    name?: string;
    description?: { id: string; en: string };
    vision?: { id: string; en: string };
    instagram?: string;
    divisions?: Division[];
}

interface StudentAssociationProps {
    orgContent?: OrgContent;
}

const DIVISION_ICONS: React.ReactNode[] = [
    <BookOpen className="size-5" />,
    <Lightbulb className="size-5" />,
    <Award className="size-5" />,
    <Users className="size-5" />,
    <Heart className="size-5" />,
    <GraduationCap className="size-5" />,
];

const DIVISION_ACCENTS = ['#D99F60', '#8C6441', '#6E4E33', '#505666', '#C08A4C', '#AC9587'];

const FALLBACK_DIVISIONS: Division[] = [
    { name: 'Divisi Akademik',           description: { id: 'Mendukung kegiatan akademik mahasiswa, bimbingan belajar, dan persiapan ujian.',                                                   en: 'Supporting student academic activities, tutoring, and exam preparation.' } },
    { name: 'Divisi Kewirausahaan',      description: { id: 'Mengembangkan jiwa wirausaha mahasiswa melalui pelatihan, kompetisi bisnis, dan inkubator startup.',                               en: 'Developing student entrepreneurship through training, business competitions, and startup incubation.' } },
    { name: 'Divisi Riset & Inovasi',    description: { id: 'Mendorong budaya riset mahasiswa melalui PKM, paper ilmiah, dan inovasi teknologi logistik.',                                      en: 'Fostering a research culture through student programs, scientific papers, and logistics innovation.' } },
    { name: 'Divisi Hubungan Luar',      description: { id: 'Menjalin relasi dengan industri, alumni, dan organisasi mahasiswa nasional/internasional.',                                        en: 'Building relations with industry, alumni, and national/international student organizations.' } },
    { name: 'Divisi Seni & Olahraga',    description: { id: 'Mengembangkan bakat seni, olahraga, dan kreativitas mahasiswa melalui berbagai kompetisi dan event.',                              en: 'Developing arts, sports, and creative talents through various competitions and events.' } },
    { name: 'Divisi Sosial & Lingkungan',description: { id: 'Menggerakkan kepedulian sosial dan lingkungan mahasiswa melalui bakti sosial dan program hijau.',                                  en: 'Driving social and environmental awareness through community service and green programs.' } },
];

export default function StudentAssociation({ orgContent }: StudentAssociationProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const orgName   = orgContent?.name ?? 'HIMA Teknik Logistik';
    const title     = l === 'id' ? 'Kemahasiswaan & HIMA' : 'Student Association';
    const description = orgContent?.description?.[l] ??
        (l === 'id'
            ? 'Himpunan Mahasiswa Teknik Logistik (HIMA Teklog) adalah organisasi kemahasiswaan yang menjadi wadah pengembangan diri, kepemimpinan, dan kreativitas mahasiswa Program Studi Teknik Logistik Telkom University.'
            : 'The Logistics Engineering Student Association (HIMA Teklog) is the student organization serving as a platform for personal development, leadership, and creativity for students of the Logistics Engineering Program at Telkom University.');
    const vision = orgContent?.vision?.[l] ??
        (l === 'id'
            ? '"Menjadi organisasi kemahasiswaan yang aktif, inovatif, dan berdampak dalam mengembangkan potensi mahasiswa Teknik Logistik."'
            : '"To be an active, innovative, and impactful student organization in developing the potential of Logistics Engineering students."');
    const divisions: Division[] = orgContent?.divisions?.length ? orgContent.divisions : FALLBACK_DIVISIONS;

    return (
        <MainLayout fullHero>
            <Head title={`${orgName} — ${title}`} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[64vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.30 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.52) 55%, rgba(36,20,31,0.15) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <div className="grid items-end gap-8 md:grid-cols-12">
                        {/* Left: text */}
                        <div className="md:col-span-8">
                            <Reveal>
                                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                                    style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                                    <Users className="size-3.5" />
                                    {l === 'id' ? 'Kemahasiswaan' : 'Student Life'}
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{orgName}</h1>
                                <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {description}
                                </p>
                                {orgContent?.instagram && (
                                    <a
                                        href={`https://instagram.com/${orgContent.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-75"
                                        style={{ background: 'rgba(255,253,251,0.08)', color: '#FFFDFB', border: '1px solid rgba(172,149,135,0.20)' }}
                                    >
                                        <Instagram className="size-4" />
                                        {orgContent.instagram}
                                    </a>
                                )}
                            </Reveal>
                        </div>
                        {/* Right: vision card */}
                        <div className="md:col-span-4">
                            <Reveal delay={0.18}>
                                <div className="rounded-3xl p-6" style={{ background: 'rgba(140,100,65,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(217,159,96,0.20)' }}>
                                    <Target className="mb-3 size-5" style={{ color: '#D99F60' }} />
                                    <p className="font-display text-sm font-medium italic leading-relaxed" style={{ color: 'rgba(255,253,251,0.90)' }}>
                                        {vision}
                                    </p>
                                    <div className="mt-4 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(172,149,135,0.65)' }}>
                                            {l === 'id' ? 'Visi Organisasi' : 'Organizational Vision'}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── DIVISIONS ── */}
            <section className="py-20" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                                style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                {l === 'id' ? 'Struktur' : 'Structure'}
                            </span>
                            <h2 className="font-display text-3xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Divisi & Bidang Kerja' : 'Divisions & Work Areas'}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Setiap divisi memiliki program kerja yang berdampak langsung pada pengembangan mahasiswa.'
                                    : 'Each division runs programs with direct impact on student development.'}
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {divisions.map((div, i) => {
                            const accent = DIVISION_ACCENTS[i % DIVISION_ACCENTS.length];
                            return (
                                <Reveal key={i} delay={i * 0.07} variant="fade-up">
                                    <div className="flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(36,20,31,0.14)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        <div className="mb-4 flex size-11 items-center justify-center rounded-xl"
                                            style={{ background: `${accent}18`, color: accent }}>
                                            {DIVISION_ICONS[i % DIVISION_ICONS.length]}
                                        </div>
                                        <div className="mb-1 h-0.5 w-8 rounded-full" style={{ background: `${accent}50` }} />
                                        <h3 className="font-display mb-2 mt-3 text-base font-semibold" style={{ color: '#24141F' }}>
                                            {div.name}
                                        </h3>
                                        <p className="flex-1 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                            {div.description[l]}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── DARK BAND STATS ── */}
            <section className="py-16" style={{ background: 'linear-gradient(135deg, rgba(46,28,39,0.97) 0%, rgba(36,20,31,0.94) 100%)', borderTop: '1px solid rgba(172,149,135,0.08)', borderBottom: '1px solid rgba(172,149,135,0.08)' }}>
                <Reveal>
                    <div className="mx-auto max-w-[900px] px-6">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { val: divisions.length, label: l === 'id' ? 'Divisi Aktif' : 'Active Divisions' },
                                { val: '12+', label: l === 'id' ? 'Program Kerja' : 'Work Programs' },
                                { val: '200+', label: l === 'id' ? 'Anggota Aktif' : 'Active Members' },
                                { val: '4+', label: l === 'id' ? 'Event Per Semester' : 'Events Per Semester' },
                            ].map((s, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div className="rounded-2xl p-5 text-center"
                                        style={{ background: 'rgba(255,253,251,0.04)', border: '1px solid rgba(172,149,135,0.12)' }}>
                                        <p className="font-display text-3xl font-bold" style={{ color: '#D99F60' }}>{s.val}</p>
                                        <p className="mt-1 text-xs" style={{ color: 'rgba(172,149,135,0.70)' }}>{s.label}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>
        </MainLayout>
    );
}
