import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Calendar, Eye } from 'lucide-react';
import React, { useState } from 'react';

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    category: string | null;
    status: 'draft' | 'published';
    views: number;
    published_at: string | null;
}

interface IndexProps {
    news: {
        data: NewsItem[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ news, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.news.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            router.delete(route('admin.news.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Berita & Pengumuman">
            <Head title="Admin - Berita & Pengumuman" />

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari berita berdasarkan judul..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                    />
                    <Search className="absolute left-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                </form>

                {/* Create New Link */}
                <Link
                    href={route('admin.news.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tulis Berita</span>
                </Link>
            </div>

            {/* Tables Container */}
            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4">Berita</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Views</th>
                                <th className="px-6 py-4">Diterbitkan</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-ink-900 leading-snug line-clamp-1">
                                                    {item.title_id}
                                                </span>
                                                <span className="text-xs text-navy-700 line-clamp-1 italic">
                                                    {item.title_en}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700">
                                            {item.category || 'Umum'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                {item.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700 font-medium">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>{item.views}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700 font-medium">
                                            {item.published_at ? (
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.news.edit', item.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                    title="Edit berita"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 hover:bg-red-50 text-navy-700 hover:text-red-600 rounded-lg transition-all"
                                                    title="Hapus berita"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-navy-700 italic bg-surface-50/10">
                                        Tidak ada data berita ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination links */}
                {news.total > 10 && (
                    <div className="px-6 py-4 bg-surface-50/30 border-t border-cream-300/40 flex items-center justify-between">
                        <span className="text-xs text-navy-700 font-medium">
                            Menampilkan {news.data.length} dari {news.total} berita
                        </span>
                        <div className="flex items-center space-x-1">
                            {news.links.map((link, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all border ${
                                            link.active
                                                ? 'bg-brand-700 border-brand-700 text-surface-0'
                                                : link.url
                                                    ? 'bg-surface-0 border-cream-300/60 text-navy-700 hover:bg-surface-50'
                                                    : 'bg-surface-50/50 border-transparent text-navy-700/40 cursor-not-allowed pointer-events-none'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
