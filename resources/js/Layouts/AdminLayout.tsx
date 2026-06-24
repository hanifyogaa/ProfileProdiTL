import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FileText, 
    Users, 
    BookOpen, 
    Calendar, 
    Trophy, 
    FlaskConical, 
    Briefcase, 
    BarChart3, 
    Image as ImageIcon, 
    HelpCircle, 
    Settings as SettingsIcon,
    Globe, 
    LogOut,
    Menu,
    X,
    CheckCircle,
    AlertCircle,
    Heart,
    ChevronDown,
    Info,
    GraduationCap,
    Link as LinkIcon,
    Activity,
    Newspaper,
    Phone,
} from 'lucide-react';
import React, { PropsWithChildren, useState, useEffect } from 'react';

// Navigation group type
type NavItem = { name: string; href: string; icon: React.ElementType };
type NavGroup = { group: string; icon: React.ElementType; items: NavItem[] };
type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
    return 'group' in entry;
}

export default function AdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const { auth, flash } = usePage().props as any;
    const user = auth?.user;
    const currentUrl = usePage().url;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: 'success', text: '' });
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (name: string) => {
        setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));
    };

    // Handle Flash Notifications
    useEffect(() => {
        if (flash?.success) {
            setToastMessage({ type: 'success', text: flash.success });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToastMessage({ type: 'error', text: flash.error });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Auto-open group if a child is active
    useEffect(() => {
        const newOpen: Record<string, boolean> = {};
        menuEntries.forEach(entry => {
            if (isGroup(entry)) {
                const hasActive = entry.items.some(item => currentUrl.startsWith(item.href));
                if (hasActive) newOpen[entry.group] = true;
            }
        });
        setOpenGroups(prev => ({ ...prev, ...newOpen }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUrl]);

    const menuEntries: NavEntry[] = [
        // ── Top-level ──
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },

        // ── Tentang (About) ──
        {
            group: 'Tentang',
            icon: Info,
            items: [
                { name: 'Dosen & Staff', href: '/admin/lecturers', icon: Users },
                { name: 'Pengaturan Profil', href: '/admin/settings', icon: SettingsIcon },
            ],
        },

        // ── Akademik ──
        {
            group: 'Akademik',
            icon: GraduationCap,
            items: [
                { name: 'Kurikulum & Mata Kuliah', href: '/admin/courses', icon: BookOpen },
                { name: 'Statistik & Figures', href: '/admin/stats', icon: BarChart3 },
            ],
        },

        // ── Portal & Layanan ──
        {
            group: 'Portal & Layanan',
            icon: LinkIcon,
            items: [
                // Portal & layanan pages are external links managed in settings, no separate admin
                { name: 'Pengaturan Web', href: '/admin/settings', icon: SettingsIcon },
            ],
        },

        // ── Aktivitas ──
        {
            group: 'Aktivitas',
            icon: Activity,
            items: [
                { name: 'Riset / Penelitian', href: '/admin/researches', icon: FlaskConical },
                { name: 'Pengabdian Masyarakat', href: '/admin/community-services', icon: Heart },
                { name: 'Laboratorium', href: '/admin/labs', icon: FlaskConical },
                { name: 'Kemahasiswaan & Agenda', href: '/admin/activities', icon: Calendar },
                { name: 'Prestasi', href: '/admin/achievements', icon: Trophy },
                { name: 'Galeri Media', href: '/admin/galleries', icon: ImageIcon },
                { name: 'Kemitraan', href: '/admin/partners', icon: Briefcase },
            ],
        },

        // ── Berita ──
        { name: 'Berita & Pengumuman', href: '/admin/news', icon: Newspaper },

        // ── Lainnya ──
        {
            group: 'Lainnya',
            icon: HelpCircle,
            items: [
                { name: 'FAQ', href: '/admin/faqs', icon: HelpCircle },
            ],
        },
    ];

    const isRouteActive = (href: string) => {
        if (href === '/admin') {
            return currentUrl === '/admin' || currentUrl === '/admin/';
        }
        return currentUrl.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-surface-50 font-sans text-ink-900 flex">
            {/* Sidebar Desktop */}
            <aside 
                className={`hidden md:flex flex-col bg-brand-800 text-surface-0 border-r border-cream-300/30 transition-all duration-300 z-20 ${
                    isSidebarOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-cream-300/20 bg-brand-800/50">
                    {isSidebarOpen ? (
                        <div className="flex items-center space-x-2">
                            <span className="font-display font-semibold text-lg text-amber-500 tracking-wide">
                                Admin Prodi TL
                            </span>
                        </div>
                    ) : (
                        <span className="font-display font-bold text-xl text-amber-500 mx-auto">TL</span>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                    {menuEntries.map((entry) => {
                        if (!isGroup(entry)) {
                            const Icon = entry.icon;
                            const active = isRouteActive(entry.href);
                            return (
                                <Link
                                    key={entry.name}
                                    href={entry.href}
                                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                        active 
                                            ? 'bg-amber-500 text-ink-900 font-semibold shadow-md shadow-amber-500/20' 
                                            : 'text-surface-50/80 hover:bg-brand-700 hover:text-surface-0'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    {isSidebarOpen && <span className="text-sm truncate">{entry.name}</span>}
                                </Link>
                            );
                        }
                        // Group rendering
                        const GroupIcon = entry.icon;
                        const isOpen = !!openGroups[entry.group];
                        const anyChildActive = entry.items.some(i => isRouteActive(i.href));
                        return (
                            <div key={entry.group}>
                                <button
                                    type="button"
                                    onClick={() => isSidebarOpen && toggleGroup(entry.group)}
                                    className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                        anyChildActive && !isOpen
                                            ? 'text-amber-400 bg-brand-700/50'
                                            : 'text-surface-50/60 hover:bg-brand-700 hover:text-surface-0'
                                    }`}
                                >
                                    <GroupIcon className="w-5 h-5 shrink-0" />
                                    {isSidebarOpen && (
                                        <>
                                            <span className="text-xs font-bold uppercase tracking-widest ml-3 flex-1 text-left">{entry.group}</span>
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </>
                                    )}
                                </button>
                                {(isOpen || !isSidebarOpen) && (
                                    <div className={`mt-0.5 space-y-0.5 ${isSidebarOpen ? 'pl-3' : ''}`}>
                                        {entry.items.map(item => {
                                            const ItemIcon = item.icon;
                                            const active = isRouteActive(item.href);
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                                                        active
                                                            ? 'bg-amber-500 text-ink-900 font-semibold shadow-sm'
                                                            : 'text-surface-50/70 hover:bg-brand-700 hover:text-surface-0'
                                                    }`}
                                                >
                                                    <ItemIcon className="w-4 h-4 shrink-0" />
                                                    {isSidebarOpen && <span className="text-xs truncate">{item.name}</span>}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-cream-300/20 space-y-2">
                    <Link
                        href="/"
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-surface-50/70 hover:bg-brand-700 hover:text-surface-0 transition-all ${
                            !isSidebarOpen && 'justify-center'
                        }`}
                    >
                        <Globe className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="text-sm">Lihat Website</span>}
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className={`flex w-full items-center space-x-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-950/30 hover:text-red-200 transition-all ${
                            !isSidebarOpen && 'justify-center'
                        }`}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
                    </Link>
                </div>
            </aside>

            {/* Sidebar Mobile Mobile Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden flex">
                    <div className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
                    
                    <aside className="relative flex flex-col w-64 max-w-xs bg-brand-800 text-surface-0 h-full shadow-2xl z-50">
                        <div className="h-16 flex items-center justify-between px-4 border-b border-cream-300/20">
                            <span className="font-display font-semibold text-lg text-amber-500">Admin Prodi TL</span>
                            <button onClick={() => setIsMobileOpen(false)} className="text-surface-50 hover:text-surface-0">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                            {menuEntries.map((entry) => {
                                if (!isGroup(entry)) {
                                    const Icon = entry.icon;
                                    const active = isRouteActive(entry.href);
                                    return (
                                        <Link
                                            key={entry.name}
                                            href={entry.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                                active
                                                    ? 'bg-amber-500 text-ink-900 font-semibold shadow-md'
                                                    : 'text-surface-50/80 hover:bg-brand-700 hover:text-surface-0'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5 shrink-0" />
                                            <span className="text-sm">{entry.name}</span>
                                        </Link>
                                    );
                                }
                                const GroupIcon = entry.icon;
                                const isOpen = !!openGroups[entry.group];
                                return (
                                    <div key={entry.group}>
                                        <button
                                            type="button"
                                            onClick={() => toggleGroup(entry.group)}
                                            className="w-full flex items-center px-3 py-2 rounded-xl text-surface-50/50 hover:text-surface-0"
                                        >
                                            <GroupIcon className="w-4 h-4 shrink-0" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest ml-2.5 flex-1 text-left">{entry.group}</span>
                                            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="pl-3 mt-0.5 space-y-0.5">
                                                {entry.items.map(item => {
                                                    const ItemIcon = item.icon;
                                                    const active = isRouteActive(item.href);
                                                    return (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            onClick={() => setIsMobileOpen(false)}
                                                            className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                                                                active
                                                                    ? 'bg-amber-500 text-ink-900 font-semibold shadow-sm'
                                                                    : 'text-surface-50/70 hover:bg-brand-700 hover:text-surface-0'
                                                            }`}
                                                        >
                                                            <ItemIcon className="w-4 h-4 shrink-0" />
                                                            <span className="text-sm">{item.name}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                        <div className="p-4 border-t border-cream-300/20 space-y-2">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-surface-50/70 hover:bg-brand-700 hover:text-surface-0 transition-all"
                            >
                                <Globe className="w-5 h-5 shrink-0" />
                                <span className="text-sm">Lihat Website</span>
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center space-x-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-950/30 hover:text-red-200 transition-all text-left"
                            >
                                <LogOut className="w-5 h-5 shrink-0" />
                                <span className="text-sm font-medium">Log Out</span>
                            </Link>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header Navbar */}
                <header className="h-16 bg-surface-0 border-b border-cream-300/40 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => setIsMobileOpen(true)} 
                            className="md:hidden text-ink-900 hover:text-brand-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                            className="hidden md:block text-ink-900 hover:text-brand-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            {title && <h1 className="font-display font-semibold text-lg text-ink-900 leading-tight">{title}</h1>}
                            <span className="text-xs text-navy-700 md:block hidden">S1 Teknik Logistik · Digital Supply Chain</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right md:block hidden">
                            <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
                            <p className="text-xs text-navy-700">{user?.email}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-ink-900 font-bold flex items-center justify-center text-sm shadow-sm">
                            {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'A'}
                        </div>
                    </div>
                </header>

                {/* Content View */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>

            {/* Toast Notifications */}
            {showToast && (
                <div className="fixed bottom-5 right-5 z-50 animate-bounce duration-300">
                    <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl text-surface-0 ${
                        toastMessage.type === 'success' ? 'bg-green-700' : 'bg-red-800'
                    }`}>
                        {toastMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium">{toastMessage.text}</span>
                        <button onClick={() => setShowToast(false)} className="text-surface-0/80 hover:text-surface-0 ml-2">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
