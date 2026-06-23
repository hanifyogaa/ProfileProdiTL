import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit2, Trash2, BookOpen } from 'lucide-react';
import React, { useState } from 'react';

interface CourseItem {
    id: number;
    code: string;
    name_id: string;
    name_en: string;
    sks: number;
    semester: number;
    type: 'wajib' | 'pilihan';
    is_signature: boolean;
}

interface IndexProps {
    courses: {
        data: CourseItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
        semester?: string;
    };
}

export default function Index({ courses, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [semester, setSemester] = useState(filters.semester || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.courses.index'), { search, semester }, { preserveState: true });
    };

    const handleSemesterChange = (sem: string) => {
        setSemester(sem);
        router.get(route('admin.courses.index'), { search, semester: sem }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?')) {
            router.delete(route('admin.courses.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Kurikulum & Mata Kuliah">
            <Head title="Admin - Mata Kuliah" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari kode atau nama matkul..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                        />
                        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                    </div>
                    <select
                        value={semester}
                        onChange={(e) => handleSemesterChange(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm"
                    >
                        <option value="">Semua Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                        ))}
                    </select>
                </form>

                <Link
                    href={route('admin.courses.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mata Kuliah</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4">Kode</th>
                                <th className="px-6 py-4">Nama Mata Kuliah</th>
                                <th className="px-6 py-4">SKS</th>
                                <th className="px-6 py-4">Semester</th>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4">Signature</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {courses.data.length > 0 ? (
                                courses.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-bold text-ink-900 tracking-wider">
                                            {item.code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-ink-900 leading-snug">
                                                    {item.name_id}
                                                </span>
                                                <span className="text-xs text-navy-700 italic">
                                                    {item.name_en}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-ink-900 font-semibold">{item.sks}</td>
                                        <td className="px-6 py-4 text-sm text-navy-700 font-medium">Semester {item.semester}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.type === 'wajib'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-cream-300/20 text-brand-700'
                                            }`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                item.is_signature ? 'bg-amber-100 text-amber-800' : 'bg-surface-50 text-navy-700/60'
                                            }`}>
                                                {item.is_signature ? 'Signature' : 'Regular'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('admin.courses.edit', item.id)}
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
                                        Tidak ada mata kuliah ditemukan.
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
