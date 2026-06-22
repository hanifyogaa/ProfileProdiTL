import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Code, Compass, Heart } from 'lucide-react';

const AREAS = [
    {
        icon: Code,
        title: {
            id: 'Sistem Logistik Digital',
            en: 'Digital Logistics Systems',
        },
        desc: {
            id: 'Pengembangan arsitektur software, integrasi API e-commerce, dan sistem otomatisasi manajemen gudang (WMS).',
            en: 'Development of WMS architectures, e-commerce api integrations, and warehouse automatons.',
        },
    },
    {
        icon: Compass,
        title: {
            id: 'Model Riset Operasional',
            en: 'Operations Research Modeling',
        },
        desc: {
            id: 'Pemodelan matematika untuk mengoptimalkan jalur distribusi supply chain global, pemecahan VRP, dan alokasi inventori.',
            en: 'Mathematical models for optimizing distribution paths, VRP solutions, and inventory allocations.',
        },
    },
    {
        icon: Heart,
        title: { id: 'Pengabdian Masyarakat', en: 'Community Service' },
        desc: {
            id: 'Implementasi keilmuan logistik untuk memecahkan masalah UMKM lokal, optimalisasi pergudangan desa, dan tata letak pasar.',
            en: 'Implementing logistics theories to enhance local MSME supply chains, village storage layout, and distribution.',
        },
    },
];

export default function Research() {
    const { locale, t } = useLocale();

    const title =
        locale === 'id'
            ? 'Penelitian & Pengabdian Masyarakat'
            : 'Research & Community Service';

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
                <div className="grid gap-8 sm:grid-cols-3">
                    {AREAS.map((area, index) => {
                        const Icon = area.icon;

                        return (
                            <Reveal key={index} delay={index * 0.05}>
                                <Card className="border-cream-300/20 bg-surface-0 flex h-full flex-col justify-between border p-8 transition-shadow hover:shadow-md">
                                    <div>
                                        <div className="text-brand-700 mb-6 inline-flex size-11 items-center justify-center rounded-xl bg-amber-500/10">
                                            <Icon className="size-5" />
                                        </div>
                                        <h3 className="font-display text-ink-900 text-lg leading-snug font-semibold">
                                            {t(area.title)}
                                        </h3>
                                        <p className="text-navy-700 mt-4 text-xs leading-relaxed sm:text-sm">
                                            {t(area.desc)}
                                        </p>
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
