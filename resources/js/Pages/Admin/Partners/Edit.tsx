import AdminLayout from '@/Layouts/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface PartnerItem {
    id: number;
    name: string;
    logo: string | null;
    url: string | null;
    type: 'industry' | 'academic';
    order: number;
}

interface EditProps {
    partner: PartnerItem;
}

export default function Edit({ partner }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: partner.name || '',
        logo: partner.logo, // existing string url
        logo_file: null as File | null, // new file
        url: partner.url || '',
        type: partner.type || 'industry',
        order: partner.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.partners.update', partner.id));
    };

    return (
        <AdminLayout title="Edit Mitra Kerjasama">
            <Head title="Admin - Edit Mitra" />

            <div className="mb-6">
                <Link
                    href={route('admin.partners.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-2xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Mitra</h2>
                    <p className="text-xs text-navy-700">Perbarui informasi mengenai logo, url, atau tipe kerjasama mitra di bawah ini.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Nama Mitra / Perusahaan</label>
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
                        <label className="text-sm font-semibold text-ink-900">Tipe Kerjasama</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value as 'industry' | 'academic')}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="industry">Mitra Industri (Perusahaan/BUMN)</option>
                            <option value="academic">Mitra Akademik (Universitas/Lembaga Riset)</option>
                        </select>
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

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">URL Website Resmi</label>
                    <input
                        type="text"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                    />
                    {errors.url && <p className="text-xs text-red-600 font-medium">{errors.url}</p>}
                </div>

                <ImageUpload
                    label="Logo Mitra"
                    existingUrl={data.logo}
                    onChange={(file) => setData('logo_file', file)}
                    onClearExisting={() => setData('logo', null)}
                    error={errors.logo_file}
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.partners.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Mitra'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
