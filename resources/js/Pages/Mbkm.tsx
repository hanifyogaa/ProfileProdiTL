import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

export default function Mbkm() {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Merdeka Belajar Kampus Merdeka (MBKM)'
            : 'Kampus Merdeka (MBKM) Opportunities';

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

                {/* Content Block */}
                <Reveal delay={0.1}>
                    <Card className="border-cream-300/20 bg-surface-0 mb-8 border p-8 shadow-sm">
                        <h2 className="font-display text-ink-900 mb-4 text-xl font-bold">
                            {locale === 'id'
                                ? 'Tentang Program MBKM'
                                : 'About MBKM Program'}
                        </h2>
                        <p className="text-navy-700 mb-6 text-sm leading-relaxed font-medium">
                            {locale === 'id'
                                ? 'Program MBKM memfasilitasi mahasiswa Teknik Logistik untuk belajar di luar kampus selama maksimal 2 semester (setara 40 SKS) melalui berbagai skema konversi mata kuliah.'
                                : 'MBKM program enables Logistics Engineering students to study off-campus for up to 2 semesters (equivalent to 40 credits) through various certified conversion pathways.'}
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="bg-surface-50 border-cream-300/10 rounded-xl border p-5">
                                <h3 className="text-ink-900 text-sm font-bold">
                                    {locale === 'id'
                                        ? 'Magang Industri Bersertifikat'
                                        : 'Certified Industry Internships'}
                                </h3>
                                <p className="text-navy-700 mt-2 text-xs leading-relaxed">
                                    {locale === 'id'
                                        ? 'Magang terstruktur di BUMN, startup teknologi logistik, dan perusahaan supply chain partner selama 6 bulan.'
                                        : 'Six months structured work placement at partner state corporations or logistics tech firms.'}
                                </p>
                            </div>

                            <div className="bg-surface-50 border-cream-300/10 rounded-xl border p-5">
                                <h3 className="text-ink-900 text-sm font-bold">
                                    {locale === 'id'
                                        ? 'Pertukaran Mahasiswa'
                                        : 'Student Exchange'}
                                </h3>
                                <p className="text-navy-700 mt-2 text-xs leading-relaxed">
                                    {locale === 'id'
                                        ? 'Kesempatan studi di universitas mitra nasional maupun global yang memiliki program rekayasa logistik.'
                                        : 'Opportunities to study at leading national or global partner universities offering logistics science.'}
                                </p>
                            </div>
                        </div>
                    </Card>
                </Reveal>
            </div>
        </MainLayout>
    );
}
