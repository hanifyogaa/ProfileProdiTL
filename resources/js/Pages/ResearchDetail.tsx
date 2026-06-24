import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, FlaskConical, Tag, Users } from 'lucide-react';

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

interface ResearchDetailProps {
    item: ResearchItem;
    related: ResearchItem[];
}

const CATEGORY_COLORS: Record<string, string> = {
    'Operations Research':     'bg-blue-500/10 text-blue-700',
    'Digital Logistics':       'bg-amber-500/10 text-amber-700',
    'Supply Chain Management': 'bg-brand-700/8 text-brand-700',
    'Data Science & Logistics':'bg-emerald-500/10 text-emerald-700',
};

export default function ResearchDetail({ item, related }: ResearchDetailProps) {
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
                        href="/riset"
                        className="text-brand-700 mb-8 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>
                            {t({ id: 'Kembali ke Penelitian', en: 'Back to Research' })}
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
                                        {l === 'id' ? `Tahun Penelitian: ${item.year}` : `Research Year: ${item.year}`}
                                    </span>
                                </div>
                            )}
                            {item.team && (
                                <div className="border-cream-300/30 flex items-center gap-1.5 border-l pl-4">
                                    <Users className="size-3.5 text-amber-600" />
                                    <span className="truncate max-w-[300px]">
                                        {item.team}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Reveal>

                {/* Image block */}
                <Reveal delay={0.1}>
                    <div className="bg-brand-800/5 mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm flex items-center justify-center border border-cream-300/10">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={titleText}
                                className="size-full object-cover"
                            />
                        ) : (
                            <FlaskConical className="text-brand-700/25 size-20" />
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

                {/* Related research */}
                {related && related.length > 0 && (
                    <div className="border-cream-300/10 mt-16 border-t pt-12">
                        <h3 className="font-display text-ink-900 mb-8 text-xl font-bold">
                            {l === 'id'
                                ? 'Penelitian Terkait'
                                : 'Related Research'}
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {related.map((relItem) => {
                                const relTitle = l === 'id' ? relItem.title_id : relItem.title_en;
                                return (
                                    <Link
                                        key={relItem.id}
                                        href={`/riset/${relItem.id}`}
                                        className="group block"
                                    >
                                        <Card className="border-cream-300/20 bg-surface-0 h-full overflow-hidden border transition-shadow hover:shadow-sm">
                                            <div className="bg-brand-800/5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                                                {relItem.image ? (
                                                    <img
                                                        src={relItem.image}
                                                        alt={relTitle}
                                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-103"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <FlaskConical className="text-brand-700/20 size-8" />
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
