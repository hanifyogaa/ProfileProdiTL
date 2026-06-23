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
    AlertCircle
} from 'lucide-react';
import React, { PropsWithChildren, useState, useEffect } from 'react';

export default function AdminLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    const { auth, flash } = usePage().props as any;
    const user = auth?.user;
    const currentUrl = usePage().url;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: 'success', text: '' });

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

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Berita & Pengumuman', href: '/admin/news', icon: FileText },
        { name: 'Dosen & Staff', href: '/admin/lecturers', icon: Users },
        { name: 'Kurikulum & Matkul', href: '/admin/courses', icon: BookOpen },
        { name: 'Agenda & Kegiatan', href: '/admin/activities', icon: Calendar },
        { name: 'Prestasi', href: '/admin/achievements', icon: Trophy },
        { name: 'Laboratorium', href: '/admin/labs', icon: FlaskConical },
        { name: 'Kemitraan', href: '/admin/partners', icon: Briefcase },
        { name: 'Statistik & Figures', href: '/admin/stats', icon: BarChart3 },
        { name: 'Galeri Media', href: '/admin/galleries', icon: ImageIcon },
        { name: 'FAQ', href: '/admin/faqs', icon: HelpCircle },
        { name: 'Pengaturan Web', href: '/admin/settings', icon: SettingsIcon },
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

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isRouteActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                    active 
                                        ? 'bg-amber-500 text-ink-900 font-semibold shadow-md shadow-amber-500/20' 
                                        : 'text-surface-50/80 hover:bg-brand-700 hover:text-surface-0'
                                }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                {isSidebarOpen && <span className="text-sm truncate">{item.name}</span>}
                            </Link>
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
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isRouteActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                            active 
                                                ? 'bg-amber-500 text-ink-900 font-semibold shadow-md' 
                                                : 'text-surface-50/80 hover:bg-brand-700 hover:text-surface-0'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
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
