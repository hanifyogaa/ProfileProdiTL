import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    Briefcase,
    Calendar,
    FileText,
    FlaskConical,
    Heart,
    HelpCircle,
    Image,
    Trophy,
    Users,
} from 'lucide-react';

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
        research_count: number;
        community_service_count: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        { name: 'Berita & Pengumuman',    value: stats.news_count,              href: '/admin/news',               icon: FileText,     color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { name: 'Dosen & Staff',           value: stats.lecturer_count,          href: '/admin/lecturers',          icon: Users,        color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { name: 'Kurikulum & Matkul',      value: stats.course_count,            href: '/admin/courses',            icon: BookOpen,     color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { name: 'Agenda & Kegiatan',       value: stats.activity_count,          href: '/admin/activities',         icon: Calendar,     color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
        { name: 'Prestasi & Penghargaan',  value: stats.achievement_count,       href: '/admin/achievements',       icon: Trophy,       color: 'text-amber-500 bg-amber-50/50 border-amber-200' },
        { name: 'Penelitian (Riset)',       value: stats.research_count,          href: '/admin/researches',         icon: FlaskConical, color: 'text-purple-600 bg-purple-50 border-purple-200' },
        { name: 'Pengabdian Masyarakat',   value: stats.community_service_count, href: '/admin/community-services', icon: Heart,        color: 'text-rose-600 bg-rose-50 border-rose-200' },
        { name: 'Laboratorium',            value: stats.lab_count,               href: '/admin/labs',               icon: FlaskConical, color: 'text-teal-600 bg-teal-50 border-teal-200' },
        { name: 'Mitra Kerjasama',         value: stats.partner_count,           href: '/admin/partners',           icon: Briefcase,    color: 'text-sky-600 bg-sky-50 border-sky-200' },
        { name: 'Statistik & Figures',     value: stats.stat_count,              href: '/admin/stats',              icon: BarChart3,    color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
        { name: 'Galeri Media',            value: stats.gallery_count,           href: '/admin/galleries',          icon: Image,        color: 'text-violet-600 bg-violet-50 border-violet-200' },
        { name: 'FAQ Tanya Jawab',         value: stats.faq_count,               href: '/admin/faqs',               icon: HelpCircle,   color: 'text-orange-600 bg-orange-50 border-orange-200' },
    ];

    return (
        <AdminLayout title="Overview Dashboard">
            <Head title="Admin Dashboard" />

            <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-cream-300/40 bg-surface-0 p-6 shadow-sm md:flex-row md:items-center">
                <div>
                    <h2 className="font-display mb-1 text-2xl font-semibold text-ink-900">
                        Selamat Datang di Portal Admin!
                    </h2>
                    <p className="text-sm text-navy-700">
                        Kelola konten publik website S1 Teknik Logistik · Digital Supply Chain dari sini.
                    </p>
                </div>
                <Link
                    href="/admin/settings"
                    className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-surface-0 shadow-md transition-colors hover:bg-brand-800 md:self-auto"
                >
                    <span>Pengaturan Website</span>
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.name}
                            className="flex flex-col justify-between rounded-2xl border border-cream-300/40 bg-surface-0 p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm font-semibold text-navy-700">{card.name}</span>
                                <div className={`rounded-xl border p-2.5 ${card.color}`}>
                                    <Icon className="size-5" />
                                </div>
                            </div>
                            <div className="mt-2 flex items-baseline justify-between">
                                <span className="font-display text-3xl font-bold text-ink-900">{card.value}</span>
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
                                >
                                    <span>Kelola</span>
                                    <ArrowRight className="size-3" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
