import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface PloItem {
    id: number;
    code: string;
    description_id: string;
    description_en: string;
    order: number;
}

interface IndexProps {
    plos: {
        data: PloItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ plos, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.plos.index'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus PLO ini? Mata kuliah yang sudah dipetakan ke PLO ini akan kehilangan pemetaannya.')) {
            router.delete(route('admin.plos.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola PLO (Program Learning Outcomes)">
            <Head title="Admin - PLO" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari kode atau deskripsi PLO..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                    />
                    <Search className="absolute left-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                </form>

                <Link
                    href={route('admin.plos.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah PLO</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Kode</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {plos.data.length > 0 ? (
                                plos.data.map((plo) => (
                                    <tr key={plo.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{plo.order}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-ink-900">{plo.code}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col max-w-xl">
                                                <span className="text-sm font-medium text-ink-900 leading-snug">
                                                    {plo.description_id}
                                                </span>
                                                <span className="text-xs text-navy-700 italic">
                                                    {plo.description_en}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.plos.edit', plo.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(plo.id)}
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
                                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-navy-700 italic bg-surface-50/10">
                                        Tidak ada PLO ditemukan.
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
