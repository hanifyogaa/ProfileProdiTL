import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, useForm } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    FileUp,
    Globe,
    Info,
    Layout,
    Link2,
    Monitor,
    Plus,
    Save,
    ShieldCheck,
    Smile,
    Trash2,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';

type Tab = 'hero' | 'greeting' | 'distinctiveness' | 'profil' | 'curriculum' | 'embed' | 'meta';

interface Testimonial {
    name: string;
    company: string;
    year: string;
    quote_id: string;
    quote_en: string;
}

interface SettingsProps {
    settings: Record<string, any>;
}

export default function Edit({ settings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('hero');

    const cs = settings.curriculum_summary ?? {};
    const initTestimonials: Testimonial[] = cs.testimonials ?? [];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',

        // Hero
        hero: {
            eyebrow:       { id: settings.hero?.eyebrow?.id ?? '', en: settings.hero?.eyebrow?.en ?? '' },
            title:         { id: settings.hero?.title?.id ?? '', en: settings.hero?.title?.en ?? '' },
            subtitle:      { id: settings.hero?.subtitle?.id ?? '', en: settings.hero?.subtitle?.en ?? '' },
            image:         settings.hero?.image ?? null,
            primary_cta:   {
                label: { id: settings.hero?.primary_cta?.label?.id ?? '', en: settings.hero?.primary_cta?.label?.en ?? '' },
                href: settings.hero?.primary_cta?.href ?? '',
            },
            secondary_cta: {
                label: { id: settings.hero?.secondary_cta?.label?.id ?? '', en: settings.hero?.secondary_cta?.label?.en ?? '' },
                href: settings.hero?.secondary_cta?.href ?? '',
            },
        },
        hero_image_file: null as File | null,

        // Distinctiveness
        distinctiveness: {
            heading:   { id: settings.distinctiveness?.heading?.id ?? '', en: settings.distinctiveness?.heading?.en ?? '' },
            body:      { id: settings.distinctiveness?.body?.id    ?? '', en: settings.distinctiveness?.body?.en    ?? '' },
            link_href: settings.distinctiveness?.link_href ?? '/profil',
            points:   (settings.distinctiveness?.points ?? [{ title: { id: '', en: '' }, description: { id: '', en: '' } }]) as { title: { id: string; en: string }; description: { id: string; en: string } }[],
        },

        // Greeting
        greeting: {
            name:        settings.greeting?.name        ?? '',
            link_href:   settings.greeting?.link_href   ?? '/profil',
            quote:       { id: settings.greeting?.quote?.id ?? '', en: settings.greeting?.quote?.en ?? '' },
            attribution: { id: settings.greeting?.attribution?.id ?? '', en: settings.greeting?.attribution?.en ?? '' },
            photo:       settings.greeting?.photo ?? null,
            full_message: { id: settings.greeting?.full_message?.id ?? '', en: settings.greeting?.full_message?.en ?? '' },
        },
        greeting_photo_file: null as File | null,

        // Curriculum
        curriculum_summary: {
            total_sks:          cs.total_sks ?? 145,
            semesters:          cs.semesters ?? 8,
            pdf_url:            cs.pdf_url ?? null,
            prerequisite_image: cs.prerequisite_image ?? null,
            peo_url:            cs.peo_url ?? '',
            plo_url:            cs.plo_url ?? '',
            testimonials:       initTestimonials,
            description:        { id: cs.description?.id ?? '', en: cs.description?.en ?? '' },
        },
        curriculum_pdf_file:         null as File | null,
        prerequisite_image_file:     null as File | null,

        // Profil Prodi
        about_content: {
            visi:    { id: settings.about_content?.visi?.id    ?? '', en: settings.about_content?.visi?.en    ?? '' },
            history: { id: settings.about_content?.history?.id ?? '', en: settings.about_content?.history?.en ?? '' },
            misi: (settings.about_content?.misi ?? [{ id: '', en: '' }]) as { id: string; en: string }[],
        },
        prodi_stats: {
            mahasiswa:   settings.prodi_stats?.mahasiswa   ?? 0,
            dosen:       settings.prodi_stats?.dosen       ?? 0,
            alumni:      settings.prodi_stats?.alumni      ?? 0,
            stat_date:   settings.prodi_stats?.stat_date   ?? '',
            iabee_desc:  { id: settings.prodi_stats?.iabee_desc?.id  ?? '', en: settings.prodi_stats?.iabee_desc?.en  ?? '' },
            iabee_number:settings.prodi_stats?.iabee_number ?? '',
            iabee_badge:  settings.prodi_stats?.iabee_badge   ?? null,
            unggul_desc: { id: settings.prodi_stats?.unggul_desc?.id ?? '', en: settings.prodi_stats?.unggul_desc?.en ?? '' },
            unggul_sk:   settings.prodi_stats?.unggul_sk    ?? '',
            unggul_badge: settings.prodi_stats?.unggul_badge ?? null,
        },
        iabee_badge_file:   null as File | null,
        unggul_badge_file:  null as File | null,

        // Embed page URLs
        embed_urls: {
            kalender_akademik: settings.embed_urls?.kalender_akademik ?? 'https://bis.telkomuniversity.ac.id/kalender-akademik-telkomuniversity/',
            pedoman_akademik:  settings.embed_urls?.pedoman_akademik  ?? 'https://bis.telkomuniversity.ac.id/pedoman-akademik-telkom-university/',
            kode_etik:         settings.embed_urls?.kode_etik         ?? 'https://bis.telkomuniversity.ac.id/kode-etik-telkom-university/',
            ijazah_transkrip:  settings.embed_urls?.ijazah_transkrip  ?? 'https://basila.telkomuniversity.ac.id/basilav2/',
            tugas_akhir:       settings.embed_urls?.tugas_akhir       ?? 'https://ta1.virtualfri.id/',
            registrasi_mk:     settings.embed_urls?.registrasi_mk     ?? 'https://sirama.telkomuniversity.ac.id/',
            campus_tour:       settings.embed_urls?.campus_tour       ?? 'https://360.telkomuniversity.ac.id/',
        },

        // Site meta
        site_meta: {
            name:                settings.site_meta?.name ?? '',
            address:             settings.site_meta?.address ?? '',
            accreditation_badge: settings.site_meta?.accreditation_badge ?? null,
        },
        accreditation_badge_file: null as File | null,

        socials: {
            instagram: settings.socials?.instagram ?? '',
            line:      settings.socials?.line ?? '',
            tiktok:    settings.socials?.tiktok ?? '',
        },

        contact: {
            email: settings.contact?.email ?? '',
            phone: settings.contact?.phone ?? '',
        },
    });

    // --- Testimonial helpers ---
    const addTestimonial = () => {
        const blank: Testimonial = { name: '', company: '', year: '', quote_id: '', quote_en: '' };
        setData('curriculum_summary', {
            ...data.curriculum_summary,
            testimonials: [...data.curriculum_summary.testimonials, blank],
        });
    };
    const removeTestimonial = (i: number) => {
        const next = data.curriculum_summary.testimonials.filter((_, idx) => idx !== i);
        setData('curriculum_summary', { ...data.curriculum_summary, testimonials: next });
    };
    const updateTestimonial = (i: number, field: keyof Testimonial, val: string) => {
        const next = data.curriculum_summary.testimonials.map((t, idx) =>
            idx === i ? { ...t, [field]: val } : t
        );
        setData('curriculum_summary', { ...data.curriculum_summary, testimonials: next });
    };

    // --- Misi helpers ---
    const addMisi = () => {
        setData('about_content', {
            ...data.about_content,
            misi: [...data.about_content.misi, { id: '', en: '' }],
        });
    };
    const removeMisi = (i: number) => {
        setData('about_content', {
            ...data.about_content,
            misi: data.about_content.misi.filter((_, idx) => idx !== i),
        });
    };
    const updateMisi = (i: number, lang: 'id' | 'en', val: string) => {
        const next = data.about_content.misi.map((m, idx) =>
            idx === i ? { ...m, [lang]: val } : m
        );
        setData('about_content', { ...data.about_content, misi: next });
    };

    // --- Distinctiveness points helpers ---
    const addPoint = () => {
        setData('distinctiveness', {
            ...data.distinctiveness,
            points: [...data.distinctiveness.points, { title: { id: '', en: '' }, description: { id: '', en: '' } }],
        });
    };
    const removePoint = (i: number) => {
        setData('distinctiveness', {
            ...data.distinctiveness,
            points: data.distinctiveness.points.filter((_, idx) => idx !== i),
        });
    };
    const updatePoint = (i: number, field: 'title' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.distinctiveness.points.map((p, idx) =>
            idx === i ? { ...p, [field]: { ...p[field], [lang]: val } } : p
        );
        setData('distinctiveness', { ...data.distinctiveness, points: next });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), { forceFormData: true });
    };

    const TAB_ITEMS: { key: Tab; label: string; icon: React.ElementType }[] = [
        { key: 'hero',            label: 'Hero Banner',      icon: Layout },
        { key: 'distinctiveness', label: 'Keunggulan',       icon: Link2 },
        { key: 'greeting',        label: 'Sambutan Kaprodi', icon: Smile },
        { key: 'profil',          label: 'Profil Prodi',     icon: ShieldCheck },
        { key: 'curriculum',      label: 'Kurikulum',        icon: BookOpen },
        { key: 'embed',           label: 'Link Portal',      icon: Monitor },
        { key: 'meta',            label: 'Info & Kontak',    icon: Info },
    ];

    const inputCls = 'w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20';

    return (
        <AdminLayout title="Pengaturan Website">
            <Head title="Pengaturan Website" />

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Sidebar tabs */}
                <div className="h-fit w-full shrink-0 space-y-1 rounded-2xl border border-cream-300/40 bg-surface-0 p-4 shadow-sm lg:w-56">
                    {TAB_ITEMS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActiveTab(key)}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                                activeTab === key
                                    ? 'bg-amber-500 text-ink-900 shadow-sm'
                                    : 'text-navy-700 hover:bg-surface-50 hover:text-ink-900'
                            }`}
                        >
                            <Icon className="size-4 shrink-0" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 space-y-8 rounded-2xl border border-cream-300/40 bg-surface-0 p-6 shadow-sm md:p-8">

                    {/* ── Tab: Hero ── */}
                    {activeTab === 'hero' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Hero Banner Section</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Atur tajuk utama, sub-tajuk, gambar background, dan link tombol utama.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <BilingualInput label="Eyebrow (Teks Kecil di Atas)"
                                idName="hero.eyebrow.id" enName="hero.eyebrow.en"
                                idValue={data.hero.eyebrow.id} enValue={data.hero.eyebrow.en}
                                onChangeId={(v) => setData('hero', { ...data.hero, eyebrow: { ...data.hero.eyebrow, id: v } })}
                                onChangeEn={(v) => setData('hero', { ...data.hero, eyebrow: { ...data.hero.eyebrow, en: v } })}
                            />
                            <BilingualInput label="Judul Utama (H1)" required
                                idName="hero.title.id" enName="hero.title.en"
                                idValue={data.hero.title.id} enValue={data.hero.title.en}
                                onChangeId={(v) => setData('hero', { ...data.hero, title: { ...data.hero.title, id: v } })}
                                onChangeEn={(v) => setData('hero', { ...data.hero, title: { ...data.hero.title, en: v } })}
                            />
                            <BilingualInput label="Sub-Judul" type="textarea" rows={3}
                                idName="hero.subtitle.id" enName="hero.subtitle.en"
                                idValue={data.hero.subtitle.id} enValue={data.hero.subtitle.en}
                                onChangeId={(v) => setData('hero', { ...data.hero, subtitle: { ...data.hero.subtitle, id: v } })}
                                onChangeEn={(v) => setData('hero', { ...data.hero, subtitle: { ...data.hero.subtitle, en: v } })}
                            />
                            <ImageUpload label="Gambar Hero (Parallax Layer)"
                                existingUrl={data.hero.image}
                                onChange={(f) => setData('hero_image_file', f)}
                                onClearExisting={() => setData('hero', { ...data.hero, image: null })}
                                error={errors.hero_image_file}
                            />
                            <div className="grid grid-cols-1 gap-4 rounded-xl border border-cream-300/20 bg-surface-50/30 p-4 md:grid-cols-2">
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">Tombol Utama (Primary CTA)</h4>
                                    <BilingualInput label="Label"
                                        idName="hero.primary_cta.label.id" enName="hero.primary_cta.label.en"
                                        idValue={data.hero.primary_cta.label.id} enValue={data.hero.primary_cta.label.en}
                                        onChangeId={(v) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, label: { ...data.hero.primary_cta.label, id: v } } })}
                                        onChangeEn={(v) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, label: { ...data.hero.primary_cta.label, en: v } } })}
                                    />
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">URL</label>
                                        <input type="text" value={data.hero.primary_cta.href} className={inputCls} placeholder="https://smb.telkomuniversity.ac.id/"
                                            onChange={(e) => setData('hero', { ...data.hero, primary_cta: { ...data.hero.primary_cta, href: e.target.value } })} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">Tombol Kedua (Secondary CTA)</h4>
                                    <BilingualInput label="Label"
                                        idName="hero.secondary_cta.label.id" enName="hero.secondary_cta.label.en"
                                        idValue={data.hero.secondary_cta.label.id} enValue={data.hero.secondary_cta.label.en}
                                        onChangeId={(v) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, label: { ...data.hero.secondary_cta.label, id: v } } })}
                                        onChangeEn={(v) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, label: { ...data.hero.secondary_cta.label, en: v } } })}
                                    />
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">URL</label>
                                        <input type="text" value={data.hero.secondary_cta.href} className={inputCls} placeholder="/profil"
                                            onChange={(e) => setData('hero', { ...data.hero, secondary_cta: { ...data.hero.secondary_cta, href: e.target.value } })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Distinctiveness ── */}
                    {activeTab === 'distinctiveness' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Keunggulan & Brand</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Informasi warna keilmuan khusus Prodi Teknik Logistik yang ditampilkan di beranda.</p>
                            </div>
                            <hr className="border-cream-300/40" />
                            <BilingualInput label="Judul Keunggulan" required
                                idName="distinctiveness.heading.id" enName="distinctiveness.heading.en"
                                idValue={data.distinctiveness.heading.id} enValue={data.distinctiveness.heading.en}
                                onChangeId={(v) => setData('distinctiveness', { ...data.distinctiveness, heading: { ...data.distinctiveness.heading, id: v } })}
                                onChangeEn={(v) => setData('distinctiveness', { ...data.distinctiveness, heading: { ...data.distinctiveness.heading, en: v } })}
                            />
                            <BilingualInput label="Deskripsi" type="textarea" rows={5} required
                                idName="distinctiveness.body.id" enName="distinctiveness.body.en"
                                idValue={data.distinctiveness.body.id} enValue={data.distinctiveness.body.en}
                                onChangeId={(v) => setData('distinctiveness', { ...data.distinctiveness, body: { ...data.distinctiveness.body, id: v } })}
                                onChangeEn={(v) => setData('distinctiveness', { ...data.distinctiveness, body: { ...data.distinctiveness.body, en: v } })}
                            />
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-navy-700">Link Tombol "Selengkapnya"</label>
                                <input type="text" value={data.distinctiveness.link_href} className={inputCls} placeholder="/profil"
                                    onChange={(e) => setData('distinctiveness', { ...data.distinctiveness, link_href: e.target.value })} />
                            </div>
                            <hr className="border-cream-300/40" />
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Poin Keunggulan</h4>
                                    <button type="button" onClick={addPoint}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Poin
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.distinctiveness.points.map((p, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Poin {i + 1}</span>
                                                <button type="button" onClick={() => removePoint(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul (ID)</label>
                                                        <input type="text" value={p.title.id} className={inputCls} placeholder="Judul poin..."
                                                            onChange={(e) => updatePoint(i, 'title', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul (EN)</label>
                                                        <input type="text" value={p.title.en} className={inputCls} placeholder="Point title..."
                                                            onChange={(e) => updatePoint(i, 'title', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                        <textarea rows={2} value={p.description.id} className={`${inputCls} resize-none`} placeholder="Deskripsi singkat..."
                                                            onChange={(e) => updatePoint(i, 'description', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                        <textarea rows={2} value={p.description.en} className={`${inputCls} resize-none`} placeholder="Short description..."
                                                            onChange={(e) => updatePoint(i, 'description', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.distinctiveness.points.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada poin. Klik "Tambah Poin" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Greeting ── */}
                    {activeTab === 'greeting' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Sambutan Kaprodi</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Pesan sambutan Kaprodi yang ditampilkan di halaman beranda dan profil.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-navy-700">Nama Kaprodi</label>
                                    <input
                                        type="text"
                                        value={data.greeting.name}
                                        className={inputCls}
                                        placeholder="Dr. Ir. Muhammad Akbar, S.T., M.T."
                                        onChange={(e) => setData('greeting', { ...data.greeting, name: e.target.value })}
                                    />
                                    <p className="text-xs text-navy-700/60">Nama lengkap Kaprodi beserta gelar.</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-navy-700">Link "Baca Selengkapnya"</label>
                                    <input
                                        type="text"
                                        value={data.greeting.link_href}
                                        className={inputCls}
                                        placeholder="/profil"
                                        onChange={(e) => setData('greeting', { ...data.greeting, link_href: e.target.value })}
                                    />
                                    <p className="text-xs text-navy-700/60">URL tujuan tombol di kartu sambutan, mis. <code>/profil</code></p>
                                </div>
                            </div>

                            <BilingualInput label="Isi Kutipan (Quote)" type="textarea" rows={6} required
                                idName="greeting.quote.id" enName="greeting.quote.en"
                                idValue={data.greeting.quote.id} enValue={data.greeting.quote.en}
                                onChangeId={(v) => setData('greeting', { ...data.greeting, quote: { ...data.greeting.quote, id: v } })}
                                onChangeEn={(v) => setData('greeting', { ...data.greeting, quote: { ...data.greeting.quote, en: v } })}
                            />
                            <BilingualInput label="Sambutan Lengkap (Full Message)" type="textarea" rows={12}
                                idName="greeting.full_message.id" enName="greeting.full_message.en"
                                idValue={data.greeting.full_message.id} enValue={data.greeting.full_message.en}
                                onChangeId={(v) => setData('greeting', { ...data.greeting, full_message: { ...data.greeting.full_message, id: v } })}
                                onChangeEn={(v) => setData('greeting', { ...data.greeting, full_message: { ...data.greeting.full_message, en: v } })}
                            />
                            <BilingualInput label="Atribusi Penulis (Jabatan / Posisi)"
                                idName="greeting.attribution.id" enName="greeting.attribution.en"
                                idValue={data.greeting.attribution.id} enValue={data.greeting.attribution.en}
                                onChangeId={(v) => setData('greeting', { ...data.greeting, attribution: { ...data.greeting.attribution, id: v } })}
                                onChangeEn={(v) => setData('greeting', { ...data.greeting, attribution: { ...data.greeting.attribution, en: v } })}
                            />
                            <ImageUpload label="Foto Kaprodi"
                                existingUrl={data.greeting.photo}
                                onChange={(f) => setData('greeting_photo_file', f)}
                                onClearExisting={() => setData('greeting', { ...data.greeting, photo: null })}
                                error={errors.greeting_photo_file}
                            />
                        </div>
                    )}

                    {/* ── Tab: Profil Prodi ── */}
                    {activeTab === 'profil' && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Profil Program Studi</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Visi, misi, sejarah, statistik prodi, dan informasi akreditasi yang ditampilkan di halaman /profil.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            {/* ── Visi ── */}
                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
                                    <ShieldCheck className="size-4 text-brand-700" />
                                    Visi Program Studi
                                </h4>
                                <BilingualInput
                                    label="Teks Visi"
                                    idName="about_content.visi.id" enName="about_content.visi.en"
                                    idValue={data.about_content.visi.id} enValue={data.about_content.visi.en}
                                    type="textarea" rows={3}
                                    onChangeId={(v) => setData('about_content', { ...data.about_content, visi: { ...data.about_content.visi, id: v } })}
                                    onChangeEn={(v) => setData('about_content', { ...data.about_content, visi: { ...data.about_content.visi, en: v } })}
                                />
                            </div>

                            {/* ── Misi ── */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                                        <Award className="size-4 text-brand-700" />
                                        Misi Program Studi
                                    </h4>
                                    <button type="button" onClick={addMisi}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Misi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.about_content.misi.map((m, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Misi {i + 1}</span>
                                                <button type="button" onClick={() => removeMisi(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Indonesia</label>
                                                    <textarea rows={2} value={m.id} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateMisi(i, 'id', e.target.value)}
                                                        placeholder="Teks misi dalam bahasa Indonesia..." />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">English</label>
                                                    <textarea rows={2} value={m.en} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateMisi(i, 'en', e.target.value)}
                                                        placeholder="Mission statement in English..." />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.about_content.misi.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada misi. Klik "Tambah Misi" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ── Sejarah ── */}
                            <div>
                                <h4 className="mb-4 text-sm font-bold text-ink-900">Sejarah & Legalitas</h4>
                                <BilingualInput
                                    label="Teks Sejarah"
                                    idName="about_content.history.id" enName="about_content.history.en"
                                    idValue={data.about_content.history.id} enValue={data.about_content.history.en}
                                    type="textarea" rows={5}
                                    onChangeId={(v) => setData('about_content', { ...data.about_content, history: { ...data.about_content.history, id: v } })}
                                    onChangeEn={(v) => setData('about_content', { ...data.about_content, history: { ...data.about_content.history, en: v } })}
                                />
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* ── Statistik Prodi ── */}
                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
                                    <Users className="size-4 text-brand-700" />
                                    Statistik Prodi (Angka-dalam-Angka)
                                </h4>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-ink-900">Mahasiswa Aktif</label>
                                        <input type="number" value={data.prodi_stats.mahasiswa} className={inputCls} min={0}
                                            onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, mahasiswa: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-ink-900">Dosen Tetap</label>
                                        <input type="number" value={data.prodi_stats.dosen} className={inputCls} min={0}
                                            onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, dosen: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-ink-900">Alumni</label>
                                        <input type="number" value={data.prodi_stats.alumni} className={inputCls} min={0}
                                            onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, alumni: parseInt(e.target.value) || 0 })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-ink-900">Per Tanggal</label>
                                        <input type="text" value={data.prodi_stats.stat_date} className={inputCls}
                                            placeholder="1 Desember 2024"
                                            onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, stat_date: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* ── Akreditasi IABEE ── */}
                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
                                    <Award className="size-4 text-amber-600" />
                                    Akreditasi IABEE
                                </h4>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-ink-900">Nomor SK / Sertifikat IABEE</label>
                                        <input type="text" value={data.prodi_stats.iabee_number} className={inputCls}
                                            placeholder="No. 000260.A"
                                            onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, iabee_number: e.target.value })} />
                                    </div>
                                    <div className="space-y-1 sm:col-span-1" />
                                </div>
                                <div className="mt-4">
                                    <BilingualInput
                                        label="Deskripsi Akreditasi IABEE"
                                        idName="prodi_stats.iabee_desc.id" enName="prodi_stats.iabee_desc.en"
                                        idValue={data.prodi_stats.iabee_desc.id} enValue={data.prodi_stats.iabee_desc.en}
                                        type="textarea" rows={4}
                                        onChangeId={(v) => setData('prodi_stats', { ...data.prodi_stats, iabee_desc: { ...data.prodi_stats.iabee_desc, id: v } })}
                                        onChangeEn={(v) => setData('prodi_stats', { ...data.prodi_stats, iabee_desc: { ...data.prodi_stats.iabee_desc, en: v } })}
                                    />
                                </div>
                                <div className="mt-4">
                                    <ImageUpload
                                        label="Logo / Badge IABEE"
                                        existingUrl={data.prodi_stats.iabee_badge}
                                        onChange={(f) => setData('iabee_badge_file', f)}
                                        onClearExisting={() => setData('prodi_stats', { ...data.prodi_stats, iabee_badge: null })}
                                        error={errors.iabee_badge_file}
                                    />
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* ── Akreditasi BAN-PT ── */}
                            <div>
                                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
                                    <ShieldCheck className="size-4 text-brand-700" />
                                    Akreditasi BAN-PT
                                </h4>
                                <div className="mb-4 space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Nomor SK Akreditasi</label>
                                    <input type="text" value={data.prodi_stats.unggul_sk} className={inputCls}
                                        placeholder="10735/SK/BAN-PT/Akred/S/IX/2021"
                                        onChange={(e) => setData('prodi_stats', { ...data.prodi_stats, unggul_sk: e.target.value })} />
                                </div>
                                <BilingualInput
                                    label="Deskripsi Akreditasi BAN-PT"
                                    idName="prodi_stats.unggul_desc.id" enName="prodi_stats.unggul_desc.en"
                                    idValue={data.prodi_stats.unggul_desc.id} enValue={data.prodi_stats.unggul_desc.en}
                                    type="textarea" rows={4}
                                    onChangeId={(v) => setData('prodi_stats', { ...data.prodi_stats, unggul_desc: { ...data.prodi_stats.unggul_desc, id: v } })}
                                    onChangeEn={(v) => setData('prodi_stats', { ...data.prodi_stats, unggul_desc: { ...data.prodi_stats.unggul_desc, en: v } })}
                                />
                                <div className="mt-4">
                                    <ImageUpload
                                        label="Logo / Badge Akreditasi BAN-PT"
                                        existingUrl={data.prodi_stats.unggul_badge}
                                        onChange={(f) => setData('unggul_badge_file', f)}
                                        onClearExisting={() => setData('prodi_stats', { ...data.prodi_stats, unggul_badge: null })}
                                        error={errors.unggul_badge_file}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Kurikulum ── */}
                    {activeTab === 'curriculum' && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Kurikulum</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Konfigurasi halaman kurikulum: ringkasan, prasyarat MK, PEO/PLO, dan testimoni alumni.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            {/* Summary numbers */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Total SKS</label>
                                    <input type="number" value={data.curriculum_summary.total_sks} className={inputCls}
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, total_sks: parseInt(e.target.value) || 0 })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Durasi Studi (Semester)</label>
                                    <input type="number" value={data.curriculum_summary.semesters} className={inputCls}
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, semesters: parseInt(e.target.value) || 0 })} />
                                </div>
                            </div>

                            {/* Description */}
                            <BilingualInput label="Deskripsi Profil Lulusan"
                                idName="curriculum_summary.description.id" enName="curriculum_summary.description.en"
                                idValue={data.curriculum_summary.description.id} enValue={data.curriculum_summary.description.en}
                                type="textarea" rows={4}
                                onChangeId={(v) => setData('curriculum_summary', { ...data.curriculum_summary, description: { ...data.curriculum_summary.description, id: v } })}
                                onChangeEn={(v) => setData('curriculum_summary', { ...data.curriculum_summary, description: { ...data.curriculum_summary.description, en: v } })}
                            />

                            {/* PDF Kurikulum */}
                            <div className="rounded-xl border border-cream-300/40 bg-surface-0 p-4 shadow-sm">
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-900">
                                    <FileUp className="size-4 text-brand-700" />
                                    File PDF Buku Kurikulum (Downloadable)
                                </label>
                                <div className="flex flex-wrap items-center gap-4">
                                    <input type="file" accept=".pdf"
                                        onChange={(e) => setData('curriculum_pdf_file', e.target.files?.[0] ?? null)}
                                        className="text-xs text-navy-700 file:mr-4 file:cursor-pointer file:rounded-xl file:border file:border-cream-300 file:bg-surface-50 file:px-4 file:py-2 file:text-xs file:font-semibold hover:file:bg-cream-300/10"
                                    />
                                    {data.curriculum_summary.pdf_url && (
                                        <a href={data.curriculum_summary.pdf_url} target="_blank" rel="noreferrer"
                                            className="text-xs font-semibold text-brand-700 underline hover:text-brand-800">
                                            Download PDF saat ini
                                        </a>
                                    )}
                                </div>
                                {errors.curriculum_pdf_file && <p className="mt-1 text-xs font-medium text-red-600">{errors.curriculum_pdf_file}</p>}
                            </div>

                            {/* Prerequisite image */}
                            <div>
                                <h4 className="mb-3 text-sm font-bold text-ink-900">Gambar Prasyarat Mata Kuliah</h4>
                                <p className="mb-3 text-xs text-navy-700">Diagram/bagan prasyarat antar mata kuliah yang ditampilkan di section Prasyarat MK halaman Kurikulum.</p>
                                <ImageUpload label="Upload Gambar Prasyarat MK"
                                    existingUrl={data.curriculum_summary.prerequisite_image}
                                    onChange={(f) => setData('prerequisite_image_file', f)}
                                    onClearExisting={() => setData('curriculum_summary', { ...data.curriculum_summary, prerequisite_image: null })}
                                    error={errors.prerequisite_image_file}
                                />
                            </div>

                            {/* PEO / PLO URLs */}
                            <div className="grid grid-cols-1 gap-4 rounded-xl border border-cream-300/20 bg-surface-50/30 p-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                                        <Globe className="size-3.5 text-brand-700" />
                                        URL Dokumen PEO
                                    </label>
                                    <input type="url" value={data.curriculum_summary.peo_url} className={inputCls}
                                        placeholder="https://... atau /storage/peo.pdf"
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, peo_url: e.target.value })}
                                    />
                                    <p className="text-[10px] text-navy-700/50">Link tombol PEO di halaman Kurikulum. Bisa URL eksternal atau path file PDF.</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                                        <Globe className="size-3.5 text-brand-700" />
                                        URL Dokumen PLO
                                    </label>
                                    <input type="url" value={data.curriculum_summary.plo_url} className={inputCls}
                                        placeholder="https://... atau /storage/plo.pdf"
                                        onChange={(e) => setData('curriculum_summary', { ...data.curriculum_summary, plo_url: e.target.value })}
                                    />
                                    <p className="text-[10px] text-navy-700/50">Link tombol PLO di halaman Kurikulum.</p>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-ink-900">Testimoni Alumni (Profil Lulusan)</h4>
                                        <p className="mt-0.5 text-xs text-navy-700">Kutipan dari alumni yang ditampilkan di bawah deskripsi Profil Lulusan.</p>
                                    </div>
                                    <button type="button" onClick={addTestimonial}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah
                                    </button>
                                </div>

                                {data.curriculum_summary.testimonials.length === 0 && (
                                    <p className="rounded-xl border border-dashed border-cream-300 py-8 text-center text-xs text-navy-700/40">
                                        Belum ada testimoni. Klik "Tambah" untuk menambahkan.
                                    </p>
                                )}

                                <div className="space-y-4">
                                    {data.curriculum_summary.testimonials.map((t, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Testimoni #{i + 1}</span>
                                                <button type="button" onClick={() => removeTestimonial(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Nama Alumni</label>
                                                    <input value={t.name} className={inputCls}
                                                        onChange={(e) => updateTestimonial(i, 'name', e.target.value)}
                                                        placeholder="Budi Santoso" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Perusahaan / Instansi</label>
                                                    <input value={t.company} className={inputCls}
                                                        onChange={(e) => updateTestimonial(i, 'company', e.target.value)}
                                                        placeholder="PT. Logistik Nusantara" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Tahun Lulus</label>
                                                    <input value={t.year} className={inputCls}
                                                        onChange={(e) => updateTestimonial(i, 'year', e.target.value)}
                                                        placeholder="2022" />
                                                </div>
                                            </div>
                                            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Kutipan (Indonesia)</label>
                                                    <textarea rows={3} value={t.quote_id} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateTestimonial(i, 'quote_id', e.target.value)}
                                                        placeholder="Ilmu yang saya dapat sangat aplikatif..." />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Kutipan (English)</label>
                                                    <textarea rows={3} value={t.quote_en} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateTestimonial(i, 'quote_en', e.target.value)}
                                                        placeholder="The knowledge I gained was highly applicable..." />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Embed / Link Portal ── */}
                    {activeTab === 'embed' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Link Portal & Layanan Akademik</h3>
                                <p className="mt-0.5 text-xs text-navy-700">URL yang digunakan pada halaman embed dan link navigasi di dropdown Akademik.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            {[
                                { key: 'kalender_akademik', label: 'Kalender Akademik', hint: 'Ditampilkan via iframe di /akademik/kalender-akademik' },
                                { key: 'pedoman_akademik',  label: 'Pedoman Akademik',  hint: 'Ditampilkan via iframe di /akademik/pedoman-akademik' },
                                { key: 'kode_etik',         label: 'Kode Etik',         hint: 'Ditampilkan via iframe di /akademik/kode-etik' },
                                { key: 'ijazah_transkrip',  label: 'Ijazah & Transkrip (Basila)', hint: 'Link eksternal langsung (buka tab baru)' },
                                { key: 'tugas_akhir',       label: 'Sistem Tugas Akhir (TA1)', hint: 'Link eksternal langsung (buka tab baru)' },
                                { key: 'registrasi_mk',     label: 'Registrasi MK (Sirama)', hint: 'Link eksternal langsung (buka tab baru)' },
                                { key: 'campus_tour',       label: 'Tur Kampus 360°', hint: 'Link eksternal di dropdown Tentang' },
                            ].map(({ key, label, hint }) => (
                                <div key={key} className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">{label}</label>
                                    <input
                                        type="url"
                                        value={(data.embed_urls as any)[key]}
                                        className={inputCls}
                                        placeholder="https://"
                                        onChange={(e) => setData('embed_urls', { ...data.embed_urls, [key]: e.target.value })}
                                    />
                                    <p className="text-[10px] text-navy-700/50">{hint}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Tab: Info & Kontak ── */}
                    {activeTab === 'meta' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Info Kampus & Kontak</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Metadata prodi, sosial media, kontak, dan lencana akreditasi.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Nama Situs / Prodi</label>
                                    <input type="text" value={data.site_meta.name} className={inputCls} placeholder="Teknik Logistik"
                                        onChange={(e) => setData('site_meta', { ...data.site_meta, name: e.target.value })} required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Alamat Kampus</label>
                                    <input type="text" value={data.site_meta.address} className={inputCls} placeholder="Fakultas Rekayasa Industri"
                                        onChange={(e) => setData('site_meta', { ...data.site_meta, address: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Email Kontak</label>
                                    <input type="email" value={data.contact.email} className={inputCls} placeholder="hello@proditl.ac.id"
                                        onChange={(e) => setData('contact', { ...data.contact, email: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-ink-900">Telepon Kontak</label>
                                    <input type="text" value={data.contact.phone} className={inputCls} placeholder="+62 8123 4567 89"
                                        onChange={(e) => setData('contact', { ...data.contact, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {(['instagram', 'line', 'tiktok'] as const).map((s) => (
                                    <div key={s} className="space-y-1">
                                        <label className="text-sm font-semibold capitalize text-ink-900">{s === 'line' ? 'LINE Official' : s}</label>
                                        <input type="text" value={data.socials[s]} className={inputCls}
                                            placeholder={`https://${s}.com/@username`}
                                            onChange={(e) => setData('socials', { ...data.socials, [s]: e.target.value })} />
                                    </div>
                                ))}
                            </div>

                            <ImageUpload label="Lencana Akreditasi (BAN-PT)"
                                existingUrl={data.site_meta.accreditation_badge}
                                onChange={(f) => setData('accreditation_badge_file', f)}
                                onClearExisting={() => setData('site_meta', { ...data.site_meta, accreditation_badge: null })}
                                error={errors.accreditation_badge_file}
                            />
                        </div>
                    )}

                    {/* Submit bar */}
                    <div className="flex justify-end border-t border-cream-300/40 pt-4">
                        <button type="submit" disabled={processing}
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-surface-0 shadow-md transition-colors hover:bg-brand-800 disabled:opacity-50">
                            <Save className="size-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
