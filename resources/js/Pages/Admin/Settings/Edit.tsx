import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, useForm } from '@inertiajs/react';
import { 
    Layout, 
    Smile, 
    Link2, 
    Info, 
    Save, 
    FileUp 
} from 'lucide-react';
import React, { useState } from 'react';

interface SettingsProps {
    settings: {
        hero?: any;
        distinctiveness?: any;
        greeting?: any;
        prospects?: any;
        curriculum_summary?: any;
        tracer_stats?: any;
        site_meta?: any;
        socials?: any;
        contact?: any;
    };
}

export default function Edit({ settings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<'hero' | 'greeting' | 'distinctiveness' | 'meta'>('hero');

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        
        // 1. Hero
        hero: {
            eyebrow: {
                id: settings.hero?.eyebrow?.id || '',
                en: settings.hero?.eyebrow?.en || '',
            },
            title: {
                id: settings.hero?.title?.id || '',
                en: settings.hero?.title?.en || '',
            },
            subtitle: {
                id: settings.hero?.subtitle?.id || '',
                en: settings.hero?.subtitle?.en || '',
            },
            image: settings.hero?.image || null,
            primary_cta: {
                label: {
                    id: settings.hero?.primary_cta?.label?.id || '',
                    en: settings.hero?.primary_cta?.label?.en || '',
                },
                href: settings.hero?.primary_cta?.href || '',
            },
            secondary_cta: {
                label: {
                    id: settings.hero?.secondary_cta?.label?.id || '',
                    en: settings.hero?.secondary_cta?.label?.en || '',
                },
                href: settings.hero?.secondary_cta?.href || '',
            }
        },
        hero_image_file: null as File | null,

        // 2. Distinctiveness
        distinctiveness: {
            heading: {
                id: settings.distinctiveness?.heading?.id || '',
                en: settings.distinctiveness?.heading?.en || '',
            },
            body: {
                id: settings.distinctiveness?.body?.id || '',
                en: settings.distinctiveness?.body?.en || '',
            }
        },

        // 3. Greeting
        greeting: {
            quote: {
                id: settings.greeting?.quote?.id || '',
                en: settings.greeting?.quote?.en || '',
            },
            attribution: {
                id: settings.greeting?.attribution?.id || '',
                en: settings.greeting?.attribution?.en || '',
            },
            photo: settings.greeting?.photo || null,
        },
        greeting_photo_file: null as File | null,

        // 4. Meta, Socials & Contact
        site_meta: {
            name: settings.site_meta?.name || '',
            address: settings.site_meta?.address || '',
            accreditation_badge: settings.site_meta?.accreditation_badge || null,
        },
        accreditation_badge_file: null as File | null,

        socials: {
            instagram: settings.socials?.instagram || '',
            line: settings.socials?.line || '',
            tiktok: settings.socials?.tiktok || '',
        },

        contact: {
            email: settings.contact?.email || '',
            phone: settings.contact?.phone || '',
        },

        curriculum_summary: {
            total_sks: settings.curriculum_summary?.total_sks || 145,
            semesters: settings.curriculum_summary?.semesters || 8,
            pdf_url: settings.curriculum_summary?.pdf_url || null,
        },
        curriculum_pdf_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="Pengaturan Website">
            <Head title="Pengaturan Website" />

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Vertical Tabs Sidebar */}
                <div className="w-full lg:w-64 bg-surface-0 border border-cream-300/40 p-4 rounded-2xl shrink-0 h-fit space-y-1 shadow-sm">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                            activeTab === 'hero'
                                ? 'bg-amber-500 text-ink-900 shadow-sm'
                                : 'text-navy-700 hover:bg-surface-50 hover:text-ink-900'
                        }`}
                    >
                        <Layout className="w-4 h-4" />
                        <span>Hero Banner</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('distinctiveness')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                            activeTab === 'distinctiveness'
                                ? 'bg-amber-500 text-ink-900 shadow-sm'
                                : 'text-navy-700 hover:bg-surface-50 hover:text-ink-900'
                        }`}
                    >
                        <Link2 className="w-4 h-4" />
                        <span>Keunggulan & Brand</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('greeting')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                            activeTab === 'greeting'
                                ? 'bg-amber-500 text-ink-900 shadow-sm'
                                : 'text-navy-700 hover:bg-surface-50 hover:text-ink-900'
                        }`}
                    >
                        <Smile className="w-4 h-4" />
                        <span>Sambutan Kaprodi</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('meta')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                            activeTab === 'meta'
                                ? 'bg-amber-500 text-ink-900 shadow-sm'
                                : 'text-navy-700 hover:bg-surface-50 hover:text-ink-900'
                        }`}
                    >
                        <Info className="w-4 h-4" />
                        <span>Info Kampus & Kontak</span>
                    </button>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="flex-1 bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-8">
                    
                    {/* Tab 1: Hero Banner */}
                    {activeTab === 'hero' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900 mb-1">Hero Banner Section</h3>
                                <p className="text-xs text-navy-700">Atur tajuk utama, sub-tajuk, gambar background, dan link tombol utama pada halaman depan.</p>
                            </div>
                            
                            <hr className="border-cream-300/40" />

                            <BilingualInput
                                label="Hero Eyebrow (Teks Kecil di Atas)"
                                idName="hero.eyebrow.id"
                                enName="hero.eyebrow.en"
                                idValue={data.hero.eyebrow.id}
                                enValue={data.hero.eyebrow.en}
                                onChangeId={(val) => setData('hero', { ...data.hero, eyebrow: { ...data.hero.eyebrow, id: val } })}
                                onChangeEn={(val) => setData('hero', { ...data.hero, eyebrow: { ...data.hero.eyebrow, en: val } })}
                            />

                            <BilingualInput
                                label="Hero Title (Judul Utama)"
                                idName="hero.title.id"
                                enName="hero.title.en"
                                idValue={data.hero.title.id}
                                enValue={data.hero.title.en}
                                onChangeId={(val) => setData('hero', { ...data.hero, title: { ...data.hero.title, id: val } })}
                                onChangeEn={(val) => setData('hero', { ...data.hero, title: { ...data.hero.title, en: val } })}
                                required
                            />

                            <BilingualInput
                                label="Hero Subtitle (Sub-Judul)"
                                idName="hero.subtitle.id"
                                enName="hero.subtitle.en"
                                idValue={data.hero.subtitle.id}
                                enValue={data.hero.subtitle.en}
                                type="textarea"
                                rows={3}
                                onChangeId={(val) => setData('hero', { ...data.hero, subtitle: { ...data.hero.subtitle, id: val } })}
                                onChangeEn={(val) => setData('hero', { ...data.hero, subtitle: { ...data.hero.subtitle, en: val } })}
                            />

                            <ImageUpload
                                label="Gambar Hero (Parallax Layer)"
                                existingUrl={data.hero.image}
                                onChange={(file) => setData('hero_image_file', file)}
                                onClearExisting={() => setData('hero', { ...data.hero, image: null })}
                                error={errors.hero_image_file}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-cream-300/20 p-4 rounded-xl bg-surface-50/30">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">Tombol Utama (Primary CTA)</h4>
                                    <BilingualInput
                                        label="Label Tombol"
                                        idName="hero.primary_cta.label.id"
                                        enName="hero.primary_cta.label.en"
                                        idValue={data.hero.primary_cta.label.id}
                                        enValue={data.hero.primary_cta.label.en}
                                        onChangeId={(val) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, label: { ...data.hero.primary_cta.label, id: val } } })}
                                        onChangeEn={(val) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, label: { ...data.hero.primary_cta.label, en: val } } })}
                                    />
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">URL / Link Target</label>
                                        <input
                                            type="text"
                                            value={data.hero.primary_cta.href}
                                            onChange={(e) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, href: e.target.value } })}
                                            className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none"
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">Tombol Kedua (Secondary CTA)</h4>
                                    <BilingualInput
                                        label="Label Tombol"
                                        idName="hero.secondary_cta.label.id"
                                        enName="hero.secondary_cta.label.en"
                                        idValue={data.hero.secondary_cta.label.id}
                                        enValue={data.hero.secondary_cta.label.en}
                                        onChangeId={(val) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, label: { ...data.hero.secondary_cta.label, id: val } } })}
                                        onChangeEn={(val) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, label: { ...data.hero.secondary_cta.label, en: val } } })}
                                    />
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">URL / Link Target</label>
                                        <input
                                            type="text"
                                            value={data.hero.secondary_cta.href}
                                            onChange={(e) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, href: e.target.value } })}
                                            className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none"
                                            placeholder="/profil"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Distinctiveness */}
                    {activeTab === 'distinctiveness' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900 mb-1">Keunggulan & Brand</h3>
                                <p className="text-xs text-navy-700">Informasi utama mengenai warna keilmuan khusus prodi Teknik Logistik.</p>
                            </div>

                            <hr className="border-cream-300/40" />

                            <BilingualInput
                                label="Judul Keunggulan"
                                idName="distinctiveness.heading.id"
                                enName="distinctiveness.heading.en"
                                idValue={data.distinctiveness.heading.id}
                                enValue={data.distinctiveness.heading.en}
                                onChangeId={(val) => setData('distinctiveness', { ...data.distinctiveness, heading: { ...data.distinctiveness.heading, id: val } })}
                                onChangeEn={(val) => setData('distinctiveness', { ...data.distinctiveness, heading: { ...data.distinctiveness.heading, en: val } })}
                                required
                            />

                            <BilingualInput
                                label="Deskripsi Keunggulan"
                                idName="distinctiveness.body.id"
                                enName="distinctiveness.body.en"
                                idValue={data.distinctiveness.body.id}
                                enValue={data.distinctiveness.body.en}
                                type="textarea"
                                rows={5}
                                onChangeId={(val) => setData('distinctiveness', { ...data.distinctiveness, body: { ...data.distinctiveness.body, id: val } })}
                                onChangeEn={(val) => setData('distinctiveness', { ...data.distinctiveness, body: { ...data.distinctiveness.body, en: val } })}
                                required
                            />
                        </div>
                    )}

                    {/* Tab 3: Sambutan Kaprodi */}
                    {activeTab === 'greeting' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900 mb-1">Sambutan Kaprodi</h3>
                                <p className="text-xs text-navy-700">Atur pesan sambutan hangat Kaprodi untuk ditampilkan di halaman profil.</p>
                            </div>

                            <hr className="border-cream-300/40" />

                            <BilingualInput
                                label="Isi Kutipan Sambutan (Quote)"
                                idName="greeting.quote.id"
                                enName="greeting.quote.en"
                                idValue={data.greeting.quote.id}
                                enValue={data.greeting.quote.en}
                                type="textarea"
                                rows={6}
                                onChangeId={(val) => setData('greeting', { ...data.greeting, quote: { ...data.greeting.quote, id: val } })}
                                onChangeEn={(val) => setData('greeting', { ...data.greeting, quote: { ...data.greeting.quote, en: val } })}
                                required
                            />

                            <BilingualInput
                                label="Atribusi Penulis (Jabatan)"
                                idName="greeting.attribution.id"
                                enName="greeting.attribution.en"
                                idValue={data.greeting.attribution.id}
                                enValue={data.greeting.attribution.en}
                                onChangeId={(val) => setData('greeting', { ...data.greeting, attribution: { ...data.greeting.attribution, id: val } })}
                                onChangeEn={(val) => setData('greeting', { ...data.greeting, attribution: { ...data.greeting.attribution, en: val } })}
                            />

                            <ImageUpload
                                label="Foto Kaprodi"
                                existingUrl={data.greeting.photo}
                                onChange={(file) => setData('greeting_photo_file', file)}
                                onClearExisting={() => setData('greeting', { ...data.greeting, photo: null })}
                                error={errors.greeting_photo_file}
                            />
                        </div>
                    )}

                    {/* Tab 4: Info Kampus & Kontak */}
                    {activeTab === 'meta' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900 mb-1">Info Kampus & Kontak</h3>
                                <p className="text-xs text-navy-700">Konfigurasi metadata prodi, sosial media, informasi kontak, dan file PDF kurikulum.</p>
                            </div>

                            <hr className="border-cream-300/40" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Nama Situs / Prodi</label>
                                    <input
                                        type="text"
                                        value={data.site_meta.name}
                                        onChange={(e) => setData('site_meta', { ...data.site_meta, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="Teknik Logistik"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Alamat Kampus</label>
                                    <input
                                        type="text"
                                        value={data.site_meta.address}
                                        onChange={(e) => setData('site_meta', { ...data.site_meta, address: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="Fakultas Rekayasa Industri"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Email Kontak</label>
                                    <input
                                        type="email"
                                        value={data.contact.email}
                                        onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="hello@proditl.ac.id"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Telepon Kontak</label>
                                    <input
                                        type="text"
                                        value={data.contact.phone}
                                        onChange={(e) => setData('contact', { ...data.contact, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="+62 8123 4567 89"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Instagram</label>
                                    <input
                                        type="text"
                                        value={data.socials.instagram}
                                        onChange={(e) => setData('socials', { ...data.socials, instagram: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">LINE Official Account</label>
                                    <input
                                        type="text"
                                        value={data.socials.line}
                                        onChange={(e) => setData('socials', { ...data.socials, line: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="https://line.me/ti/p/~line_id"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">TikTok</label>
                                    <input
                                        type="text"
                                        value={data.socials.tiktok}
                                        onChange={(e) => setData('socials', { ...data.socials, tiktok: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                        placeholder="https://tiktok.com/@username"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-cream-300/20 bg-surface-50/20">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Total Kredit (SKS)</label>
                                    <input
                                        type="number"
                                        value={data.curriculum_summary.total_sks}
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, total_sks: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Durasi Studi (Semester)</label>
                                    <input
                                        type="number"
                                        value={data.curriculum_summary.semesters}
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, semesters: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-1 focus:ring-brand-700 outline-none text-sm bg-surface-0"
                                    />
                                </div>
                            </div>

                            {/* Curriculum PDF File Upload */}
                            <div className="space-y-2 border border-cream-300/40 p-4 rounded-xl bg-surface-0 shadow-sm">
                                <label className="text-sm font-semibold text-ink-900 flex items-center">
                                    <FileUp className="w-4 h-4 mr-2 text-brand-700" />
                                    <span>File PDF Kurikulum (Downloadable)</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        onChange={(e) => setData('curriculum_pdf_file', e.target.files?.[0] || null)}
                                        accept=".pdf"
                                        className="text-xs text-navy-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-cream-300 file:text-xs file:font-semibold file:bg-surface-50 hover:file:bg-cream-300/10 cursor-pointer"
                                    />
                                    {data.curriculum_summary.pdf_url && (
                                        <a 
                                            href={data.curriculum_summary.pdf_url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-xs text-brand-700 hover:text-brand-800 font-semibold underline"
                                        >
                                            Download PDF Saat Ini
                                        </a>
                                    )}
                                </div>
                                {errors.curriculum_pdf_file && (
                                    <p className="text-xs text-red-600 font-medium">{errors.curriculum_pdf_file}</p>
                                )}
                            </div>

                            <ImageUpload
                                label="Lencana Akreditasi (BAN-PT)"
                                existingUrl={data.site_meta.accreditation_badge}
                                onChange={(file) => setData('accreditation_badge_file', file)}
                                onClearExisting={() => setData('site_meta', { ...data.site_meta, accreditation_badge: null })}
                                error={errors.accreditation_badge_file}
                            />
                        </div>
                    )}

                    {/* Submit Bar */}
                    <div className="pt-4 border-t border-cream-300/40 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-xl transition-all duration-200 text-sm font-semibold shadow-md shadow-brand-700/10 cursor-pointer disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
