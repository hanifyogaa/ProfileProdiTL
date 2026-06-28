import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface PloItem {
    id: number;
    code: string;
    description_id: string;
    description_en: string;
    order: number;
}

interface EditProps {
    plo: PloItem;
}

export default function Edit({ plo }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        code: plo.code || '',
        description_id: plo.description_id || '',
        description_en: plo.description_en || '',
        order: plo.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.plos.update', plo.id));
    };

    return (
        <AdminLayout title="Edit PLO">
            <Head title="Admin - Edit PLO" />

            <div className="mb-6">
                <Link
                    href={route('admin.plos.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit PLO</h2>
                    <p className="text-xs text-navy-700">Perbarui kode atau deskripsi PLO di bawah ini.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-semibold text-ink-900">Kode PLO</label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.code && <p className="text-xs text-red-600 font-medium">{errors.code}</p>}
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
                    label="Deskripsi PLO"
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
                    required
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.plos.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui PLO'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
