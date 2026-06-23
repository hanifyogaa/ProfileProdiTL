import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        metric: '',
        year: '',
        value: '',
        unit: '',
        label_id: '',
        label_en: '',
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.stats.store'));
    };

    return (
        <AdminLayout title="Tambah Statistik Baru">
            <Head title="Admin - Tambah Statistik" />

            <div className="mb-6">
                <Link
                    href={route('admin.stats.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Tambah Statistik Baru</h2>
                    <p className="text-xs text-navy-700">Buat data statistik (seperti jumlah mitra, akreditasi, atau persentase serapan kerja).</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Metrik (Identifier/Key)</label>
                        <input
                            type="text"
                            value={data.metric}
                            onChange={(e) => setData('metric', e.target.value)}
                            placeholder="Contoh: partners, accreditation, atau graduates"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.metric && <p className="text-xs text-red-600 font-medium">{errors.metric}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Tahun</label>
                        <input
                            type="text"
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                            placeholder="Contoh: 2026 (Opsional)"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.year && <p className="text-xs text-red-600 font-medium">{errors.year}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Nilai (Value)</label>
                        <input
                            type="text"
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                            placeholder="Contoh: 30+, Unggul, 90"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.value && <p className="text-xs text-red-600 font-medium">{errors.value}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Satuan (Unit)</label>
                        <input
                            type="text"
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="Contoh: %, Orang (Opsional)"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.unit && <p className="text-xs text-red-600 font-medium">{errors.unit}</p>}
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

                <BilingualInput
                    label="Label Penjelasan"
                    idName="label_id"
                    enName="label_en"
                    idValue={data.label_id}
                    enValue={data.label_en}
                    idError={errors.label_id}
                    enError={errors.label_en}
                    onChangeId={(val) => setData('label_id', val)}
                    onChangeEn={(val) => setData('label_en', val)}
                    required
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.stats.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Simpan Statistik'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
