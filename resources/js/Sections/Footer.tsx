import { useLocale } from '@/contexts/LocaleContext';
import { Link } from '@inertiajs/react';
import { Globe, Instagram, Mail, MapPin, Phone } from 'lucide-react';

interface SiteMeta {
    name: string;
    address: string;
    accreditation_badge: string | null;
}

interface Socials {
    instagram: string | null;
    line: string | null;
    tiktok: string | null;
}

interface Contact {
    email: string | null;
    phone: string | null;
}

interface FooterSettings {
    site_meta: SiteMeta;
    socials: Socials;
    contact: Contact;
}

export function Footer({ settings }: { settings: FooterSettings }) {
    const { locale, t } = useLocale();

    const siteName =
        settings.site_meta?.name || 'Teknik Logistik · Digital Supply Chain';
    const siteAddress =
        settings.site_meta?.address ||
        'Fakultas Rekayasa Industri, Telkom University, Jl. Telekomunikasi No. 1, Bandung, Indonesia';
    const email = settings.contact?.email || 'disca@telkomuniversity.ac.id';
    const phone = settings.contact?.phone || '+62 22 756 4108';

    const instagramUrl =
        settings.socials?.instagram || 'https://instagram.com/disca.telkomuniv';

    const sitemaps = [
        { href: '/profil', label: { id: 'Tentang Kami', en: 'About Us' } },
        { href: '/kurikulum', label: { id: 'Kurikulum', en: 'Curriculum' } },
        {
            href: '/dosen',
            label: { id: 'Dosen & Staf', en: 'Faculty & Staff' },
        },
        {
            href: '/berita',
            label: { id: 'Berita & Kegiatan', en: 'News & Activities' },
        },
        { href: '/galeri', label: { id: 'Galeri Media', en: 'Media Gallery' } },
        {
            href: '/statistik',
            label: { id: 'Fakta & Angka', en: 'Facts & Figures' },
        },
    ];

    return (
        <footer className="bg-surface-0 text-navy-700 pt-16 pb-8">
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Brand Lockup & Address */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="font-display text-brand-800 mb-6 block text-xl font-bold"
                        >
                            Teknik Logistik{' '}
                            <span className="text-amber-500">·</span> Digital
                            Supply Chain
                        </Link>
                        <p className="text-navy-700/80 mb-6 max-w-sm text-sm leading-relaxed">
                            {locale === 'id'
                                ? 'Program Studi S1 Teknik Logistik Universitas Telkom mengintegrasikan keilmuan teknik industri dan teknologi rantai pasok digital.'
                                : 'Telkom University Logistics Engineering program integrates industrial engineering and digital supply chain technologies.'}
                        </p>

                        <div className="space-y-3.5 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4.5 shrink-0 text-amber-500" />
                                <span className="text-navy-700/85">
                                    {siteAddress}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h4 className="font-display text-brand-800 mb-6 text-base font-semibold">
                            {locale === 'id'
                                ? 'Navigasi Pintar'
                                : 'Quick Links'}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {sitemaps.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-navy-700 hover:text-brand-700 transition-colors"
                                    >
                                        {t(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="lg:col-span-4">
                        <h4 className="font-display text-brand-800 mb-6 text-base font-semibold">
                            {locale === 'id' ? 'Hubungi Kami' : 'Get In Touch'}
                        </h4>

                        <div className="mb-6 space-y-3.5 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail className="text-brand-700 size-4.5" />
                                <a
                                    href={`mailto:${email}`}
                                    className="text-navy-700 hover:text-brand-700 transition-colors"
                                >
                                    {email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-brand-700 size-4.5" />
                                <a
                                    href={`tel:${phone}`}
                                    className="text-navy-700 hover:text-brand-700 transition-colors"
                                >
                                    {phone}
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-700/10 text-brand-700 hover:bg-brand-700 hover:text-surface-0 flex size-9 items-center justify-center rounded-lg transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="size-4" />
                            </a>
                            <a
                                href="https://telkomuniversity.ac.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-700/10 text-brand-700 hover:bg-brand-700 hover:text-surface-0 flex size-9 items-center justify-center rounded-lg transition-colors"
                                aria-label="Telkom University Website"
                            >
                                <Globe className="size-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-cream-300/20 text-navy-700/60 mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 text-xs font-medium sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} {siteName}. All Rights
                        Reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span>
                            {locale === 'id'
                                ? 'Akreditasi: UNGGUL'
                                : 'Accreditation: EXCELLENT'}
                        </span>
                        <span>·</span>
                        <span>Telkom University</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
