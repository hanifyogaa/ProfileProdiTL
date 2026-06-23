import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    FileText, 
    Users, 
    BookOpen, 
    Calendar, 
    Trophy, 
    FlaskConical, 
    Briefcase, 
    BarChart3, 
    Image, 
    HelpCircle,
    ArrowRight
} from 'lucide-react';
import React from 'react';

interface DashboardProps {
    stats: {
        news_count: number;
        lecturer_count: number;
        course_count: number;
        activity_count: number;
        achievement_count: number;
        lab_count: number;
        partner_count: number;
        stat_count: number;
        gallery_count: number;
        faq_count: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        { name: 'Berita & Pengumuman', value: stats.news_count, href: '/admin/news', icon: FileText, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { name: 'Dosen & Staff', value: stats.lecturer_count, href: '/admin/lecturers', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { name: 'Kurikulum & Matkul', value: stats.course_count, href: '/admin/courses', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { name: 'Agenda & Kegiatan', value: stats.activity_count, href: '/admin/activities', icon: Calendar, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
        { name: 'Prestasi', value: stats.achievement_count, href: '/admin/achievements', icon: Trophy, color: 'text-amber-500 bg-amber-50/50 border-amber-200' },
        { name: 'Laboratorium', value: stats.lab_count, href: '/admin/labs', icon: FlaskConical, color: 'text-purple-600 bg-purple-50 border-purple-200' },
        { name: 'Mitra Kerjasama', value: stats.partner_count, href: '/admin/partners', icon: Briefcase, color: 'text-rose-600 bg-rose-50 border-rose-200' },
        { name: 'Statistik & Figures', value: stats.stat_count, href: '/admin/stats', icon: BarChart3, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
        { name: 'Galeri Media', value: stats.gallery_count, href: '/admin/galleries', icon: Image, color: 'text-violet-600 bg-violet-50 border-violet-200' },
        { name: 'FAQ Tanya Jawab', value: stats.faq_count, href: '/admin/faqs', icon: HelpCircle, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    ];

    return (
        <AdminLayout title="Overview Dashboard">
            <Head title="Admin Dashboard" />

            {/* Greeting Header */}
            <div className="mb-8 bg-surface-0 border border-cream-300/40 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="font-display font-semibold text-2xl text-ink-900 mb-1">
                        Selamat Datang di Portal Admin!
                    </h2>
                    <p className="text-sm text-navy-700">
                        Kelola konten publik website S1 Teknik Logistik · Digital Supply Chain dengan mudah di sini.
                    </p>
                </div>
                <Link
                    href="/admin/settings"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <span>Pengaturan Website</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div 
                            key={card.name} 
                            className="bg-surface-0 border border-cream-300/40 p-5 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-navy-700">{card.name}</span>
                                <div className={`p-2.5 rounded-xl border ${card.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between mt-2">
                                <span className="text-3xl font-display font-bold text-ink-900">
                                    {card.value}
                                </span>
                                <Link 
                                    href={card.href} 
                                    className="text-xs font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center space-x-1"
                                >
                                    <span>Kelola</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
