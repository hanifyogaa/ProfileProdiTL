import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title_id: '',
        title_en: '',
        level: 'national',
        date: '',
        holder: '',
        cover: null as File | null,
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.achievements.store'));
    };

    return (
        <AdminLayout title="Tambah Prestasi Baru">
            <Head title="Admin - Tambah Prestasi" />

            <div className="mb-6">
                <Link
                    href={route('admin.achievements.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-3xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Tambah Prestasi</h2>
                    <p className="text-xs text-navy-700">Catat prestasi mahasiswa atau dosen untuk dipajang di halaman pencapaian.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tingkat Prestasi</label>
                        <select
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value as 'national' | 'international')}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="national">Nasional</option>
                            <option value="international">Internasional</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tanggal Perolehan</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.date && <p className="text-xs text-red-600 font-medium">{errors.date}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Urutan Urutan</label>
                        <input
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Peraih Penghargaan (Holder)</label>
                    <input
                        type="text"
                        value={data.holder}
                        onChange={(e) => setData('holder', e.target.value)}
                        placeholder="Contoh: Tim Nawasena, atau Nama Mahasiswa/Dosen"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        required
                    />
                    {errors.holder && <p className="text-xs text-red-600 font-medium">{errors.holder}</p>}
                </div>

                <BilingualInput
                    label="Nama Penghargaan / Kompetisi"
                    idName="title_id"
                    enName="title_en"
                    idValue={data.title_id}
                    enValue={data.title_en}
                    idError={errors.title_id}
                    enError={errors.title_en}
                    onChangeId={(val) => setData('title_id', val)}
                    onChangeEn={(val) => setData('title_en', val)}
                    required
                />

                <ImageUpload
                    label="Foto Sertifikat / Penyerahan Piala (Cover)"
                    onChange={(file) => setData('cover', file)}
                    error={errors.cover}
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.achievements.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Simpan Prestasi'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
