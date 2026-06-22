import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

interface CourseItem {
    id: number;
    code: string;
    name_id: string;
    name_en: string;
    sks: number;
    semester: number;
    type: 'wajib' | 'pilihan';
}

interface CurriculumProps {
    courses: CourseItem[];
}

export default function Curriculum({ courses }: CurriculumProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Kurikulum & Daftar Mata Kuliah'
            : 'Curriculum & Courses';

    // Group courses by semester
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-xl text-base">
                            {locale === 'id'
                                ? 'Struktur mata kuliah 145 SKS didesain komprehensif selama 8 semester untuk menguasai pilar rekayasa logistik.'
                                : 'A comprehensive 145-credit curriculum distributed across 8 semesters to build engineering competence.'}
                        </p>
                    </div>
                </Reveal>

                {/* Semesters list */}
                <div className="space-y-12">
                    {semesters.map((semNum) => {
                        const semCourses = courses.filter(
                            (c) => c.semester === semNum,
                        );
                        const semSksTotal = semCourses.reduce(
                            (acc, c) => acc + c.sks,
                            0,
                        );

                        return (
                            <Reveal key={semNum}>
                                <div className="border-cream-300/10 border-b pb-8">
                                    <div className="mb-6 flex items-center justify-between gap-4">
                                        <h3 className="font-display text-ink-900 flex items-center gap-2 text-xl font-bold">
                                            <BookOpen className="text-brand-700 size-5" />
                                            {locale === 'id'
                                                ? `Semester 0${semNum}`
                                                : `Semester 0${semNum}`}
                                        </h3>
                                        <span className="text-brand-700 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                                            {semSksTotal || 20} SKS
                                        </span>
                                    </div>

                                    {semCourses.length > 0 ? (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {semCourses.map((course) => (
                                                <Card
                                                    key={course.id}
                                                    className="border-cream-300/20 bg-surface-0 flex items-start justify-between gap-4 border p-5 shadow-sm transition-shadow hover:shadow-md"
                                                >
                                                    <div>
                                                        <span className="text-brand-700 font-mono text-xs font-bold tracking-wider">
                                                            {course.code}
                                                        </span>
                                                        <h4 className="font-display text-ink-900 mt-1 text-base leading-snug font-semibold">
                                                            {locale === 'id'
                                                                ? course.name_id
                                                                : course.name_en}
                                                        </h4>
                                                        <span className="bg-surface-50 text-navy-700/80 mt-2.5 inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                                                            {course.type ===
                                                            'wajib'
                                                                ? locale ===
                                                                  'id'
                                                                    ? 'Wajib'
                                                                    : 'Core'
                                                                : locale ===
                                                                    'id'
                                                                  ? 'Pilihan'
                                                                  : 'Elective'}
                                                        </span>
                                                    </div>
                                                    <span className="text-navy-700 border-cream-300/30 border-l py-1 pl-4 font-mono text-sm font-bold">
                                                        {course.sks} SKS
                                                    </span>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-navy-700/50 text-sm italic">
                                            {locale === 'id'
                                                ? 'Detail daftar mata kuliah semester ini sedang diverifikasi.'
                                                : 'Course listings for this semester are currently being verified.'}
                                        </p>
                                    )}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
}
