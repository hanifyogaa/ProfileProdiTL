import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
    Award, BookOpen, Eye, Flag, GraduationCap, Heart,
    Instagram, Layers, Lightbulb, Megaphone, Scale, Settings, Shield, Users
} from 'lucide-react';
import { useRef } from 'react';

const HERO_BG = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=85&w=1920';

interface Bilingual {
    id: string;
    en: string;
}

interface Division {
    name: string;
    description: Bilingual;
}

interface LogoMeaning {
    title: Bilingual;
    description: Bilingual;
}

interface LeadershipMember {
    name: string;
    role: Bilingual;
    description: Bilingual;
    photo?: string | null;
}

interface Department {
    abbr: string;
    name: Bilingual;
    description: Bilingual;
}

interface DpmCommission {
    name: Bilingual;
    description: Bilingual;
}

interface Activity {
    label: Bilingual;
    title: Bilingual;
    description: Bilingual;
    photos: string[];
}

interface DiscaStat {
    value: string;
    label: Bilingual;
}

interface OrgContent {
    name?: string;
    description?: Bilingual;
    vision?: Bilingual;
    instagram?: string;
    divisions?: Division[];
    founded_date?: string;
    faculty_label?: string;
    history?: Bilingual;
    missions?: Bilingual[];
    logo_image?: string | null;
    logo_meanings?: LogoMeaning[];
    leadership?: LeadershipMember[];
    departments?: Department[];
    dpm?: { description?: Bilingual; commissions?: DpmCommission[] };
    activities?: Activity[];
    stats?: DiscaStat[];
}

interface StudentAssociationProps {
    orgContent?: OrgContent;
}

/* ─── Fallback DISCA data (used when admin hasn't filled the new fields yet) ─── */

const FALLBACK_PROFILE: Bilingual = {
    id: 'DISCA Universitas Telkom adalah Himpunan yang beranggotakan dan mewadahi seluruh mahasiswa Prodi S1 Digital Supply Chain, Fakultas Rekayasa Industri, Universitas Telkom. Lembaga ini berfungsi sebagai lembaga eksekutif yang bersifat independen dan non-structural institution.',
    en: 'DISCA of Telkom University is a student association encompassing and accommodating all students of the S1 Digital Supply Chain Program, Faculty of Industrial Engineering, Telkom University. The institution functions as an independent, non-structural executive body.',
};

const FALLBACK_HISTORY: Bilingual = {
    id: 'Berawal dari kepanitiaan pembentukan himpunan dengan nama Keluarga Besar Mahasiswa Teknik Logistik (KBMTL) hingga akhirnya didirikan secara resmi oleh mahasiswa Digital Supply Chain angkatan II (2020) pada tanggal 6 April 2023 dengan nama Digital Supply Chain Student Association (DISCA) Universitas Telkom.',
    en: 'Starting from a committee establishing a student association under the name Keluarga Besar Mahasiswa Teknik Logistik (KBMTL), it was formally founded by the 2nd batch (2020) Digital Supply Chain students on April 6, 2023 under the name Digital Supply Chain Student Association (DISCA) of Telkom University.',
};

const FALLBACK_VISION: Bilingual = {
    id: '"Terwujudnya DISCA sebagai wadah maupun sarana yang aktif dalam menciptakan lingkungan yang komunikatif, integritas, inisiatif, berkarakter, dan memberikan kebebasan dalam beraspirasi serta berekspresi berlandaskan asas kekeluargaan."',
    en: '"To realize DISCA as an active platform and means for creating a communicative, integrity-driven, initiative-based, character-building environment that provides freedom of aspiration and expression grounded in a sense of kinship."',
};

const FALLBACK_MISSIONS: Bilingual[] = [
    {
        id: 'Memaksimalkan DISCA sebagai wadah yang aktif dalam menampung aspirasi mahasiswa/i Digital Supply Chain.',
        en: 'Maximizing DISCA as an active platform for accommodating the aspirations of Digital Supply Chain students.',
    },
    {
        id: 'Mengoptimalkan kemampuan mahasiswa/i Digital Supply Chain baik dalam akademik maupun non-akademik.',
        en: 'Optimizing the abilities of Digital Supply Chain students in both academic and non-academic areas.',
    },
    {
        id: 'Mempersiapkan DISCA dalam membentuk rancangan himpunan Digital Supply Chain.',
        en: 'Preparing DISCA in forming the design framework for the Digital Supply Chain student association.',
    },
];

const FALLBACK_LOGO_MEANINGS: LogoMeaning[] = [
    { title: { id: 'Warna Coklat', en: 'Brown Color' }, description: { id: 'Dimaknai sebagai kenyamanan dan ketenangan.', en: 'Symbolizes comfort and tranquility.' } },
    { title: { id: 'Warna Hitam', en: 'Black Color' }, description: { id: 'Dimaknai sebagai netral dan kuat.', en: 'Symbolizes neutrality and strength.' } },
    { title: { id: 'Warna Krem (Beige)', en: 'Cream (Beige) Color' }, description: { id: 'Dimaknai sebagai fleksibilitas dan dapat diandalkan.', en: 'Symbolizes flexibility and reliability.' } },
    { title: { id: 'Warna Merah', en: 'Red Color' }, description: { id: 'Diwakilkan dengan berani dan energik.', en: 'Represents courage and energy.' } },
    { title: { id: 'Bentuk Gear', en: 'Gear Shape' }, description: { id: 'Menggambarkan perubahan revolusi industri dan aktivitas DISCA yang terus berlangsung diiringi perkembangan teknologi.', en: 'Depicts the industrial revolution and DISCA\'s continuous activities alongside technological progress.' } },
    { title: { id: 'Bentuk 3 Persegi', en: 'Three-Square Shape' }, description: { id: 'Menggambarkan profesionalisme, kekuatan, dan stabilitas, serta merepresentasikan Visi Program Studi Digital Supply Chain.', en: 'Depicts professionalism, strength, and stability, representing the DSC Program vision.' } },
    { title: { id: 'Bentuk Point', en: 'Point Shape' }, description: { id: 'Diartikan sebagai DISCA Universitas Telkom yang memiliki arah serta tujuan yang jelas.', en: 'Signifies that DISCA has a clear direction and purpose.' } },
];

const FALLBACK_LEADERSHIP: LeadershipMember[] = [
    { name: 'Christmas Ekaputra Maryono Pathibang', role: { id: 'Ketua Umum', en: 'General Chairperson' }, description: { id: 'Memimpin dan bertanggung jawab tertinggi atas seluruh aktivitas DISCA.', en: 'Leads and bears the highest responsibility for all DISCA activities.' } },
    { name: 'Hanil Fazli', role: { id: 'Wakil Ketua Umum', en: 'Deputy General Chairperson' }, description: { id: 'Mendampingi ketua dalam menjalankan tugas dan tanggung jawab kepemimpinan.', en: 'Assists the chairperson in carrying out leadership duties and responsibilities.' } },
    { name: 'Tartar Abimanyu', role: { id: 'Sekretaris Umum', en: 'General Secretary' }, description: { id: 'Bertanggung jawab pada semua arsip dokumen, surat, notulensi rapat, dan data.', en: 'Responsible for all document archives, letters, meeting minutes, and data.' } },
    { name: 'Hardiyat Hawari Hutama', role: { id: 'Wakil Sekretaris', en: 'Deputy Secretary' }, description: { id: 'Membantu Sekretaris Umum dalam pengelolaan administrasi dan dokumentasi organisasi.', en: 'Assists the General Secretary in managing organizational administration and documentation.' } },
    { name: 'Catherine Adella Yudhaningtyas', role: { id: 'Bendahara Umum', en: 'General Treasurer' }, description: { id: 'Bertanggung jawab dalam laporan keuangan, pengendalian, dan pengawasan aliran dana.', en: 'Responsible for financial reporting, control, and monitoring of fund flows.' } },
    { name: 'Puja Amelia Arisma', role: { id: 'Wakil Bendahara', en: 'Deputy Treasurer' }, description: { id: 'Mendampingi Bendahara Umum dalam pengelolaan keuangan organisasi.', en: 'Assists the General Treasurer in managing the organization\'s finances.' } },
];

const FALLBACK_DEPARTMENTS: Department[] = [
    { abbr: 'KADERISASI', name: { id: 'Departemen Kaderisasi', en: 'Cadre Development Department' }, description: { id: 'Bertanggung jawab terhadap seluruh proses kaderisasi dalam membentuk kader penerus, mengawasi seluruh rangkaian kaderisasi, dan menjaga kestabilan DISCA melalui alur kaderisasi.', en: 'Responsible for the entire cadre formation process, overseeing all cadre stages, and maintaining DISCA\'s stability through the cadre development pipeline.' } },
    { abbr: 'KEMHAS', name: { id: 'Departemen Kemahasiswaan', en: 'Student Affairs Department' }, description: { id: 'Bertanggung jawab terhadap kegiatan internal DISCA — menjaga solidaritas, pengembangan minat bakat, dan advokasi kemahasiswaan dalam ruang lingkup Digital Supply Chain.', en: 'Responsible for DISCA internal activities — maintaining solidarity, developing student interests and talents, and student advocacy within the Digital Supply Chain scope.' } },
    { abbr: 'AKSET', name: { id: 'Departemen Akademik & Riset', en: 'Academic & Research Department' }, description: { id: 'Bertanggung jawab menunjang akademik, memperluas wawasan, dan mendorong mahasiswa berprestasi dalam bidang penelitian, khususnya ilmu logistik.', en: 'Supports academics, broadens knowledge, and encourages students to excel in research, particularly in the field of logistics.' } },
    { abbr: 'MENFO', name: { id: 'Departemen Media & Informasi', en: 'Media & Information Department' }, description: { id: 'Bertanggung jawab sebagai media penyebaran informasi seluruh kegiatan Prodi Digital Supply Chain, memastikan arus informasi tersebar merata di internal maupun eksternal DISCA.', en: 'Responsible for disseminating information about all DSC Program activities, ensuring information flows evenly both internally and externally within DISCA.' } },
    { abbr: 'PR', name: { id: 'Biro Public Relation', en: 'Public Relations Bureau' }, description: { id: 'Bertanggung jawab terhadap pengelolaan informasi dan menjadi penghubung antara pihak eksternal maupun internal dalam menciptakan komunikasi yang baik di lingkup DISCA.', en: 'Responsible for managing information and acting as a bridge between external and internal parties to foster good communication within the DISCA scope.' } },
];

const FALLBACK_DPM_DESCRIPTION: Bilingual = {
    id: 'Lembaga legislatif DISCA yang memiliki fungsi pengawasan terhadap kinerja lembaga eksekutif serta mewadahi aspirasi seluruh entitas Digital Supply Chain.',
    en: 'The legislative body of DISCA with a supervisory function over the executive body\'s performance and a platform for all Digital Supply Chain entity aspirations.',
};

const FALLBACK_DPM_COMMISSIONS: DpmCommission[] = [
    { name: { id: 'Inti DPM', en: 'DPM Core' }, description: { id: 'Mengatur urusan internal DPM DISCA serta membangun relasi dengan pihak eksternal.', en: 'Manages internal DPM affairs and builds relations with external parties.' } },
    { name: { id: 'Komisi Aspirasi', en: 'Aspiration Commission' }, description: { id: 'Bertugas untuk mewadahi aspirasi seluruh entitas Digital Supply Chain.', en: 'Tasked with accommodating the aspirations of all Digital Supply Chain entities.' } },
    { name: { id: 'Komisi Pengawasan', en: 'Oversight Commission' }, description: { id: 'Bertugas untuk mengawasi kinerja lembaga eksekutif Badan Pengurus Harian (BPH) DISCA.', en: 'Tasked with overseeing the performance of the DISCA Daily Management Board (BPH).' } },
];

const FALLBACK_ACTIVITIES: Activity[] = [
    {
        label: { id: 'Kolaborasi Organisasi', en: 'Organizational Collaboration' },
        title: { id: 'Studi Banding HIMA DSC × HMTM', en: 'Comparative Study HIMA DSC × HMTM' },
        description: {
            id: 'Kegiatan Studi Banding antara Himpunan Mahasiswa Digital Supply Chain (HIMA DSC) Universitas Telkom dan Himpunan Mahasiswa Teknik Manufaktur (HMTM) Universitas Telkom sebagai wadah kolaborasi untuk saling berbagi program kerja, struktur organisasi, serta pengalaman kepengurusan demi memajukan iklim organisasi yang inovatif dan kontributif.',
            en: 'A comparative study session between the Digital Supply Chain Student Association (HIMA DSC) and the Manufacturing Engineering Student Association (HMTM) of Telkom University, fostering collaboration to share work programs, organizational structures, and leadership insights.',
        },
        photos: [
            '/images/news/kemahasiswaan_studybandingdscxhmtm.png',
            '/images/news/kemahasiswaan_studybandingdscxhmtm1.png',
            '/images/news/kemahasiswaan_studybandingdscxhmtm2.png',
        ],
    },
    {
        label: { id: 'Musyawarah & Konstitusi', en: 'Assembly & Constitution' },
        title: { id: 'Sidang AD/ART & Pleno HIMA', en: 'AD/ART & Plenary Session' },
        description: {
            id: 'Sidang AD/ART dan Sidang Pleno Himpunan Mahasiswa merupakan agenda krusial organisasi untuk membahas dan mengesahkan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART), mengevaluasi capaian program kerja setengah periode kepengurusan, serta merumuskan rekomendasi taktis demi kelancaran roda organisasi.',
            en: 'The AD/ART and Plenary Session is a crucial organizational agenda to discuss and ratify the Constitution and Bylaws (AD/ART), evaluate mid-term program achievements, and formulate tactical recommendations for smooth organizational operations.',
        },
        photos: [
            '/images/news/kemahasiswaan_adarthimpunan.png',
            '/images/news/kemahasiswaan_adarthimpunan1.png',
        ],
    },
];

const FALLBACK_STATS: DiscaStat[] = [
    { value: '5', label: { id: 'Departemen & Biro', en: 'Depts & Bureaus' } },
    { value: '12+', label: { id: 'Program Kerja', en: 'Work Programs' } },
    { value: '200+', label: { id: 'Anggota Aktif', en: 'Active Members' } },
    { value: '2023', label: { id: 'Tahun Berdiri', en: 'Year Founded' } },
];

const ACCENTS = ['#D99F60', '#8C6441', '#6E4E33', '#AC9587', '#C08A4C', '#505666'];
const LEADER_ICONS = [
    <Shield className="size-5" key={0} />, <Users className="size-5" key={1} />, <BookOpen className="size-5" key={2} />,
    <BookOpen className="size-5" key={3} />, <Award className="size-5" key={4} />, <Award className="size-5" key={5} />,
];
const DEPT_ICONS = [
    <GraduationCap className="size-5" key={0} />, <Heart className="size-5" key={1} />, <Lightbulb className="size-5" key={2} />,
    <Megaphone className="size-5" key={3} />, <Instagram className="size-5" key={4} />,
];
const LOGO_ICON_SWATCHES = [
    <div className="size-4 rounded-sm" style={{ background: '#8B5E3C' }} key={0} />,
    <div className="size-4 rounded-sm" style={{ background: '#1A1A1A' }} key={1} />,
    <div className="size-4 rounded-sm" style={{ background: '#F5ECD7', border: '1px solid #ccc' }} key={2} />,
    <div className="size-4 rounded-sm" style={{ background: '#C0392B' }} key={3} />,
    <Settings className="size-4" style={{ color: '#D99F60' }} key={4} />,
    <Layers className="size-4" style={{ color: '#8C6441' }} key={5} />,
    <Flag className="size-4" style={{ color: '#6E4E33' }} key={6} />,
];

export default function StudentAssociation({ orgContent }: StudentAssociationProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const title = l === 'id' ? 'Kemahasiswaan & Himpunan' : 'Student Association';
    const igHandle = orgContent?.instagram ?? '@disca_telkomuniversity';

    const profile     = (orgContent?.description?.id || orgContent?.description?.en) ? orgContent!.description! : FALLBACK_PROFILE;
    const history      = (orgContent?.history?.id || orgContent?.history?.en) ? orgContent!.history! : FALLBACK_HISTORY;
    const vision       = (orgContent?.vision?.id || orgContent?.vision?.en) ? orgContent!.vision! : FALLBACK_VISION;
    const missions     = orgContent?.missions?.length ? orgContent.missions : FALLBACK_MISSIONS;
    const logoMeanings = orgContent?.logo_meanings?.length ? orgContent.logo_meanings : FALLBACK_LOGO_MEANINGS;
    const leadership   = orgContent?.leadership?.length ? orgContent.leadership : FALLBACK_LEADERSHIP;
    const departments  = orgContent?.departments?.length ? orgContent.departments : FALLBACK_DEPARTMENTS;
    const dpmDescription = (orgContent?.dpm?.description?.id || orgContent?.dpm?.description?.en) ? orgContent!.dpm!.description! : FALLBACK_DPM_DESCRIPTION;
    const dpmCommissions = orgContent?.dpm?.commissions?.length ? orgContent.dpm!.commissions! : FALLBACK_DPM_COMMISSIONS;
    const activities    = orgContent?.activities?.length ? orgContent.activities : FALLBACK_ACTIVITIES;
    const stats         = orgContent?.stats?.length ? orgContent.stats : FALLBACK_STATS;
    const foundedDate   = orgContent?.founded_date || (l === 'id' ? 'Berdiri 6 April 2023' : 'Founded April 6, 2023');
    const facultyLabel  = orgContent?.faculty_label || 'FRI · Universitas Telkom';
    const logoImage     = orgContent?.logo_image ?? '/images/logo-dsc-himpunan.png';

    const MISSION_ICONS = [<Users key={0} className="size-5" />, <GraduationCap key={1} className="size-5" />, <Lightbulb key={2} className="size-5" />];

    return (
        <MainLayout fullHero>
            <Head title={`DISCA — ${title}`} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[68vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.28 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.52) 55%, rgba(36,20,31,0.15) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40"
                    style={shouldReduceMotion ? {} : { y: yText }}>
                    <div className="grid items-end gap-8 md:grid-cols-12">
                        {/* Left */}
                        <div className="md:col-span-8">
                            <Reveal>
                                <span className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#D99F60' }}>
                                    <span className="h-px w-5" style={{ background: '#D99F60' }} />
                                    {l === 'id' ? 'Himpunan Mahasiswa' : 'Student Association'} · Telkom University
                                </span>
                                <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
                                    DISCA
                                    <span className="block text-2xl font-light mt-1" style={{ color: 'rgba(172,149,135,0.80)' }}>
                                        Digital Supply Chain Student Association
                                    </span>
                                </h1>
                                <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                    {profile[l]}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
                                        style={{ background: 'rgba(255,253,251,0.06)', color: 'rgba(255,253,251,0.70)', border: '1px solid rgba(172,149,135,0.20)' }}>
                                        {foundedDate}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
                                        style={{ background: 'rgba(255,253,251,0.06)', color: 'rgba(255,253,251,0.70)', border: '1px solid rgba(172,149,135,0.20)' }}>
                                        {facultyLabel}
                                    </span>
                                </div>
                            </Reveal>
                        </div>
                        {/* Right: vision card */}
                        <div className="md:col-span-4">
                            <Reveal delay={0.18}>
                                <div className="rounded-3xl p-6" style={{ background: 'rgba(140,100,65,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(217,159,96,0.20)' }}>
                                    <Eye className="mb-3 size-5" style={{ color: '#D99F60' }} />
                                    <p className="font-display text-sm font-medium italic leading-relaxed" style={{ color: 'rgba(255,253,251,0.88)' }}>
                                        {vision[l]}
                                    </p>
                                    <div className="mt-4 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
                                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(172,149,135,0.65)' }}>
                                            {l === 'id' ? 'Visi DISCA' : 'DISCA Vision'}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── PROFIL & SEJARAH ── */}
            <section className="py-20" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* Profil */}
                        <Reveal>
                            <div className="h-full rounded-3xl border p-8"
                                style={{ borderColor: 'rgba(172,149,135,0.20)', background: 'linear-gradient(135deg, #FFFDFB 0%, #FBF7F2 100%)' }}>
                                <span className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C08A4C' }}>
                                    <span className="h-px w-5" style={{ background: '#C08A4C' }} />
                                    {l === 'id' ? 'Profil Organisasi' : 'Organization Profile'}
                                </span>
                                <h2 className="font-display mb-4 text-2xl font-bold" style={{ color: '#24141F' }}>
                                    {l === 'id' ? 'Tentang DISCA' : 'About DISCA'}
                                </h2>
                                <p className="text-sm leading-[1.85] text-justify" style={{ color: '#505666' }}>
                                    {profile[l]}
                                </p>
                            </div>
                        </Reveal>
                        {/* Sejarah */}
                        <Reveal delay={0.1}>
                            <div className="h-full rounded-3xl border p-8"
                                style={{ borderColor: 'rgba(172,149,135,0.20)', background: 'linear-gradient(135deg, #FFFDFB 0%, #FBF7F2 100%)' }}>
                                <span className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8C6441' }}>
                                    <span className="h-px w-5" style={{ background: '#8C6441' }} />
                                    {l === 'id' ? 'Sejarah' : 'History'}
                                </span>
                                <h2 className="font-display mb-4 text-2xl font-bold" style={{ color: '#24141F' }}>
                                    {l === 'id' ? 'Asal Mula DISCA' : 'The Origins of DISCA'}
                                </h2>
                                <p className="text-sm leading-[1.85] text-justify" style={{ color: '#505666' }}>
                                    {history[l]}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── VISI & MISI ── */}
            <section className="relative overflow-hidden py-28 border-t" style={{ borderColor: 'rgba(172,149,135,0.08)' }}>
                {/* Multi-layer background */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1A0D16 0%, #2C1624 40%, #1E1128 100%)' }} />
                {/* Decorative orbs */}
                <div className="pointer-events-none absolute -top-24 -left-24 size-[480px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(217,159,96,0.55) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                <div className="pointer-events-none absolute -bottom-20 -right-20 size-[360px] rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(140,100,65,0.60) 0%, transparent 70%)', filter: 'blur(50px)' }} />
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle, rgba(255,253,251,0.8) 0%, transparent 70%)', filter: 'blur(80px)' }} />
                {/* Decorative grid dots */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(rgba(217,159,96,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="relative z-10 mx-auto max-w-[1100px] px-6">
                    {/* Header */}
                    <Reveal>
                        <div className="mb-16 text-center">
                            <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#D99F60' }}>
                                <span className="h-px w-5" style={{ background: '#D99F60' }} />
                                {l === 'id' ? 'Visi & Misi' : 'Vision & Mission'}
                                <span className="h-px w-5" style={{ background: '#D99F60' }} />
                            </span>
                            <h2 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
                                {l === 'id' ? 'Arah & Tujuan' : 'Direction & Purpose'}
                            </h2>
                            <p className="mt-3 text-sm" style={{ color: 'rgba(172,149,135,0.60)' }}>
                                {l === 'id' ? 'Landasan gerak DISCA sebagai himpunan mahasiswa' : 'The foundational principles driving DISCA as a student association'}
                            </p>
                        </div>
                    </Reveal>

                    {/* VISION — Full-width statement card */}
                    <Reveal delay={0.05}>
                        <div className="relative mb-8 overflow-hidden rounded-[2.5rem] p-10 md:p-14"
                            style={{ background: 'linear-gradient(135deg, rgba(217,159,96,0.14) 0%, rgba(140,100,65,0.08) 100%)', border: '1px solid rgba(217,159,96,0.22)' }}>
                            {/* Giant decorative quote mark */}
                            <span className="pointer-events-none absolute -top-4 left-8 select-none text-[10rem] font-serif leading-none opacity-[0.07]"
                                style={{ color: '#D99F60' }}>"</span>
                            <span className="pointer-events-none absolute -bottom-10 right-10 select-none text-[10rem] font-serif leading-none opacity-[0.07]"
                                style={{ color: '#D99F60' }}>"</span>

                            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
                                <div className="flex shrink-0 flex-col items-center gap-3">
                                    <div className="flex size-14 items-center justify-center rounded-2xl"
                                        style={{ background: 'rgba(217,159,96,0.18)', border: '1px solid rgba(217,159,96,0.30)' }}>
                                        <Eye className="size-6" style={{ color: '#D99F60' }} />
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: '#D99F60' }}>
                                        {l === 'id' ? 'Visi' : 'Vision'}
                                    </span>
                                </div>
                                {/* Divider */}
                                <div className="hidden md:block h-20 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(217,159,96,0.35), transparent)' }} />
                                {/* Quote text */}
                                <blockquote className="font-display text-lg font-medium italic leading-relaxed md:text-xl lg:text-2xl"
                                    style={{ color: 'rgba(255,253,251,0.92)' }}>
                                    {vision[l]}
                                </blockquote>
                            </div>
                        </div>
                    </Reveal>

                    {/* MISSION — 3-column horizontal cards */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        {missions.map((m, i) => {
                            const accent = ACCENTS[i % ACCENTS.length];
                            return (
                                <Reveal key={i} delay={0.12 + i * 0.08}>
                                    <div className="group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                                        style={{ background: 'rgba(255,253,251,0.04)', border: '1px solid rgba(172,149,135,0.14)' }}>
                                        {/* Hover glow */}
                                        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{ background: `radial-gradient(circle at 30% 30%, ${accent}12 0%, transparent 65%)` }} />
                                        {/* Number badge */}
                                        <div className="mb-5 flex items-center gap-3">
                                            <div className="flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                                style={{ background: `${accent}18`, color: accent }}>
                                                {MISSION_ICONS[i % MISSION_ICONS.length]}
                                            </div>
                                            <span className="font-display text-3xl font-black opacity-20 select-none"
                                                style={{ color: accent }}>
                                                0{i + 1}
                                            </span>
                                        </div>
                                        {/* Accent bar */}
                                        <div className="mb-4 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                                            style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
                                        <p className="relative text-sm leading-[1.8]" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                            {m[l]}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── MAKNA LOGO ── */}
            <section className="py-20 border-t" style={{ background: '#FAF9F6', borderColor: 'rgba(172,149,135,0.12)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <div className="grid gap-12 lg:grid-cols-12 items-start">
                        {/* Logo */}
                        <div className="lg:col-span-4">
                            <Reveal>
                                <span className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C08A4C' }}>
                                    <span className="h-px w-5" style={{ background: '#C08A4C' }} />
                                    {l === 'id' ? 'Identitas Visual' : 'Visual Identity'}
                                </span>
                                <h2 className="font-display mb-6 text-2xl font-bold" style={{ color: '#24141F' }}>
                                    {l === 'id' ? 'Makna Logo DISCA' : 'The Meaning of the DISCA Logo'}
                                </h2>
                                <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-16"
                                    style={{ borderColor: 'rgba(172,149,135,0.35)', background: 'rgba(217,159,96,0.04)' }}>
                                    <img
                                        src={logoImage}
                                        alt="Logo DISCA"
                                        className="max-h-40 w-auto object-contain"
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = 'none';
                                            const sibling = target.nextElementSibling as HTMLElement | null;
                                            if (sibling) sibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden flex-col items-center gap-3 text-center">
                                        <div className="flex size-16 items-center justify-center rounded-2xl"
                                            style={{ background: 'rgba(217,159,96,0.12)' }}>
                                            <Layers className="size-8" style={{ color: 'rgba(217,159,96,0.50)' }} />
                                        </div>
                                        <p className="text-xs font-semibold" style={{ color: 'rgba(80,86,102,0.50)' }}>
                                            {l === 'id' ? 'Logo DISCA akan ditampilkan di sini' : 'DISCA logo will appear here'}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        {/* Logo Meanings */}
                        <div className="lg:col-span-8">
                            <Reveal delay={0.08}>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {logoMeanings.map((item, i) => {
                                        const accent = ACCENTS[i % ACCENTS.length];
                                        return (
                                            <div key={i} className="flex gap-4 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                                style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                                                    style={{ background: `${accent}15` }}>
                                                    {LOGO_ICON_SWATCHES[i % LOGO_ICON_SWATCHES.length]}
                                                </div>
                                                <div>
                                                    <p className="font-display text-sm font-semibold" style={{ color: '#24141F' }}>
                                                        {item.title[l]}
                                                    </p>
                                                    <p className="mt-0.5 text-xs leading-relaxed" style={{ color: '#505666' }}>
                                                        {item.description[l]}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STRUKTUR KEPENGURUSAN ── */}
            <section className="py-20 border-t" style={{ background: '#FFFDFB', borderColor: 'rgba(172,149,135,0.12)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <span className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8C6441' }}>
                                <span className="h-px w-5" style={{ background: '#8C6441' }} />
                                {l === 'id' ? 'Kepengurusan' : 'Board'}
                            </span>
                            <h2 className="font-display mt-2 text-3xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Struktur Kepengurusan Inti' : 'Core Leadership Structure'}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Badan Pengurus Harian (BPH) DISCA Universitas Telkom.'
                                    : 'Daily Management Board (BPH) of DISCA Telkom University.'}
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {leadership.map((person, i) => {
                            const accent = ACCENTS[i % ACCENTS.length];
                            return (
                                <Reveal key={i} delay={i * 0.07}>
                                    <div className="flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        {person.photo ? (
                                            <img src={person.photo} alt={person.name} className="mb-4 size-14 rounded-xl object-cover" />
                                        ) : (
                                            <div className="mb-4 flex size-11 items-center justify-center rounded-xl"
                                                style={{ background: `${accent}18`, color: accent }}>
                                                {LEADER_ICONS[i % LEADER_ICONS.length]}
                                            </div>
                                        )}
                                        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                                            {person.role[l]}
                                        </span>
                                        <h3 className="font-display mb-2 text-base font-semibold leading-snug" style={{ color: '#24141F' }}>
                                            {person.name}
                                        </h3>
                                        <p className="flex-1 text-xs leading-relaxed" style={{ color: '#505666' }}>
                                            {person.description[l]}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── DEPARTEMEN & BIRO ── */}
            <section className="py-20 border-t" style={{ background: '#FAF9F6', borderColor: 'rgba(172,149,135,0.10)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <span className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C08A4C' }}>
                                <span className="h-px w-5" style={{ background: '#C08A4C' }} />
                                {l === 'id' ? 'Departemen & Biro' : 'Departments & Bureaus'}
                            </span>
                            <h2 className="font-display mt-2 text-3xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Bidang Kerja & Program' : 'Work Divisions & Programs'}
                            </h2>
                            <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: '#505666' }}>
                                {l === 'id'
                                    ? 'Setiap departemen dan biro memiliki program kerja yang berdampak langsung pada pengembangan mahasiswa Digital Supply Chain.'
                                    : 'Each department and bureau runs programs with a direct impact on Digital Supply Chain student development.'}
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept, i) => {
                            const accent = ACCENTS[i % ACCENTS.length];
                            return (
                                <Reveal key={i} delay={i * 0.07}>
                                    <div className="flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        <div className="mb-4 flex size-11 items-center justify-center rounded-xl"
                                            style={{ background: `${accent}18`, color: accent }}>
                                            {DEPT_ICONS[i % DEPT_ICONS.length]}
                                        </div>
                                        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
                                            {dept.abbr}
                                        </span>
                                        <h3 className="font-display mb-2 text-base font-semibold leading-snug" style={{ color: '#24141F' }}>
                                            {dept.name[l]}
                                        </h3>
                                        <p className="flex-1 text-xs leading-relaxed text-justify" style={{ color: '#505666' }}>
                                            {dept.description[l]}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── DPM DISCA ── */}
            <section className="py-20 border-t" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.97) 0%, rgba(46,28,39,0.94) 100%)', borderColor: 'rgba(172,149,135,0.08)' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-10">
                            <span className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#D99F60' }}>
                                <span className="h-px w-5" style={{ background: '#D99F60' }} />
                                {l === 'id' ? 'Legislatif' : 'Legislative'}
                            </span>
                            <h2 className="font-display mt-2 text-3xl font-bold text-white">
                                {l === 'id' ? 'Dewan Perwakilan Mahasiswa (DPM DISCA)' : 'Student Representative Council (DPM DISCA)'}
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.80)' }}>
                                {dpmDescription[l]}
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid gap-5 sm:grid-cols-3">
                        {dpmCommissions.map((item, i) => {
                            const icons = [<Scale className="size-5" key={0} />, <Users className="size-5" key={1} />, <Shield className="size-5" key={2} />];
                            return (
                                <Reveal key={i} delay={i * 0.09}>
                                    <div className="flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                                        style={{ background: 'rgba(255,253,251,0.05)', border: '1px solid rgba(172,149,135,0.15)' }}>
                                        <div className="mb-4 flex size-11 items-center justify-center rounded-xl"
                                            style={{ background: 'rgba(217,159,96,0.12)', color: '#D99F60' }}>
                                            {icons[i % icons.length]}
                                        </div>
                                        <h3 className="font-display mb-2 text-base font-semibold text-white">{item.name[l]}</h3>
                                        <p className="flex-1 text-xs leading-relaxed" style={{ color: 'rgba(172,149,135,0.80)' }}>
                                            {item.description[l]}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── KEGIATAN HIMPUNAN ── */}
            <section className="py-20 border-t" style={{ background: '#FAF9F6', borderColor: 'rgba(172,149,135,0.12)' }}>
                <div className="mx-auto max-w-[1100px] px-6 space-y-28">
                    <Reveal>
                        <div className="mb-2">
                            <span className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C08A4C' }}>
                                <span className="h-px w-5" style={{ background: '#C08A4C' }} />
                                {l === 'id' ? 'Dokumentasi Kegiatan' : 'Activity Documentation'}
                            </span>
                            <h2 className="font-display mt-2 text-3xl font-bold" style={{ color: '#24141F' }}>
                                {l === 'id' ? 'Kegiatan Himpunan' : 'Association Activities'}
                            </h2>
                        </div>
                    </Reveal>

                    {activities.map((act, i) => {
                        const accent = i % 2 === 0 ? '#C08A4C' : '#8C6441';
                        const photos = act.photos.filter(Boolean);
                        const reversed = i % 2 === 1;
                        return (
                            <Reveal key={i}>
                                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                                    <div className="lg:col-span-5 space-y-5">
                                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                                            <span className="h-px w-5" style={{ background: accent }} />
                                            {act.label[l]}
                                        </span>
                                        <h3 className="font-display text-2xl font-bold leading-tight" style={{ color: '#24141F' }}>
                                            {act.title[l]}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-justify" style={{ color: '#505666' }}>
                                            {act.description[l]}
                                        </p>
                                    </div>
                                    {photos.length > 0 && (
                                        <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-stretch h-[320px] md:h-[400px]">
                                            <div className={`${photos.length > 1 ? 'col-span-8' : 'col-span-12'} rounded-[2rem] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 group`}>
                                                <img src={photos[0]} alt={act.title[l]}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#24141F]/30 to-transparent pointer-events-none" />
                                            </div>
                                            {photos.length > 1 && (
                                                <div className="col-span-4 flex flex-col gap-4 h-full">
                                                    {photos.slice(1, 3).map((p, pIdx) => (
                                                        <div key={pIdx} className="flex-1 rounded-[1.5rem] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 group">
                                                            <img src={p} alt={`${act.title[l]} ${pIdx + 1}`}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#24141F]/30 to-transparent pointer-events-none" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="py-16" style={{ background: 'linear-gradient(135deg, rgba(46,28,39,0.97) 0%, rgba(36,20,31,0.94) 100%)', borderTop: '1px solid rgba(172,149,135,0.08)', borderBottom: '1px solid rgba(172,149,135,0.08)' }}>
                <Reveal>
                    <div className="mx-auto max-w-[900px] px-6">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {stats.map((s, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <div className="rounded-2xl p-5 text-center"
                                        style={{ background: 'rgba(255,253,251,0.04)', border: '1px solid rgba(172,149,135,0.12)' }}>
                                        <p className="font-display text-3xl font-bold" style={{ color: '#D99F60' }}>{s.value}</p>
                                        <p className="mt-1 text-xs" style={{ color: 'rgba(172,149,135,0.70)' }}>{s.label[l]}</p>
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
