import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

const PHOTOS = [
    {
        src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Fasilitas Robotika Pergudangan',
            en: 'Robotics Warehousing Systems',
        },
    },
    {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Simulasi Desain Rantai Pasok',
            en: 'Supply Chain Design Simulation',
        },
    },
    {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Laboratorium Analitika Logistik',
            en: 'Logistics Data Analytics Lab',
        },
    },
    {
        src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Kunjungan Industri PT HAVI Logistics',
            en: 'Industry Visit - HAVI Logistics',
        },
    },
    {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Workshop Internasional ASEAN',
            en: 'ASEAN International Workshop',
        },
    },
    {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=450',
        title: {
            id: 'Seminar Rantai Pasok Digital',
            en: 'Digital Supply Chain Seminar',
        },
    },
];

export default function Gallery() {
    const { locale, t } = useLocale();

    const title = locale === 'id' ? 'Galeri Foto Kegiatan' : 'Photo Gallery';

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

                {/* Lightbox / Image Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PHOTOS.map((photo, index) => (
                        <Reveal key={index} delay={index * 0.05}>
                            <Card className="group border-cream-300/20 bg-surface-0 overflow-hidden border transition-shadow hover:shadow-md">
                                <div className="bg-surface-50 aspect-[4/3] overflow-hidden">
                                    <img
                                        src={photo.src}
                                        alt={t(photo.title)}
                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="font-display text-ink-900 text-sm leading-snug font-semibold">
                                        {t(photo.title)}
                                    </p>
                                </div>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
