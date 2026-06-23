import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface GalleryItem {
    id: number;
    title_id: string;
    title_en: string;
    caption_id: string | null;
    caption_en: string | null;
    image: string | null;
    category: string;
    order: number;
    is_published: boolean;
}

interface IndexProps {
    galleries: {
        data: GalleryItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index({ galleries, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.galleries.index'), { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        router.get(route('admin.galleries.index'), { search, category: cat }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
            router.delete(route('admin.galleries.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Galeri Media">
            <Head title="Admin - Galeri Media" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari judul/caption foto..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                        />
                        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm"
                    >
                        <option value="">Semua Kategori</option>
                        <option value="umum">Umum</option>
                        <option value="kegiatan">Kegiatan</option>
                        <option value="laboratorium">Laboratorium</option>
                        <option value="prestasi">Prestasi</option>
                    </select>
                </form>

                <Link
                    href={route('admin.galleries.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Upload Foto</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Foto</th>
                                <th className="px-6 py-4">Judul Media</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Visibility</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {galleries.data.length > 0 ? (
                                galleries.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{item.order}</td>
                                        <td className="px-6 py-2">
                                            {item.image ? (
                                                <div className="w-16 h-12 border border-cream-300/45 rounded-lg overflow-hidden bg-surface-50">
                                                    <img src={item.image} alt={item.title_id} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-12 bg-surface-50 border border-cream-300/40 rounded-lg flex items-center justify-center text-[9px] text-navy-700 font-bold uppercase tracking-wide">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
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
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.is_published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {item.is_published ? 'Tampil' : 'Sembunyi'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.galleries.edit', item.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 hover:bg-red-50 text-navy-700 hover:text-red-600 rounded-lg transition-all"
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
                                        Tidak ada item galeri ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
