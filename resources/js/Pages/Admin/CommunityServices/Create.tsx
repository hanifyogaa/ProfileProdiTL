import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

const SERVICE_CATEGORIES = ['Pelatihan', 'Pendampingan', 'Konsultasi', 'Workshop', 'Sosialisasi', 'Penelitian Terapan'];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title_id: '',
        title_en: '',
        category: '',
        year: new Date().getFullYear(),
        location: '',
        partners: '',
        description_id: '',
        description_en: '',
        image: null as File | null,
        team: '',
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.community-services.store'));
    };

    return (
        <AdminLayout title="Tambah Pengabdian Masyarakat">
            <Head title="Admin - Tambah Pengabdian" />

            <div className="mb-6">
                <Link
                    href={route('admin.community-services.index')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-cream-300/40 bg-surface-0 p-6 shadow-sm md:p-8">
                <div>
                    <h2 className="text-lg font-bold text-ink-900">Tambah Program Pengabdian</h2>
                    <p className="mt-0.5 text-xs text-navy-700">Catat program pengabdian masyarakat yang dilaksanakan oleh dosen dan mahasiswa Prodi.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori</label>
                        <input
                            list="service-categories"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            placeholder="Pilih atau ketik..."
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                        <datalist id="service-categories">
                            {SERVICE_CATEGORIES.map((c) => <option key={c} value={c} />)}
                        </datalist>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tahun</label>
                        <input
                            type="number"
                            value={data.year}
                            onChange={(e) => setData('year', parseInt(e.target.value) || new Date().getFullYear())}
                            min={2000} max={2099}
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                    </div>
                    <div className="space-y-1 lg:col-span-2">
                        <label className="text-sm font-semibold text-ink-900">Lokasi</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Bandung, Jawa Barat"
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Mitra / Partners</label>
                        <input
                            type="text"
                            value={data.partners}
                            onChange={(e) => setData('partners', e.target.value)}
                            placeholder="Nama instansi mitra..."
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tim Pelaksana</label>
                        <input
                            type="text"
                            value={data.team}
                            onChange={(e) => setData('team', e.target.value)}
                            placeholder="Dr. Ahmad Fauzan, M.T. dkk."
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                    </div>
                </div>

                <BilingualInput
                    label="Nama Program / Kegiatan"
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

                <BilingualInput
                    label="Deskripsi Program"
                    idName="description_id"
                    enName="description_en"
                    idValue={data.description_id}
                    enValue={data.description_en}
                    idError={errors.description_id}
                    enError={errors.description_en}
                    type="textarea"
                    rows={5}
                    onChangeId={(val) => setData('description_id', val)}
                    onChangeEn={(val) => setData('description_en', val)}
                    required
                />

                <ImageUpload
                    label="Foto Dokumentasi Program (Opsional)"
                    onChange={(file) => setData('image', file)}
                    error={errors.image}
                />

                <div className="flex justify-end gap-3 border-t border-cream-300/40 pt-4">
                    <Link
                        href={route('admin.community-services.index')}
                        className="rounded-xl border border-cream-300 px-5 py-2.5 text-xs font-semibold text-ink-900 hover:bg-surface-50 transition-colors"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-2.5 text-xs font-semibold text-surface-0 shadow-md transition-colors hover:bg-brand-800 disabled:opacity-50"
                    >
                        <Save className="size-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Program'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
