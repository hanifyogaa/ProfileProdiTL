import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        focus: '',
        description_id: '',
        description_en: '',
        photo: null as File | null,
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.labs.store'));
    };

    return (
        <AdminLayout title="Tambah Laboratorium Baru">
            <Head title="Admin - Tambah Laboratorium" />

            <div className="mb-6">
                <Link
                    href={route('admin.labs.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-3xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Tambah Laboratorium</h2>
                    <p className="text-xs text-navy-700">Tambahkan informasi laboratorium keilmuan e-logistik lengkap dengan foto ruangan.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Nama Laboratorium</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Contoh: Laboratorium E-Logistik"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        required
                    />
                    {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Fokus Bidang Keilmuan</label>
                        <input
                            type="text"
                            value={data.focus}
                            onChange={(e) => setData('focus', e.target.value)}
                            placeholder="Contoh: Digital Supply Chain"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.focus && <p className="text-xs text-red-600 font-medium">{errors.focus}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Urutan Tampil</label>
                        <input
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                    </div>
                </div>

                <BilingualInput
                    label="Deskripsi Laboratorium"
                    idName="description_id"
                    enName="description_en"
                    idValue={data.description_id}
                    enValue={data.description_en}
                    idError={errors.description_id}
                    enError={errors.description_en}
                    type="textarea"
                    rows={4}
                    onChangeId={(val) => setData('description_id', val)}
                    onChangeEn={(val) => setData('description_en', val)}
                />

                <ImageUpload
                    label="Foto Laboratorium"
                    onChange={(file) => setData('photo', file)}
                    error={errors.photo}
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.labs.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Simpan Lab'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
