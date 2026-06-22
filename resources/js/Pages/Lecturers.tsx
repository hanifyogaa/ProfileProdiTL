import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

const LECTURERS = [
    {
        name: 'Dr. Ir. Muhammad Akbar, S.T., M.T.',
        nidn: '0412038701',
        expertise: [
            'Smart Warehousing',
            'Digital Logistics',
            'e-Logistics Systems',
        ],
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500',
        scholar: 'https://scholar.google.com',
        sinta: 'https://sinta.kemdikbud.go.id',
    },
    {
        name: 'Dr. Guntur Halim, M.T.',
        nidn: '0419088602',
        expertise: [
            'Supply Chain Design',
            'Systems Dynamics',
            'Industrial Automation',
        ],
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500',
        scholar: 'https://scholar.google.com',
        sinta: 'https://sinta.kemdikbud.go.id',
    },
    {
        name: 'Rian Pradana, S.T., M.Sc.',
        nidn: '0422119103',
        expertise: [
            'Logistics Analytics',
            'Operations Research',
            'Machine Learning',
        ],
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
        scholar: 'https://scholar.google.com',
        sinta: 'https://sinta.kemdikbud.go.id',
    },
    {
        name: 'Sarah Clarissa, M.Eng.',
        nidn: '0405028904',
        expertise: [
            'Cold Chain Logistics',
            'Inventory Control',
            'Risk Management',
        ],
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
        scholar: 'https://scholar.google.com',
        sinta: 'https://sinta.kemdikbud.go.id',
    },
];

export default function Lecturers() {
    const { locale } = useLocale();

    const title = locale === 'id' ? 'Dosen & Staf Akademik' : 'Faculty & Staff';

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-xl text-base">
                            {locale === 'id'
                                ? 'Dosen-dosen kami aktif dalam riset internasional dan memiliki kedekatan erat dengan kebutuhan industri logistik.'
                                : 'Our lecturers are active in international research circles and highly aligned with supply chain industries.'}
                        </p>
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="grid gap-8 sm:grid-cols-2">
                    {LECTURERS.map((dosen, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <Card className="border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md sm:flex-row">
                                <div className="relative aspect-[4/5] sm:aspect-auto sm:w-1/3">
                                    <img
                                        src={dosen.photo}
                                        alt={dosen.name}
                                        className="size-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-6 sm:w-2/3">
                                    <div>
                                        <h3 className="font-display text-ink-900 text-lg leading-snug font-semibold">
                                            {dosen.name}
                                        </h3>
                                        <span className="text-brand-700 mt-1.5 block font-mono text-[10px] font-bold tracking-wider uppercase">
                                            NIDN: {dosen.nidn}
                                        </span>

                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {dosen.expertise.map((exp, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-surface-50 text-navy-700 inline-block rounded px-2 py-0.5 text-[10px] font-semibold"
                                                >
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="border-cream-300/10 text-brand-700 mt-6 flex items-center gap-4 border-t pt-4 text-xs font-bold">
                                        <a
                                            href={dosen.scholar}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 hover:underline"
                                        >
                                            <span>Google Scholar</span>
                                            <ExternalLink className="size-3" />
                                        </a>
                                        <a
                                            href={dosen.sinta}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 hover:underline"
                                        >
                                            <span>SINTA Profile</span>
                                            <ExternalLink className="size-3" />
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
