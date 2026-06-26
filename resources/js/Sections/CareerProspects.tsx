import { LangText } from '@/components/LangText';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';
import { Award, Briefcase, TrendingUp } from 'lucide-react';

interface TrackItem {
    // Nested bilingual format
    title?: Bilingual;
    description?: Bilingual;
    // Flat format (from admin panel / DB)
    title_id?: string;
    title_en?: string;
    description_id?: string;
    description_en?: string;
}

function getTrackTitle(track: TrackItem, locale: string): string {
    if (track.title && (track.title.id || track.title.en)) {
        return locale === 'id' ? (track.title.id || track.title.en || '') : (track.title.en || track.title.id || '');
    }
    return locale === 'id' ? (track.title_id || '') : (track.title_en || '');
}

function getTrackDesc(track: TrackItem, locale: string): string {
    if (track.description && (track.description.id || track.description.en)) {
        return locale === 'id' ? (track.description.id || track.description.en || '') : (track.description.en || track.description.id || '');
    }
    return locale === 'id' ? (track.description_id || '') : (track.description_en || '');
}


interface ProspectsData {
    heading: Bilingual;
    tracks: TrackItem[];
}

const ICONS = [Briefcase, Award, TrendingUp];

export function CareerProspects({ prospects }: { prospects: ProspectsData }) {
    const { locale } = useLocale();

    return (
        <section className="bg-surface-0 py-20">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <Reveal variant="fade-down">
                        <h2 className="font-display text-ink-900 mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
                            {locale === 'id'
                                ? 'Profil Kelulusan & Karir Teknik Logistik'
                                : 'Graduate Profile & Career Pathways'}
                        </h2>
                        <p className="text-navy-700 mt-4 text-base leading-relaxed">
                            {locale === 'id'
                                ? 'Lulusan dibekali keahlian logistik berbasis IT yang sangat dibutuhkan di berbagai sektor industri modern.'
                                : 'Graduates are equipped with IT-based logistics capabilities highly sought after in modern industries.'}
                        </p>
                    </Reveal>
                </div>

                {/* Numbered list with a divider rhythm instead of repeated cards */}
                <div className="divide-cream-300/30 border-cream-300/30 divide-y border-y">
                    {prospects.tracks.map((track, index) => {
                        const Icon = ICONS[index % ICONS.length] || Briefcase;

                        return (
                            <Reveal key={index} delay={index * 0.08} variant={index % 2 === 0 ? 'fade-left' : 'fade-right'}>
                                <div className="group flex flex-col gap-6 py-8 sm:flex-row sm:items-center md:py-10">
                                    <span className="font-display text-cream-300/70 text-4xl font-semibold sm:w-20 sm:shrink-0">
                                        0{index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-display text-ink-900 text-xl font-bold">
                                            {getTrackTitle(track, locale)}
                                        </h3>
                                        <p className="text-navy-700 mt-2 max-w-xl text-sm leading-relaxed">
                                            {getTrackDesc(track, locale)}
                                        </p>
                                    </div>
                                    <Icon
                                        className="text-brand-700/30 hidden size-9 shrink-0 transition-colors group-hover:text-amber-500 sm:block"
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
