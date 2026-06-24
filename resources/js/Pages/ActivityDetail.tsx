import { MainLayout } from '@/Layouts/MainLayout';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

interface ActivityItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    body_id: string | null;
    body_en: string | null;
    type: string;
    date: string;
    location: string | null;
    cover: string | null;
}

interface ActivityDetailProps {
    item: ActivityItem;
    related: ActivityItem[];
}

const ACTIVITY_IMAGES: Record<string, string> = {
    'kunjungan-industri-havi-logistics':
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200&h=600',
    'workshop-asean-logistics-business-readiness':
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=600',
    'kunjungan-pertamina-ru-v-balikpapan':
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200&h=600',
    'kunjungan-garuda-food':
        'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=1200&h=600',
};
const DEFAULT_BG =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200&h=600';

const TYPE_LABELS: Record<string, { id: string; en: string }> = {
    visit:    { id: 'Kunjungan Industri', en: 'Industry Visit' },
    workshop: { id: 'Workshop',           en: 'Workshop' },
    lecture:  { id: 'Kuliah Tamu',        en: 'Guest Lecture' },
};

export default function ActivityDetail({ item, related }: ActivityDetailProps) {
    const { locale } = useLocale();

    const title    = locale === 'id' ? item.title_id : item.title_en;
    const body     = locale === 'id' ? item.body_id  : item.body_en;
    const coverImg = item.cover || ACTIVITY_IMAGES[item.slug] || DEFAULT_BG;
    const typeLabel = TYPE_LABELS[item.type]?.[locale as 'id' | 'en'] || item.type;

    const formattedDate = new Date(item.date).toLocaleDateString(
        locale === 'id' ? 'id-ID' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' },
    );

    return (
        <MainLayout>
            <Head title={title} />

            <div className="mx-auto max-w-[900px] px-6 pb-20">
                {/* Back link */}
                <Reveal>
                    <div className="py-8">
                        <Link
                            href="/agenda"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-brand-700 transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            {locale === 'id' ? 'Kembali ke Agenda' : 'Back to Events'}
                        </Link>
                    </div>
                </Reveal>

                {/* Hero image */}
                <Reveal variant="fade-up">
                    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-xl mb-10">
                        <img
                            src={coverImg}
                            alt={title}
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                        <span className="absolute top-5 left-5 bg-amber-500 text-ink-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {typeLabel}
                        </span>
                    </div>
                </Reveal>

                {/* Meta */}
                <Reveal delay={0.1}>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-navy-700 mb-6">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-4 text-amber-600" />
                            <span>{formattedDate}</span>
                        </div>
                        {item.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="size-4 text-amber-600" />
                                <span>{item.location}</span>
                            </div>
                        )}
                    </div>
                </Reveal>

                {/* Title */}
                <Reveal delay={0.15}>
                    <h1 className="font-display text-ink-900 text-3xl sm:text-4xl font-bold leading-tight mb-8">
                        {title}
                    </h1>
                </Reveal>

                {/* Body */}
                {body ? (
                    <Reveal delay={0.2}>
                        <div
                            className="prose prose-neutral max-w-none text-navy-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    </Reveal>
                ) : (
                    <Reveal delay={0.2}>
                        <p className="text-navy-700 text-base leading-relaxed italic opacity-60">
                            {locale === 'id'
                                ? 'Detail lengkap kegiatan ini belum tersedia.'
                                : 'Full details of this activity are not yet available.'}
                        </p>
                    </Reveal>
                )}

                {/* Related */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <Reveal>
                            <h2 className="font-display text-ink-900 text-2xl font-bold mb-8">
                                {locale === 'id' ? 'Kegiatan Lainnya' : 'More Activities'}
                            </h2>
                        </Reveal>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((r, i) => {
                                const rTitle  = locale === 'id' ? r.title_id : r.title_en;
                                const rCover  = r.cover || ACTIVITY_IMAGES[r.slug] || DEFAULT_BG;
                                const rLabel  = TYPE_LABELS[r.type]?.[locale as 'id' | 'en'] || r.type;
                                return (
                                    <Reveal key={r.id} delay={i * 0.08}>
                                        <Link href={`/agenda/${r.slug}`}>
                                            <Card className="group overflow-hidden border border-cream-300/20 hover:shadow-md transition-shadow">
                                                <div className="aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={rCover}
                                                        alt={rTitle}
                                                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                                                        {rLabel}
                                                    </span>
                                                    <h3 className="font-display text-sm font-semibold text-ink-900 mt-1 line-clamp-2 group-hover:text-brand-700 transition-colors">
                                                        {rTitle}
                                                    </h3>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
