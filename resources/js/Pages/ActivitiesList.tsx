import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { DarkBand, PageHero, PillLabel } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Calendar, CalendarCheck, CalendarClock, MapPin } from 'lucide-react';

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
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=500',
    'workshop-asean-logistics-business-readiness':
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=500',
    'kunjungan-pertamina-ru-v-balikpapan':
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800&h=500',
    'kunjungan-garuda-food':
        'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=800&h=500',
};

const DEFAULT_BG =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=500';

const HERO_PHOTO =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600&h=900';

const TYPE_LABEL: Record<string, { id: string; en: string; color: string }> = {
    visit:    { id: 'Kunjungan',   en: 'Industry Visit',  color: '#8C6441' },
    workshop: { id: 'Workshop',    en: 'Workshop',         color: '#6E4E33' },
    lecture:  { id: 'Kuliah Tamu', en: 'Guest Lecture',   color: '#C08A4C' },
};

function ActivityCard({ item, locale }: { item: ActivityItem; locale: string }) {
    const l = locale as 'id' | 'en';
    const titleText = l === 'id' ? item.title_id : item.title_en;
    const coverImg  = item.cover || ACTIVITY_IMAGES[item.slug] || DEFAULT_BG;
    const typeInfo  = TYPE_LABEL[item.type] ?? { id: item.type, en: item.type, color: '#8C6441' };

    return (
        <a href={`/agenda/${item.slug}`}>
            <Card
                className="group flex h-full flex-col overflow-hidden border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.18)]"
                style={{ borderColor: 'rgba(172,149,135,0.20)' }}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={coverImg}
                        alt={titleText}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Dark gradient at bottom */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.65) 0%, transparent 60%)' }}
                    />
                    <span
                        className="absolute top-3 left-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white"
                        style={{ background: `${typeInfo.color}DD` }}
                    >
                        {l === 'id' ? typeInfo.id : typeInfo.en}
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs font-semibold" style={{ color: '#505666' }}>
                        <div className="flex items-center gap-1">
                            <Calendar className="size-3.5" style={{ color: '#C08A4C' }} />
                            <span>
                                {new Date(item.date).toLocaleDateString(l === 'id' ? 'id-ID' : 'en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                })}
                            </span>
                        </div>
                        {item.location && (
                            <div className="flex items-center gap-1 border-l pl-3" style={{ borderColor: 'rgba(172,149,135,0.30)' }}>
                                <MapPin className="size-3.5" style={{ color: '#C08A4C' }} />
                                <span className="truncate max-w-[100px]">{item.location}</span>
                            </div>
                        )}
                    </div>
                    <h3
                        className="font-display text-lg font-semibold leading-snug transition-colors group-hover:opacity-70"
                        style={{ color: '#24141F' }}
                    >
                        {titleText}
                    </h3>
                </div>
            </Card>
        </a>
    );
}

export default function ActivitiesList({ activities }: ActivitiesListProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const title    = l === 'id' ? 'Agenda & Kegiatan Akademik' : 'Academic Events & Activities';
    const subtitle = l === 'id'
        ? 'Kegiatan akademik, kunjungan industri, workshop, dan kuliah tamu Program Studi Teknik Logistik Telkom University.'
        : 'Academic events, industry visits, workshops, and guest lectures at the Logistics Engineering Program.';

    const today    = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = activities.filter(a => new Date(a.date) >= today);
    const past     = activities.filter(a => new Date(a.date) < today);

    const heroStats = [
        { value: `${upcoming.length}`,   label: l === 'id' ? 'Kegiatan Mendatang' : 'Upcoming Events' },
        { value: `${past.length}`,        label: l === 'id' ? 'Kegiatan Terselesaikan' : 'Past Events' },
        { value: `${activities.length}`, label: l === 'id' ? 'Total Kegiatan' : 'Total Activities' },
    ];

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── Hero Cinematic ── */}
            <PageHero
                pillLabel={l === 'id' ? 'Agenda' : 'Events'}
                title={title}
                subtitle={subtitle}
                photoUrl={HERO_PHOTO}
                photoAlt="Campus seminar and workshop"
                stats={heroStats}
            />

            {/* ── Upcoming events ── */}
            {upcoming.length > 0 && (
                <section className="py-20 sm:py-28" style={{ background: '#FFFDFB' }}>
                    <div className="mx-auto max-w-[1100px] px-6">
                        <Reveal>
                            <div className="mb-12 flex items-center gap-4">
                                <div
                                    className="flex size-12 items-center justify-center rounded-2xl"
                                    style={{ background: 'rgba(217,159,96,0.12)' }}
                                >
                                    <CalendarClock className="size-5" style={{ color: '#C08A4C' }} />
                                </div>
                                <div>
                                    <PillLabel>{l === 'id' ? 'Segera Hadir' : 'Coming Up'}</PillLabel>
                                    <h2
                                        className="font-display mt-1 text-3xl font-bold"
                                        style={{ color: '#24141F' }}
                                    >
                                        {l === 'id' ? 'Kegiatan Mendatang' : 'Upcoming Activities'}
                                    </h2>
                                </div>
                            </div>
                        </Reveal>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {upcoming.map((item, idx) => (
                                <Reveal key={item.id} delay={idx * 0.06} variant="fade-up">
                                    <ActivityCard item={item} locale={l} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Past events (dark band) ── */}
            {past.length > 0 && (
                <DarkBand>
                    <div className="mx-auto max-w-[1100px] px-6">
                        <Reveal>
                            <div className="mb-12 flex items-center gap-4">
                                <div
                                    className="flex size-12 items-center justify-center rounded-2xl"
                                    style={{ background: 'rgba(217,159,96,0.12)' }}
                                >
                                    <CalendarCheck className="size-5" style={{ color: '#D99F60' }} />
                                </div>
                                <div>
                                    <span
                                        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                                        style={{ background: 'rgba(217,159,96,0.15)', color: '#D99F60' }}
                                    >
                                        {l === 'id' ? 'Telah Berlangsung' : 'Completed'}
                                    </span>
                                    <h2
                                        className="font-display mt-1 text-3xl font-bold"
                                        style={{ color: '#FFFDFB' }}
                                    >
                                        {l === 'id' ? 'Kegiatan Sebelumnya' : 'Past Activities'}
                                    </h2>
                                </div>
                            </div>
                        </Reveal>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {past.map((item, idx) => (
                                <Reveal key={item.id} delay={idx * 0.06} variant="fade-up">
                                    <ActivityCard item={item} locale={l} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </DarkBand>
            )}

            {/* Empty state */}
            {activities.length === 0 && (
                <div className="mx-auto max-w-[1000px] px-6 py-20 text-center">
                    <Calendar className="mx-auto mb-4 size-12 opacity-20" style={{ color: '#505666' }} />
                    <p className="text-sm" style={{ color: '#505666' }}>
                        {l === 'id' ? 'Belum ada kegiatan.' : 'No activities yet.'}
                    </p>
                </div>
            )}
        </MainLayout>
    );
}
