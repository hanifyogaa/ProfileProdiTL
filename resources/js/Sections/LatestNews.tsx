import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { ArrowRight, Calendar } from 'lucide-react';

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    excerpt_id: string | null;
    excerpt_en: string | null;
    category: string | null;
    featured_image: string | null;
    published_at: string;
}

const NEWS_FALLBACKS: Record<string, string> = {
    'pendaftaran-mahasiswa-baru-2026-2027':
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800&h=500',
    'seminar-nasional-rantai-pasok-digital':
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=500',
    'update-kurikulum-145-sks':
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500',
};

const DEFAULT_NEWS_BG =
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=500';

export function LatestNews({ latestNews }: { latestNews: NewsItem[] }) {
    const { locale, t } = useLocale();

    if (!latestNews || latestNews.length === 0) {
        return null;
    }

    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                <Reveal variant="fade-down">
                    <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="font-display text-ink-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Berita & Kegiatan'
                                    : 'News & Activities'}
                            </h2>
                        </div>
                        <div>
                            <Button
                                href="/berita"
                                variant="tertiary"
                                className="text-brand-700 group flex items-center gap-1 font-semibold"
                            >
                                {t({ id: 'Semua berita', en: 'All news' })}
                                <span className="inline-block transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Button>
                        </div>
                    </div>
                </Reveal>

                {/* Featured story (left) + compact list (right) */}
                <div className="grid gap-8 lg:grid-cols-12">
                    {latestNews[0] &&
                        (() => {
                            const item = latestNews[0];
                            const title =
                                locale === 'id' ? item.title_id : item.title_en;
                            const excerpt =
                                locale === 'id'
                                    ? item.excerpt_id
                                    : item.excerpt_en;
                            const coverImg =
                                item.featured_image ||
                                NEWS_FALLBACKS[item.slug] ||
                                DEFAULT_NEWS_BG;

                            return (
                                <Reveal className="lg:col-span-7" variant="fade-left">
                                    <Card noLift className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(36,20,31,0.2)]">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <img
                                                src={coverImg}
                                                alt={title}
                                                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {item.category && (
                                                <span className="bg-brand-700 text-surface-0 absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                                            <div>
                                                <div className="text-navy-700 mb-3 flex items-center gap-2 text-xs font-medium">
                                                    <Calendar className="size-3.5 text-amber-600" />
                                                    <span>
                                                        {new Date(
                                                            item.published_at,
                                                        ).toLocaleDateString(
                                                            locale === 'id'
                                                                ? 'id-ID'
                                                                : 'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            },
                                                        )}
                                                    </span>
                                                </div>

                                                <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-xl leading-snug font-semibold transition-colors duration-200 sm:text-2xl">
                                                    {title}
                                                </h3>

                                                {excerpt && (
                                                    <p className="text-navy-700 mt-3 line-clamp-3 text-sm leading-relaxed">
                                                        {excerpt}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="border-cream-300/10 mt-6 flex justify-end border-t pt-4">
                                                <Button
                                                    href={`/berita/${item.slug}`}
                                                    variant="tertiary"
                                                    className="text-brand-700 group/btn flex items-center gap-1.5 font-bold"
                                                >
                                                    <span>
                                                        {t({
                                                            id: 'Baca Selengkapnya',
                                                            en: 'Read More',
                                                        })}
                                                    </span>
                                                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            );
                        })()}

                    {/* Compact list of remaining items */}
                    <div className="flex flex-col gap-5 lg:col-span-5">
                        {latestNews.slice(1, 4).map((item, index) => {
                            const title =
                                locale === 'id' ? item.title_id : item.title_en;
                            const coverImg =
                                item.featured_image ||
                                NEWS_FALLBACKS[item.slug] ||
                                DEFAULT_NEWS_BG;

                            return (
                                <Reveal key={item.id} delay={(index + 1) * 0.1} variant="fade-right">
                                    <a
                                        href={`/berita/${item.slug}`}
                                        className="group border-cream-300/20 bg-surface-0 flex gap-4 rounded-2xl border p-3 transition-shadow hover:shadow-md"
                                    >
                                        <div className="size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
                                            <img
                                                src={coverImg}
                                                alt={title}
                                                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-center py-1">
                                            <div className="text-navy-700/80 mb-1.5 flex items-center gap-2 text-[11px] font-medium">
                                                {item.category && (
                                                    <span className="text-brand-700 font-bold tracking-wide uppercase">
                                                        {item.category}
                                                    </span>
                                                )}
                                                <span aria-hidden="true">
                                                    ·
                                                </span>
                                                <span>
                                                    {new Date(
                                                        item.published_at,
                                                    ).toLocaleDateString(
                                                        locale === 'id'
                                                            ? 'id-ID'
                                                            : 'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 line-clamp-2 text-sm leading-snug font-semibold transition-colors">
                                                {title}
                                            </h3>
                                        </div>
                                    </a>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
