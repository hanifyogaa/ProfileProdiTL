import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Calendar, Award } from 'lucide-react';
import React, { useState } from 'react';

interface AchievementItem {
    id: number;
    title_id: string;
    title_en: string;
    level: 'national' | 'international';
    date: string;
    holder: string;
    cover: string | null;
    order: number;
}

interface IndexProps {
    achievements: {
        data: AchievementItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        level?: string;
    };
}

export default function Index({ achievements, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [level, setLevel] = useState(filters.level || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.achievements.index'), { search, level }, { preserveState: true });
    };

    const handleLevelChange = (lvl: string) => {
        setLevel(lvl);
        router.get(route('admin.achievements.index'), { search, level: lvl }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
            router.delete(route('admin.achievements.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Prestasi">
            <Head title="Admin - Prestasi" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari prestasi atau peraih..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                        />
                        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                    </div>
                    <select
                        value={level}
                        onChange={(e) => handleLevelChange(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm"
                    >
                        <option value="">Semua Tingkat</option>
                        <option value="national">Nasional</option>
                        <option value="international">Internasional</option>
                    </select>
                </form>

                <Link
                    href={route('admin.achievements.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Prestasi</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Foto/Sertifikat</th>
                                <th className="px-6 py-4">Nama Penghargaan</th>
                                <th className="px-6 py-4">Penerima</th>
                                <th className="px-6 py-4">Tingkat</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {achievements.data.length > 0 ? (
                                achievements.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{item.order}</td>
                                        <td className="px-6 py-2">
                                            {item.cover ? (
                                                <div className="w-16 h-10 border border-cream-300/45 rounded-lg overflow-hidden bg-surface-50">
                                                    <img src={item.cover} alt={item.title_id} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-10 bg-surface-50 border border-cream-300/40 rounded-lg flex items-center justify-center text-[9px] text-navy-700 font-bold uppercase tracking-wide">
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
                                        <td className="px-6 py-4 text-sm text-ink-900 font-medium">{item.holder}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.level === 'international'
                                                    ? 'bg-amber-100 text-amber-800'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {item.level === 'international' ? 'International' : 'National'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700 font-medium">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(item.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.achievements.edit', item.id)}
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
                                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-navy-700 italic bg-surface-50/10">
                                        Tidak ada prestasi ditemukan.
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
