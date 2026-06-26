import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    body_id: string | null;
    body_en: string | null;
    category: string | null;
    featured_image: string | null;
    published_at: string;
    views: number;
}

interface NewsDetailProps {
    item: NewsItem;
    related: NewsItem[];
}

const NEWS_FALLBACKS: Record<string, string> = {
    'pendaftaran-mahasiswa-baru-2026-2027':
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200&h=600',
    'seminar-nasional-rantai-pasok-digital':
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=600',
    'update-kurikulum-145-sks':
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200&h=600',
};

const DEFAULT_NEWS_BG =
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=600';

const getCategoryLabel = (category: string | null, locale: string) => {
    if (!category) return '';
    const key = category.toLowerCase().trim();
    const translations: Record<string, { id: string; en: string }> = {
        'semua': { id: 'Semua', en: 'All' },
        'pengumuman': { id: 'Pengumuman', en: 'Announcement' },
        'kunjungan industri': { id: 'Kunjungan Industri', en: 'Industrial Visit' },
        'prestasi': { id: 'Prestasi', en: 'Achievement' },
        'riset': { id: 'Riset', en: 'Research' },
        'pengabdian': { id: 'Pengabdian', en: 'Community Service' },
        'kemahasiswaan': { id: 'Kemahasiswaan', en: 'Student Affairs' },
        'akademik': { id: 'Akademik', en: 'Academics' },
        'kegiatan': { id: 'Kegiatan', en: 'Event' },
        'umum': { id: 'Umum', en: 'General' }
    };
    const l = locale === 'id' ? 'id' : 'en';
    return translations[key]?.[l] ?? category;
};

export default function NewsDetail({ item, related }: NewsDetailProps) {
    const { locale, t } = useLocale();

    const titleText = locale === 'id' ? item.title_id : item.title_en;
    const bodyContent = locale === 'id' ? item.body_id : item.body_en;
    const coverImg =
        item.featured_image || NEWS_FALLBACKS[item.slug] || DEFAULT_NEWS_BG;

    return (
        <MainLayout>
            <Head title={titleText} />

            <article className="mx-auto max-w-[800px] px-6">
                {/* Back link */}
                <Reveal>
                    <Link
                        href="/berita"
                        className="text-brand-700 mb-8 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                    >
                        <ArrowLeft className="size-3.5" />
                        <span>
                            {t({ id: 'Kembali ke Berita', en: 'Back to News' })}
                        </span>
                    </Link>
                </Reveal>

                {/* Header block */}
                <Reveal delay={0.05}>
                    <div className="mb-6">
                        {item.category && (
                            <span className="bg-brand-700 text-surface-0 rounded px-2.5 py-1 text-xs font-bold tracking-wide uppercase">
                                {getCategoryLabel(item.category, locale)}
                            </span>
                        )}
                        <h1 className="font-display text-ink-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
                            {titleText}
                        </h1>

                        <div className="text-navy-700 mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="size-3.5 text-amber-600" />
                                <span>
                                    {new Date(
                                        item.published_at,
                                    ).toLocaleDateString(
                                        locale === 'id' ? 'id-ID' : 'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        },
                                    )}
                                </span>
                            </div>
                            <div className="border-cream-300/30 flex items-center gap-1.5 border-l pl-4">
                                <Eye className="size-3.5 text-amber-600" />
                                <span>
                                    {item.views}{' '}
                                    {locale === 'id' ? 'Dilihat' : 'Views'}
                                </span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Image block */}
                <Reveal delay={0.1}>
                    <div className="bg-surface-50 mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm">
                        <img
                            src={coverImg}
                            alt={titleText}
                            className="size-full object-cover"
                        />
                    </div>
                </Reveal>

                {/* Content block */}
                <Reveal delay={0.15}>
                    <div
                        className="prose text-navy-700 max-w-none space-y-6 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bodyContent || '' }}
                    />
                </Reveal>

                {/* Related news */}
                {related && related.length > 0 && (
                    <div className="border-cream-300/10 mt-16 border-t pt-12">
                        <h3 className="font-display text-ink-900 mb-8 text-xl font-bold">
                            {locale === 'id'
                                ? 'Berita Terkait'
                                : 'Related Articles'}
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {related.map((relItem) => {
                                const relTitle =
                                    locale === 'id'
                                        ? relItem.title_id
                                        : relItem.title_en;
                                const relCover =
                                    relItem.featured_image ||
                                    NEWS_FALLBACKS[relItem.slug] ||
                                    DEFAULT_NEWS_BG;

                                return (
                                    <Link
                                        key={relItem.id}
                                        href={`/berita/${relItem.slug}`}
                                        className="group block"
                                    >
                                        <Card className="border-cream-300/20 bg-surface-0 h-full overflow-hidden border transition-shadow hover:shadow-sm">
                                            <div className="bg-surface-50 aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={relCover}
                                                    alt={relTitle}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-103"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-display text-ink-900 group-hover:text-brand-700 line-clamp-2 text-sm leading-snug font-semibold transition-colors">
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
