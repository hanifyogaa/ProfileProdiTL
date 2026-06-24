import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

interface AchievementItem {
    id: number;
    title_id: string;
    title_en: string;
    level: 'national' | 'international';
    date: string;
    holder: string;
    category: string | null;
    description_id: string | null;
    description_en: string | null;
    cover: string | null;
    order: number;
}

const ACHIEVEMENT_CATEGORIES = ['Lomba', 'Hackathon', 'Kompetisi Desain', 'Paper/Riset', 'Penghargaan Institusi', 'Olimpiade', 'Wirausaha'];

export default function Edit({ achievement }: { achievement: AchievementItem }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_id: achievement.title_id,
        title_en: achievement.title_en,
        level: achievement.level,
        date: achievement.date,
        holder: achievement.holder,
        category: achievement.category ?? '',
        description_id: achievement.description_id ?? '',
        description_en: achievement.description_en ?? '',
        cover: achievement.cover,
        cover_file: null as File | null,
        order: achievement.order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.achievements.update', achievement.id));
    };

    return (
        <AdminLayout title="Edit Prestasi">
            <Head title="Admin - Edit Prestasi" />

            <div className="mb-6">
                <Link
                    href={route('admin.achievements.index')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-cream-300/40 bg-surface-0 p-6 shadow-sm md:p-8">
                <div>
                    <h2 className="text-lg font-bold text-ink-900">Edit Prestasi</h2>
                    <p className="mt-0.5 text-xs text-navy-700">Perbarui informasi kompetisi, penerima, tingkat prestasi, atau dokumentasi penghargaan.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tingkat Prestasi</label>
                        <select
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value as 'national' | 'international')}
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10"
                        >
                            <option value="national">Nasional</option>
                            <option value="international">Internasional</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori</label>
                        <input
                            list="achievement-categories"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            placeholder="Pilih atau ketik..."
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10"
                        />
                        <datalist id="achievement-categories">
                            {ACHIEVEMENT_CATEGORIES.map((c) => <option key={c} value={c} />)}
                        </datalist>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tanggal Perolehan</label>
                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10"
                            required
                        />
                        {errors.date && <p className="text-xs font-medium text-red-600">{errors.date}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Urutan Tampil</label>
                        <input
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Peraih Penghargaan</label>
                    <input
                        type="text"
                        value={data.holder}
                        onChange={(e) => setData('holder', e.target.value)}
                        className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10"
                        required
                    />
                    {errors.holder && <p className="text-xs font-medium text-red-600">{errors.holder}</p>}
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

                <BilingualInput
                    label="Deskripsi Singkat (Opsional)"
                    idName="description_id"
                    enName="description_en"
                    idValue={data.description_id}
                    enValue={data.description_en}
                    idError={errors.description_id}
                    enError={errors.description_en}
                    type="textarea"
                    rows={3}
                    onChangeId={(val) => setData('description_id', val)}
                    onChangeEn={(val) => setData('description_en', val)}
                />

                <ImageUpload
                    label="Foto Sertifikat / Penyerahan Piala (Cover)"
                    existingUrl={data.cover}
                    onChange={(file) => setData('cover_file', file)}
                    onClearExisting={() => setData('cover', null)}
                    error={errors.cover_file}
                />

                <div className="flex justify-end gap-3 border-t border-cream-300/40 pt-4">
                    <Link
                        href={route('admin.achievements.index')}
                        className="rounded-xl border border-cream-300 px-5 py-2.5 text-xs font-semibold text-ink-900 hover:bg-surface-50 transition-colors"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-2.5 text-xs font-semibold text-surface-0 shadow-md transition-colors hover:bg-brand-800 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? 'Menyimpan...' : 'Perbarui Prestasi'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
