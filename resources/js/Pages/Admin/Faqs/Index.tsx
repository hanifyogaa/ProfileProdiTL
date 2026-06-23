import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface FaqItem {
    id: number;
    question_id: string;
    question_en: string;
    answer_id: string;
    answer_en: string;
    category: string;
    order: number;
    is_active: boolean;
}

interface IndexProps {
    faqs: {
        data: FaqItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        category?: string;
    };
}

export default function Index({ faqs, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.faqs.index'), { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        router.get(route('admin.faqs.index'), { search, category: cat }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
            router.delete(route('admin.faqs.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola FAQ (Tanya Jawab)">
            <Head title="Admin - FAQ" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari FAQ..."
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
                        <option value="akademik">Akademik</option>
                        <option value="karir">Karir</option>
                        <option value="mbkm">MBKM</option>
                    </select>
                </form>

                <Link
                    href={route('admin.faqs.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah FAQ</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4 w-12">No. Urut</th>
                                <th className="px-6 py-4">Pertanyaan</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {faqs.data.length > 0 ? (
                                faqs.data.map((faq) => (
                                    <tr key={faq.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{faq.order}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-ink-900 leading-snug line-clamp-2">
                                                    {faq.question_id}
                                                </span>
                                                <span className="text-xs text-navy-700 line-clamp-2 italic">
                                                    {faq.question_en}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-brand-700 uppercase tracking-wide">
                                            {faq.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                faq.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {faq.is_active ? 'Aktif' : 'Non-Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.faqs.edit', faq.id)}
                                                    className="p-1.5 hover:bg-surface-50 text-navy-700 hover:text-brand-700 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(faq.id)}
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
                                        Tidak ada FAQ ditemukan.
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
