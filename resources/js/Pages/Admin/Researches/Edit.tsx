import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';

interface ResearchItem {
    id: number;
    title_id: string;
    title_en: string;
    category: string | null;
    year: number | null;
    description_id: string;
    description_en: string;
    image: string | null;
    team: string | null;
    order: number;
}

const RESEARCH_CATEGORIES = [
    'Operations Research',
    'Digital Logistics',
    'Supply Chain Management',
    'Data Science & Logistics',
    'Transportation & Warehousing',
    'Green Logistics',
    'Humanitarian Logistics',
];

export default function Edit({ research }: { research: ResearchItem }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_id: research.title_id,
        title_en: research.title_en,
        category: research.category ?? '',
        year: research.year ?? new Date().getFullYear(),
        description_id: research.description_id,
        description_en: research.description_en,
        image: research.image,
        image_file: null as File | null,
        team: research.team ?? '',
        order: research.order,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.researches.update', research.id));
    };

    return (
        <AdminLayout title="Edit Penelitian">
            <Head title="Admin - Edit Penelitian" />

            <div className="mb-6">
                <Link
                    href={route('admin.researches.index')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-cream-300/40 bg-surface-0 p-6 shadow-sm md:p-8">
                <div>
                    <h2 className="text-lg font-bold text-ink-900">Edit Penelitian</h2>
                    <p className="mt-0.5 text-xs text-navy-700">Perbarui informasi proyek riset atau publikasi ilmiah.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori Riset</label>
                        <input
                            list="research-categories"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            placeholder="Pilih atau ketik kategori..."
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                        <datalist id="research-categories">
                            {RESEARCH_CATEGORIES.map((c) => <option key={c} value={c} />)}
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
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Urutan Tampil</label>
                        <input
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                            className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Tim Peneliti</label>
                    <input
                        type="text"
                        value={data.team}
                        onChange={(e) => setData('team', e.target.value)}
                        className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20"
                    />
                </div>

                <BilingualInput
                    label="Judul Penelitian"
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
                    label="Deskripsi / Abstrak Penelitian"
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
                    label="Gambar / Foto Penelitian"
                    existingUrl={data.image}
                    onChange={(file) => setData('image_file', file)}
                    onClearExisting={() => setData('image', null)}
                    error={errors.image_file}
                />

                <div className="flex justify-end gap-3 border-t border-cream-300/40 pt-4">
                    <Link
                        href={route('admin.researches.index')}
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
                        {processing ? 'Menyimpan...' : 'Perbarui Penelitian'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
