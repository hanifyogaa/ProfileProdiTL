import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { locale, t } = useLocale();
    const [submitted, setSubmitted] = useState(false);

    const title = locale === 'id' ? 'Hubungi Kami' : 'Contact Us';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

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

                <div className="grid items-stretch gap-12 lg:grid-cols-12">
                    {/* Form Section / Left Column */}
                    <div className="lg:col-span-7">
                        <Reveal delay={0.05}>
                            <Card className="border-cream-300/20 bg-surface-0 border p-8 shadow-sm">
                                {submitted ? (
                                    <div className="py-10 text-center">
                                        <span className="text-brand-700 mb-6 inline-flex size-14 items-center justify-center rounded-full bg-amber-500/10">
                                            <Send className="size-6" />
                                        </span>
                                        <h3 className="font-display text-ink-900 mb-2 text-xl font-bold">
                                            {locale === 'id'
                                                ? 'Pesan Terkirim!'
                                                : 'Message Sent!'}
                                        </h3>
                                        <p className="text-navy-700 mx-auto max-w-sm text-sm leading-relaxed">
                                            {locale === 'id'
                                                ? 'Terima kasih atas tanggapan Anda. Kami akan menghubungi Anda kembali sesegera mungkin.'
                                                : 'Thank you for your feedback. We will get back to you as soon as possible.'}
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="text-brand-700 mb-2 block text-xs font-bold tracking-wider uppercase"
                                            >
                                                {locale === 'id'
                                                    ? 'Nama Lengkap'
                                                    : 'Full Name'}
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                className="border-cream-300/35 bg-surface-50/50 w-full rounded-lg border px-4 py-3 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="text-brand-700 mb-2 block text-xs font-bold tracking-wider uppercase"
                                            >
                                                {locale === 'id'
                                                    ? 'Alamat Email'
                                                    : 'Email Address'}
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                className="border-cream-300/35 bg-surface-50/50 w-full rounded-lg border px-4 py-3 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="text-brand-700 mb-2 block text-xs font-bold tracking-wider uppercase"
                                            >
                                                {locale === 'id'
                                                    ? 'Isi Pesan / Pertanyaan'
                                                    : 'Message / Inquiry'}
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                className="border-cream-300/35 bg-surface-50/50 w-full rounded-lg border px-4 py-3 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-brand-700 text-surface-0 hover:bg-brand-800 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                        >
                                            <Send className="size-4" />
                                            <span>
                                                {t({
                                                    id: 'Kirim Pesan',
                                                    en: 'Send Message',
                                                })}
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </Card>
                        </Reveal>
                    </div>

                    {/* Information Section / Right Column */}
                    <div className="flex flex-col justify-between gap-6 lg:col-span-5">
                        <Reveal delay={0.1}>
                            <div className="space-y-6">
                                <Card className="border-cream-300/20 bg-surface-0 flex items-start gap-4 border p-6 shadow-sm">
                                    <div className="text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                        <Mail className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-ink-900 text-sm font-bold">
                                            Email
                                        </h4>
                                        <a
                                            href="mailto:disca@telkomuniversity.ac.id"
                                            className="text-navy-700 hover:text-brand-700 mt-1 block text-xs"
                                        >
                                            disca@telkomuniversity.ac.id
                                        </a>
                                    </div>
                                </Card>

                                <Card className="border-cream-300/20 bg-surface-0 flex items-start gap-4 border p-6 shadow-sm">
                                    <div className="text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                        <Phone className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-ink-900 text-sm font-bold">
                                            {locale === 'id'
                                                ? 'Telepon'
                                                : 'Telephone'}
                                        </h4>
                                        <a
                                            href="tel:+62227564108"
                                            className="text-navy-700 hover:text-brand-700 mt-1 block text-xs"
                                        >
                                            +62 22 756 4108
                                        </a>
                                    </div>
                                </Card>

                                <Card className="border-cream-300/20 bg-surface-0 flex items-start gap-4 border p-6 shadow-sm">
                                    <div className="text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-ink-900 text-sm font-bold">
                                            {locale === 'id'
                                                ? 'Sekretariat'
                                                : 'Office'}
                                        </h4>
                                        <p className="text-navy-700 mt-1 text-xs leading-relaxed">
                                            Fakultas Rekayasa Industri, Telkom
                                            University, Jl. Telekomunikasi No.
                                            1, Bandung, Indonesia
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
