import { useLocale } from '@/contexts/LocaleContext';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Bilingual = { id: string; en: string };
type NavLeaf = { href: string; label: Bilingual };
type NavGroup = { label: Bilingual; children: NavLeaf[] };

const NAV_LINKS: (NavLeaf | NavGroup)[] = [
    { href: '/', label: { id: 'Beranda', en: 'Home' } },
    {
        label: { id: 'Program', en: 'Program' },
        children: [
            { href: '/profil', label: { id: 'Profil', en: 'About' } },
            {
                href: '/kurikulum',
                label: { id: 'Kurikulum', en: 'Curriculum' },
            },
            { href: '/dosen', label: { id: 'Dosen', en: 'Lecturers' } },
            {
                href: '/statistik',
                label: { id: 'Statistik', en: 'Statistics' },
            },
        ],
    },
    { href: '/berita', label: { id: 'Berita', en: 'News' } },
    { href: '/galeri', label: { id: 'Galeri', en: 'Gallery' } },
    { href: '/kontak', label: { id: 'Kontak', en: 'Contact' } },
];

export function Navbar() {
    const { locale, toggleLocale, t } = useLocale();
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const openMenu = (key: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(key);
    };

    const closeMenuDelayed = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    return (
        <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6">
            <nav
                className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-2xl px-5 py-3.5 transition-all duration-300 ${
                    scrolled
                        ? 'border-cream-300/30 bg-surface-0/70 border shadow-[0_8px_24px_-12px_rgba(36,20,31,0.18)] backdrop-blur-xl backdrop-saturate-150'
                        : 'bg-surface-0/40 border border-transparent backdrop-blur-md'
                }`}
            >
                <Link
                    href="/"
                    className="font-display text-ink-900 text-lg font-semibold"
                >
                    Teknik Logistik <span className="text-brand-700">·</span>{' '}
                    Digital Supply Chain
                </Link>

                <div className="hidden items-center gap-6 lg:flex">
                    {NAV_LINKS.map((link) =>
                        'children' in link ? (
                            <div
                                key={t(link.label)}
                                className="relative"
                                onMouseEnter={() => openMenu(t(link.label))}
                                onMouseLeave={closeMenuDelayed}
                            >
                                <button
                                    type="button"
                                    className="text-ink-900/80 hover:text-brand-700 flex items-center gap-1 text-sm font-medium transition-colors"
                                    aria-expanded={
                                        openDropdown === t(link.label)
                                    }
                                >
                                    {t(link.label)}
                                    <ChevronDown className="size-3.5" />
                                </button>

                                <AnimatePresence>
                                    {openDropdown === t(link.label) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            transition={{ duration: 0.15 }}
                                            className="border-cream-300/30 bg-surface-0/95 absolute top-full left-1/2 mt-2 w-52 -translate-x-1/2 rounded-2xl border p-2 shadow-[0_12px_32px_-12px_rgba(36,20,31,0.25)] backdrop-blur-xl"
                                        >
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="text-ink-900/80 hover:bg-brand-700/8 hover:text-brand-700 block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                                                >
                                                    {t(child.label)}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-ink-900/80 hover:text-brand-700 text-sm font-medium transition-colors"
                            >
                                {t(link.label)}
                            </Link>
                        ),
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Search"
                        className="text-ink-900/70 hover:bg-ink-900/5 hidden size-9 items-center justify-center rounded-full sm:flex"
                    >
                        <Search className="size-4" />
                    </button>

                    <button
                        type="button"
                        onClick={toggleLocale}
                        aria-label="Toggle language"
                        className="border-brand-700/30 text-brand-700 inline-flex items-center rounded-full border text-xs font-semibold"
                    >
                        <span
                            className={`rounded-full px-3 py-1.5 ${locale === 'id' ? 'bg-brand-700 text-surface-0' : ''}`}
                        >
                            ID
                        </span>
                        <span
                            className={`rounded-full px-3 py-1.5 ${locale === 'en' ? 'bg-brand-700 text-surface-0' : ''}`}
                        >
                            EN
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open menu"
                        className="text-ink-900/80 hover:bg-ink-900/5 flex size-9 items-center justify-center rounded-full lg:hidden"
                    >
                        <Menu className="size-5" />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            className="bg-ink-900/40 fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                        />
                        <motion.div
                            className="bg-brand-800 fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 p-6"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <button
                                type="button"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Close menu"
                                className="text-surface-0/80 hover:bg-surface-0/10 mb-4 flex size-9 items-center justify-center self-end rounded-full"
                            >
                                <X className="size-5" />
                            </button>

                            {NAV_LINKS.map((link) =>
                                'children' in link ? (
                                    <div
                                        key={t(link.label)}
                                        className="px-3 py-2"
                                    >
                                        <span className="text-cream-300/60 text-xs font-bold tracking-wider uppercase">
                                            {t(link.label)}
                                        </span>
                                        <div className="mt-1 flex flex-col">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={() =>
                                                        setDrawerOpen(false)
                                                    }
                                                    className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 rounded-lg px-2 py-2.5 text-sm font-medium"
                                                >
                                                    {t(child.label)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setDrawerOpen(false)}
                                        className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 rounded-lg px-3 py-3 text-sm font-medium"
                                    >
                                        {t(link.label)}
                                    </Link>
                                ),
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
