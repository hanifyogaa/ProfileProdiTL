import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface LabItem {
    id: number;
    name: string;
    focus: string | null;
    description_id: string | null;
    description_en: string | null;
    photo: string | null;
    order: number;
}

interface IndexProps {
    labs: {
        data: LabItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ labs, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.labs.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus laboratorium ini?')) {
            router.delete(route('admin.labs.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Laboratorium & Fasilitas">
            <Head title="Admin - Laboratorium" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari laboratorium..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                    />
                    <Search className="absolute left-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                </form>

                <Link
                    href={route('admin.labs.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Lab</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Foto</th>
                                <th className="px-6 py-4">Nama Laboratorium</th>
                                <th className="px-6 py-4">Fokus Bidang</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {labs.data.length > 0 ? (
                                labs.data.map((lab) => (
                                    <tr key={lab.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{lab.order}</td>
                                        <td className="px-6 py-2">
                                            {lab.photo ? (
                                                <div className="w-16 h-10 border border-cream-300/45 rounded-lg overflow-hidden bg-surface-50">
                                                    <img src={lab.photo} alt={lab.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-10 bg-surface-50 border border-cream-300/40 rounded-lg flex items-center justify-center text-[9px] text-navy-700 font-bold uppercase tracking-wide">
                                                    No Photo
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-ink-900">{lab.name}</td>
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                            {lab.focus || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.labs.edit', lab.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(lab.id)}
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
                                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-navy-700 italic bg-surface-50/10">
                                        Tidak ada laboratorium ditemukan.
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
