import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
];

export default function Faq({ faqs }: { faqs?: FaqItem[] }) {
    const { locale } = useLocale();
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const data = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;
    const title = locale === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions';

    const categories = ['all', ...Array.from(new Set(data.map((f) => f.category)))];
    const filtered = activeCategory === 'all' ? data : data.filter((f) => f.category === activeCategory);

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[820px] px-6 py-16">
                <Reveal variant="fade-down">
                    <div className="mb-10 text-center">
                        <h1 className="font-display text-ink-900 mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-lg text-base">
                            {locale === 'id'
                                ? 'Temukan jawaban atas pertanyaan umum seputar Program Studi Teknik Logistik.'
                                : 'Find answers to common questions about the Logistics Engineering Study Program.'}
                        </p>
                    </div>
                </Reveal>

                {/* Category filter */}
                <Reveal variant="fade-up" delay={0.1}>
                    <div className="mb-8 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const label = cat === 'all'
                                ? (locale === 'id' ? 'Semua' : 'All')
                                : (CATEGORY_LABELS[cat]?.[locale as 'id' | 'en'] ?? cat);
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200"
                                    style={activeCategory === cat
                                        ? { background: '#8C6441', color: '#FFFDFB' }
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
                    {filtered.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        const question = locale === 'id' ? faq.question_id : faq.question_en;
                        const answer   = locale === 'id' ? faq.answer_id   : faq.answer_en;

                        return (
                            <Reveal key={faq.id} delay={index * 0.06} variant="fade-up">
                                <div
                                    className="overflow-hidden rounded-2xl border transition-shadow"
                                    style={{
                                        borderColor: isOpen ? 'rgba(140,100,65,0.30)' : 'rgba(172,149,135,0.20)',
                                        background: '#FFFDFB',
                                        boxShadow: isOpen ? '0 4px 16px -4px rgba(140,100,65,0.12)' : undefined,
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
                                                    className="px-6 pb-5 pt-1 text-sm leading-relaxed"
                                                    style={{ borderTop: '1px solid rgba(172,149,135,0.15)', color: '#505666' }}
                                                >
                                                    {answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
}
