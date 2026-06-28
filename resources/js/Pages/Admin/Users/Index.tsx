import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, ShieldCheck, ShieldOff } from 'lucide-react';
import React, { useState } from 'react';

interface UserItem {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

interface IndexProps {
    users: {
        data: UserItem[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ users, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const { auth } = usePage().props as any;
    const currentUserId = auth?.user?.id;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search }, { preserveState: true });
    };

    const handleToggleAdmin = (user: UserItem) => {
        const action = user.is_admin ? 'mencabut' : 'memberikan';
        if (confirm(`Apakah Anda yakin ingin ${action} akses admin untuk ${user.name}?`)) {
            router.patch(route('admin.users.toggle-admin', user.id));
        }
    };

    return (
        <AdminLayout title="Kelola Pengguna Admin">
            <Head title="Admin - Pengguna" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 shadow-sm transition-all"
                    />
                    <Search className="absolute left-3.5 w-4 h-4 text-navy-700 opacity-60 pointer-events-none" />
                </form>

                <Link
                    href={route('admin.users.create')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md cursor-pointer self-start md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pengguna</span>
                </Link>
            </div>

            <div className="bg-surface-0 border border-cream-300/40 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-cream-300/40 bg-surface-50/40 text-xs font-bold uppercase tracking-wider text-navy-700">
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-300/20">
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-surface-50/20 transition-all">
                                        <td className="px-6 py-4 text-sm font-bold text-ink-900">
                                            {user.name}
                                            {user.id === currentUserId && (
                                                <span className="ml-2 text-xs font-medium text-navy-700/60">(Anda)</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-navy-700">{user.email}</td>
                                        <td className="px-6 py-4">
                                            {user.is_admin ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 bg-surface-50 border border-cream-300 px-2.5 py-1 rounded-lg">
                                                    <ShieldOff className="w-3.5 h-3.5" />
                                                    Bukan Admin
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {user.id !== currentUserId && (
                                                <button
                                                    onClick={() => handleToggleAdmin(user)}
                                                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                                                        user.is_admin
                                                            ? 'text-red-600 hover:bg-red-50'
                                                            : 'text-brand-700 hover:bg-brand-700/10'
                                                    }`}
                                                >
                                                    {user.is_admin ? 'Cabut Akses Admin' : 'Jadikan Admin'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-navy-700 italic bg-surface-50/10">
                                        Tidak ada pengguna ditemukan.
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
