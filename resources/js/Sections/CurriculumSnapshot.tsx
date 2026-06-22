import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { BookOpen, CheckCircle, Download, GraduationCap } from 'lucide-react';

interface SignatureCourse {
    name_id: string;
    name_en: string;
}

interface CurriculumSummaryData {
    total_sks: number;
    semesters: number;
    pdf_url: string | null;
    signature_courses: SignatureCourse[];
}

export function CurriculumSnapshot({
    curriculumSummary,
}: {
    curriculumSummary: CurriculumSummaryData;
}) {
    const { locale, t } = useLocale();

    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    {/* Visual Card / Left Side */}
                    <div className="order-last lg:order-first lg:col-span-5">
                        <Reveal>
                            <Card className="border-cream-300/20 bg-surface-0 relative overflow-hidden border p-8">
                                <div className="absolute top-0 right-0 size-24 rounded-bl-full bg-amber-500/5" />

                                <h3 className="font-display text-ink-900 mb-6 flex items-center gap-2 text-xl font-bold">
                                    <BookOpen className="text-brand-700 size-5" />
                                    {locale === 'id'
                                        ? 'Struktur Mata Kuliah'
                                        : 'Course Structure'}
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                            <GraduationCap className="size-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-ink-900 text-sm font-semibold">
                                                {locale === 'id'
                                                    ? 'Beban Akademik'
                                                    : 'Academic Load'}
                                            </h4>
                                            <p className="text-navy-700 mt-1 text-sm leading-relaxed">
                                                {curriculumSummary.total_sks}{' '}
                                                SKS (
                                                {locale === 'id'
                                                    ? 'SKS'
                                                    : 'Credits'}
                                                ) /{' '}
                                                {curriculumSummary.semesters}{' '}
                                                {locale === 'id'
                                                    ? 'Semester'
                                                    : 'Semesters'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                            <CheckCircle className="size-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-ink-900 text-sm font-semibold">
                                                {locale === 'id'
                                                    ? 'Proporsi Kuliah'
                                                    : 'Course Split'}
                                            </h4>
                                            <p className="text-navy-700 mt-1 text-sm leading-relaxed">
                                                {locale === 'id'
                                                    ? 'Mata Kuliah Wajib Inti & Mata Kuliah Pilihan Spesialisasi E-Logistik'
                                                    : 'Core Compulsory Courses & Elective E-Logistics Specializations'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-cream-300/10 mt-8 flex flex-wrap gap-3 border-t pt-6">
                                    <Button
                                        href="/kurikulum"
                                        variant="primary"
                                        className="text-xs"
                                    >
                                        {t({
                                            id: 'Lihat Kurikulum',
                                            en: 'View Curriculum',
                                        })}
                                    </Button>
                                    <Button
                                        href={curriculumSummary.pdf_url || '#'}
                                        variant="secondary"
                                        className="flex items-center gap-1.5 text-xs"
                                    >
                                        <Download className="size-3.5" />
                                        <span>
                                            {t({
                                                id: 'Unduh PDF',
                                                en: 'Download PDF',
                                            })}
                                        </span>
                                    </Button>
                                </div>
                            </Card>
                        </Reveal>
                    </div>

                    {/* Text Details / Right Side */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Kurikulum Berbasis Kompetensi Rantai Pasok Digital'
                                    : 'Digital Supply Chain Competency Curriculum'}
                            </h2>

                            <p className="text-navy-700 mt-6 text-base leading-relaxed">
                                {locale === 'id'
                                    ? 'Kurikulum 145 SKS dirancang agar mahasiswa menguasai rekayasa sistem logistik modern. Penekanan kuat pada penggunaan teknologi informasi dan analitik data untuk merancang rantai pasok digital yang efisien, tangguh, dan berkelanjutan.'
                                    : 'Our 145-credit curriculum is designed to master modern logistics engineering. A strong emphasis is placed on information technology and data analytics to design efficient, resilient, and sustainable digital supply chains.'}
                            </p>

                            {/* Signature Courses list */}
                            {curriculumSummary.signature_courses &&
                                curriculumSummary.signature_courses.length >
                                    0 && (
                                    <div className="mt-8">
                                        <h4 className="text-brand-700 mb-4 text-xs font-bold tracking-wider uppercase">
                                            {locale === 'id'
                                                ? 'Mata Kuliah Unggulan'
                                                : 'Featured Courses'}
                                        </h4>
                                        <div className="flex flex-wrap gap-2.5">
                                            {curriculumSummary.signature_courses.map(
                                                (course, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-surface-0 border-cream-300/40 text-ink-900 inline-flex items-center rounded-lg border px-3.5 py-2 text-xs font-semibold shadow-sm"
                                                    >
                                                        {locale === 'id'
                                                            ? course.name_id
                                                            : course.name_en}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
