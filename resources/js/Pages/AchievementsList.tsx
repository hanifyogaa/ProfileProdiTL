import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Award, Calendar, Trophy } from 'lucide-react';

interface AchievementItem {
    id: number;
    title_id: string;
    title_en: string;
    level: 'national' | 'international';
    date: string;
    holder: string;
    cover: string | null;
}

interface AchievementsListProps {
    achievements: AchievementItem[];
}

const ACHIEVEMENT_FALLBACKS = [
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500&h=350',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500&h=350',
];

export default function AchievementsList({
    achievements,
}: AchievementsListProps) {
    const { locale } = useLocale();

    const title =
        locale === 'id'
            ? 'Daftar Prestasi & Penghargaan'
            : 'Awards & Achievements';

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
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((item, index) => {
                        const titleText =
                            locale === 'id' ? item.title_id : item.title_en;
                        const coverImg =
                            item.cover ||
                            ACHIEVEMENT_FALLBACKS[
                                index % ACHIEVEMENT_FALLBACKS.length
                            ];
                        const isIntl = item.level === 'international';

                        return (
                            <Reveal key={item.id} delay={index * 0.05}>
                                <Card className="group border-cream-300/20 bg-surface-0 flex h-full flex-col overflow-hidden border transition-shadow hover:shadow-md">
                                    <div className="bg-surface-50 relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={coverImg}
                                            alt={titleText}
                                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="bg-brand-800 text-surface-0 absolute top-3 left-3 flex items-center gap-1.5 rounded px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase">
                                            {isIntl ? (
                                                <>
                                                    <Trophy className="size-3 text-amber-500" />
                                                    <span>
                                                        {locale === 'id'
                                                            ? 'Internasional'
                                                            : 'International'}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Award className="size-3 text-amber-500" />
                                                    <span>
                                                        {locale === 'id'
                                                            ? 'Nasional'
                                                            : 'National'}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between p-5">
                                        <div>
                                            <div className="text-navy-700 mb-2 flex items-center gap-1 text-[10px] font-semibold">
                                                <Calendar className="size-3.5 text-amber-600" />
                                                <span>
                                                    {new Date(
                                                        item.date,
                                                    ).getFullYear()}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-ink-900 group-hover:text-brand-700 text-sm leading-snug font-semibold sm:text-base">
                                                {titleText}
                                            </h3>
                                            <p className="text-navy-700/80 mt-2 text-xs font-medium">
                                                {item.holder}
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
