import { MainLayout } from '@/Layouts/MainLayout';
import { PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Heart, MapPin, Tag, Users } from 'lucide-react';

interface ServiceItem {
    id: number;
    title_id: string;
    title_en: string;
    category: string | null;
    year: number | null;
    location: string | null;
    partners: string | null;
    description_id: string;
    description_en: string;
    image: string | null;
    team: string | null;
}

interface CommunityServiceProps {
    services: ServiceItem[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    'Pelatihan':    { bg: 'rgba(217,159,96,0.12)', text: '#C08A4C' },
    'Pendampingan': { bg: 'rgba(140,100,65,0.10)', text: '#8C6441' },
    'Konsultasi':   { bg: 'rgba(110,78,51,0.10)',  text: '#6E4E33' },
    'Workshop':     { bg: 'rgba(140,100,65,0.08)', text: '#8C6441' },
};

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600&h=900';

export default function CommunityService({ services }: CommunityServiceProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title    = l === 'id' ? 'Pengabdian Masyarakat' : 'Community Services';
    const subtitle = l === 'id'
        ? 'Program Studi Teknik Logistik aktif berkontribusi kepada masyarakat melalui program pengabdian yang berfokus pada peningkatan kapasitas logistik, digitalisasi UMKM, dan pemberdayaan komunitas lokal.'
        : 'The Logistics Engineering Program actively contributes to the community through service programs focused on logistics capacity building, MSME digitization, and local community empowerment.';

    const categories = Array.from(new Set(services.map(s => s.category).filter(Boolean)));

    const heroStats = [
        { value: `${services.length}+`,  label: l === 'id' ? 'Program Pengabdian' : 'Service Programs' },
        { value: `${categories.length}`, label: l === 'id' ? 'Bidang Fokus' : 'Focus Areas' },
    ];

    return (
        <MainLayout>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Pengabdian' : 'Community Service'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Community service activity"
                stats={heroStats}
            />

            {/* ── Services Grid ── */}
            <section className="py-20 sm:py-28" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <PillLabel>{l === 'id' ? 'Daftar Program' : 'Program Directory'}</PillLabel>
                            <h2
                                className="font-display mt-2 text-3xl font-bold"
                                style={{ color: '#24141F' }}
                            >
                                {l === 'id' ? 'Program Terkini' : 'Latest Programs'}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-8">
                        {services.length > 0 ? services.map((item, i) => {
                            const titleText = l === 'id' ? item.title_id : item.title_en;
                            const descText  = l === 'id' ? item.description_id : item.description_en;
                            const catStyle  = item.category
                                ? CATEGORY_COLORS[item.category] ?? { bg: 'rgba(140,100,65,0.08)', text: '#8C6441' }
                                : null;

                            return (
                                <Reveal key={item.id} delay={i * 0.06} variant="fade-up">
                                    <div
                                        className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.15)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                    >
                                        {/* Image */}
                                        <div
                                            className="relative aspect-[16/10] shrink-0 overflow-hidden flex items-center justify-center"
                                            style={{ background: 'rgba(217,159,96,0.06)' }}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={titleText}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <Users className="size-12 opacity-20" style={{ color: '#C08A4C' }} />
                                            )}
                                            {item.category && catStyle && (
                                                <span
                                                    className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase shadow-sm"
                                                    style={{ background: catStyle.bg, color: catStyle.text }}
                                                >
                                                    <Tag className="size-2.5" />
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col justify-between p-6">
                                            <div>
                                                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs" style={{ color: 'rgba(80,86,102,0.50)' }}>
                                                    {item.year && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="size-3.5" />
                                                            {item.year}
                                                        </span>
                                                    )}
                                                    {item.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="size-3.5" />
                                                            {item.location}
                                                        </span>
                                                    )}
                                                </div>
                                                <Link href={`/pengabdian/${item.id}`}>
                                                    <h3
                                                        className="font-display mb-3 line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:opacity-70"
                                                        style={{ color: '#24141F' }}
                                                    >
                                                        {titleText}
                                                    </h3>
                                                </Link>
                                                <p className="line-clamp-3 text-xs leading-relaxed" style={{ color: '#505666' }}>
                                                    {descText}
                                                </p>
                                            </div>
                                            <div
                                                className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                                                style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                            >
                                                {item.team && (
                                                    <p
                                                        className="max-w-[120px] truncate text-[10px] font-medium"
                                                        style={{ color: 'rgba(80,86,102,0.50)' }}
                                                    >
                                                        {item.team}
                                                    </p>
                                                )}
                                                {item.partners && (
                                                    <span
                                                        className="max-w-[100px] truncate rounded-full px-2 py-0.5 text-[9px] font-semibold"
                                                        style={{ background: '#ECEBE9', color: 'rgba(80,86,102,0.60)' }}
                                                        title={item.partners}
                                                    >
                                                        {item.partners}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        }) : (
                            <div className="col-span-full rounded-2xl border py-16 text-center" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                                <Heart className="mx-auto mb-3 size-10 opacity-20" style={{ color: '#505666' }} />
                                <p className="text-sm" style={{ color: '#505666' }}>
                                    {l === 'id' ? 'Belum ada data pengabdian.' : 'No community service data yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
