import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface CourseItem {
    id: number;
    code: string;
    name_id: string;
    name_en: string;
    sks: number;
    semester: number;
    type: 'wajib' | 'pilihan';
    is_signature: boolean;
    cpl: string | null;
    description_id: string | null;
    description_en: string | null;
}

interface CloRow {
    code: string;
    description_id: string;
    description_en: string;
    plo_ids: number[];
}

interface CloItem {
    id: number;
    code: string;
    description_id: string;
    description_en: string;
    plos: { id: number }[];
}

interface PloOption {
    id: number;
    code: string;
}

interface EditProps {
    course: CourseItem;
    clos: CloItem[];
    allPlos: PloOption[];
}

export default function Edit({ course, clos, allPlos }: EditProps) {
    const initialClos: CloRow[] = clos.length > 0
        ? clos.map((c) => ({
            code: c.code,
            description_id: c.description_id,
            description_en: c.description_en,
            plo_ids: c.plos.map((p) => p.id),
        }))
        : [];

    const [cloRows, setCloRows] = useState<CloRow[]>(initialClos);

    const { data, setData, put, transform, processing, errors } = useForm({
        code: course.code || '',
        name_id: course.name_id || '',
        name_en: course.name_en || '',
        sks: course.sks || 3,
        semester: course.semester || 1,
        type: course.type || 'wajib',
        cpl: course.cpl || '',
        description_id: course.description_id || '',
        description_en: course.description_en || '',
        is_signature: course.is_signature || false,
    });

    const addCloRow = () => {
        setCloRows([...cloRows, { code: '', description_id: '', description_en: '', plo_ids: [] }]);
    };

    const removeCloRow = (index: number) => {
        setCloRows(cloRows.filter((_, i) => i !== index));
    };

    const updateCloRow = (index: number, field: 'code' | 'description_id' | 'description_en', value: string) => {
        const updated = [...cloRows];
        updated[index] = { ...updated[index], [field]: value };
        setCloRows(updated);
    };

    const togglePlo = (index: number, ploId: number) => {
        const updated = [...cloRows];
        const current = updated[index].plo_ids;
        updated[index] = {
            ...updated[index],
            plo_ids: current.includes(ploId) ? current.filter((id) => id !== ploId) : [...current, ploId],
        };
        setCloRows(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cleanClos = cloRows.filter((row) => row.code && row.description_id && row.description_en);

        transform((formData) => ({
            ...formData,
            clos: cleanClos,
        }));

        put(route('admin.courses.update', course.id));
    };

    return (
        <AdminLayout title="Edit Mata Kuliah">
            <Head title="Admin - Edit Matkul" />

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
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Mata Kuliah</h2>
                    <p className="text-xs text-navy-700">Perbarui rincian, SKS, semester, CPL, atau deskripsi mata kuliah.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kode Mata Kuliah</label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
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

                <hr className="border-cream-300/40" />

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-semibold text-ink-900">Course Learning Outcomes (CLO)</label>
                            <p className="text-[11px] text-navy-700/60">Capaian pembelajaran mata kuliah ini, dan PLO mana yang didukung oleh tiap CLO. Ditampilkan di halaman /kurikulum/capaian-pembelajaran.</p>
                        </div>
                        <button
                            type="button"
                            onClick={addCloRow}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-xs font-bold transition-all border border-brand-200 shrink-0"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah CLO</span>
                        </button>
                    </div>

                    {allPlos.length === 0 && (
                        <p className="rounded-xl border border-dashed border-cream-300 py-4 text-center text-xs text-navy-700/50">
                            Belum ada PLO yang dibuat. Tambahkan PLO dulu di menu "Kelola PLO" sebelum memetakan CLO.
                        </p>
                    )}

                    <div className="space-y-3">
                        {cloRows.map((row, index) => (
                            <div key={index} className="bg-surface-50/30 border border-cream-300/20 p-4 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700">CLO {index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeCloRow(index)}
                                        className="p-1.5 hover:bg-red-50 text-navy-700 hover:text-red-600 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Kode CLO (Contoh: CLO-1)"
                                    value={row.code}
                                    onChange={(e) => updateCloRow(index, 'code', e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <textarea
                                        placeholder="Deskripsi CLO (Indonesia)"
                                        value={row.description_id}
                                        onChange={(e) => updateCloRow(index, 'description_id', e.target.value)}
                                        rows={2}
                                        className="w-full px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none resize-none"
                                    />
                                    <textarea
                                        placeholder="Deskripsi CLO (English)"
                                        value={row.description_en}
                                        onChange={(e) => updateCloRow(index, 'description_en', e.target.value)}
                                        rows={2}
                                        className="w-full px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none resize-none"
                                    />
                                </div>

                                {allPlos.length > 0 && (
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-semibold text-navy-700">Mendukung PLO:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {allPlos.map((plo) => (
                                                <label
                                                    key={plo.id}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer border transition-all ${
                                                        row.plo_ids.includes(plo.id)
                                                            ? 'bg-brand-700 text-surface-0 border-brand-700'
                                                            : 'bg-surface-0 text-navy-700 border-cream-300 hover:bg-surface-50'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={row.plo_ids.includes(plo.id)}
                                                        onChange={() => togglePlo(index, plo.id)}
                                                        className="hidden"
                                                    />
                                                    {plo.code}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {cloRows.length === 0 && (
                            <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                Belum ada CLO. Klik "Tambah CLO" untuk menambahkan.
                            </p>
                        )}
                    </div>
                </div>

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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Matkul'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
