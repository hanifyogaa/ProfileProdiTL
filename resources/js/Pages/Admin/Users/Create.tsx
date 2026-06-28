import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        is_admin: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout title="Tambah Pengguna Baru">
            <Head title="Admin - Tambah Pengguna" />

            <div className="mb-6">
                <Link
                    href={route('admin.users.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Tambah Pengguna Baru</h2>
                    <p className="text-xs text-navy-700">Buat akun baru untuk staf/admin konten. Tidak ada pendaftaran publik — akun hanya bisa dibuat dari sini.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Nama Lengkap</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nama orang yang akan menggunakan akun ini"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        required
                    />
                    {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@proditl.ac.id"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        required
                    />
                    {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Password Awal</label>
                    <input
                        type="text"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Minimal 8 karakter"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        required
                    />
                    {errors.password && <p className="text-xs text-red-600 font-medium">{errors.password}</p>}
                    <p className="text-[11px] text-navy-700/60">Sampaikan password ini ke orangnya lewat jalur aman (bukan chat publik). Mereka bisa menggantinya setelah login.</p>
                </div>

                <label className="flex items-center gap-2.5 rounded-xl border border-cream-300/60 bg-surface-50/40 px-4 py-3">
                    <input
                        type="checkbox"
                        checked={data.is_admin}
                        onChange={(e) => setData('is_admin', e.target.checked)}
                        className="size-4 rounded border-cream-300 text-brand-700 focus:ring-1 focus:ring-brand-700/40"
                    />
                    <span className="text-sm font-medium text-ink-900">
                        Jadikan admin (bisa mengakses dan mengelola seluruh konten di <code>/admin</code>)
                    </span>
                </label>

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.users.index')}
                        className="inline-flex items-center px-5 py-2.5 border border-cream-300 hover:bg-surface-50 text-ink-900 rounded-xl text-xs font-semibold transition-all duration-200"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center space-x-2 px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-xs font-semibold shadow-md disabled:opacity-50 cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        <span>{processing ? 'Menyimpan...' : 'Buat Pengguna'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
