import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    excerpt_id: string | null;
    excerpt_en: string | null;
    body_id: string | null;
    body_en: string | null;
    category: string | null;
    status: 'draft' | 'published';
    is_featured: boolean;
    featured_image: string | null;
}

interface EditProps {
    news: NewsItem;
}

export default function Edit({ news }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_id: news.title_id || '',
        title_en: news.title_en || '',
        excerpt_id: news.excerpt_id || '',
        excerpt_en: news.excerpt_en || '',
        body_id: news.body_id || '',
        body_en: news.body_en || '',
        category: news.category || 'Pengumuman',
        status: news.status || 'draft',
        is_featured: news.is_featured || false,
        featured_image: news.featured_image, // string URL
        featured_image_file: null as File | null, // new file
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.news.update', news.id));
    };

    return (
        <AdminLayout title="Edit Berita">
            <Head title={`Admin - Edit: ${news.title_id}`} />

            {/* Header Navigation */}
            <div className="mb-6">
                <Link
                    href={route('admin.news.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-4xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Artikel Berita</h2>
                    <p className="text-xs text-navy-700">Perbarui informasi artikel berita dan publish ulang.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="Pengumuman">Pengumuman</option>
                            <option value="Kegiatan">Kegiatan / Event</option>
                            <option value="Akademik">Akademik</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Umum">Umum</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value as 'draft' | 'published')}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="draft">Draft (Simpan Sementara)</option>
                            <option value="published">Published (Terbitkan Sekarang)</option>
                        </select>
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
                        Jadikan Berita Utama (Featured) - Tampil di halaman depan
                    </label>
                </div>

                <BilingualInput
                    label="Judul Berita"
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
                    label="Ringkasan Pendek (Excerpt)"
                    idName="excerpt_id"
                    enName="excerpt_en"
                    idValue={data.excerpt_id}
                    enValue={data.excerpt_en}
                    idError={errors.excerpt_id}
                    enError={errors.excerpt_en}
                    type="textarea"
                    rows={2}
                    onChangeId={(val) => setData('excerpt_id', val)}
                    onChangeEn={(val) => setData('excerpt_en', val)}
                />

                <BilingualInput
                    label="Konten Lengkap Berita"
                    idName="body_id"
                    enName="body_en"
                    idValue={data.body_id}
                    enValue={data.body_en}
                    idError={errors.body_id}
                    enError={errors.body_en}
                    type="textarea"
                    rows={10}
                    onChangeId={(val) => setData('body_id', val)}
                    onChangeEn={(val) => setData('body_en', val)}
                />

                <ImageUpload
                    label="Gambar Utama (Featured Image)"
                    existingUrl={data.featured_image}
                    onChange={(file) => setData('featured_image_file', file)}
                    onClearExisting={() => setData('featured_image', null)}
                    error={errors.featured_image_file}
                />

                {/* Submit Actions */}
                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.news.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Berita'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
