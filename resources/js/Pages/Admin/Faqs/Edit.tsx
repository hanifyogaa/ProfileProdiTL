import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft } from 'lucide-react';
import React from 'react';

interface FaqItem {
    id: number;
    question_id: string;
    question_en: string;
    answer_id: string;
    answer_en: string;
    category: string;
    order: number;
    is_active: boolean;
}

interface EditProps {
    faq: FaqItem;
}

export default function Edit({ faq }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        question_id: faq.question_id || '',
        question_en: faq.question_en || '',
        answer_id: faq.answer_id || '',
        answer_en: faq.answer_en || '',
        category: faq.category || 'umum',
        order: faq.order || 0,
        is_active: faq.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.faqs.update', faq.id));
    };

    return (
        <AdminLayout title="Edit FAQ">
            <Head title="Admin - Edit FAQ" />

            <div className="mb-6">
                <Link
                    href={route('admin.faqs.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-3xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit FAQ</h2>
                    <p className="text-xs text-navy-700">Perbarui pertanyaan atau jawaban dwibahasa di bawah ini.</p>
                </div>

                <hr className="border-cream-300/40" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Kategori</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        >
                            <option value="umum">Umum</option>
                            <option value="akademik">Akademik</option>
                            <option value="karir">Karir</option>
                            <option value="mbkm">MBKM</option>
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
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="rounded text-brand-700 focus:ring-brand-700 border-cream-300 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="is_active" className="text-sm font-semibold text-ink-900 cursor-pointer">
                                Aktif & Tampilkan
                            </label>
                        </div>
                    </div>
                </div>

                <BilingualInput
                    label="Pertanyaan"
                    idName="question_id"
                    enName="question_en"
                    idValue={data.question_id}
                    enValue={data.question_en}
                    idError={errors.question_id}
                    enError={errors.question_en}
                    type="textarea"
                    rows={2}
                    onChangeId={(val) => setData('question_id', val)}
                    onChangeEn={(val) => setData('question_en', val)}
                    required
                />

                <BilingualInput
                    label="Jawaban"
                    idName="answer_id"
                    enName="answer_en"
                    idValue={data.answer_id}
                    enValue={data.answer_en}
                    idError={errors.answer_id}
                    enError={errors.answer_en}
                    type="textarea"
                    rows={4}
                    onChangeId={(val) => setData('answer_id', val)}
                    onChangeEn={(val) => setData('answer_en', val)}
                    required
                />

                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.faqs.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui FAQ'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
