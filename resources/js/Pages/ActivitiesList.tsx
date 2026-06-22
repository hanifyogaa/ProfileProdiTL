import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';

interface ActivityItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    type: 'visit' | 'workshop' | 'lecture';
    date: string;
    location: string | null;
    cover: string | null;
}

interface ActivitiesListProps {
    activities: ActivityItem[];
}

const ACTIVITY_IMAGES: Record<string, string> = {
    'kunjungan-industri-havi-logistics':
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=400',
    'workshop-asean-logistics-business-readiness':
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400',
    'kunjungan-pertamina-ru-v-balikpapan':
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600&h=400',
    'kunjungan-garuda-food':
        'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=600&h=400',
};

const DEFAULT_BG =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=400';

export default function ActivitiesList({ activities }: ActivitiesListProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id' ? 'Agenda & Kegiatan Akademik' : 'Academic Events';

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

                {/* List */}
                <div className="grid gap-8 sm:grid-cols-2">
                    {activities.map((item, index) => {
                        const titleText =
                            locale === 'id' ? item.title_id : item.title_en;
                        const coverImg =
                            item.cover ||
                            ACTIVITY_IMAGES[item.slug] ||
                            DEFAULT_BG;

                        return (
                            <Reveal key={item.id} delay={index * 0.05}>
                                <Card className="group border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md">
                                    <div className="bg-surface-50 relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={coverImg}
                                            alt={titleText}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-103"
                                            loading="lazy"
                                        />
                                        <span className="text-ink-900 absolute top-3 left-3 rounded bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                                            {item.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-6">
                                        <div>
                                            <div className="text-navy-700 mb-3 flex items-center gap-3 text-xs font-semibold">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="size-3.5 text-amber-600" />
                                                    <span>
                                                        {new Date(
                                                            item.date,
                                                        ).toLocaleDateString(
                                                            locale === 'id'
                                                                ? 'id-ID'
                                                                : 'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                {item.location && (
                                                    <div className="border-cream-300/30 flex items-center gap-1 border-l pl-3">
                                                        <MapPin className="size-3.5 text-amber-600" />
                                                        <span>
                                                            {item.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-lg leading-snug font-semibold">
                                                {titleText}
                                            </h3>
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
