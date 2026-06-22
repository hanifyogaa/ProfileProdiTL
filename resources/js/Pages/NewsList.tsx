import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

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

interface NewsListProps {
    news: {
        data: NewsItem[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

const NEWS_FALLBACKS: Record<string, string> = {
    'pendaftaran-mahasiswa-baru-2026-2027':
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600&h=400',
    'seminar-nasional-rantai-pasok-digital':
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=400',
    'update-kurikulum-145-sks':
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=400',
};

const DEFAULT_NEWS_BG =
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400';

export default function NewsList({ news }: NewsListProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id' ? 'Berita & Kegiatan Terbaru' : 'News & Activities';

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                    </div>
                </Reveal>

                {/* News Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {news.data.map((item, index) => {
                        const titleText =
                            locale === 'id' ? item.title_id : item.title_en;
                        const excerpt =
                            locale === 'id' ? item.excerpt_id : item.excerpt_en;
                        const coverImg =
                            item.featured_image ||
                            NEWS_FALLBACKS[item.slug] ||
                            DEFAULT_NEWS_BG;

                        return (
                            <Reveal key={item.id} delay={index * 0.05}>
                                <Card className="group border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md">
                                    <div className="bg-surface-50 relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={coverImg}
                                            alt={titleText}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {item.category && (
                                            <span className="bg-brand-700 text-surface-0 absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-6">
                                        <div>
                                            <div className="text-navy-700 mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase">
                                                <Calendar className="size-3 text-amber-600" />
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
                                            <Link href={`/berita/${item.slug}`}>
                                                <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-base leading-snug font-semibold transition-colors">
                                                    {titleText}
                                                </h3>
                                            </Link>
                                            {excerpt && (
                                                <p className="text-navy-700 mt-3 line-clamp-3 text-xs leading-relaxed">
                                                    {excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Pagination */}
                {news.last_page > 1 && (
                    <Reveal>
                        <div className="mt-16 flex items-center justify-center gap-4">
                            {news.links.map((link, idx) => {
                                if (link.url === null) return null;

                                const isNext = link.label.includes('Next');
                                const isPrev = link.label.includes('Previous');

                                return (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        className={`flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                                            link.active
                                                ? 'bg-brand-700 border-brand-700 text-surface-0'
                                                : 'bg-surface-0 border-cream-300/30 text-ink-900 hover:bg-surface-50'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </Reveal>
                )}
            </div>
        </MainLayout>
    );
}
