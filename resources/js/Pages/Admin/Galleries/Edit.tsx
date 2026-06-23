import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface GalleryItem {
    id: number;
    title_id: string;
    title_en: string;
    caption_id: string | null;
    caption_en: string | null;
    image: string | null;
    category: string;
    order: number;
    is_published: boolean;
}

interface EditProps {
    gallery: GalleryItem;
}

export default function Edit({ gallery }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_id: gallery.title_id || '',
        title_en: gallery.title_en || '',
        caption_id: gallery.caption_id || '',
        caption_en: gallery.caption_en || '',
        image: gallery.image, // existing string url
        image_file: null as File | null, // new file
        category: gallery.category || 'umum',
        order: gallery.order || 0,
        is_published: gallery.is_published ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.galleries.update', gallery.id));
    };

    return (
        <AdminLayout title="Edit Media Galeri">
            <Head title="Admin - Edit Media" />

            <div className="mb-6">
                <Link
                    href={route('admin.galleries.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-3xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Media Galeri</h2>
                    <p className="text-xs text-navy-700">Perbarui informasi judul, keterangan, kategori, atau upload ulang foto media.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori Media</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="umum">Umum</option>
                            <option value="kegiatan">Kegiatan Mahasiswa/Dosen</option>
                            <option value="laboratorium">Laboratorium</option>
                            <option value="prestasi">Prestasi</option>
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

                    <div className="space-y-1 flex flex-col justify-end pb-3">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="is_published"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="rounded text-brand-700 focus:ring-brand-700 border-cream-300 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="is_published" className="text-sm font-semibold text-ink-900 cursor-pointer">
                                Terbitkan langsung ke Galeri
                            </label>
                        </div>
                    </div>
                </div>

                <BilingualInput
                    label="Judul Foto"
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
                    label="Keterangan Singkat (Caption)"
                    idName="caption_id"
                    enName="caption_en"
                    idValue={data.caption_id}
                    enValue={data.caption_en}
                    idError={errors.caption_id}
                    enError={errors.caption_en}
                    type="textarea"
                    rows={2}
                    onChangeId={(val) => setData('caption_id', val)}
                    onChangeEn={(val) => setData('caption_en', val)}
                />

                <ImageUpload
                    label="Pilih Foto"
                    existingUrl={data.image}
                    onChange={(file) => setData('image_file', file)}
                    onClearExisting={() => setData('image', null)}
                    error={errors.image_file}
                    helpText="Format JPG, PNG, atau WebP. Maksimal 3MB."
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.galleries.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Media'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
