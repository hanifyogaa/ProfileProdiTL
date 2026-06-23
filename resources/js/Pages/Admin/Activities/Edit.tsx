import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface ActivityItem {
    id: number;
    title_id: string;
    title_en: string;
    type: 'visit' | 'workshop' | 'lecture';
    date: string;
    location: string | null;
    cover: string | null;
    is_featured: boolean;
    body_id: string | null;
    body_en: string | null;
}

interface EditProps {
    activity: ActivityItem;
}

export default function Edit({ activity }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_id: activity.title_id || '',
        title_en: activity.title_en || '',
        body_id: activity.body_id || '',
        body_en: activity.body_en || '',
        type: activity.type || 'visit',
        date: activity.date || '',
        location: activity.location || '',
        cover: activity.cover, // existing string url
        cover_file: null as File | null, // new file
        is_featured: activity.is_featured || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.activities.update', activity.id));
    };

    return (
        <AdminLayout title="Edit Agenda Kegiatan">
            <Head title="Admin - Edit Agenda" />

            <div className="mb-6">
                <Link
                    href={route('admin.activities.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-4xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Agenda Kegiatan</h2>
                    <p className="text-xs text-navy-700">Perbarui rincian, jenis kegiatan, tanggal pelaksanaan, lokasi, atau lampiran foto cover.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tipe Kegiatan</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value as 'visit' | 'workshop' | 'lecture')}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="visit">Kunjungan Industri</option>
                            <option value="workshop">Workshop / Pelatihan</option>
                            <option value="lecture">Kuliah Umum / Tamu</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tanggal Kegiatan</label>
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
                        <label className="text-sm font-semibold text-ink-900">Tempat / Lokasi</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.location && <p className="text-xs text-red-600 font-medium">{errors.location}</p>}
                    </div>
                </div>

                <div className="flex items-center space-x-3 p-3.5 rounded-xl border border-cream-300/20 bg-surface-50/20 max-w-fit">
                    <input
                        type="checkbox"
                        id="is_featured"
                        checked={data.is_featured}
                        onChange={(e) => setData('is_featured', e.target.checked)}
                        className="rounded text-brand-700 focus:ring-brand-700 border-cream-300 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="is_featured" className="text-xs font-semibold text-ink-900 cursor-pointer">
                        Tampilkan di Halaman Utama (Featured)
                    </label>
                </div>

                <BilingualInput
                    label="Nama Kegiatan"
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
                    label="Detail Penjelasan Kegiatan"
                    idName="body_id"
                    enName="body_en"
                    idValue={data.body_id}
                    enValue={data.body_en}
                    idError={errors.body_id}
                    enError={errors.body_en}
                    type="textarea"
                    rows={8}
                    onChangeId={(val) => setData('body_id', val)}
                    onChangeEn={(val) => setData('body_en', val)}
                />

                <ImageUpload
                    label="Foto Sampul Kegiatan (Cover)"
                    existingUrl={data.cover}
                    onChange={(file) => setData('cover_file', file)}
                    onClearExisting={() => setData('cover', null)}
                    error={errors.cover_file}
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.activities.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Agenda'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
