import { MainLayout } from '@/Layouts/MainLayout';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { useLocale } from '@/contexts/LocaleContext';
import { Head } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';

interface ContactData { email?: string | null; phone?: string | null; }
interface SiteMeta { name?: string | null; address?: string | null; hero_image?: string | null; }
interface Socials { instagram?: string | null; line?: string | null; tiktok?: string | null; }

const HERO_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1920';

export default function Contact({
    contact,
    siteMeta,
    socials,
}: {
    contact?: ContactData;
    siteMeta?: SiteMeta;
    socials?: Socials;
}) {
    const { locale, t } = useLocale();
    const [submitted, setSubmitted] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const yBg   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    const email   = contact?.email   ?? 'disca@telkomuniversity.ac.id';
    const phone   = contact?.phone   ?? '+62 22 756 4108';
    const address = siteMeta?.address ?? 'Fakultas Rekayasa Industri, Telkom University, Jl. Telekomunikasi No. 1, Bandung, Indonesia';
    const instagram = socials?.instagram ?? null;

    const title = locale === 'id' ? 'Hubungi Kami' : 'Contact Us';
    const l = locale as 'id' | 'en';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <MainLayout fullHero>
            <Head title={title} />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative flex min-h-[52vh] items-end overflow-hidden" style={{ background: '#24141F' }}>
                <motion.div className="absolute inset-0" style={shouldReduceMotion ? {} : { y: yBg }}>
                    <img src={siteMeta?.hero_image || HERO_BG} alt="" className="size-full object-cover" style={{ opacity: 0.28 }} fetchPriority="high" />
                </motion.div>
                <div className="pointer-events-none absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(36,20,31,0.97) 0%, rgba(36,20,31,0.55) 55%, rgba(36,20,31,0.18) 100%)',
                }} />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, rgba(36,20,31,0) 0%, rgba(36,20,31,0.4) 20%, #ECEBE9 100%)' }} />
                <div className="absolute left-0 top-0 h-full w-1" style={{ background: 'linear-gradient(to bottom, transparent, #D99F60, transparent)' }} />

                <motion.div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 pb-14 pt-40" style={shouldReduceMotion ? {} : { y: yText }}>
                    <Reveal>
                        <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>
                        <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: 'rgba(172,149,135,0.85)' }}>
                            {l === 'id'
                                ? 'Punya pertanyaan atau ingin berkolaborasi? Kami selalu terbuka untuk diskusi.'
                                : 'Have a question or want to collaborate? We are always open to discussion.'}
                        </p>
                    </Reveal>
                </motion.div>
            </section>

            {/* ── FORM + INFO ── */}
            <div className="mx-auto max-w-[1000px] px-6 py-16">
                <div className="grid items-stretch gap-10 lg:grid-cols-12">
                    {/* Form */}
                    <div className="lg:col-span-7">
                        <Reveal delay={0.05}>
                            <Card className="border p-8 shadow-sm" style={{ borderColor: 'rgba(172,149,135,0.20)', background: '#FFFDFB' }}>
                                {submitted ? (
                                    <div className="py-10 text-center">
                                        <span className="mb-6 inline-flex size-14 items-center justify-center rounded-full"
                                            style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                            <Send className="size-6" />
                                        </span>
                                        <h3 className="font-display text-ink-900 mb-2 text-xl font-bold">
                                            {l === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}
                                        </h3>
                                        <p className="text-navy-700 mx-auto max-w-sm text-sm leading-relaxed">
                                            {l === 'id'
                                                ? 'Terima kasih atas tanggapan Anda. Kami akan menghubungi Anda kembali sesegera mungkin.'
                                                : 'Thank you for reaching out. We will get back to you as soon as possible.'}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="mb-2 block text-xs font-bold tracking-wider uppercase" style={{ color: '#8C6441' }}>
                                                {l === 'id' ? 'Nama Lengkap' : 'Full Name'}
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                className="w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2"
                                                style={{ borderColor: 'rgba(172,149,135,0.35)', background: 'rgba(236,235,233,0.40)' }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="mb-2 block text-xs font-bold tracking-wider uppercase" style={{ color: '#8C6441' }}>
                                                {l === 'id' ? 'Alamat Email' : 'Email Address'}
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                className="w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2"
                                                style={{ borderColor: 'rgba(172,149,135,0.35)', background: 'rgba(236,235,233,0.40)' }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="mb-2 block text-xs font-bold tracking-wider uppercase" style={{ color: '#8C6441' }}>
                                                {l === 'id' ? 'Isi Pesan / Pertanyaan' : 'Message / Inquiry'}
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={5}
                                                className="w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2"
                                                style={{ borderColor: 'rgba(172,149,135,0.35)', background: 'rgba(236,235,233,0.40)' }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-opacity hover:opacity-85 focus:outline-none focus:ring-2"
                                            style={{ background: '#8C6441', color: '#FFFDFB' }}
                                        >
                                            <Send className="size-4" />
                                            <span>{t({ id: 'Kirim Pesan', en: 'Send Message' })}</span>
                                        </button>
                                    </form>
                                )}
                            </Card>
                        </Reveal>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-4 lg:col-span-5">
                        <Reveal delay={0.1}>
                            {/* Contact cards */}
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <Mail className="size-5" />,
                                        label: 'Email',
                                        value: email,
                                        href: `mailto:${email}`,
                                    },
                                    {
                                        icon: <Phone className="size-5" />,
                                        label: l === 'id' ? 'WhatsApp / Telepon' : 'WhatsApp / Telephone',
                                        value: phone.includes('wa.me') ? '+62 851-3502-2891' : phone,
                                        href: phone.startsWith('http') ? phone : `tel:${phone.replace(/\s/g, '')}`,
                                    },
                                    {
                                        icon: <MapPin className="size-5" />,
                                        label: l === 'id' ? 'Sekretariat' : 'Office',
                                        value: address,
                                        href: null,
                                    },
                                    ...(instagram ? [{
                                        icon: <Instagram className="size-5" />,
                                        label: 'Instagram',
                                        value: instagram.replace('https://instagram.com/', '@').replace(/\/$/, ''),
                                        href: instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram.replace('@', '')}`,
                                    }] : []),
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 rounded-2xl border p-5"
                                        style={{ borderColor: 'rgba(172,149,135,0.18)', background: '#FFFDFB' }}>
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: 'rgba(140,100,65,0.10)', color: '#8C6441' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#8C6441' }}>{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href}
                                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                    className="mt-1 block text-sm leading-relaxed transition-opacity hover:opacity-70"
                                                    style={{ color: '#505666' }}>
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="mt-1 text-sm leading-relaxed" style={{ color: '#505666' }}>{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Map embed */}
                        <Reveal delay={0.18}>
                            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'rgba(172,149,135,0.18)' }}>
                                <iframe
                                    title={l === 'id' ? 'Lokasi Telkom University' : 'Telkom University Location'}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.474887938027!2d107.6273!3d-6.9736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9aed5f0d6b1%3A0x3fafd2c5e74efbfe!2sTelkom%20University!5e0!3m2!1sid!2sid!4v1234567890"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
