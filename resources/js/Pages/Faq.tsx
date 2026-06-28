import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';

interface FaqItem {
    id: number;
    question_id: string;
    question_en: string;
    answer_id: string;
    answer_en: string;
    category: string;
    order: number;
}

const CATEGORY_LABELS: Record<string, { id: string; en: string }> = {
    umum:     { id: 'Umum',     en: 'General' },
    akademik: { id: 'Akademik', en: 'Academic' },
    karir:    { id: 'Karir',    en: 'Career' },
    mbkm:     { id: 'MBKM',     en: 'MBKM' },
};

const HERO_BG = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=85&w=1920';

const FALLBACK_FAQS: FaqItem[] = [
    {
        id: 1, category: 'karir', order: 0,
        question_id: 'Apakah lulusan prodi ini hanya bekerja di gudang?',
        question_en: 'Do graduates only work in warehouses?',
        answer_id: 'Tidak. Lulusan memiliki peluang karir yang luas sebagai supply chain analyst, logistics engineer, digital procurement specialist, konsultan rantai pasok, ERP consultant, hingga technopreneur.',
        answer_en: 'No. Graduates have broad career prospects as supply chain analysts, logistics engineers, digital procurement specialists, supply chain consultants, ERP systems consultants, and tech entrepreneurs.',
    },
    {
        id: 2, category: 'akademik', order: 1,
        question_id: 'Apa perbedaan antara Teknik Logistik dengan Manajemen Logistik?',
        question_en: 'What is the difference between Logistics Engineering and Logistics Management?',
        answer_id: 'Teknik Logistik berfokus pada perancangan sistem, optimalisasi rute, rekayasa otomasi pergudangan (menggunakan matematika dan IT). Sementara Manajemen Logistik lebih menekankan pada aspek operasional harian dan administrasi logistik.',
        answer_en: 'Logistics Engineering focuses on system design, route optimization, and warehousing automation engineering (using mathematics and IT). Meanwhile, Logistics Management emphasizes daily operations and administrative aspects.',
    },
    {
        id: 3, category: 'mbkm', order: 2,
        question_id: 'Apakah program studi ini menyediakan program magang bersertifikat?',
        question_en: 'Does this study program offer certified internship programs?',
        answer_id: 'Ya. Mahasiswa dapat mengikuti program magang bersertifikat industri (MBKM) selama 6 bulan di berbagai BUMN dan partner korporasi multinasional.',
        answer_en: 'Yes. Students can join certified industrial internships (MBKM) for 6 months at state enterprises and global multinational partners.',
    },
    {
        id: 4, category: 'umum', order: 3,
        question_id: 'Berapa lama masa studi program ini?',
        question_en: 'How long is the study duration for this program?',
        answer_id: 'Program Studi S1 Teknik Logistik menempuh masa studi 4 tahun (8 semester) dengan beban studi 145 SKS.',
        answer_en: 'The Logistics Engineering undergraduate program takes 4 years (8 semesters) with a study load of 145 credits.',
    },
    {
        id: 5, category: 'akademik', order: 4,
        question_id: 'Apakah ada jalur beasiswa yang tersedia?',
        question_en: 'Are there scholarship programs available?',
        answer_id: 'Ya. Tersedia berbagai beasiswa melalui KIP-K, beasiswa Telkom, beasiswa prestasi akademik, dan beasiswa dari mitra industri. Informasi lengkap tersedia di laman penerimaan mahasiswa baru.',
        answer_en: 'Yes. Various scholarships are available through KIP-K, Telkom scholarships, academic achievement grants, and industry partner scholarships. Complete information is available at the student admission page.',
    },
];

export default function Faq({ faqs }: { faqs?: FaqItem[] }) {
    const { locale } = useLocale();
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const data = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;
    const title = locale === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions';
    const l = locale as 'id' | 'en';

    const categories = ['all', ...Array.from(new Set(data.map((f) => f.category)))];
    const filtered = activeCategory === 'all' ? data : data.filter((f) => f.category === activeCategory);

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
                {/* fade bottom edge to page background */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[820px] px-6 pb-14 pt-40 text-center" style={shouldReduceMotion ? {} : { y: yText }}>
                    <Reveal>
                        <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                            {l === 'id'
                                ? 'Temukan jawaban atas pertanyaan umum seputar Program Studi Teknik Logistik.'
                                : 'Find answers to common questions about the Logistics Engineering Study Program.'}
                        </p>
                    </Reveal>
                </motion.div>
            </section>

            {/* ── CONTENT ── */}
            <div className="mx-auto max-w-[820px] px-6 py-12">
                {/* Category filter */}
                <Reveal variant="fade-up">
                    <div className="mb-10 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const label = cat === 'all'
                                ? (l === 'id' ? 'Semua' : 'All')
                                : (CATEGORY_LABELS[cat]?.[l] ?? cat);
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                                    style={isActive
                                        ? { background: '#8C6441', color: '#FFFDFB', boxShadow: '0 4px 14px -4px rgba(140,100,65,0.45)' }
                                        : { background: '#ECEBE9', color: '#505666' }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Accordion list */}
                <div className="flex flex-col gap-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-3"
                        >
                            {filtered.map((faq, index) => {
                                const isOpen = openId === faq.id;
                                const question = l === 'id' ? faq.question_id : faq.question_en;
                                const answer   = l === 'id' ? faq.answer_id   : faq.answer_en;

                                return (
                                    <Reveal key={faq.id} delay={index * 0.06} variant="fade-up">
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
                                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                            >
                                                <span className="font-display text-ink-900 text-base font-semibold leading-snug">
                                                    {question}
                                                </span>
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
                                                            className="space-y-3 px-6 pb-5 pt-1 text-sm leading-relaxed"
                                                            style={{ borderTop: '1px solid rgba(172,149,135,0.15)', color: '#505666' }}
                                                        >
                                                            {answer?.split('\n').map((para, i) =>
                                                                para.trim() === '' ? null : (
                                                                    <p key={i}>
                                                                        {para}
                                                                    </p>
                                                                )
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ── CTA — dark band ── */}
            <section className="mt-4 py-20" style={{ background: 'linear-gradient(135deg, rgba(36,20,31,0.98) 0%, rgba(58,36,48,0.95) 50%, rgba(36,20,31,0.98) 100%)' }}>
                <Reveal>
                    <div className="mx-auto max-w-[600px] px-6 text-center">
                        <div className="mb-4 flex justify-center">
                            <span className="flex size-12 items-center justify-center rounded-full" style={{ background: 'rgba(217,159,96,0.15)' }}>
                                <MessageCircle className="size-6" style={{ color: '#D99F60' }} />
                            </span>
                        </div>
                        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                            {l === 'id' ? 'Masih ada pertanyaan?' : 'Still have questions?'}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(172,149,135,0.80)' }}>
                            {l === 'id'
                                ? 'Tim kami siap membantu. Hubungi kami langsung melalui halaman kontak atau email.'
                                : 'Our team is ready to help. Reach out directly via our contact page or email.'}
                        </p>
                        <a
                            href="/kontak"
                            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-opacity hover:opacity-85"
                            style={{ background: '#D99F60', color: '#24141F' }}
                        >
                            {l === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                        </a>
                    </div>
                </Reveal>
            </section>
        </MainLayout>
    );
}
