import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, Globe } from 'lucide-react';
import React, { useState } from 'react';

interface PartnerItem {
    id: number;
    name: string;
    logo: string | null;
    url: string | null;
    type: 'industry' | 'academic';
    order: number;
}

interface IndexProps {
    partners: {
        data: PartnerItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

export default function Index({ partners, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.partners.index'), { search, type }, { preserveState: true });
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        router.get(route('admin.partners.index'), { search, type: newType }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
            router.delete(route('admin.partners.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Mitra Kerjasama">
            <Head title="Admin - Mitra Kerjasama" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari nama mitra..."
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
                        <option value="industry">Mitra Industri</option>
                        <option value="academic">Mitra Akademik / Univ</option>
                    </select>
                </form>

                <Link
                    href={route('admin.partners.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mitra</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Logo</th>
                                <th className="px-6 py-4">Nama Mitra</th>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4">Website</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {partners.data.length > 0 ? (
                                partners.data.map((partner) => (
                                    <tr key={partner.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{partner.order}</td>
                                        <td className="px-6 py-2">
                                            {partner.logo ? (
                                                <div className="w-12 h-12 border border-cream-300/45 rounded-lg overflow-hidden bg-surface-50 flex items-center justify-center p-1">
                                                    <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 bg-surface-50 border border-cream-300/40 rounded-lg flex items-center justify-center text-[10px] text-navy-700 font-bold uppercase tracking-wide">
                                                    No Logo
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-ink-900">{partner.name}</td>
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                            {partner.type === 'industry' ? 'Industri' : 'Akademik'}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-navy-700">
                                            {partner.url ? (
                                                <a href={partner.url} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:text-brand-700 underline font-semibold">
                                                    <Globe className="w-3.5 h-3.5" />
                                                    <span>Kunjungi Situs</span>
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.partners.edit', partner.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(partner.id)}
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
                                        Tidak ada mitra kerjasama ditemukan.
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
