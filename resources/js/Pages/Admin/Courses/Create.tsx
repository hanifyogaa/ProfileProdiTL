import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name_id: '',
        name_en: '',
        sks: 3,
        semester: 1,
        type: 'wajib',
        cpl: '',
        description_id: '',
        description_en: '',
        is_signature: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.courses.store'));
    };

    return (
        <AdminLayout title="Tambah Mata Kuliah Baru">
            <Head title="Admin - Tambah Matkul" />

            <div className="mb-6">
                <Link
                    href={route('admin.courses.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-3xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Tambah Mata Kuliah</h2>
                    <p className="text-xs text-navy-700">Tambahkan kurikulum matkul baru lengkap dengan kode, SKS, semester, CPL, dan deskripsi.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kode Mata Kuliah</label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="Contoh: TLO401"
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.code && <p className="text-xs text-red-600 font-medium">{errors.code}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-ink-900">Bobot SKS</label>
                            <input
                                type="number"
                                value={data.sks}
                                onChange={(e) => setData('sks', parseInt(e.target.value) || 3)}
                                min={1}
                                max={10}
                                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-ink-900">Semester</label>
                            <select
                                value={data.semester}
                                onChange={(e) => setData('semester', parseInt(e.target.value) || 1)}
                                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                                    <option key={s} value={s}>Semester {s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Jenis Mata Kuliah</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value as 'wajib' | 'pilihan')}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="wajib">Wajib</option>
                            <option value="pilihan">Pilihan</option>
                        </select>
                    </div>

                    <div className="space-y-1 flex flex-col justify-end pb-3">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="is_signature"
                                checked={data.is_signature}
                                onChange={(e) => setData('is_signature', e.target.checked)}
                                className="rounded text-brand-700 focus:ring-brand-700 border-cream-300 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="is_signature" className="text-sm font-semibold text-ink-900 cursor-pointer">
                                Jadikan Mata Kuliah Khas (Signature Course)
                            </label>
                        </div>
                    </div>
                </div>

                <BilingualInput
                    label="Nama Mata Kuliah"
                    idName="name_id"
                    enName="name_en"
                    idValue={data.name_id}
                    enValue={data.name_en}
                    idError={errors.name_id}
                    enError={errors.name_en}
                    onChangeId={(val) => setData('name_id', val)}
                    onChangeEn={(val) => setData('name_en', val)}
                    required
                />

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Capaian Pembelajaran Lulusan (CPL)</label>
                    <textarea
                        value={data.cpl}
                        onChange={(e) => setData('cpl', e.target.value)}
                        placeholder="Contoh: CPL-1: Mampu merancang sistem logistik digital terintegrasi..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                    />
                    {errors.cpl && <p className="text-xs text-red-600 font-medium">{errors.cpl}</p>}
                </div>

                <BilingualInput
                    label="Deskripsi Mata Kuliah"
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

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.courses.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Simpan Matkul'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
