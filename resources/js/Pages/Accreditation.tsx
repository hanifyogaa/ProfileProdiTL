import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

interface AccreditationDecree {
    title: { id: string; en: string };
    number: string;
    date?: string;
    grade?: string;
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
        ? 'Program Studi S1 Teknik Logistik Telkom University telah mendapatkan akreditasi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) dengan peringkat B, sebagaimana ditetapkan dalam SK No. 10735/SK/BAN-PT/Akred/S/IX/2021.'
        : 'The S1 Logistics Engineering Study Program at Telkom University has been accredited by the National Accreditation Board for Higher Education (BAN-PT) with a B rating, as stipulated in Decree No. 10735/SK/BAN-PT/Akred/S/IX/2021.');

    const nationalStatus = prodiStats?.unggul_sk
        ? (l === 'id' ? 'Terakreditasi: B' : 'Accreditation Rank: B')
        : (accreditation?.status?.[l] || (l === 'id' ? 'Terakreditasi: B' : 'Accreditation Rank: B'));

    const nationalSK = prodiStats?.unggul_sk || '10735/SK/BAN-PT/Akred/S/IX/2021';

    const nationalBadge = prodiStats?.unggul_badge || null;

    const decreesList = accreditation?.decrees?.length ? accreditation.decrees : [
        {
            title: {
                id: 'SK Pendirian Program Studi',
                en: 'Study Program Establishment Decree',
            },
            number: '1195/KPT/I/2018',
            date: '28/12/2018',
            grade: '–',
            description: {
                id: 'Surat keputusan pendirian Program Studi S1 Teknik Logistik oleh Kementerian Riset, Teknologi dan Pendidikan Tinggi.',
                en: 'Decree establishing the S1 Logistics Engineering Study Program by the Ministry of Research, Technology and Higher Education.',
            }
        },
        {
            title: {
                id: 'SK Akreditasi BAN-PT — Peringkat Baik',
                en: 'BAN-PT Accreditation Decree — Good Standing',
            },
            number: '1915/SK/BAN-PT/Ak-PKP/S/IV/2021',
            date: '13/04/2021',
            grade: 'Baik',
            description: {
                id: 'Menetapkan predikat Akreditasi "Baik" untuk Program Studi S1 Teknik Logistik Telkom University oleh BAN-PT.',
                en: 'Established the "Baik" (Good) accreditation rank for the S1 Logistics Engineering Study Program at Telkom University by BAN-PT.',
            }
        },
        {
            title: {
                id: 'SK Akreditasi BAN-PT — Peringkat B',
                en: 'BAN-PT Accreditation Decree — Rank B',
            },
            number: '10735/SK/BAN-PT/Akred/S/IX/2021',
            date: '08/09/2021',
            grade: 'B',
            description: {
                id: 'Menetapkan predikat Akreditasi "B" untuk Program Studi S1 Teknik Logistik Telkom University oleh BAN-PT.',
                en: 'Established the "B" accreditation rank for the S1 Logistics Engineering Study Program at Telkom University by BAN-PT.',
            }
        },
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

                    {/* History decrees table */}
                    <Reveal delay={0.1}>
                        <div className="rounded-2xl border border-cream-300/10 bg-surface-0 p-6 shadow-sm overflow-hidden">
                            <h4 className="font-display text-ink-900 text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'rgba(80,86,102,0.60)' }}>
                                {l === 'id' ? 'Riwayat SK Akreditasi — S1 Teknik Logistik' : 'Accreditation Decree History — S1 Logistics Engineering'}
                            </h4>

                            {/* Table header */}
                            <div className="grid grid-cols-12 gap-3 border-b pb-3 mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(80,86,102,0.50)', borderColor: 'rgba(172,149,135,0.20)' }}>
                                <div className="col-span-4">{l === 'id' ? 'Keterangan' : 'Description'}</div>
                                <div className="col-span-2 text-center">{l === 'id' ? 'Peringkat' : 'Grade'}</div>
                                <div className="col-span-4">{l === 'id' ? 'Nomor SK' : 'Decree No.'}</div>
                                <div className="col-span-2 text-right">{l === 'id' ? 'Tanggal' : 'Date'}</div>
                            </div>

                            {/* Table rows */}
                            <div className="divide-y" style={{ borderColor: 'rgba(172,149,135,0.12)' }}>
                                {decreesList.map((dec, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-3 py-4 items-center">
                                        <div className="col-span-4">
                                            <p className="text-sm font-semibold leading-snug" style={{ color: '#24141F' }}>{dec.title[l]}</p>
                                            <p className="mt-1 text-xs leading-relaxed" style={{ color: '#505666' }}>{dec.description[l]}</p>
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <span className="rounded-full px-3 py-1 text-xs font-bold"
                                                style={{
                                                    background: dec.grade === 'B' ? 'rgba(140,100,65,0.12)' :
                                                                dec.grade === 'Baik' ? 'rgba(217,159,96,0.15)' :
                                                                'rgba(80,86,102,0.08)',
                                                    color: dec.grade === 'B' ? '#8C6441' :
                                                           dec.grade === 'Baik' ? '#C08A4C' :
                                                           '#505666'
                                                }}
                                            >
                                                {dec.grade || '–'}
                                            </span>
                                        </div>
                                        <div className="col-span-4">
                                            <span className="text-xs font-bold" style={{ color: '#8C6441' }}>{dec.number}</span>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <span className="text-xs font-medium" style={{ color: 'rgba(80,86,102,0.60)' }}>{dec.date || '–'}</span>
                                        </div>
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
