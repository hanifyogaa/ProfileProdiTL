import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Images, X } from 'lucide-react';
import { useRef, useState } from 'react';

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
    if (photo.image.startsWith('http') || photo.image.startsWith('/storage/')) return photo.image;
    return `/storage/${photo.image}`;
}

export default function Gallery({ photos }: { photos?: GalleryItem[] }) {
    const { locale } = useLocale();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

    const data = photos && photos.length > 0 ? photos : FALLBACK_PHOTOS;
    const title = locale === 'id' ? 'Galeri Foto Kegiatan' : 'Photo Gallery';
    const l = locale as 'id' | 'en';

    const categories = ['all', ...Array.from(new Set(data.map((p) => p.category)))];
    const filtered = activeCategory === 'all' ? data : data.filter((p) => p.category === activeCategory);

    // mosaic: pick up to 4 photos for hero bg collage
    const mosaicPhotos = data.slice(0, 4);

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── HERO — mosaic collage background ── */}
            <section ref={heroRef} className="relative flex min-h-[64vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                {/* Mosaic grid bg */}
                <motion.div className="absolute inset-0 grid grid-cols-4" style={shouldReduceMotion ? {} : { y: yBg }}>
                    {mosaicPhotos.map((p) => (
                        <div key={p.id} className="relative overflow-hidden">
                            <img src={imageSrc(p)} alt="" className="size-full object-cover" style={{ opacity: 0.28 }} fetchPriority="high" />
                        </div>
                    ))}
                </motion.div>
                {/* Unified scrim over mosaic */}
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.60) 50%, rgba(36,20,31,0.30) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-16 pt-40 text-center">
                    <Reveal>
                        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                            style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60', border: '1px solid rgba(217,159,96,0.25)' }}>
                            <Images className="size-3.5" />
                            {l === 'id' ? 'Dokumentasi' : 'Documentation'}
                        </span>
                        <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                            {l === 'id'
                                ? 'Dokumentasi kegiatan, fasilitas, dan pencapaian Program Studi Teknik Logistik.'
                                : 'Documentation of activities, facilities, and achievements of the Logistics Engineering Study Program.'}
                        </p>
                        <p className="mt-3 text-sm font-bold" style={{ color: 'rgba(172,149,135,0.50)' }}>
                            {data.length} {l === 'id' ? 'foto' : 'photos'}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── FILTER + GRID ── */}
            <div className="mx-auto max-w-[1100px] px-6 py-12">
                {/* Category filter */}
                <Reveal variant="fade-up">
                    <div className="mb-10 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const label = cat === 'all'
                                ? (l === 'id' ? 'Semua' : 'All')
                                : (CATEGORY_LABELS[cat]?.[l] ?? cat);
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                                    style={isActive
                                        ? { background: '#8C6441', color: '#FFFDFB', boxShadow: '0 4px 14px -4px rgba(140,100,65,0.45)' }
                                        : { background: '#ECEBE9', color: '#505666' }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Photo grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filtered.map((photo, index) => (
                            <Reveal key={photo.id} delay={index * 0.05} variant="fade-up">
                                <button
                                    type="button"
                                    onClick={() => setLightbox(photo)}
                                    className="group w-full text-left"
                                    aria-label={l === 'id' ? photo.title_id : photo.title_en}
                                >
                                    <div className="overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_48px_-12px_rgba(36,20,31,0.22)]"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={imageSrc(photo)}
                                                alt={l === 'id' ? photo.title_id : photo.title_en}
                                                className="size-full object-cover transition-transform duration-700 group-hover:scale-107"
                                                loading="lazy"
                                            />
                                            {/* dark overlay on hover */}
                                            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                style={{ background: 'rgba(36,20,31,0.25)' }} />
                                            {/* Category pill */}
                                            <div className="absolute top-3 left-3">
                                                <span className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
                                                    style={{ background: 'rgba(36,20,31,0.60)', backdropFilter: 'blur(8px)', color: '#FFFDFB' }}>
                                                    {CATEGORY_LABELS[photo.category]?.[l] ?? photo.category}
                                                </span>
                                            </div>
                                            {/* Zoom hint */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <span className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest"
                                                    style={{ background: 'rgba(217,159,96,0.90)', color: '#24141F' }}>
                                                    {l === 'id' ? 'Lihat →' : 'View →'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="font-display text-ink-900 text-sm font-semibold leading-snug group-hover:text-brand-700 transition-colors">
                                                {l === 'id' ? photo.title_id : photo.title_en}
                                            </p>
                                            {(l === 'id' ? photo.caption_id : photo.caption_en) && (
                                                <p className="mt-1 text-xs" style={{ color: '#AC9587' }}>
                                                    {l === 'id' ? photo.caption_id : photo.caption_en}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </Reveal>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(36,20,31,0.92)', backdropFilter: 'blur(10px)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl"
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={imageSrc(lightbox)}
                                alt={l === 'id' ? lightbox.title_id : lightbox.title_en}
                                className="w-full rounded-3xl object-contain shadow-2xl"
                                style={{ maxHeight: '80vh' }}
                            />
                            <div className="mt-4 px-1">
                                <p className="font-display text-base font-semibold text-white">
                                    {l === 'id' ? lightbox.title_id : lightbox.title_en}
                                </p>
                                {(l === 'id' ? lightbox.caption_id : lightbox.caption_en) && (
                                    <p className="mt-1 text-sm" style={{ color: 'rgba(172,149,135,0.85)' }}>
                                        {l === 'id' ? lightbox.caption_id : lightbox.caption_en}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="absolute -top-3 -right-3 flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
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
