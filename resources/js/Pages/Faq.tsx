import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
    {
        q: {
            id: 'Apakah lulusan prodi ini hanya bekerja di gudang?',
            en: 'Do graduates only work in warehouses?',
        },
        a: {
            id: 'Tidak. Lulusan memiliki peluang karir yang luas sebagai supply chain analyst, logistics engineer, digital procurement specialist, konsultan rantai pasok, ERP consultant, hingga technopreneur.',
            en: 'No. Graduates have broad career prospects as supply chain analysts, logistics engineers, digital procurement specialists, supply chain consultants, ERP systems consultants, and tech entrepreneurs.',
        },
    },
    {
        q: {
            id: 'Apa perbedaan antara Teknik Logistik dengan Manajemen Logistik?',
            en: 'What is the difference between Logistics Engineering and Logistics Management?',
        },
        a: {
            id: 'Teknik Logistik berfokus pada perancangan sistem, optimalisasi rute, rekayasa otomasi pergudangan (menggunakan matematika dan IT). Sementara Manajemen Logistik lebih menekankan pada aspek operasional harian dan administrasi logistik.',
            en: 'Logistics Engineering focuses on system design, route optimization, and warehousing automation engineering (using mathematics and IT). Meanwhile, Logistics Management emphasizes daily operations and administrative aspects.',
        },
    },
    {
        q: {
            id: 'Apakah program studi ini menyediakan program magang bersertifikat?',
            en: 'Does this study program offer certified internship programs?',
        },
        a: {
            id: 'Ya. Mahasiswa dapat mengikuti program magang bersertifikat industri (MBKM) selama 6 bulan di berbagai BUMN dan partner korporasi multinasional.',
            en: 'Yes. Students can join certified industrial internships (MBKM) for 6 months at state enterprises and global multinational partners.',
        },
    },
];

export default function Faq() {
    const { locale, t } = useLocale();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const title =
        locale === 'id'
            ? 'Pertanyaan yang Sering Diajukan (FAQ)'
            : 'Frequently Asked Questions (FAQ)';

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[800px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                    </div>
                </Reveal>

                {/* Accordions */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <Reveal key={index} delay={index * 0.05}>
                                <Card className="border-cream-300/20 bg-surface-0 overflow-hidden border shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => toggleOpen(index)}
                                        className="font-display text-ink-900 flex w-full items-center justify-between gap-4 p-6 text-left text-base font-semibold focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                                    >
                                        <span>{t(faq.q)}</span>
                                        <ChevronDown
                                            className={`text-brand-700 size-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="text-navy-700 border-cream-300/10 border-t px-6 pt-1 pb-6 text-xs leading-relaxed sm:text-sm">
                                            {t(faq.a)}
                                        </div>
                                    )}
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
}
