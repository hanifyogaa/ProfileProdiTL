import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

interface PartnerItem {
    id: number;
    name: string;
    logo: string | null;
    url: string | null;
    type: 'industry' | 'academic';
}

interface PartnershipsProps {
    partners: PartnerItem[];
}

export default function Partnerships({ partners }: PartnershipsProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Kemitraan Industri & Akademik'
            : 'Industry & Academic Partnerships';

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
                                ? 'Kami bermitra dengan BUMN, logistik multinasional, dan universitas terkemuka untuk program magang dan riset bersama.'
                                : 'Partnering with state-owned corporations, global logistics enterprises, and leading universities.'}
                        </p>
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {partners.map((partner, index) => (
                        <Reveal key={partner.id} delay={index * 0.05}>
                            <Card className="border-cream-300/20 bg-surface-0 flex h-full flex-col justify-between border p-6 transition-shadow hover:shadow-md">
                                <div>
                                    <span className="bg-brand-800 text-surface-0 mb-4 inline-block rounded px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase">
                                        {partner.type === 'industry'
                                            ? locale === 'id'
                                                ? 'Industri'
                                                : 'Industry'
                                            : locale === 'id'
                                              ? 'Akademik'
                                              : 'Academic'}
                                    </span>
                                    <h3 className="font-display text-ink-900 text-lg leading-snug font-semibold">
                                        {partner.name}
                                    </h3>
                                </div>
                                {partner.url && (
                                    <div className="border-cream-300/10 mt-6 border-t pt-4">
                                        <a
                                            href={partner.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-700 text-xs font-bold hover:underline"
                                        >
                                            {locale === 'id'
                                                ? 'Kunjungi Situs →'
                                                : 'Visit Website →'}
                                        </a>
                                    </div>
                                )}
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
