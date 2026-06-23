import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface LabItem {
    id: number;
    name: string;
    focus: string | null;
    description_id: string | null;
    description_en: string | null;
    photo: string | null;
    order: number;
}

interface EditProps {
    lab: LabItem;
}

export default function Edit({ lab }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: lab.name || '',
        focus: lab.focus || '',
        description_id: lab.description_id || '',
        description_en: lab.description_en || '',
        photo: lab.photo, // existing string url
        photo_file: null as File | null, // new file
        order: lab.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.labs.update', lab.id));
    };

    return (
        <AdminLayout title="Edit Laboratorium">
            <Head title="Admin - Edit Laboratorium" />

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
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Laboratorium</h2>
                    <p className="text-xs text-navy-700">Perbarui nama, fokus keilmuan, deskripsi, atau foto ruangan laboratorium.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Nama Laboratorium</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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
                    existingUrl={data.photo}
                    onChange={(file) => setData('photo_file', file)}
                    onClearExisting={() => setData('photo', null)}
                    error={errors.photo_file}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Lab'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
