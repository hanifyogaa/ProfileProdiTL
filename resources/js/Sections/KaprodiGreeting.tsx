import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LangText } from '@/components/LangText';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import type { Bilingual } from '@/types';

interface GreetingData {
    name: string | null;
    photo: string | null;
    quote: Bilingual;
    attribution: Bilingual;
    link_href: string;
}

export function KaprodiGreeting({ greeting }: { greeting: GreetingData }) {
    const { t } = useLocale();

    const kaprodiName = greeting.name || 'Dr. Ir. Muhammad Akbar, S.T., M.T.';
    const kaprodiPhoto =
        greeting.photo ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=750';

    return (
        <section className="bg-surface-0 relative pt-0 pb-20">
            <div className="mx-auto max-w-[1000px] px-6">
                <Reveal>
                    <Card className="border-cream-300/30 bg-surface-0 relative -mt-16 border shadow-[0_24px_48px_-20px_rgba(36,20,31,0.22)] sm:-mt-24">
                        <div className="grid md:grid-cols-12">
                            {/* Photo Column */}
                            <div className="bg-surface-50 border-cream-300/10 relative z-10 aspect-[4/5] overflow-hidden rounded-t-2xl border md:col-span-4 md:-my-8 md:-ml-6 md:aspect-auto md:rounded-2xl md:shadow-lg">
                                <img
                                    src={kaprodiPhoto}
                                    alt={kaprodiName}
                                    className="size-full object-cover"
                                />
                                <div className="from-ink-900/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:hidden" />
                                <div className="text-surface-0 absolute bottom-4 left-6 md:hidden">
                                    <h4 className="text-lg font-semibold">
                                        {kaprodiName}
                                    </h4>
                                    <p className="text-cream-300 text-xs">
                                        <LangText text={greeting.attribution} />
                                    </p>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="flex flex-col justify-between p-8 md:col-span-8 md:p-12">
                                <div>
                                    <span className="font-display mb-6 block text-4xl leading-none font-semibold text-amber-500">
                                        “
                                    </span>
                                    <blockquote className="font-display text-ink-900 text-lg leading-relaxed font-medium italic sm:text-xl">
                                        <LangText text={greeting.quote} />
                                    </blockquote>
                                </div>

                                <div className="border-cream-300/30 mt-8 flex flex-wrap items-end justify-between gap-6 border-t pt-6">
                                    <div className="hidden md:block">
                                        <h4 className="font-display text-ink-900 text-lg font-bold">
                                            {kaprodiName}
                                        </h4>
                                        <p className="text-navy-700 text-sm font-medium">
                                            <LangText
                                                text={greeting.attribution}
                                            />
                                        </p>
                                    </div>
                                    <div>
                                        <Button
                                            href={greeting.link_href}
                                            variant="tertiary"
                                            className="text-brand-700 group flex items-center gap-1 font-semibold"
                                        >
                                            {t({
                                                id: 'Baca selengkapnya',
                                                en: 'Read more',
                                            })}
                                            <span className="inline-block transition-transform group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Reveal>
            </div>
        </section>
    );
}
