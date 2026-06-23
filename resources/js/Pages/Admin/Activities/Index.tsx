import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Calendar, MapPin } from 'lucide-react';
import React, { useState } from 'react';

interface ActivityItem {
    id: number;
    title_id: string;
    title_en: string;
    type: 'visit' | 'workshop' | 'lecture';
    date: string;
    location: string | null;
    cover: string | null;
    is_featured: boolean;
}

interface IndexProps {
    activities: {
        data: ActivityItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

export default function Index({ activities, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.activities.index'), { search, type }, { preserveState: true });
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        router.get(route('admin.activities.index'), { search, type: newType }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda kegiatan ini?')) {
            router.delete(route('admin.activities.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Agenda & Kegiatan">
            <Head title="Admin - Agenda & Kegiatan" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari kegiatan atau lokasi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                        />
                        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm"
                    >
                        <option value="">Semua Tipe</option>
                        <option value="visit">Kunjungan Industri</option>
                        <option value="workshop">Workshop</option>
                        <option value="lecture">Kuliah Tamu</option>
                    </select>
                </form>

                <Link
                    href={route('admin.activities.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Agenda</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4">Cover</th>
                                <th className="px-6 py-4">Nama Kegiatan</th>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4">Lokasi</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {activities.data.length > 0 ? (
                                activities.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-50/20 transition-all">
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
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                            {item.type}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700 font-medium">
                                            {item.location ? (
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-navy-700/60" />
                                                    <span className="truncate max-w-xs">{item.location}</span>
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700 font-medium">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(item.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.is_featured ? 'bg-amber-100 text-amber-800' : 'bg-surface-50 text-navy-700/60'
                                            }`}>
                                                {item.is_featured ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.activities.edit', item.id)}
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
                                        Tidak ada agenda kegiatan ditemukan.
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
