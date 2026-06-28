import { MainLayout } from '@/Layouts/MainLayout';
import { PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { FlaskConical } from 'lucide-react';

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
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900&h=600',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900&h=600',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900&h=600',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900&h=600',
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

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1600&h=900';

export default function LabsList({ labs }: LabsListProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title   = l === 'id' ? 'Laboratorium & Fasilitas Riset' : 'Laboratories & Research Centers';
    const subtitle = l === 'id'
        ? 'Fasilitas modern untuk riset, simulasi, dan praktik logistik digital yang mendukung kompetensi mahasiswa Teknik Logistik.'
        : 'Modern facilities for research, simulation, and digital logistics practice that support student competencies in Logistics Engineering.';

    const [featuredLab, ...restLabs] = labs;

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Fasilitas' : 'Facilities'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Logistics laboratory"
                stats={[
                    { value: `${labs.length}`, label: l === 'id' ? 'Laboratorium' : 'Laboratories' },
                    { value: '200+', label: l === 'id' ? 'Kapasitas Pengguna' : 'User Capacity' },
                    { value: '24/7', label: l === 'id' ? 'Akses Penelitian' : 'Research Access' },
                ]}
            />

            {/* ── Lab Grid ── */}
            <section className="py-20 sm:py-28" style={{ background: '#FFFDFB' }}>
                <div className="mx-auto max-w-[1100px] px-6">
                    <Reveal>
                        <div className="mb-12">
                            <PillLabel>{l === 'id' ? 'Daftar Lab' : 'Lab Directory'}</PillLabel>
                            <h2
                                className="font-display mt-2 text-3xl font-bold"
                                style={{ color: '#24141F' }}
                            >
                                {l === 'id' ? 'Fasilitas Laboratorium' : 'Laboratory Facilities'}
                            </h2>
                        </div>
                    </Reveal>

                    {labs.length === 0 ? (
                        <div className="rounded-2xl border py-20 text-center"
                            style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
                            <FlaskConical className="mx-auto mb-3 size-10 opacity-20" style={{ color: '#505666' }} />
                            <p className="text-sm" style={{ color: '#505666' }}>
                                -
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Featured lab — full-width bento card */}
                            {featuredLab && (() => {
                                const desc = l === 'id'
                                    ? featuredLab.description_id || LAB_FALLBACK_DESCRIPTIONS[featuredLab.name]?.id || ''
                                    : featuredLab.description_en || LAB_FALLBACK_DESCRIPTIONS[featuredLab.name]?.en || '';
                                const cover = featuredLab.photo || LAB_FALLBACK_IMAGES[0];

                                return (
                                    <Reveal variant="fade-up">
                                        <div
                                            className="group relative overflow-hidden rounded-3xl border shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                                            style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                        >
                                            <div className="grid grid-cols-12">
                                                {/* Image — 7 cols */}
                                                <div className="col-span-12 md:col-span-7 relative aspect-[16/9] md:aspect-auto md:min-h-[320px] overflow-hidden">
                                                    <img
                                                        src={cover}
                                                        alt={featuredLab.name}
                                                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{ background: 'linear-gradient(to right, transparent 70%, rgba(255,253,251,1) 100%)' }}
                                                    />
                                                </div>
                                                {/* Content — 5 cols */}
                                                <div className="col-span-12 md:col-span-5 flex flex-col justify-center p-8 md:p-10 bg-surface-0">
                                                    {featuredLab.focus && (
                                                        <span
                                                            className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                                                            style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}
                                                        >
                                                            {featuredLab.focus}
                                                        </span>
                                                    )}
                                                    <h3
                                                        className="font-display text-2xl font-bold leading-snug"
                                                        style={{ color: '#24141F' }}
                                                    >
                                                        {featuredLab.name}
                                                    </h3>
                                                    {desc && (
                                                        <p
                                                            className="mt-4 text-sm leading-relaxed"
                                                            style={{ color: '#505666' }}
                                                        >
                                                            {desc}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })()}

                            {/* Rest — 2-column grid */}
                            {restLabs.length > 0 && (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {restLabs.map((lab, index) => {
                                        const desc = l === 'id'
                                            ? lab.description_id || LAB_FALLBACK_DESCRIPTIONS[lab.name]?.id || ''
                                            : lab.description_en || LAB_FALLBACK_DESCRIPTIONS[lab.name]?.en || '';
                                        const cover = lab.photo || LAB_FALLBACK_IMAGES[(index + 1) % LAB_FALLBACK_IMAGES.length];

                                        return (
                                            <Reveal key={lab.id} delay={index * 0.06} variant="fade-up">
                                                <div
                                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.18)]"
                                                    style={{ borderColor: 'rgba(172,149,135,0.20)' }}
                                                >
                                                    <div className="relative aspect-[16/10] overflow-hidden">
                                                        <img
                                                            src={cover}
                                                            alt={lab.name}
                                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                        {lab.focus && (
                                                            <span
                                                                className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white"
                                                                style={{ background: 'rgba(36,20,31,0.75)', backdropFilter: 'blur(8px)' }}
                                                            >
                                                                {lab.focus}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-1 flex-col p-6">
                                                        <h3
                                                            className="font-display text-lg font-semibold leading-snug transition-colors group-hover:opacity-80"
                                                            style={{ color: '#24141F' }}
                                                        >
                                                            {lab.name}
                                                        </h3>
                                                        {desc && (
                                                            <p
                                                                className="mt-3 line-clamp-3 text-sm leading-relaxed"
                                                                style={{ color: '#505666' }}
                                                            >
                                                                {desc}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
