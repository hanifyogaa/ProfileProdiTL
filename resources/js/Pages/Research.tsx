import { MainLayout } from '@/Layouts/MainLayout';
import { PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { Calendar, FlaskConical, Tag } from 'lucide-react';

interface ResearchItem {
    id: number;
    title_id: string;
    title_en: string;
    category: string | null;
    year: number | null;
    description_id: string;
    description_en: string;
    image: string | null;
    team: string | null;
}

interface ResearchProps {
    researches: ResearchItem[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    'Operations Research':      { bg: 'rgba(140,100,65,0.10)', text: '#8C6441' },
    'Digital Logistics':        { bg: 'rgba(217,159,96,0.12)', text: '#C08A4C' },
    'Supply Chain Management':  { bg: 'rgba(110,78,51,0.10)',  text: '#6E4E33' },
    'Data Science & Logistics': { bg: 'rgba(140,100,65,0.08)', text: '#8C6441' },
};

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600&h=900';

export default function Research({ researches }: ResearchProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title    = l === 'id' ? 'Penelitian & Publikasi' : 'Research & Publications';
    const subtitle = l === 'id'
        ? 'Publikasi dan proyek riset terkini dari dosen dan mahasiswa Program Studi Teknik Logistik Telkom University.'
        : 'Latest research publications and projects from faculty and students of the Logistics Engineering Program at Telkom University.';

    // Count by category for stats
    const categories = Array.from(new Set(researches.map(r => r.category).filter(Boolean)));

    const heroStats = [
        { value: `${researches.length}+`, label: l === 'id' ? 'Penelitian Aktif' : 'Active Research' },
        { value: `${categories.length}`,  label: l === 'id' ? 'Bidang Riset' : 'Research Areas' },
    ];

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Riset & Inovasi' : 'Research & Innovation'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Research analytics dashboard"
                stats={heroStats}
            />

            {/* ── Research Grid ── */}
            <section className="py-20 sm:py-28" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <PillLabel>{l === 'id' ? 'Daftar Penelitian' : 'Research Directory'}</PillLabel>
                            <h2
                                className="font-display mt-2 text-3xl font-bold"
                                style={{ color: '#24141F' }}
                            >
                                {l === 'id' ? 'Penelitian Terkini' : 'Latest Research'}
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-8">
                        {researches.length > 0 ? researches.map((item, i) => {
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
                                            style={{ background: 'rgba(140,100,65,0.05)' }}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={titleText}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <FlaskConical className="size-12 opacity-20" style={{ color: '#8C6441' }} />
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
                                                {item.year && (
                                                    <div className="mb-2 flex items-center gap-1 text-xs" style={{ color: 'rgba(80,86,102,0.50)' }}>
                                                        <Calendar className="size-3.5" />
                                                        <span>{item.year}</span>
                                                    </div>
                                                )}
                                                <Link href={`/riset/${item.id}`}>
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
                                            {item.team && (
                                                <p
                                                    className="mt-4 truncate border-t pt-4 text-[10px] font-medium"
                                                    style={{ borderColor: 'rgba(172,149,135,0.20)', color: 'rgba(80,86,102,0.50)' }}
                                                >
                                                    {item.team}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        }) : (
                            <div className="col-span-full rounded-2xl border py-16 text-center" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                                <FlaskConical className="mx-auto mb-3 size-10 opacity-20" style={{ color: '#505666' }} />
                                <p className="text-sm" style={{ color: '#505666' }}>
                                    -
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
