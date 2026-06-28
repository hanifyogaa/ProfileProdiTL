import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Building2, Mail, User } from 'lucide-react';

interface OrgMember {
    name: string;
    role: { id: string; en: string };
    email?: string;
}

interface OrgContent {
    description?: { id: string; en: string };
    chart_image?: string;
    members?: OrgMember[];
}

interface OrgStructureProps {
    orgContent?: OrgContent;
}

const FALLBACK_MEMBERS: OrgMember[] = [
    { name: 'Ketua Program Studi', role: { id: 'Kaprodi Teknik Logistik', en: 'Head of Logistics Engineering Program' } },
    { name: 'Sekretaris Program Studi', role: { id: 'Sekprodi', en: 'Program Secretary' } },
    { name: 'Koordinator Kemahasiswaan', role: { id: 'Koordinator Kemahasiswaan', en: 'Student Affairs Coordinator' } },
    { name: 'Koordinator Akademik', role: { id: 'Koordinator Akademik', en: 'Academic Coordinator' } },
    { name: 'Koordinator Riset & PKM', role: { id: 'Koordinator Riset & PKM', en: 'Research & Community Service Coordinator' } },
    { name: 'Koordinator Kerjasama', role: { id: 'Koordinator Kerjasama', en: 'Partnership Coordinator' } },
];

export default function OrgStructure({ orgContent }: OrgStructureProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title = l === 'id' ? 'Struktur Organisasi' : 'Organizational Structure';
    const members = orgContent?.members?.length ? orgContent.members : FALLBACK_MEMBERS;
    const description = orgContent?.description?.[l] ??
        (l === 'id'
            ? 'Program Studi Teknik Logistik dikelola oleh tim akademik dan manajemen yang berpengalaman untuk memastikan kualitas pendidikan dan pelayanan mahasiswa.'
            : 'The Logistics Engineering Study Program is managed by an experienced academic and management team to ensure quality education and student services.');

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[1000px] px-6">
                {/* Header */}
                <Reveal>
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-ink-900 mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                            {title}
                        </h1>
                        <p className="text-navy-700 mx-auto mt-4 max-w-2xl text-base leading-relaxed">
                            {description}
                        </p>
                    </div>
                </Reveal>

                {/* Org Chart Image (if uploaded) */}
                {orgContent?.chart_image && (
                    <Reveal>
                        <div className="border-cream-300/20 bg-surface-0 mb-16 overflow-hidden rounded-3xl border p-4 shadow-sm">
                            <img
                                src={orgContent.chart_image}
                                alt={l === 'id' ? 'Bagan Struktur Organisasi' : 'Organizational Chart'}
                                className="w-full rounded-2xl object-contain"
                            />
                        </div>
                    </Reveal>
                )}

                {/* Members grid */}
                <Reveal>
                    <h2 className="font-display text-ink-900 mb-8 text-2xl font-semibold">
                        {l === 'id' ? 'Pengurus Program Studi' : 'Program Staff'}
                    </h2>
                </Reveal>

                <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, i) => (
                        <Reveal key={i} delay={i * 0.05}>
                            <div className="border-cream-300/20 bg-surface-0 group rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
                                <div className="bg-brand-700/8 mb-4 flex size-11 items-center justify-center rounded-xl">
                                    <User className="text-brand-700 size-5" />
                                </div>
                                <h3 className="font-display text-ink-900 mb-1 text-base font-semibold leading-snug">
                                    {member.name}
                                </h3>
                                <p className="text-navy-700/70 text-sm">
                                    {member.role[l]}
                                </p>
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="text-brand-700 mt-3 flex items-center gap-1.5 text-xs font-medium hover:underline"
                                    >
                                        <Mail className="size-3" />
                                        {member.email}
                                    </a>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
