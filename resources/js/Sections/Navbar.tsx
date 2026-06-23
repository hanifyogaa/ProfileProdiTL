import { useLocale } from '@/contexts/LocaleContext';
import { Link } from '@inertiajs/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
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
            { href: '/kurikulum', label: { id: 'Kurikulum', en: 'Curriculum' } },
            { href: '/dosen', label: { id: 'Dosen', en: 'Lecturers' } },
            { href: '/statistik', label: { id: 'Statistik', en: 'Statistics' } },
        ],
    },
    { href: '/berita', label: { id: 'Berita', en: 'News' } },
    { href: '/galeri', label: { id: 'Galeri', en: 'Gallery' } },
    { href: '/kontak', label: { id: 'Kontak', en: 'Contact' } },
];

// Very slow spring — logo "floats" to corner
const LOGO_SPRING = { type: 'spring', stiffness: 42, damping: 16, mass: 1.1 } as const;

function LogoImage({ className }: { className?: string }) {
    const [error, setError] = useState(false);
    return error ? (
        <span className={`font-display text-surface-0 flex size-full items-center justify-center text-sm font-bold tracking-tight ${className ?? ''}`}>
            TL
        </span>
    ) : (
        <img
            src="/images/logo-ProdiTL.jpg"
            alt="Logo Teknik Logistik"
            className={`size-full object-cover ${className ?? ''}`}
            onError={() => setError(true)}
        />
    );
}

export function Navbar() {
    const { locale, toggleLocale, t } = useLocale();
    const [scrolled, setScrolled] = useState(false);
    const [manualExpanded, setManualExpanded] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => {
            const isScrolled = window.scrollY > 80;
            setScrolled(isScrolled);
            if (!isScrolled) setManualExpanded(false);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const showMini = scrolled && !manualExpanded;
    const showFull = !scrolled || manualExpanded;

    const openMenu = (key: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(key);
    };
    const closeMenuDelayed = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    return (
        <LayoutGroup>
            <header className="fixed inset-x-0 top-0 z-50">

                {/* ── FULL NAVBAR ── */}
                <AnimatePresence>
                    {showFull && (
                        <motion.div
                            key="full-navbar"
                            className="px-4 pt-4 sm:px-6 sm:pt-5"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12, transition: { duration: 0.45, ease: 'easeIn' } }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                        >
                            <nav className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 ${
                                scrolled
                                    ? 'border-cream-300/30 bg-surface-0/80 border shadow-[0_8px_24px_-12px_rgba(36,20,31,0.18)] backdrop-blur-xl backdrop-saturate-150'
                                    : 'border border-transparent bg-surface-0/40 backdrop-blur-md'
                            }`}>

                                {/* Logo — gets layoutId so it "flies" to mini position */}
                                <Link href="/" className="flex shrink-0 items-center gap-3">
                                    <motion.div
                                        layoutId="nav-logo"
                                        transition={LOGO_SPRING}
                                        className="size-10 overflow-hidden rounded-xl"
                                        style={{
                                            background: 'rgba(110,78,51,0.42)',
                                            backdropFilter: 'blur(16px) saturate(180%)',
                                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                                            border: '1px solid rgba(217,159,96,0.3)',
                                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                                        }}
                                    >
                                        <LogoImage />
                                        {/* Amber corner accent */}
                                        <span
                                            className="pointer-events-none absolute top-0 right-0 size-[14px]"
                                            style={{ background: '#D99F60', clipPath: 'polygon(100% 0, 100% 100%, 0 0)', opacity: 0.55 }}
                                            aria-hidden="true"
                                        />
                                    </motion.div>

                                    {/* Program name fades out separately from logo */}
                                    <motion.span
                                        className="font-display text-ink-900 hidden text-base leading-tight font-semibold sm:block"
                                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    >
                                        Teknik Logistik{' '}
                                        <span className="text-brand-700">·</span>{' '}
                                        <span className="text-navy-700/70 font-medium">Digital Supply Chain</span>
                                    </motion.span>
                                </Link>

                                {/* Nav links */}
                                <div className="hidden items-center gap-5 lg:flex">
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
                                                    aria-expanded={openDropdown === t(link.label)}
                                                    aria-haspopup="true"
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
                                                                    className="text-ink-900/80 hover:text-brand-700 block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-amber-500/8"
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

                                {/* Actions */}
                                <div className="flex items-center gap-2.5">
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
                                        <span className={`rounded-full px-3 py-1.5 transition-colors ${locale === 'id' ? 'bg-brand-700 text-surface-0' : ''}`}>ID</span>
                                        <span className={`rounded-full px-3 py-1.5 transition-colors ${locale === 'en' ? 'bg-brand-700 text-surface-0' : ''}`}>EN</span>
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
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── MINI LOGO — logo yang sama, "terbang" dari navbar ke pojok ── */}
                <AnimatePresence>
                    {showMini && (
                        <motion.button
                            key="mini-logo"
                            type="button"
                            onClick={() => setManualExpanded(true)}
                            aria-label="Tampilkan navigasi"
                            title="Klik untuk tampilkan navbar"
                            className="absolute top-4 left-4 sm:top-5 sm:left-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
                            exit={{ opacity: 0, transition: { duration: 0.25 } }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.93 }}
                        >
                            <motion.div
                                layoutId="nav-logo"
                                transition={LOGO_SPRING}
                                className="size-12 overflow-hidden rounded-2xl"
                                style={{
                                    background: 'rgba(110,78,51,0.38)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                    border: '1px solid rgba(217,159,96,0.28)',
                                    boxShadow: '0 8px 24px -8px rgba(36,20,31,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                                }}
                            >
                                <LogoImage />
                                <span
                                    className="pointer-events-none absolute top-0 right-0 size-[16px]"
                                    style={{ background: '#D99F60', clipPath: 'polygon(100% 0, 100% 100%, 0 0)', opacity: 0.6 }}
                                    aria-hidden="true"
                                />
                            </motion.div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* ── SLIDE-IN DRAWER ── */}
                <AnimatePresence>
                    {drawerOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 z-40"
                                style={{ background: 'rgba(36,20,31,0.45)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setDrawerOpen(false)}
                            />
                            <motion.div
                                className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col p-6"
                                style={{ background: '#6E4E33' }}
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.35, ease: [0.32, 0, 0.12, 1] }}
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="font-display text-surface-0/80 text-sm font-semibold">Navigasi</span>
                                    <button
                                        type="button"
                                        onClick={() => setDrawerOpen(false)}
                                        aria-label="Tutup menu"
                                        className="text-surface-0/70 hover:bg-surface-0/10 hover:text-surface-0 flex size-9 items-center justify-center rounded-full transition-colors"
                                    >
                                        <X className="size-5" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-1">
                                    {NAV_LINKS.map((link) =>
                                        'children' in link ? (
                                            <div key={t(link.label)} className="mb-1">
                                                <span className="text-cream-300/50 mb-1 block px-3 text-[11px] font-bold tracking-[0.15em] uppercase">
                                                    {t(link.label)}
                                                </span>
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={() => setDrawerOpen(false)}
                                                        className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                                                    >
                                                        {t(child.label)}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setDrawerOpen(false)}
                                                className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 block rounded-xl px-3 py-3 text-sm font-medium transition-colors"
                                            >
                                                {t(link.label)}
                                            </Link>
                                        ),
                                    )}
                                </nav>

                                <div className="mt-auto border-t pt-6" style={{ borderColor: 'rgba(172,149,135,0.2)' }}>
                                    <button
                                        type="button"
                                        onClick={toggleLocale}
                                        className="border-cream-300/25 text-cream-300 inline-flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors hover:bg-surface-0/10"
                                    >
                                        <span className={locale === 'id' ? 'text-amber-400' : ''}>ID</span>
                                        <span className="text-cream-300/30">/</span>
                                        <span className={locale === 'en' ? 'text-amber-400' : ''}>EN</span>
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>
        </LayoutGroup>
    );
}
