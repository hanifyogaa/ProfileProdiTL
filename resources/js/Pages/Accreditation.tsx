import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Award, ShieldCheck } from 'lucide-react';

export default function Accreditation() {
    const { locale } = useLocale();

    const title =
        locale === 'id' ? 'Akreditasi Program Studi' : 'Program Accreditation';

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

                {/* Status Block */}
                <Reveal delay={0.1}>
                    <Card className="border-cream-300/20 bg-surface-0 mb-12 flex flex-col items-center gap-8 border p-8 shadow-sm md:flex-row">
                        <div className="text-brand-700 flex size-20 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
                            <ShieldCheck className="size-10" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <span className="bg-brand-800 text-surface-0 rounded px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
                                BAN-PT / LAM Teknik
                            </span>
                            <h2 className="font-display text-ink-900 mt-3 text-2xl font-bold">
                                {locale === 'id'
                                    ? 'Terakreditasi: UNGGUL'
                                    : 'Accreditation Rank: UNGGUL (Excellent)'}
                            </h2>
                            <p className="text-navy-700 mt-2 text-sm leading-relaxed font-medium">
                                {locale === 'id'
                                    ? 'Peringkat akreditasi tertinggi yang diberikan oleh Lembaga Akreditasi Mandiri Program Studi Keteknikan (LAM Teknik) Republik Indonesia.'
                                    : 'The highest accreditation tier evaluated and issued by the Independent Accreditation Board for Engineering Education (LAM Teknik) of Indonesia.'}
                            </p>
                        </div>
                    </Card>
                </Reveal>

                {/* History list */}
                <Reveal delay={0.2}>
                    <div className="space-y-6">
                        <h3 className="font-display text-ink-900 mb-6 flex items-center gap-2 text-xl font-semibold">
                            <Award className="text-brand-700 size-5" />
                            {locale === 'id'
                                ? 'Keputusan & Surat SK'
                                : 'Accreditation Decrees'}
                        </h3>

                        <div className="ml-3 space-y-8 border-l-2 border-amber-500 pl-6">
                            <div className="relative">
                                <div className="bg-surface-50 absolute top-1.5 -left-[31px] size-4 rounded-full border-2 border-amber-500" />
                                <h4 className="text-ink-900 text-sm font-semibold">
                                    {locale === 'id'
                                        ? 'SK Akreditasi LAM Teknik 2025'
                                        : 'LAM Teknik Decree (2025)'}
                                </h4>
                                <p className="text-brand-700 mt-1 text-xs font-bold">
                                    No: 0451/SK/LAM-Teknik/IV/2025
                                </p>
                                <p className="text-navy-700 mt-2 text-xs font-medium">
                                    {locale === 'id'
                                        ? 'Menetapkan predikat Akreditasi "Unggul" yang berlaku hingga tahun 2030.'
                                        : 'Established the "Unggul" rank valid for 5 years through 2030.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </MainLayout>
    );
}
