import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    excerpt_id: string | null;
    excerpt_en: string | null;
    category: string | null;
    featured_image: string | null;
    is_featured?: boolean;
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
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800&h=500',
    'seminar-nasional-rantai-pasok-digital':
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=500',
    'update-kurikulum-145-sks':
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500',
};

const DEFAULT_NEWS_BG =
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=500';

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600&h=900';

const ALL_CATEGORIES = ['Semua', 'Pengumuman', 'Kunjungan Industri', 'Prestasi', 'Riset', 'Pengabdian', 'Kemahasiswaan', 'Akademik', 'Kegiatan', 'Umum'];

function formatDate(dateStr: string, locale: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

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

export default function NewsList({ news }: NewsListProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';
    const [activeCategory, setActiveCategory] = useState('Semua');

    const title    = l === 'id' ? 'Berita & Pengumuman' : 'News & Announcements';
    const subtitle = l === 'id'
        ? 'Informasi terkini tentang kegiatan, prestasi, dan pengumuman dari Program Studi Teknik Logistik Telkom University.'
        : 'Latest information on activities, achievements, and announcements from the Logistics Engineering Program.';

    // Client-side category filter
    const allItems = news.data;
    const featured = allItems.find(n => n.is_featured);
    const filtered = activeCategory === 'Semua'
        ? allItems
        : allItems.filter(n => n.category === activeCategory);
    const gridItems = filtered.filter(n => n.id !== featured?.id || activeCategory !== 'Semua');

    // Only show categories that actually have items
    const presentCategories = ['Semua', ...Array.from(new Set(allItems.map(n => n.category).filter(Boolean) as string[]))];

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Berita & Info' : 'News & Info'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Conference and seminar"
            >
                {/* Category filter pills inside hero */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {presentCategories.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                            style={
                                activeCategory === cat
                                    ? { background: '#D99F60', color: '#24141F' }
                                    : { background: 'rgba(255,253,251,0.12)', color: 'rgba(172,149,135,0.85)', border: '1px solid rgba(172,149,135,0.30)' }
                            }
                        >
                            {getCategoryLabel(cat, locale)}
                        </button>
                    ))}
                </div>
            </PageHero>

            <div className="py-16 sm:py-20" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">

                    {/* ── Featured news card (only when "Semua" and there's a featured item) ── */}
                    {activeCategory === 'Semua' && featured && (() => {
                        const titleText = l === 'id' ? featured.title_id : featured.title_en;
                        const excerpt   = l === 'id' ? featured.excerpt_id : featured.excerpt_en;
                        const coverImg  = featured.featured_image || NEWS_FALLBACKS[featured.slug] || DEFAULT_NEWS_BG;

                        return (
                            <Reveal variant="fade-up">
                                <div className="mb-16">
                                    <PillLabel>{l === 'id' ? 'Berita Unggulan' : 'Featured Story'}</PillLabel>
                                    <Link href={`/berita/${featured.slug}`}>
                                        <div
                                            className="group mt-4 grid grid-cols-12 overflow-hidden rounded-3xl border shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                                            style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                        >
                                            {/* Image */}
                                            <div className="col-span-12 md:col-span-7 relative aspect-[16/9] md:aspect-auto md:min-h-[300px] overflow-hidden">
                                                <img
                                                    src={coverImg}
                                                    alt={titleText}
                                                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: 'linear-gradient(to right, transparent 60%, rgba(255,253,251,1) 100%)' }}
                                                />
                                                {featured.category && (
                                                    <span
                                                        className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                                                        style={{ background: 'rgba(140,100,65,0.90)' }}
                                                    >
                                                        {getCategoryLabel(featured.category, locale)}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div className="col-span-12 md:col-span-5 flex flex-col justify-center p-8 md:p-10 bg-surface-0">
                                                <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#505666' }}>
                                                    <Calendar className="size-3.5" style={{ color: '#C08A4C' }} />
                                                    {formatDate(featured.published_at, l)}
                                                </div>
                                                <h2
                                                    className="font-display text-2xl font-bold leading-snug transition-colors group-hover:opacity-75"
                                                    style={{ color: '#24141F' }}
                                                >
                                                    {titleText}
                                                </h2>
                                                {excerpt && (
                                                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed" style={{ color: '#505666' }}>
                                                        {excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-6 inline-flex items-center gap-1 text-xs font-bold" style={{ color: '#8C6441' }}>
                                                    {l === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                                                    <ChevronRight className="size-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Reveal>
                        );
                    })()}

                    {/* ── News Grid ── */}
                    {gridItems.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {gridItems.map((item, index) => {
                                const titleText = l === 'id' ? item.title_id : item.title_en;
                                const excerpt   = l === 'id' ? item.excerpt_id : item.excerpt_en;
                                const coverImg  = item.featured_image || NEWS_FALLBACKS[item.slug] || DEFAULT_NEWS_BG;

                                return (
                                    <Reveal key={item.id} delay={index * 0.06} variant="fade-up">
                                        <Card
                                            className="group flex h-full flex-col overflow-hidden border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.15)]"
                                            style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                        >
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <img
                                                    src={coverImg}
                                                    alt={titleText}
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                {item.category && (
                                                    <span
                                                        className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                                                        style={{ background: 'rgba(140,100,65,0.88)', color: '#FFFDFB' }}
                                                    >
                                                        {getCategoryLabel(item.category, locale)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase" style={{ color: '#505666' }}>
                                                    <Calendar className="size-3" style={{ color: '#C08A4C' }} />
                                                    {formatDate(item.published_at, l)}
                                                </div>
                                                <Link href={`/berita/${item.slug}`}>
                                                    <h3
                                                        className="font-display text-base font-semibold leading-snug transition-colors group-hover:opacity-70"
                                                        style={{ color: '#24141F' }}
                                                    >
                                                        {titleText}
                                                    </h3>
                                                </Link>
                                                {excerpt && (
                                                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed" style={{ color: '#505666' }}>
                                                        {excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </Card>
                                    </Reveal>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-2xl border py-16 text-center" style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                            <p className="text-sm" style={{ color: '#505666' }}>
                                {l === 'id' ? 'Tidak ada berita untuk kategori ini.' : 'No news for this category.'}
                            </p>
                        </div>
                    )}

                    {/* ── Pagination ── */}
                    {news.last_page > 1 && (
                        <Reveal>
                            <div className="mt-16 flex items-center justify-center gap-3">
                                {news.links.map((link, idx) => {
                                    if (link.url === null) return null;
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            className="flex size-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all"
                                            style={
                                                link.active
                                                    ? { background: '#8C6441', borderColor: '#8C6441', color: '#FFFDFB' }
                                                    : { background: '#FFFDFB', borderColor: 'rgba(172,149,135,0.30)', color: '#24141F' }
                                            }
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </Reveal>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
