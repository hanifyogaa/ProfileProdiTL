import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

interface AccreditationDecree {
    title: { id: string; en: string };
    number: string;
    description: { id: string; en: string };
}

interface AccreditationItem {
    body_name?: string;
    status?: { id: string; en: string };
    description?: { id: string; en: string };
    decrees?: AccreditationDecree[];
}

interface AccreditationProps {
    accreditation?: AccreditationItem | null;
    prodiStats?: {
        iabee_desc?: { id: string; en: string };
        iabee_badge?: string | null;
        iabee_number?: string;
        unggul_desc?: { id: string; en: string };
        unggul_sk?: string;
        unggul_badge?: string | null;
    };
}

export default function Accreditation({ accreditation, prodiStats }: AccreditationProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title =
        locale === 'id' ? 'Akreditasi Program Studi' : 'Program Accreditation';

    // National Accreditation data from prodiStats with fallback to accreditation setting/static
    const nationalDesc = prodiStats?.unggul_desc?.[l] || accreditation?.description?.[l] || (l === 'id'
        ? 'Peringkat akreditasi tertinggi yang diberikan oleh Lembaga Akreditasi Mandiri Program Studi Keteknikan (LAM Teknik) Republik Indonesia.'
        : 'The highest accreditation tier evaluated and issued by the Independent Accreditation Board for Engineering Education (LAM Teknik) of Indonesia.');

    const nationalStatus = prodiStats?.unggul_sk
        ? (l === 'id' ? 'Terakreditasi: UNGGUL' : 'Accreditation Rank: UNGGUL (Excellent)')
        : (accreditation?.status?.[l] || (l === 'id' ? 'Terakreditasi: UNGGUL' : 'Accreditation Rank: UNGGUL (Excellent)'));

    const nationalSK = prodiStats?.unggul_sk || 'No: 0451/SK/LAM-Teknik/IV/2025';

    const nationalBadge = prodiStats?.unggul_badge || null;

    const decreesList = accreditation?.decrees?.length ? accreditation.decrees : [
        {
            title: {
                id: 'SK Akreditasi LAM Teknik 2025',
                en: 'LAM Teknik Accreditation Decree (2025)',
            },
            number: nationalSK,
            description: {
                id: 'Menetapkan predikat Akreditasi "Unggul" yang berlaku hingga tahun 2030.',
                en: 'Established the "Unggul" rank valid for 5 years through 2030.',
            }
        }
    ];

    // International Accreditation (IABEE)
    const showIabee = !!(prodiStats?.iabee_number || prodiStats?.iabee_desc?.[l]);
    const iabeeNo = prodiStats?.iabee_number || '';
    const iabeeDesc = prodiStats?.iabee_desc?.[l] || (l === 'id'
        ? 'Program Studi S1 Teknik Logistik Telkom University adalah program studi yang telah mendapatkan General Accreditation IABEE (Indonesian Accreditation Board for Engineering Education) sebagai pengakuan mutu pendidikan teknik bertaraf internasional.'
        : 'The S1 Logistics Engineering Study Program at Telkom University has been awarded General Accreditation by IABEE (Indonesian Accreditation Board for Engineering Education), recognizing our internationally-standard engineering education quality.');
    const iabeeBadge = prodiStats?.iabee_badge || null;

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[900px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                    </div>
                </Reveal>

                {/* ── SECTION 1: NATIONAL ACCREDITATION ── */}
                <section className="mb-16">
                    <Reveal>
                        <h3 className="font-display text-ink-900 mb-6 flex items-center gap-2 text-xl font-semibold">
                            <ShieldCheck className="text-brand-700 size-5" />
                            {l === 'id' ? 'Akreditasi Nasional' : 'National Accreditation'}
                        </h3>
                    </Reveal>

                    <Reveal delay={0.05}>
                        <Card className="border-cream-300/20 bg-surface-0 mb-8 flex flex-col items-center gap-8 border p-8 shadow-sm md:flex-row">
                            <div className="flex justify-center shrink-0">
                                {nationalBadge ? (
                                    <img
                                        src={nationalBadge}
                                        alt="Akreditasi Unggul Badge"
                                        className="h-28 w-28 object-contain"
                                    />
                                ) : (
                                    <div className="text-brand-700 flex size-20 items-center justify-center rounded-2xl bg-amber-500/10">
                                        <ShieldCheck className="size-10" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <span className="bg-brand-800 text-surface-0 rounded px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
                                    {accreditation?.body_name || 'BAN-PT / LAM Teknik'}
                                </span>
                                <h2 className="font-display text-ink-900 mt-3 text-2xl font-bold">
                                    {nationalStatus}
                                </h2>
                                <p className="text-navy-700 mt-2 text-sm leading-relaxed font-medium">
                                    {nationalDesc}
                                </p>
                            </div>
                        </Card>
                    </Reveal>

                    {/* History decrees timeline */}
                    <Reveal delay={0.1}>
                        <div className="space-y-6 rounded-2xl border border-cream-300/10 bg-surface-0 p-6 shadow-sm">
                            <h4 className="font-display text-ink-900 text-sm font-semibold uppercase tracking-wider text-navy-700/60">
                                {l === 'id' ? 'Keputusan & Surat SK' : 'Accreditation Decrees'}
                            </h4>

                            <div className="ml-3 space-y-8 border-l-2 border-amber-500 pl-6">
                                {decreesList.map((dec, i) => (
                                    <div key={i} className="relative">
                                        <div className="bg-surface-50 absolute top-1.5 -left-[31px] size-4 rounded-full border-2 border-amber-500" />
                                        <h5 className="text-ink-900 text-sm font-semibold">
                                            {dec.title[l]}
                                        </h5>
                                        <p className="text-brand-700 mt-1 text-xs font-bold">
                                            {dec.number}
                                        </p>
                                        <p className="text-navy-700 mt-2 text-xs font-medium">
                                            {dec.description[l]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ── SECTION 2: INTERNATIONAL ACCREDITATION (IABEE) ── */}
                {showIabee && (
                    <section className="mb-16">
                        <Reveal>
                            <h3 className="font-display text-ink-900 mb-6 flex items-center gap-2 text-xl font-semibold">
                                <Award className="text-brand-700 size-5" />
                                {l === 'id' ? 'Akreditasi Internasional' : 'International Accreditation'}
                            </h3>
                        </Reveal>

                        <Reveal delay={0.05}>
                            <Card className="border-cream-300/20 bg-surface-0 flex flex-col items-center gap-8 border p-8 shadow-sm md:flex-row">
                                <div className="flex justify-center shrink-0">
                                    {iabeeBadge ? (
                                        <img
                                            src={iabeeBadge}
                                            alt="IABEE Accreditation Badge"
                                            className="h-28 w-28 object-contain"
                                        />
                                    ) : (
                                        <div className="text-amber-600 flex size-20 items-center justify-center rounded-2xl bg-amber-500/10">
                                            <Award className="size-10" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <span className="bg-amber-600 text-surface-0 rounded px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
                                        IABEE Accreditation
                                    </span>
                                    <h2 className="font-display text-ink-900 mt-3 text-2xl font-bold">
                                        {l === 'id' ? 'Sertifikasi Internasional IABEE' : 'IABEE General Accreditation'}
                                    </h2>
                                    <p className="text-navy-700 mt-2 text-sm leading-relaxed font-medium">
                                        {iabeeDesc}
                                    </p>
                                    {iabeeNo && (
                                        <div className="border-amber-500/30 bg-amber-500/5 mt-4 inline-flex items-center gap-2 rounded-xl border px-3 py-1.5">
                                            <CheckCircle2 className="text-amber-600 size-3.5 shrink-0" />
                                            <p className="text-ink-900 text-xs font-bold">No. {iabeeNo}</p>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <a
                                            href="https://iabee.or.id"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-700 inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                                        >
                                            <ExternalLink className="size-3.5" />
                                            {l === 'id' ? 'Pelajari lebih lanjut tentang IABEE' : 'Learn more about IABEE'}
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </Reveal>
                    </section>
                )}
            </div>
        </MainLayout>
    );
}
