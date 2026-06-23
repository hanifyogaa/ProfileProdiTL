import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface GalleryItem {
    id: number;
    title_id: string;
    title_en: string;
    caption_id: string | null;
    caption_en: string | null;
    image: string | null;
    category: string;
    order: number;
}

const CATEGORY_LABELS: Record<string, { id: string; en: string }> = {
    umum:         { id: 'Umum',         en: 'General' },
    kegiatan:     { id: 'Kegiatan',     en: 'Activities' },
    laboratorium: { id: 'Laboratorium', en: 'Laboratory' },
    prestasi:     { id: 'Prestasi',     en: 'Achievements' },
};

const FALLBACK_PHOTOS: GalleryItem[] = [
    { id: 1, title_id: 'Fasilitas Robotika Pergudangan', title_en: 'Robotics Warehousing Systems', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900', category: 'laboratorium', order: 0 },
    { id: 2, title_id: 'Simulasi Desain Rantai Pasok', title_en: 'Supply Chain Design Simulation', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900', category: 'laboratorium', order: 1 },
    { id: 3, title_id: 'Laboratorium Analitika Logistik', title_en: 'Logistics Data Analytics Lab', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900', category: 'laboratorium', order: 2 },
    { id: 4, title_id: 'Kunjungan Industri PT HAVI Logistics', title_en: 'Industry Visit - HAVI Logistics', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900', category: 'kegiatan', order: 3 },
    { id: 5, title_id: 'Workshop Internasional ASEAN', title_en: 'ASEAN International Workshop', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=900', category: 'kegiatan', order: 4 },
    { id: 6, title_id: 'Seminar Rantai Pasok Digital', title_en: 'Digital Supply Chain Seminar', caption_id: null, caption_en: null, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=900', category: 'kegiatan', order: 5 },
];

function imageSrc(photo: GalleryItem): string {
    if (!photo.image) return `https://ui-avatars.com/api/?name=${encodeURIComponent(photo.title_id)}&background=8C6441&color=fff&size=600`;
    if (photo.image.startsWith('http')) return photo.image;
    return `/storage/${photo.image}`;
}

export default function Gallery({ photos }: { photos?: GalleryItem[] }) {
    const { locale } = useLocale();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    const data = photos && photos.length > 0 ? photos : FALLBACK_PHOTOS;
    const title = locale === 'id' ? 'Galeri Foto Kegiatan' : 'Photo Gallery';

    const categories = ['all', ...Array.from(new Set(data.map((p) => p.category)))];
    const filtered = activeCategory === 'all' ? data : data.filter((p) => p.category === activeCategory);

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1100px] px-6 py-16">
                <Reveal variant="fade-down">
                    <div className="mb-10 text-center">
                        <h1 className="font-display text-ink-900 mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-lg text-base">
                            {locale === 'id'
                                ? 'Dokumentasi kegiatan, fasilitas, dan pencapaian Program Studi Teknik Logistik.'
                                : 'Documentation of activities, facilities, and achievements of the Logistics Engineering Study Program.'}
                        </p>
                    </div>
                </Reveal>

                {/* Category filter */}
                <Reveal variant="fade-up" delay={0.1}>
                    <div className="mb-8 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const label = cat === 'all'
                                ? (locale === 'id' ? 'Semua' : 'All')
                                : (CATEGORY_LABELS[cat]?.[locale as 'id' | 'en'] ?? cat);
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200"
                                    style={activeCategory === cat
                                        ? { background: '#8C6441', color: '#FFFDFB' }
                                        : { background: '#ECEBE9', color: '#505666' }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((photo, index) => (
                        <Reveal key={photo.id} delay={index * 0.06} variant="fade-up">
                            <button
                                type="button"
                                onClick={() => setLightbox(photo)}
                                className="group w-full text-left"
                                aria-label={locale === 'id' ? photo.title_id : photo.title_en}
                            >
                                <div className="overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-10px_rgba(36,20,31,0.18)]"
                                    style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={imageSrc(photo)}
                                            alt={locale === 'id' ? photo.title_id : photo.title_en}
                                            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Category pill */}
                                        <div className="absolute top-3 left-3">
                                            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
                                                style={{ background: 'rgba(36,20,31,0.55)', backdropFilter: 'blur(8px)', color: '#FFFDFB' }}>
                                                {CATEGORY_LABELS[photo.category]?.[locale as 'id' | 'en'] ?? photo.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="font-display text-ink-900 text-sm font-semibold leading-snug">
                                            {locale === 'id' ? photo.title_id : photo.title_en}
                                        </p>
                                        {(locale === 'id' ? photo.caption_id : photo.caption_en) && (
                                            <p className="mt-1 text-xs" style={{ color: '#AC9587' }}>
                                                {locale === 'id' ? photo.caption_id : photo.caption_en}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(36,20,31,0.88)', backdropFilter: 'blur(8px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="relative max-w-4xl w-full"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={imageSrc(lightbox)}
                                alt={locale === 'id' ? lightbox.title_id : lightbox.title_en}
                                className="w-full rounded-2xl object-contain max-h-[80vh]"
                            />
                            <div className="mt-3 px-1">
                                <p className="font-display text-white text-base font-semibold">
                                    {locale === 'id' ? lightbox.title_id : lightbox.title_en}
                                </p>
                                {(locale === 'id' ? lightbox.caption_id : lightbox.caption_en) && (
                                    <p className="mt-0.5 text-sm" style={{ color: 'rgba(172,149,135,0.9)' }}>
                                        {locale === 'id' ? lightbox.caption_id : lightbox.caption_en}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="absolute -top-3 -right-3 flex size-9 items-center justify-center rounded-full"
                                style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                                aria-label="Tutup"
                            >
                                <X className="size-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
