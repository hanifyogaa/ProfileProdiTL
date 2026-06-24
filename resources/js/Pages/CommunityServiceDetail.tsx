import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Heart, MapPin, Tag, Users } from 'lucide-react';

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

interface CommunityServiceDetailProps {
    item: ServiceItem;
    related: ServiceItem[];
}

const CATEGORY_COLORS: Record<string, string> = {
    'Pelatihan':   'bg-amber-500/10 text-amber-700',
    'Pendampingan':'bg-brand-700/8 text-brand-700',
    'Konsultasi':  'bg-emerald-500/10 text-emerald-700',
    'Workshop':    'bg-blue-500/10 text-blue-700',
};

export default function CommunityServiceDetail({ item, related }: CommunityServiceDetailProps) {
    const { locale, t } = useLocale();
    const l = locale as 'id' | 'en';

    const titleText = l === 'id' ? item.title_id : item.title_en;
    const descContent = l === 'id' ? item.description_id : item.description_en;

    return (
        <MainLayout>
            <Head title={titleText} />

            <article className="mx-auto max-w-[800px] px-6">
                {/* Back link */}
                <Reveal>
                    <Link
                        href="/pengabdian"
                        className="text-brand-700 mb-8 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>
                            {t({ id: 'Kembali ke Pengabdian', en: 'Back to Community Services' })}
                        </span>
                    </Link>
                </Reveal>

                {/* Header block */}
                <Reveal delay={0.05}>
                    <div className="mb-6">
                        {item.category && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${CATEGORY_COLORS[item.category] ?? 'bg-brand-700 text-surface-0'}`}>
                                <Tag className="size-2.5" />
                                {item.category}
                            </span>
                        )}
                        <h1 className="font-display text-ink-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                            {titleText}
                        </h1>

                        <div className="text-navy-700 mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase">
                            {item.year && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 text-amber-600" />
                                    <span>
                                        {l === 'id' ? `Tahun: ${item.year}` : `Year: ${item.year}`}
                                    </span>
                                </div>
                            )}
                            {item.location && (
                                <div className="border-cream-300/30 flex items-center gap-1.5 border-l pl-4">
                                    <MapPin className="size-3.5 text-amber-600" />
                                    <span>{item.location}</span>
                                </div>
                            )}
                            {item.partners && (
                                <div className="border-cream-300/30 flex items-center gap-1.5 border-l pl-4">
                                    <span className="bg-surface-50 text-navy-700/60 rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                                        {item.partners}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Reveal>

                {/* Image block */}
                <Reveal delay={0.1}>
                    <div className="bg-amber-500/5 mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm flex items-center justify-center border border-cream-300/10">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={titleText}
                                className="size-full object-cover"
                            />
                        ) : (
                            <Users className="text-amber-500/25 size-20" />
                        )}
                    </div>
                </Reveal>

                {/* Content block */}
                <Reveal delay={0.15}>
                    <div
                        className="prose text-navy-700 max-w-none text-sm leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: descContent || '' }}
                    />
                </Reveal>

                {/* Team member section */}
                {item.team && (
                    <Reveal delay={0.18}>
                        <div className="border-cream-300/20 bg-surface-50/50 mt-8 rounded-xl border p-4 text-xs">
                            <span className="text-navy-700/50 block font-bold uppercase tracking-wider mb-1">
                                {l === 'id' ? 'Tim Pelaksana' : 'Execution Team'}
                            </span>
                            <span className="text-ink-900 font-medium">{item.team}</span>
                        </div>
                    </Reveal>
                )}

                {/* Related services */}
                {related && related.length > 0 && (
                    <div className="border-cream-300/10 mt-16 border-t pt-12">
                        <h3 className="font-display text-ink-900 mb-8 text-xl font-bold">
                            {l === 'id'
                                ? 'Kegiatan Pengabdian Lainnya'
                                : 'Other Community Services'}
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {related.map((relItem) => {
                                const relTitle = l === 'id' ? relItem.title_id : relItem.title_en;
                                return (
                                    <Link
                                        key={relItem.id}
                                        href={`/pengabdian/${relItem.id}`}
                                        className="group block"
                                    >
                                        <Card className="border-cream-300/20 bg-surface-0 h-full overflow-hidden border transition-shadow hover:shadow-sm">
                                            <div className="bg-amber-500/5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                                                {relItem.image ? (
                                                    <img
                                                        src={relItem.image}
                                                        alt={relTitle}
                                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-103"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <Users className="text-amber-500/20 size-8" />
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-display text-ink-900 group-hover:text-brand-700 line-clamp-2 text-xs leading-snug font-semibold transition-colors">
                                                    {relTitle}
                                                </h4>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>
        </MainLayout>
    );
}
