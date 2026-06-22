import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';

interface LabItem {
    id: number;
    name: string;
    focus: string | null;
    description_id: string | null;
    description_en: string | null;
    photo: string | null;
    order: number;
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

export function LabsFacilities({ labs }: { labs: LabItem[] }) {
    const { locale, t } = useLocale();

    if (!labs || labs.length === 0) {
        return null;
    }

    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                {/* Header */}
                <Reveal>
                    <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="font-display text-ink-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
                                {locale === 'id'
                                    ? 'Laboratorium & Fasilitas'
                                    : 'Laboratories & Facilities'}
                            </h2>
                        </div>
                        <div>
                            <Button href="/laboratorium" variant="tertiary">
                                {t({
                                    id: 'Semua laboratorium',
                                    en: 'All laboratories',
                                })}
                                <span className="inline-block transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Button>
                        </div>
                    </div>
                </Reveal>

                {/* Grid — uniform 4-up, evenly balanced regardless of item count */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                            <Reveal key={lab.id} delay={index * 0.1}>
                                <Card className="group bg-surface-0 border-cream-300/30 flex h-full flex-col overflow-visible shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(36,20,31,0.15)]">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                                        <img
                                            src={coverImg}
                                            alt={lab.name}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="from-ink-900/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                                    </div>
                                    {/* Badge overlaps the photo/content seam */}
                                    <div className="text-ink-900 ring-surface-0 -mt-6 ml-6 flex size-12 items-center justify-center rounded-full bg-amber-500 shadow-[0_8px_18px_-6px_rgba(36,20,31,0.35)] ring-4">
                                        <span className="text-[10px] leading-none font-bold">
                                            {lab.focus
                                                ? lab.focus
                                                      .slice(0, 3)
                                                      .toUpperCase()
                                                : String(index + 1).padStart(
                                                      2,
                                                      '0',
                                                  )}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between px-6 pt-3 pb-6">
                                        <div>
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-lg leading-snug font-semibold transition-colors">
                                                {lab.name}
                                            </h3>
                                            <p className="text-navy-700 mt-3 line-clamp-4 text-xs leading-relaxed">
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
        </section>
    );
}
