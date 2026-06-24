import { MainLayout } from '@/Layouts/MainLayout';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Download, ExternalLink, Monitor } from 'lucide-react';

interface AkademikEmbedProps {
    title: { id: string; en: string };
    url: string;
    description?: { id: string; en: string };
}

export default function AkademikEmbed({ title, url, description }: AkademikEmbedProps) {
    const { locale } = useLocale();
    const l = locale as 'id' | 'en';

    const pageTitle = title[l];

    return (
        <MainLayout>
            <Head title={pageTitle} />

            <div className="mx-auto max-w-[1100px] px-6">
                <Reveal>
                    <div className="mb-8">
                        <span className="bg-amber-500/12 text-brand-700 mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold">
                            <Monitor className="size-3.5" />
                            {l === 'id' ? 'Portal Akademik' : 'Academic Portal'}
                        </span>
                        <h1 className="font-display text-ink-900 mt-4 text-3xl font-semibold sm:text-4xl">
                            {pageTitle}
                        </h1>
                        {description && (
                            <p className="text-navy-700 mt-3 max-w-2xl text-sm leading-relaxed">
                                {description[l]}
                            </p>
                        )}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                                style={{ color: '#8C6441' }}
                            >
                                <ExternalLink className="size-3.5" />
                                {l === 'id' ? 'Buka di tab baru' : 'Open in new tab'}
                            </a>
                            <span style={{ color: 'rgba(172,149,135,0.40)' }}>·</span>
                            <a
                                href={url}
                                download
                                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                                style={{ color: '#8C6441' }}
                            >
                                <Download className="size-3.5" />
                                {l === 'id' ? 'Unduh PDF' : 'Download PDF'}
                            </a>
                        </div>
                    </div>
                </Reveal>

                {/* iframe embed */}
                <Reveal>
                    <div className="border-cream-300/20 overflow-hidden rounded-2xl border shadow-sm">
                        <iframe
                            src={url}
                            title={pageTitle}
                            className="h-[85vh] min-h-[640px] w-full"
                            loading="lazy"
                        />
                    </div>
                    <p className="mt-3 text-center text-xs" style={{ color: 'rgba(80,86,102,0.45)' }}>
                        <a href={url} download className="hover:underline" style={{ color: '#8C6441' }}>
                            {l === 'id' ? 'PDF tidak tampil? Klik untuk mengunduh.' : "PDF not showing? Click to download."}
                        </a>
                    </p>
                </Reveal>
            </div>
        </MainLayout>
    );
}
