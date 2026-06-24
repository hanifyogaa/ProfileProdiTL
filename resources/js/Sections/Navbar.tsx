import { useLocale } from '@/contexts/LocaleContext';
import { Link, router } from '@inertiajs/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Bilingual = { id: string; en: string };

type NavLeaf = {
    href: string;
    label: Bilingual;
    external?: boolean;
    sectionLabel?: Bilingual;
};

type NavGroup = {
    label: Bilingual;
    children: NavLeaf[];
    wide?: boolean;
};

const NAV_LINKS: (NavLeaf | NavGroup)[] = [
    { href: '/', label: { id: 'Beranda', en: 'Home' } },

    {
        label: { id: 'Tentang', en: 'About Us' },
        children: [
            { href: '/profil',                      label: { id: 'Profil',               en: 'Profile' } },
            { href: '/profil#visi-misi',             label: { id: 'Visi & Misi',          en: 'Vision & Mission' } },
            { href: '/profil#sejarah',               label: { id: 'Sejarah',              en: 'History' } },
            { href: '/dosen#org',                    label: { id: 'Struktur Organisasi',  en: 'Org Structure' } },
            { href: '/dosen#staff',                  label: { id: 'Staf Pengajar',         en: 'Faculty' } },
            { href: 'https://360.telkomuniversity.ac.id/', label: { id: 'Tur Kampus', en: 'Campus Tour' }, external: true },
        ],
    },

    {
        label: { id: 'Akademik', en: 'Academics' },
        wide: true,
        children: [
            { href: '/kurikulum#profil-lulusan',      label: { id: 'Profil Lulusan',        en: 'Graduate Profile' },              sectionLabel: { id: 'Kurikulum', en: 'Curriculum' } },
            { href: '/kurikulum#struktur-kurikulum',  label: { id: 'Struktur Kurikulum',    en: 'Curriculum Structure' } },
            { href: '/kurikulum#organigram',           label: { id: 'Organigram',            en: 'Organigram' } },
            { href: '/kurikulum#mata-kuliah-pilihan',  label: { id: 'Mata Kuliah Pilihan',   en: 'Elective Courses' } },
            { href: '/kurikulum#peo',                  label: { id: 'PEO',                   en: 'Program Educational Objectives' } },
            { href: '/kurikulum#plo',                  label: { id: 'PLO',                   en: 'Program Learning Outcomes' } },
            { href: '/profil/akreditasi',              label: { id: 'Akreditasi',             en: 'Accreditation' },                sectionLabel: { id: 'Program', en: 'Program' } },
            { href: '/mbkm',                           label: { id: 'MBKM',                  en: 'MBKM' } },
            { href: '/statistik',                      label: { id: 'Statistik',             en: 'Statistics' } },
        ],
    },

    {
        label: { id: 'Portal & Layanan', en: 'Portals & Services' },
        wide: true,
        children: [
            { href: '/akademik/kalender-akademik',                    label: { id: 'Kalender Akademik',  en: 'Academic Calendar' } },
            { href: '/akademik/pedoman-akademik',                     label: { id: 'Pedoman Akademik',   en: 'Academic Handbook' } },
            { href: '/akademik/kode-etik',                            label: { id: 'Kode Etik',          en: 'Code of Ethics' } },
            { href: 'https://basila.telkomuniversity.ac.id/basilav2/', label: { id: 'Ijazah & Transkrip', en: 'Diploma & Transcript' }, external: true },
            { href: 'https://ta1.virtualfri.id/',                      label: { id: 'Tugas Akhir',        en: 'Final Project' },          external: true },
            { href: 'https://sirama.telkomuniversity.ac.id/',          label: { id: 'Registrasi MK',      en: 'Course Registration' },    external: true },
        ],
    },

    {
        label: { id: 'Aktivitas', en: 'Activities' },
        children: [
            { href: '/riset',         label: { id: 'Riset',         en: 'Research' } },
            { href: '/pengabdian',    label: { id: 'Pengabdian',    en: 'Community Services' } },
            { href: '/laboratorium',  label: { id: 'Laboratorium',  en: 'Laboratories' } },
            { href: '/kemahasiswaan', label: { id: 'Kemahasiswaan', en: 'Student Association' } },
            { href: '/prestasi',      label: { id: 'Prestasi',      en: 'Competition & Award' } },
            { href: '/agenda',        label: { id: 'Agenda',        en: 'Events' } },
            { href: '/galeri',        label: { id: 'Galeri',        en: 'Gallery' } },
        ],
    },

    { href: '/berita', label: { id: 'Berita', en: 'News' } },
    { href: 'https://smb.telkomuniversity.ac.id/', label: { id: 'Penerimaan', en: 'Admission' }, external: true },
    { href: '/faq',    label: { id: 'FAQ',    en: 'FAQ' } },
    { href: '/kontak', label: { id: 'Kontak', en: 'Contact Us' } },
];

const LOGO_SPRING = { type: 'spring', stiffness: 42, damping: 16, mass: 1.1 } as const;

// Flat list for search
const ALL_SEARCH_PAGES = NAV_LINKS.flatMap((link) =>
    'children' in link ? link.children.filter((c) => !c.external) : link.external ? [] : [link as NavLeaf],
);

function LogoImage({ className }: { className?: string }) {
    const [error, setError] = useState(false);
    return error ? (
        <span className={`font-display text-brand-700 flex size-full items-center justify-center text-sm font-bold tracking-tight ${className ?? ''}`}>TU</span>
    ) : (
        <img src="/images/logo-tu.png" alt="Logo Telkom University" className={`size-full object-contain ${className ?? ''}`} onError={() => setError(true)} />
    );
}

function NavItemLink({ child, onClick }: { child: NavLeaf; onClick?: () => void }) {
    const { t } = useLocale();
    const isAnchor = child.href.includes('#') && !child.external;
    const cls = 'text-ink-900/80 hover:text-brand-700 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-amber-500/8';
    if (child.external) return (
        <a href={child.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
            {t(child.label)}<ArrowUpRight className="text-navy-700/40 size-3 shrink-0" />
        </a>
    );
    if (isAnchor) return <a href={child.href} className={cls} onClick={onClick}>{t(child.label)}</a>;
    return <Link href={child.href} className={cls} onClick={onClick}>{t(child.label)}</Link>;
}

function DrawerNavItemLink({ child, onClick }: { child: NavLeaf; onClick?: () => void }) {
    const { t } = useLocale();
    const cls = 'text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors';
    if (child.external) return (
        <a href={child.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
            {t(child.label)}<ArrowUpRight className="text-cream-300/40 size-3 shrink-0" />
        </a>
    );
    if (child.href.includes('#')) return <a href={child.href} className={cls} onClick={onClick}>{t(child.label)}</a>;
    return <Link href={child.href} onClick={onClick} className={cls}>{t(child.label)}</Link>;
}

// ── Search Overlay ──────────────────────────────────────────────────────────
function SearchOverlay({ onClose }: { onClose: () => void }) {
    const { t, locale } = useLocale();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const results = query.trim().length >= 1
        ? ALL_SEARCH_PAGES.filter((page) => {
            const label = t(page.label).toLowerCase();
            const q = query.toLowerCase();
            return label.includes(q);
        })
        : [];

    const handleSelect = (href: string) => {
        onClose();
        router.visit(href);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-28"
            style={{ background: 'rgba(36,20,31,0.70)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
        >
            <motion.div
                className="w-full max-w-[560px]"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Input */}
                <div className="flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl"
                    style={{ background: '#FFFDFB', border: '1px solid rgba(172,149,135,0.25)' }}>
                    <Search className="size-5 shrink-0" style={{ color: '#AC9587' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={locale === 'id' ? 'Cari halaman...' : 'Search pages...'}
                        className="flex-1 bg-transparent text-base outline-none"
                        style={{ color: '#24141F' }}
                    />
                    <button type="button" onClick={onClose} className="shrink-0 transition-opacity hover:opacity-60">
                        <X className="size-5" style={{ color: '#AC9587' }} />
                    </button>
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="mt-2 overflow-hidden rounded-2xl shadow-xl"
                        style={{ background: '#FFFDFB', border: '1px solid rgba(172,149,135,0.20)' }}>
                        {results.map((page, i) => (
                            <button
                                key={`${page.href}-${i}`}
                                type="button"
                                onClick={() => handleSelect(page.href)}
                                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-amber-500/[0.07]"
                                style={{ borderTop: i > 0 ? '1px solid rgba(172,149,135,0.12)' : undefined }}
                            >
                                <Search className="size-3.5 shrink-0" style={{ color: '#AC9587' }} />
                                <span className="text-sm font-medium" style={{ color: '#24141F' }}>{t(page.label)}</span>
                                <span className="ml-auto font-mono text-[10px]" style={{ color: 'rgba(80,86,102,0.40)' }}>
                                    {page.href}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {query.trim().length >= 1 && results.length === 0 && (
                    <div className="mt-2 rounded-2xl px-5 py-4 text-center text-sm"
                        style={{ background: '#FFFDFB', color: 'rgba(80,86,102,0.60)', border: '1px solid rgba(172,149,135,0.20)' }}>
                        {locale === 'id' ? 'Tidak ada hasil untuk' : 'No results for'} "<strong>{query}</strong>"
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ── Main Navbar ─────────────────────────────────────────────────────────────
export function Navbar({ lightOnTop = false }: { lightOnTop?: boolean }) {
    const { locale, toggleLocale, t } = useLocale();
    const [scrolled, setScrolled] = useState(false);
    const [manualExpanded, setManualExpanded] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
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

    // Ctrl/Cmd+K opens search
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const showMini = scrolled && !manualExpanded;
    const showFull = !scrolled || manualExpanded;

    // When lightOnTop and not yet scrolled: use light (white) text on dark hero bg
    const isLight = lightOnTop && !scrolled;

    const openMenu = (key: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(key);
    };
    const closeMenuDelayed = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    const navLinkCls = isLight
        ? 'text-white/85 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors'
        : 'text-ink-900/80 hover:text-brand-700 flex items-center gap-1 text-sm font-medium transition-colors';

    const actionBtnCls = isLight
        ? 'text-white/75 hover:bg-white/10 hidden size-9 items-center justify-center rounded-full sm:flex transition-colors'
        : 'text-ink-900/70 hover:bg-ink-900/5 hidden size-9 items-center justify-center rounded-full sm:flex transition-colors';

    const menuBtnCls = isLight
        ? 'text-white/80 hover:bg-white/10 flex size-9 items-center justify-center rounded-full xl:hidden transition-colors'
        : 'text-ink-900/80 hover:bg-ink-900/5 flex size-9 items-center justify-center rounded-full xl:hidden transition-colors';

    const langBtnCls = isLight
        ? 'border-white/30 text-white inline-flex items-center rounded-full border text-xs font-semibold'
        : 'border-brand-700/30 text-brand-700 inline-flex items-center rounded-full border text-xs font-semibold';

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
                                    : isLight
                                        ? 'border border-white/10 bg-black/20 backdrop-blur-md'
                                        : 'border border-transparent bg-surface-0/40 backdrop-blur-md'
                            }`}>

                                {/* Logo */}
                                <Link href="/" className="flex shrink-0 items-center gap-3">
                                    <motion.div layoutId="nav-logo" transition={LOGO_SPRING} className="size-10 overflow-hidden rounded-xl">
                                        <LogoImage />
                                    </motion.div>
                                </Link>

                                {/* Desktop nav links */}
                                <div className="hidden items-center gap-4 xl:flex">
                                    {NAV_LINKS.map((link) =>
                                        'children' in link ? (
                                            <div key={t(link.label)} className="relative"
                                                onMouseEnter={() => openMenu(t(link.label))}
                                                onMouseLeave={closeMenuDelayed}>
                                                <button type="button" className={navLinkCls}
                                                    aria-expanded={openDropdown === t(link.label)} aria-haspopup="true">
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
                                                            onMouseEnter={() => openMenu(t(link.label))}
                                                            onMouseLeave={closeMenuDelayed}
                                                            className={`border-cream-300/30 bg-surface-0/95 absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-2xl border p-2 shadow-[0_12px_32px_-12px_rgba(36,20,31,0.25)] backdrop-blur-xl ${link.wide ? 'w-72' : 'w-56'}`}
                                                        >
                                                            {link.children.map((child, i) => (
                                                                <div key={`${child.href}-${i}`}>
                                                                    {child.sectionLabel && (
                                                                        <div className={`px-3 ${i > 0 ? 'pt-3 border-t border-cream-300/20 mt-1' : 'pt-1'} pb-1`}>
                                                                            <span className="text-navy-700/40 text-[10px] font-bold tracking-widest uppercase">
                                                                                {t(child.sectionLabel)}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    <NavItemLink child={child} />
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : link.external ? (
                                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={navLinkCls}>
                                                {t(link.label)}
                                                <ArrowUpRight className={`size-3 ${isLight ? 'text-white/40' : 'text-navy-700/40'}`} />
                                            </a>
                                        ) : (
                                            <Link key={link.href} href={link.href} className={navLinkCls}>
                                                {t(link.label)}
                                            </Link>
                                        ),
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2.5">
                                    <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className={actionBtnCls}>
                                        <Search className="size-4" />
                                    </button>
                                    <button type="button" onClick={toggleLocale} aria-label="Toggle language" className={langBtnCls}>
                                        <span className={`rounded-full px-3 py-1.5 transition-colors ${locale === 'id' ? (isLight ? 'bg-white/20 text-white' : 'bg-brand-700 text-surface-0') : ''}`}>ID</span>
                                        <span className={`rounded-full px-3 py-1.5 transition-colors ${locale === 'en' ? (isLight ? 'bg-white/20 text-white' : 'bg-brand-700 text-surface-0') : ''}`}>EN</span>
                                    </button>
                                    <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open menu" className={menuBtnCls}>
                                        <Menu className="size-5" />
                                    </button>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── MINI LOGO ── */}
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
                            <motion.div layoutId="nav-logo" transition={LOGO_SPRING} className="size-12 overflow-hidden rounded-2xl">
                                <LogoImage />
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
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setDrawerOpen(false)}
                            />
                            <motion.div
                                className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col"
                                style={{ background: '#6E4E33' }}
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                transition={{ duration: 0.35, ease: [0.32, 0, 0.12, 1] }}
                            >
                                <div className="flex items-center justify-between px-6 py-5">
                                    <span className="font-display text-surface-0/80 text-sm font-semibold">Navigasi</span>
                                    <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Tutup menu"
                                        className="text-surface-0/70 hover:bg-surface-0/10 hover:text-surface-0 flex size-9 items-center justify-center rounded-full transition-colors">
                                        <X className="size-5" />
                                    </button>
                                </div>
                                <nav className="flex-1 overflow-y-auto px-4 pb-4">
                                    {NAV_LINKS.map((link) =>
                                        'children' in link ? (
                                            <div key={t(link.label)} className="mb-2">
                                                <span className="text-cream-300/50 mb-1 block px-3 py-1 text-[11px] font-bold tracking-[0.15em] uppercase">
                                                    {t(link.label)}
                                                </span>
                                                {link.children.map((child, i) => (
                                                    <div key={`${child.href}-${i}`}>
                                                        {child.sectionLabel && i > 0 && <div className="border-cream-300/15 mx-3 my-1.5 border-t" />}
                                                        <DrawerNavItemLink child={child} onClick={() => setDrawerOpen(false)} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : link.external ? (
                                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                                                onClick={() => setDrawerOpen(false)}
                                                className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 flex items-center gap-1.5 rounded-xl px-3 py-3 text-sm font-medium transition-colors">
                                                {t(link.label)}
                                                <ArrowUpRight className="text-cream-300/40 size-3.5 shrink-0" />
                                            </a>
                                        ) : (
                                            <Link key={link.href} href={link.href} onClick={() => setDrawerOpen(false)}
                                                className="text-cream-300 hover:bg-surface-0/10 hover:text-surface-0 block rounded-xl px-3 py-3 text-sm font-medium transition-colors">
                                                {t(link.label)}
                                            </Link>
                                        ),
                                    )}
                                </nav>
                                <div className="border-t px-6 py-5" style={{ borderColor: 'rgba(172,149,135,0.2)' }}>
                                    <button type="button" onClick={toggleLocale}
                                        className="border-cream-300/25 text-cream-300 inline-flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors hover:bg-surface-0/10">
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

            {/* ── SEARCH OVERLAY ── */}
            <AnimatePresence>
                {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
            </AnimatePresence>
        </LayoutGroup>
    );
}
