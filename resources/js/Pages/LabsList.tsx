import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';

interface LabItem {
    id: number;
    name: string;
    focus: string | null;
    description_id: string | null;
    description_en: string | null;
    photo: string | null;
    order: number;
}

interface LabsListProps {
    labs: LabItem[];
}

const LAB_FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600&h=450',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=450',
];

const LAB_FALLBACK_DESCRIPTIONS: Record<string, { id: string; en: string }> = {
    'Laboratorium E-Logistik': {
        id: 'Fokus pada pemodelan, integrasi, dan optimalisasi sistem logistik elektronik berbasis IT untuk meningkatkan keandalan rantai pasok.',
        en: 'Focuses on the modeling, integration, and optimization of IT-based electronic logistics systems to enhance supply chain reliability.',
    },
    'Laboratorium Simulasi Rantai Pasok': {
        id: 'Digunakan untuk mensimulasikan skenario logistik industri riil dan memecahkan bottleneck operasional secara virtual.',
        en: 'Used for simulating real-world industrial logistics scenarios and solving operational bottlenecks virtually.',
    },
    'Laboratorium Sistem Informasi Logistik': {
        id: 'Merancang, menguji, dan mengimplementasikan solusi ERP dan platform sistem informasi logistik digital terintegrasi.',
        en: 'Designs, tests, and deploys ERP solutions and integrated digital logistics information system platforms.',
    },
    'Laboratorium Otomasi Gudang': {
        id: 'Mempelajari dan mempraktikkan teknologi otomasi gudang pintar, sensor IoT, serta integrasi robotik pergudangan.',
        en: 'Studies and implements smart warehouse automation technologies, IoT sensors, and warehousing robotics integration.',
    },
};

export default function LabsList({ labs }: LabsListProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Daftar Laboratorium & Fasilitas Riset'
            : 'Laboratories & Research Centers';

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

                {/* Grid */}
                <div className="grid gap-8 sm:grid-cols-2">
                    {labs.map((lab, index) => {
                        const description =
                            locale === 'id'
                                ? lab.description_id ||
                                  LAB_FALLBACK_DESCRIPTIONS[lab.name]?.id ||
                                  ''
                                : lab.description_en ||
                                  LAB_FALLBACK_DESCRIPTIONS[lab.name]?.en ||
                                  '';

                        const coverImg =
                            lab.photo ||
                            LAB_FALLBACK_IMAGES[
                                index % LAB_FALLBACK_IMAGES.length
                            ];

                        return (
                            <Reveal key={lab.id} delay={index * 0.05}>
                                <Card className="group border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md">
                                    <div className="bg-surface-50 relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={coverImg}
                                            alt={lab.name}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {lab.focus && (
                                            <span className="bg-brand-800 text-surface-0 absolute bottom-3 left-3 rounded px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase">
                                                {lab.focus}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-6">
                                        <div>
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-lg font-semibold transition-colors">
                                                {lab.name}
                                            </h3>
                                            <p className="text-navy-700 mt-3 text-sm leading-relaxed">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
}
