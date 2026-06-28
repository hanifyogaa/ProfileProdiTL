import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { DarkBand, PageHeroSplit, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Building2, ExternalLink, GraduationCap } from 'lucide-react';

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

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=900&h=700';

function PartnerCard({ partner, locale }: { partner: PartnerItem; locale: string }) {
    return (
        <Card
            className="flex h-full flex-col justify-between border bg-surface-0 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.15)]"
            style={{ borderColor: 'rgba(172,149,135,0.20)' }}
        >
            <div>
                {partner.logo ? (
                    <div className="mb-4 flex h-14 items-center">
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-12 max-w-[120px] object-contain"
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div
                        className="mb-4 flex size-12 items-center justify-center rounded-xl"
                        style={{ background: 'rgba(140,100,65,0.08)' }}
                    >
                        {partner.type === 'industry'
                            ? <Building2 className="size-5" style={{ color: '#8C6441' }} />
                            : <GraduationCap className="size-5" style={{ color: '#8C6441' }} />}
                    </div>
                )}
                <h3
                    className="font-display text-lg font-semibold leading-snug"
                    style={{ color: '#24141F' }}
                >
                    {partner.name}
                </h3>
            </div>
            {partner.url && (
                <div className="mt-6 border-t pt-4" style={{ borderColor: 'rgba(172,149,135,0.15)' }}>
                    <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                        style={{ color: '#8C6441' }}
                    >
                        {locale === 'id' ? 'Kunjungi Situs' : 'Visit Website'}
                        <ExternalLink className="size-3" />
                    </a>
                </div>
            )}
        </Card>
    );
}

export default function Partnerships({ partners }: PartnershipsProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title = l === 'id' ? 'Kemitraan Industri & Akademik' : 'Industry & Academic Partnerships';
    const subtitle = l === 'id'
        ? 'Kami bermitra dengan BUMN, logistik multinasional, dan universitas terkemuka untuk program magang, riset bersama, dan pengembangan kurikulum berbasis industri.'
        : 'Partnering with state-owned corporations, global logistics enterprises, and leading universities for internship programs, joint research, and industry-based curriculum development.';

    const industry = partners.filter(p => p.type === 'industry');
    const academic  = partners.filter(p => p.type === 'academic');

    const statsRow = [
        { value: `${industry.length}+`, label: l === 'id' ? 'Mitra Industri' : 'Industry Partners' },
        { value: `${academic.length}+`,  label: l === 'id' ? 'Mitra Akademik' : 'Academic Partners' },
        { value: '100+', label: l === 'id' ? 'Mahasiswa Magang/Tahun' : 'Interns per Year' },
    ];

    return (
        <MainLayout>
            <Head title={title} />

            {/* ── Hero Split (Level 1.5) ── */}
            <div style={{ background: '#FFFDFB' }}>
                <PageHeroSplit
                    pillLabel={l === 'id' ? 'Kemitraan' : 'Partnerships'}
                    title={title}
                    subtitle={subtitle}
                    photoUrl={HERO_PHOTO}
                    photoAlt="Business partnership handshake"
                    stats={statsRow}
                />
            </div>

            {/* ── Mitra Industri (dark band) ── */}
            {industry.length > 0 && (
                <DarkBand>
                    <div className="mx-auto max-w-[1100px] px-6">
                        <Reveal>
                            <div className="mb-12">
                                <span className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#D99F60' }}>
                                    <span className="h-px w-5" style={{ background: '#D99F60' }} />
                                    {l === 'id' ? 'Industri' : 'Industry'}
                                </span>
                                <h2
                                    className="font-display mt-2 text-3xl font-bold"
                                    style={{ color: '#FFFDFB' }}
                                >
                                    {l === 'id' ? 'Mitra Industri' : 'Industry Partners'}
                                </h2>
                                <p
                                    className="mt-3 max-w-xl text-sm leading-relaxed"
                                    style={{ color: 'rgba(172,149,135,0.80)' }}
                                >
                                    {l === 'id'
                                        ? 'Perusahaan-perusahaan logistik dan supply chain nasional dan multinasional yang bermitra aktif dengan Prodi Teknik Logistik.'
                                        : 'National and multinational logistics and supply chain companies actively partnering with the Logistics Engineering Program.'}
                                </p>
                            </div>
                        </Reveal>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {industry.map((partner, idx) => (
                                <Reveal key={partner.id} delay={idx * 0.06} variant="fade-up">
                                    <PartnerCard partner={partner} locale={l} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </DarkBand>
            )}

            {/* ── Mitra Akademik (surface-50) ── */}
            {academic.length > 0 && (
                <section className="py-20 sm:py-28" style={{ background: '#ECEBE9' }}>
                    <div className="mx-auto max-w-[1100px] px-6">
                        <Reveal>
                            <div className="mb-12">
                                <PillLabel>{l === 'id' ? 'Akademik' : 'Academic'}</PillLabel>
                                <h2
                                    className="font-display mt-2 text-3xl font-bold"
                                    style={{ color: '#24141F' }}
                                >
                                    {l === 'id' ? 'Mitra Akademik' : 'Academic Partners'}
                                </h2>
                                <p
                                    className="mt-3 max-w-xl text-sm leading-relaxed"
                                    style={{ color: '#505666' }}
                                >
                                    {l === 'id'
                                        ? 'Universitas dan institusi pendidikan yang berkolaborasi dalam riset, pertukaran mahasiswa, dan pengembangan keilmuan bersama.'
                                        : 'Universities and educational institutions collaborating in research, student exchange, and joint academic development.'}
                                </p>
                            </div>
                        </Reveal>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {academic.map((partner, idx) => (
                                <Reveal key={partner.id} delay={idx * 0.06} variant="fade-up">
                                    <PartnerCard partner={partner} locale={l} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Empty state if no partners at all */}
            {partners.length === 0 && (
                <div className="mx-auto max-w-[1000px] px-6 py-20 text-center">
                    <Building2 className="mx-auto mb-4 size-12 opacity-20" style={{ color: '#505666' }} />
                    <p className="text-sm" style={{ color: '#505666' }}>
                        -
                    </p>
                </div>
            )}
        </MainLayout>
    );
}
