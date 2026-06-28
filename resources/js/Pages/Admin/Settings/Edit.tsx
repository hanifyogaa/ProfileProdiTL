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

type Tab = 'hero' | 'greeting' | 'distinctiveness' | 'profil' | 'curriculum' | 'embed' | 'meta' | 'student_org' | 'prospects' | 'accreditation' | 'org_structure' | 'tracer' | 'mbkm';

interface Testimonial {
    name: string;
    company: string;
    year: string;
    quote_id: string;
    quote_en: string;
}

interface DivisionForm {
    name: string;
    description: { id: string; en: string };
}

interface DiscaLeadershipForm {
    name: string;
    role: { id: string; en: string };
    description: { id: string; en: string };
    photo: string | null;
}

interface DiscaDepartmentForm {
    abbr: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
}

interface DiscaCommissionForm {
    name: { id: string; en: string };
    description: { id: string; en: string };
}

interface DiscaActivityForm {
    label: { id: string; en: string };
    title: { id: string; en: string };
    description: { id: string; en: string };
    photos: string[];
}

interface DiscaLogoMeaningForm {
    title: { id: string; en: string };
    description: { id: string; en: string };
}

interface DiscaStatForm {
    value: string;
    label: { id: string; en: string };
}

interface ProspectTrackForm {
    title_id: string;
    title_en: string;
    description_id: string;
    description_en: string;
}

interface AccreditationDecreeForm {
    title: { id: string; en: string };
    number: string;
    date: string;
    grade: string;
    description: { id: string; en: string };
}

interface OrgMemberForm {
    name: string;
    role: { id: string; en: string };
    email: string;
}

interface TracerSeriesForm {
    year: number;
    employment_rate: number;
}

interface MbkmSchemeForm {
    title_id: string;
    title_en: string;
    desc_id: string;
    desc_en: string;
    sks: string;
}

interface SettingsProps {
    settings: Record<string, any>;
}

export default function Edit({ settings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('hero');

    // Dynamic per-item photo files (leadership photos: keyed by member index;
    // activity photos: keyed by "activityIndex_photoIndex"), merged into the
    // submission via transform() since useForm's typed shape can't hold a
    // variable number of array-item file slots.
    const [discaLeadershipPhotoFiles, setDiscaLeadershipPhotoFiles] = useState<Record<number, File>>({});
    const [discaActivityPhotoFiles, setDiscaActivityPhotoFiles] = useState<Record<string, File>>({});

    const cs = settings.curriculum_summary ?? {};
    const initTestimonials: Testimonial[] = cs.testimonials ?? [];

    const { data, setData, post, processing, errors, transform } = useForm({
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
            hero_image:         cs.hero_image ?? null,
        },
        curriculum_pdf_file:         null as File | null,
        prerequisite_image_file:     null as File | null,
        curriculum_hero_image_file: null as File | null,

        // Profil Prodi
        about_content: {
            visi:    { id: settings.about_content?.visi?.id    ?? '', en: settings.about_content?.visi?.en    ?? '' },
            history: { id: settings.about_content?.history?.id ?? '', en: settings.about_content?.history?.en ?? '' },
            misi: (settings.about_content?.misi ?? [{ id: '', en: '' }]) as { id: string; en: string }[],
            hero_image: settings.about_content?.hero_image ?? null,
        },
        about_hero_image_file: null as File | null,
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
            hero_image:          settings.site_meta?.hero_image ?? null,
        },
        accreditation_badge_file: null as File | null,
        contact_hero_image_file: null as File | null,

        socials: {
            instagram: settings.socials?.instagram ?? '',
            line:      settings.socials?.line ?? '',
            tiktok:    settings.socials?.tiktok ?? '',
        },

        contact: {
            email: settings.contact?.email ?? '',
            phone: settings.contact?.phone ?? '',
        },

        // Kemahasiswaan / HIMA
        student_association: {
            name:        settings.student_association?.name ?? '',
            description: { id: settings.student_association?.description?.id ?? '', en: settings.student_association?.description?.en ?? '' },
            vision:      { id: settings.student_association?.vision?.id ?? '', en: settings.student_association?.vision?.en ?? '' },
            instagram:   settings.student_association?.instagram ?? '',
            divisions:  (settings.student_association?.divisions ?? []) as DivisionForm[],
            founded_date:  settings.student_association?.founded_date ?? '',
            faculty_label: settings.student_association?.faculty_label ?? '',
            history:    { id: settings.student_association?.history?.id ?? '', en: settings.student_association?.history?.en ?? '' },
            missions:   (settings.student_association?.missions ?? []) as { id: string; en: string }[],
            logo_image: settings.student_association?.logo_image ?? null,
            logo_meanings: (settings.student_association?.logo_meanings ?? []) as DiscaLogoMeaningForm[],
            leadership: (settings.student_association?.leadership ?? []) as DiscaLeadershipForm[],
            departments: (settings.student_association?.departments ?? []) as DiscaDepartmentForm[],
            dpm: {
                description: { id: settings.student_association?.dpm?.description?.id ?? '', en: settings.student_association?.dpm?.description?.en ?? '' },
                commissions: (settings.student_association?.dpm?.commissions ?? []) as DiscaCommissionForm[],
            },
            activities: (settings.student_association?.activities ?? []) as DiscaActivityForm[],
            stats: (settings.student_association?.stats ?? []) as DiscaStatForm[],
        },
        disca_logo_image_file: null as File | null,

        // Prospek Karier (homepage)
        prospects: {
            heading: { id: settings.prospects?.heading?.id ?? '', en: settings.prospects?.heading?.en ?? '' },
            tracks: (settings.prospects?.tracks ?? []) as ProspectTrackForm[],
        },

        // Akreditasi
        accreditation: {
            body_name:   settings.accreditation?.body_name ?? '',
            status:      { id: settings.accreditation?.status?.id ?? '', en: settings.accreditation?.status?.en ?? '' },
            description: { id: settings.accreditation?.description?.id ?? '', en: settings.accreditation?.description?.en ?? '' },
            decrees:    (settings.accreditation?.decrees ?? []) as AccreditationDecreeForm[],
        },

        // Struktur Organisasi
        org_structure: {
            description: { id: settings.org_structure?.description?.id ?? '', en: settings.org_structure?.description?.en ?? '' },
            chart_image: settings.org_structure?.chart_image ?? null,
            members:    (settings.org_structure?.members ?? []) as OrgMemberForm[],
        },
        org_chart_image_file: null as File | null,

        // Statistik & Tracer Study
        tracer_stats: {
            caption:    { id: settings.tracer_stats?.caption?.id ?? '', en: settings.tracer_stats?.caption?.en ?? '' },
            series:    (settings.tracer_stats?.series ?? []) as TracerSeriesForm[],
            hero_image: settings.tracer_stats?.hero_image ?? null,
        },
        statistics_hero_image_file: null as File | null,

        // MBKM
        mbkm_content: {
            hero_image: settings.mbkm_content?.hero_image ?? null,
            schemes: ((settings.mbkm_content?.schemes ?? []) as any[]).map((s) => ({
                title_id: s.title_id ?? s.title?.id ?? '',
                title_en: s.title_en ?? s.title?.en ?? '',
                desc_id:  s.desc_id  ?? s.desc?.id  ?? '',
                desc_en:  s.desc_en  ?? s.desc?.en  ?? '',
                sks: s.sks ?? '',
            })) as MbkmSchemeForm[],
        },
        mbkm_hero_image_file: null as File | null,
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

    // --- Division (HIMA) helpers ---
    const addDivision = () => {
        setData('student_association', {
            ...data.student_association,
            divisions: [...data.student_association.divisions, { name: '', description: { id: '', en: '' } }],
        });
    };
    const removeDivision = (i: number) => {
        setData('student_association', {
            ...data.student_association,
            divisions: data.student_association.divisions.filter((_, idx) => idx !== i),
        });
    };
    const updateDivisionName = (i: number, val: string) => {
        const next = data.student_association.divisions.map((d, idx) =>
            idx === i ? { ...d, name: val } : d
        );
        setData('student_association', { ...data.student_association, divisions: next });
    };
    const updateDivisionDescription = (i: number, lang: 'id' | 'en', val: string) => {
        const next = data.student_association.divisions.map((d, idx) =>
            idx === i ? { ...d, description: { ...d.description, [lang]: val } } : d
        );
        setData('student_association', { ...data.student_association, divisions: next });
    };

    // --- DISCA: mission helpers ---
    const addMission = () => {
        setData('student_association', { ...data.student_association, missions: [...data.student_association.missions, { id: '', en: '' }] });
    };
    const removeMission = (i: number) => {
        setData('student_association', { ...data.student_association, missions: data.student_association.missions.filter((_, idx) => idx !== i) });
    };
    const updateMission = (i: number, lang: 'id' | 'en', val: string) => {
        const next = data.student_association.missions.map((m, idx) => idx === i ? { ...m, [lang]: val } : m);
        setData('student_association', { ...data.student_association, missions: next });
    };

    // --- DISCA: logo meaning helpers ---
    const addLogoMeaning = () => {
        setData('student_association', {
            ...data.student_association,
            logo_meanings: [...data.student_association.logo_meanings, { title: { id: '', en: '' }, description: { id: '', en: '' } }],
        });
    };
    const removeLogoMeaning = (i: number) => {
        setData('student_association', { ...data.student_association, logo_meanings: data.student_association.logo_meanings.filter((_, idx) => idx !== i) });
    };
    const updateLogoMeaning = (i: number, field: 'title' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.student_association.logo_meanings.map((m, idx) =>
            idx === i ? { ...m, [field]: { ...m[field], [lang]: val } } : m
        );
        setData('student_association', { ...data.student_association, logo_meanings: next });
    };

    // --- DISCA: leadership helpers ---
    const addLeader = () => {
        setData('student_association', {
            ...data.student_association,
            leadership: [...data.student_association.leadership, { name: '', role: { id: '', en: '' }, description: { id: '', en: '' }, photo: null }],
        });
    };
    const removeLeader = (i: number) => {
        setData('student_association', { ...data.student_association, leadership: data.student_association.leadership.filter((_, idx) => idx !== i) });
        setDiscaLeadershipPhotoFiles((prev) => {
            const next = { ...prev };
            delete next[i];
            return next;
        });
    };
    const updateLeaderField = (i: number, field: 'name', val: string) => {
        const next = data.student_association.leadership.map((m, idx) => idx === i ? { ...m, [field]: val } : m);
        setData('student_association', { ...data.student_association, leadership: next });
    };
    const updateLeaderBilingual = (i: number, field: 'role' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.student_association.leadership.map((m, idx) =>
            idx === i ? { ...m, [field]: { ...m[field], [lang]: val } } : m
        );
        setData('student_association', { ...data.student_association, leadership: next });
    };
    const updateLeaderPhoto = (i: number, file: File | null) => {
        if (file) {
            setDiscaLeadershipPhotoFiles((prev) => ({ ...prev, [i]: file }));
        }
    };
    const clearLeaderExistingPhoto = (i: number) => {
        const next = data.student_association.leadership.map((m, idx) => idx === i ? { ...m, photo: null } : m);
        setData('student_association', { ...data.student_association, leadership: next });
    };

    // --- DISCA: department helpers ---
    const addDepartment = () => {
        setData('student_association', {
            ...data.student_association,
            departments: [...data.student_association.departments, { abbr: '', name: { id: '', en: '' }, description: { id: '', en: '' } }],
        });
    };
    const removeDepartment = (i: number) => {
        setData('student_association', { ...data.student_association, departments: data.student_association.departments.filter((_, idx) => idx !== i) });
    };
    const updateDepartmentAbbr = (i: number, val: string) => {
        const next = data.student_association.departments.map((d, idx) => idx === i ? { ...d, abbr: val } : d);
        setData('student_association', { ...data.student_association, departments: next });
    };
    const updateDepartmentBilingual = (i: number, field: 'name' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.student_association.departments.map((d, idx) =>
            idx === i ? { ...d, [field]: { ...d[field], [lang]: val } } : d
        );
        setData('student_association', { ...data.student_association, departments: next });
    };

    // --- DISCA: DPM commission helpers ---
    const addCommission = () => {
        setData('student_association', {
            ...data.student_association,
            dpm: { ...data.student_association.dpm, commissions: [...data.student_association.dpm.commissions, { name: { id: '', en: '' }, description: { id: '', en: '' } }] },
        });
    };
    const removeCommission = (i: number) => {
        setData('student_association', {
            ...data.student_association,
            dpm: { ...data.student_association.dpm, commissions: data.student_association.dpm.commissions.filter((_, idx) => idx !== i) },
        });
    };
    const updateCommission = (i: number, field: 'name' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.student_association.dpm.commissions.map((c, idx) =>
            idx === i ? { ...c, [field]: { ...c[field], [lang]: val } } : c
        );
        setData('student_association', { ...data.student_association, dpm: { ...data.student_association.dpm, commissions: next } });
    };
    const updateDpmDescription = (lang: 'id' | 'en', val: string) => {
        setData('student_association', {
            ...data.student_association,
            dpm: { ...data.student_association.dpm, description: { ...data.student_association.dpm.description, [lang]: val } },
        });
    };

    // --- DISCA: activity documentation helpers ---
    const addActivity = () => {
        setData('student_association', {
            ...data.student_association,
            activities: [...data.student_association.activities, { label: { id: '', en: '' }, title: { id: '', en: '' }, description: { id: '', en: '' }, photos: [] }],
        });
    };
    const removeActivity = (i: number) => {
        setData('student_association', { ...data.student_association, activities: data.student_association.activities.filter((_, idx) => idx !== i) });
        setDiscaActivityPhotoFiles((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((key) => { if (key.startsWith(`${i}_`)) delete next[key]; });
            return next;
        });
    };
    const updateActivityBilingual = (i: number, field: 'label' | 'title' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.student_association.activities.map((a, idx) =>
            idx === i ? { ...a, [field]: { ...a[field], [lang]: val } } : a
        );
        setData('student_association', { ...data.student_association, activities: next });
    };
    const addActivityPhotoSlot = (i: number, file: File) => {
        const activity = data.student_association.activities[i];
        const slotIndex = activity.photos.length;
        setDiscaActivityPhotoFiles((prev) => ({ ...prev, [`${i}_${slotIndex}`]: file }));
        const next = data.student_association.activities.map((a, idx) =>
            idx === i ? { ...a, photos: [...a.photos, ''] } : a
        );
        setData('student_association', { ...data.student_association, activities: next });
    };
    const removeActivityPhoto = (i: number, photoIdx: number) => {
        const next = data.student_association.activities.map((a, idx) =>
            idx === i ? { ...a, photos: a.photos.filter((_, pIdx) => pIdx !== photoIdx) } : a
        );
        setData('student_association', { ...data.student_association, activities: next });
        setDiscaActivityPhotoFiles((prev) => {
            const next2 = { ...prev };
            delete next2[`${i}_${photoIdx}`];
            return next2;
        });
    };

    // --- DISCA: footer stat helpers ---
    const addDiscaStat = () => {
        setData('student_association', { ...data.student_association, stats: [...data.student_association.stats, { value: '', label: { id: '', en: '' } }] });
    };
    const removeDiscaStat = (i: number) => {
        setData('student_association', { ...data.student_association, stats: data.student_association.stats.filter((_, idx) => idx !== i) });
    };
    const updateDiscaStat = (i: number, field: 'value', val: string) => {
        const next = data.student_association.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
        setData('student_association', { ...data.student_association, stats: next });
    };
    const updateDiscaStatLabel = (i: number, lang: 'id' | 'en', val: string) => {
        const next = data.student_association.stats.map((s, idx) => idx === i ? { ...s, label: { ...s.label, [lang]: val } } : s);
        setData('student_association', { ...data.student_association, stats: next });
    };

    // --- Career prospect track helpers ---
    const addTrack = () => {
        setData('prospects', {
            ...data.prospects,
            tracks: [...data.prospects.tracks, { title_id: '', title_en: '', description_id: '', description_en: '' }],
        });
    };
    const removeTrack = (i: number) => {
        setData('prospects', { ...data.prospects, tracks: data.prospects.tracks.filter((_, idx) => idx !== i) });
    };
    const updateTrack = (i: number, field: keyof ProspectTrackForm, val: string) => {
        const next = data.prospects.tracks.map((t, idx) => idx === i ? { ...t, [field]: val } : t);
        setData('prospects', { ...data.prospects, tracks: next });
    };

    // --- Accreditation decree helpers ---
    const addDecree = () => {
        setData('accreditation', {
            ...data.accreditation,
            decrees: [...data.accreditation.decrees, { title: { id: '', en: '' }, number: '', date: '', grade: '', description: { id: '', en: '' } }],
        });
    };
    const removeDecree = (i: number) => {
        setData('accreditation', { ...data.accreditation, decrees: data.accreditation.decrees.filter((_, idx) => idx !== i) });
    };
    const updateDecreeField = (i: number, field: 'number' | 'date' | 'grade', val: string) => {
        const next = data.accreditation.decrees.map((d, idx) => idx === i ? { ...d, [field]: val } : d);
        setData('accreditation', { ...data.accreditation, decrees: next });
    };
    const updateDecreeBilingual = (i: number, field: 'title' | 'description', lang: 'id' | 'en', val: string) => {
        const next = data.accreditation.decrees.map((d, idx) =>
            idx === i ? { ...d, [field]: { ...d[field], [lang]: val } } : d
        );
        setData('accreditation', { ...data.accreditation, decrees: next });
    };

    // --- Org structure member helpers ---
    const addMember = () => {
        setData('org_structure', {
            ...data.org_structure,
            members: [...data.org_structure.members, { name: '', role: { id: '', en: '' }, email: '' }],
        });
    };
    const removeMember = (i: number) => {
        setData('org_structure', { ...data.org_structure, members: data.org_structure.members.filter((_, idx) => idx !== i) });
    };
    const updateMemberField = (i: number, field: 'name' | 'email', val: string) => {
        const next = data.org_structure.members.map((m, idx) => idx === i ? { ...m, [field]: val } : m);
        setData('org_structure', { ...data.org_structure, members: next });
    };
    const updateMemberRole = (i: number, lang: 'id' | 'en', val: string) => {
        const next = data.org_structure.members.map((m, idx) =>
            idx === i ? { ...m, role: { ...m.role, [lang]: val } } : m
        );
        setData('org_structure', { ...data.org_structure, members: next });
    };

    // --- Tracer study series helpers ---
    const addSeriesPoint = () => {
        setData('tracer_stats', {
            ...data.tracer_stats,
            series: [...data.tracer_stats.series, { year: new Date().getFullYear(), employment_rate: 0 }],
        });
    };
    const removeSeriesPoint = (i: number) => {
        setData('tracer_stats', { ...data.tracer_stats, series: data.tracer_stats.series.filter((_, idx) => idx !== i) });
    };
    const updateSeriesPoint = (i: number, field: keyof TracerSeriesForm, val: number) => {
        const next = data.tracer_stats.series.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
        setData('tracer_stats', { ...data.tracer_stats, series: next });
    };

    // --- MBKM scheme helpers ---
    const addScheme = () => {
        setData('mbkm_content', {
            ...data.mbkm_content,
            schemes: [...data.mbkm_content.schemes, { title_id: '', title_en: '', desc_id: '', desc_en: '', sks: '' }],
        });
    };
    const removeScheme = (i: number) => {
        setData('mbkm_content', { ...data.mbkm_content, schemes: data.mbkm_content.schemes.filter((_, idx) => idx !== i) });
    };
    const updateScheme = (i: number, field: keyof MbkmSchemeForm, val: string) => {
        const next = data.mbkm_content.schemes.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
        setData('mbkm_content', { ...data.mbkm_content, schemes: next });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        transform((formData) => {
            const extra: Record<string, File> = {};
            Object.entries(discaLeadershipPhotoFiles).forEach(([i, file]) => {
                extra[`disca_leadership_photo_${i}`] = file;
            });
            Object.entries(discaActivityPhotoFiles).forEach(([key, file]) => {
                extra[`disca_activity_photo_${key}`] = file;
            });
            return { ...formData, ...extra };
        });
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
        { key: 'student_org',     label: 'Kemahasiswaan',    icon: Users },
        { key: 'prospects',       label: 'Prospek Karier',   icon: Award },
        { key: 'accreditation',   label: 'Akreditasi',       icon: ShieldCheck },
        { key: 'org_structure',   label: 'Struktur Organisasi', icon: Users },
        { key: 'tracer',          label: 'Statistik & Tracer Study', icon: BookOpen },
        { key: 'mbkm',            label: 'MBKM', icon: Globe },
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

                            <ImageUpload label="Gambar Hero Halaman Profil"
                                existingUrl={data.about_content.hero_image}
                                onChange={(f) => setData('about_hero_image_file', f)}
                                onClearExisting={() => setData('about_content', { ...data.about_content, hero_image: null })}
                                error={errors.about_hero_image_file}
                            />

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

                            <ImageUpload label="Gambar Hero Halaman Kurikulum"
                                existingUrl={data.curriculum_summary.hero_image}
                                onChange={(f) => setData('curriculum_hero_image_file', f)}
                                onClearExisting={() => setData('curriculum_summary', { ...data.curriculum_summary, hero_image: null })}
                                error={errors.curriculum_hero_image_file}
                            />

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

                            <ImageUpload label="Gambar Hero Halaman Kontak"
                                existingUrl={data.site_meta.hero_image}
                                onChange={(f) => setData('contact_hero_image_file', f)}
                                onClearExisting={() => setData('site_meta', { ...data.site_meta, hero_image: null })}
                                error={errors.contact_hero_image_file}
                            />

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

                    {/* ── Tab: Kemahasiswaan ── */}
                    {activeTab === 'student_org' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Kemahasiswaan & HIMA</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Konten halaman /kemahasiswaan: profil organisasi, visi, dan daftar divisi.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-navy-700">Nama Organisasi</label>
                                    <input type="text" value={data.student_association.name} className={inputCls}
                                        placeholder="HIMA Teknik Logistik"
                                        onChange={(e) => setData('student_association', { ...data.student_association, name: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-navy-700">Instagram (tanpa @ atau lengkap)</label>
                                    <input type="text" value={data.student_association.instagram} className={inputCls}
                                        placeholder="hima.teklog"
                                        onChange={(e) => setData('student_association', { ...data.student_association, instagram: e.target.value })} />
                                </div>
                            </div>

                            <BilingualInput label="Deskripsi Organisasi" type="textarea" rows={4}
                                idName="student_association.description.id" enName="student_association.description.en"
                                idValue={data.student_association.description.id} enValue={data.student_association.description.en}
                                onChangeId={(v) => setData('student_association', { ...data.student_association, description: { ...data.student_association.description, id: v } })}
                                onChangeEn={(v) => setData('student_association', { ...data.student_association, description: { ...data.student_association.description, en: v } })}
                            />

                            <BilingualInput label="Visi Organisasi" type="textarea" rows={3}
                                idName="student_association.vision.id" enName="student_association.vision.en"
                                idValue={data.student_association.vision.id} enValue={data.student_association.vision.en}
                                onChangeId={(v) => setData('student_association', { ...data.student_association, vision: { ...data.student_association.vision, id: v } })}
                                onChangeEn={(v) => setData('student_association', { ...data.student_association, vision: { ...data.student_association.vision, en: v } })}
                            />

                            <hr className="border-cream-300/40" />

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Divisi & Bidang Kerja</h4>
                                    <button type="button" onClick={addDivision}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Divisi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.divisions.map((d, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Divisi {i + 1}</span>
                                                <button type="button" onClick={() => removeDivision(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Nama Divisi</label>
                                                    <input type="text" value={d.name} className={inputCls} placeholder="Divisi Akademik"
                                                        onChange={(e) => updateDivisionName(i, e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                        <textarea rows={2} value={d.description.id} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateDivisionDescription(i, 'id', e.target.value)}
                                                            placeholder="Tugas dan fokus divisi..." />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                        <textarea rows={2} value={d.description.en} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateDivisionDescription(i, 'en', e.target.value)}
                                                            placeholder="Division focus and duties..." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.divisions.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada divisi. Klik "Tambah Divisi" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Hero chips */}
                            <div>
                                <h4 className="mb-3 text-sm font-bold text-ink-900">Info Hero (chip di bawah deskripsi)</h4>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">Tanggal Berdiri</label>
                                        <input type="text" value={data.student_association.founded_date} className={inputCls}
                                            placeholder="6 April 2023"
                                            onChange={(e) => setData('student_association', { ...data.student_association, founded_date: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-navy-700">Label Fakultas</label>
                                        <input type="text" value={data.student_association.faculty_label} className={inputCls}
                                            placeholder="FRI · Universitas Telkom"
                                            onChange={(e) => setData('student_association', { ...data.student_association, faculty_label: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* History */}
                            <BilingualInput label="Sejarah / Asal Mula" type="textarea" rows={4}
                                idName="student_association.history.id" enName="student_association.history.en"
                                idValue={data.student_association.history.id} enValue={data.student_association.history.en}
                                onChangeId={(v) => setData('student_association', { ...data.student_association, history: { ...data.student_association.history, id: v } })}
                                onChangeEn={(v) => setData('student_association', { ...data.student_association, history: { ...data.student_association.history, en: v } })}
                            />

                            <hr className="border-cream-300/40" />

                            {/* Missions */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Misi</h4>
                                    <button type="button" onClick={addMission}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Misi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.missions.map((m, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Misi {i + 1}</span>
                                                <button type="button" onClick={() => removeMission(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <textarea rows={2} value={m.id} className={`${inputCls} resize-none`}
                                                    onChange={(e) => updateMission(i, 'id', e.target.value)} placeholder="Misi (ID)" />
                                                <textarea rows={2} value={m.en} className={`${inputCls} resize-none`}
                                                    onChange={(e) => updateMission(i, 'en', e.target.value)} placeholder="Mission (EN)" />
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.missions.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada misi. Klik "Tambah Misi" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Logo + meanings */}
                            <div>
                                <h4 className="mb-3 text-sm font-bold text-ink-900">Logo & Makna Logo</h4>
                                <ImageUpload label="Logo DISCA / HIMA"
                                    existingUrl={data.student_association.logo_image}
                                    onChange={(f) => setData('disca_logo_image_file', f)}
                                    onClearExisting={() => setData('student_association', { ...data.student_association, logo_image: null })}
                                    error={errors.disca_logo_image_file}
                                />
                                <div className="mt-4 mb-3 flex items-center justify-between">
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-700">Makna Elemen Logo</h5>
                                    <button type="button" onClick={addLogoMeaning}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Makna
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.logo_meanings.map((m, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Elemen {i + 1}</span>
                                                <button type="button" onClick={() => removeLogoMeaning(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <input type="text" value={m.title.id} className={inputCls} placeholder="Judul (ID), misal: Warna Coklat"
                                                        onChange={(e) => updateLogoMeaning(i, 'title', 'id', e.target.value)} />
                                                    <input type="text" value={m.title.en} className={inputCls} placeholder="Title (EN)"
                                                        onChange={(e) => updateLogoMeaning(i, 'title', 'en', e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <textarea rows={2} value={m.description.id} className={`${inputCls} resize-none`} placeholder="Makna (ID)"
                                                        onChange={(e) => updateLogoMeaning(i, 'description', 'id', e.target.value)} />
                                                    <textarea rows={2} value={m.description.en} className={`${inputCls} resize-none`} placeholder="Meaning (EN)"
                                                        onChange={(e) => updateLogoMeaning(i, 'description', 'en', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.logo_meanings.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada makna logo. Klik "Tambah Makna" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Leadership */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Struktur Kepengurusan Inti (BPH)</h4>
                                    <button type="button" onClick={addLeader}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Pengurus
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.leadership.map((m, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Pengurus {i + 1}</span>
                                                <button type="button" onClick={() => removeLeader(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <ImageUpload label="Foto"
                                                    existingUrl={m.photo}
                                                    onChange={(f) => updateLeaderPhoto(i, f)}
                                                    onClearExisting={() => clearLeaderExistingPhoto(i)}
                                                    helpText="Format JPG, PNG, atau WebP. Maksimal 2MB."
                                                />
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Nama</label>
                                                        <input type="text" value={m.name} className={inputCls} placeholder="Nama lengkap"
                                                            onChange={(e) => updateLeaderField(i, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Jabatan (ID)</label>
                                                        <input type="text" value={m.role.id} className={inputCls} placeholder="Ketua Umum"
                                                            onChange={(e) => updateLeaderBilingual(i, 'role', 'id', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Jabatan (EN)</label>
                                                    <input type="text" value={m.role.en} className={inputCls} placeholder="General Chairperson"
                                                        onChange={(e) => updateLeaderBilingual(i, 'role', 'en', e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                        <textarea rows={2} value={m.description.id} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateLeaderBilingual(i, 'description', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                        <textarea rows={2} value={m.description.en} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateLeaderBilingual(i, 'description', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.leadership.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada pengurus. Klik "Tambah Pengurus" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Departments */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Departemen & Biro</h4>
                                    <button type="button" onClick={addDepartment}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Departemen
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.departments.map((dpt, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Departemen {i + 1}</span>
                                                <button type="button" onClick={() => removeDepartment(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Singkatan</label>
                                                        <input type="text" value={dpt.abbr} className={inputCls} placeholder="KADERISASI"
                                                            onChange={(e) => updateDepartmentAbbr(i, e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Nama (ID)</label>
                                                        <input type="text" value={dpt.name.id} className={inputCls} placeholder="Departemen Kaderisasi"
                                                            onChange={(e) => updateDepartmentBilingual(i, 'name', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Nama (EN)</label>
                                                        <input type="text" value={dpt.name.en} className={inputCls} placeholder="Cadre Development Department"
                                                            onChange={(e) => updateDepartmentBilingual(i, 'name', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <textarea rows={2} value={dpt.description.id} className={`${inputCls} resize-none`} placeholder="Deskripsi (ID)"
                                                        onChange={(e) => updateDepartmentBilingual(i, 'description', 'id', e.target.value)} />
                                                    <textarea rows={2} value={dpt.description.en} className={`${inputCls} resize-none`} placeholder="Description (EN)"
                                                        onChange={(e) => updateDepartmentBilingual(i, 'description', 'en', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.departments.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada departemen. Klik "Tambah Departemen" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* DPM */}
                            <div>
                                <h4 className="mb-3 text-sm font-bold text-ink-900">Dewan Perwakilan Mahasiswa (DPM)</h4>
                                <BilingualInput label="Deskripsi DPM" type="textarea" rows={3}
                                    idName="student_association.dpm.description.id" enName="student_association.dpm.description.en"
                                    idValue={data.student_association.dpm.description.id} enValue={data.student_association.dpm.description.en}
                                    onChangeId={(v) => updateDpmDescription('id', v)}
                                    onChangeEn={(v) => updateDpmDescription('en', v)}
                                />
                                <div className="mt-4 mb-3 flex items-center justify-between">
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-brand-700">Komisi DPM</h5>
                                    <button type="button" onClick={addCommission}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Komisi
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.dpm.commissions.map((c, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Komisi {i + 1}</span>
                                                <button type="button" onClick={() => removeCommission(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <input type="text" value={c.name.id} className={inputCls} placeholder="Nama Komisi (ID)"
                                                        onChange={(e) => updateCommission(i, 'name', 'id', e.target.value)} />
                                                    <input type="text" value={c.name.en} className={inputCls} placeholder="Commission Name (EN)"
                                                        onChange={(e) => updateCommission(i, 'name', 'en', e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <textarea rows={2} value={c.description.id} className={`${inputCls} resize-none`} placeholder="Deskripsi (ID)"
                                                        onChange={(e) => updateCommission(i, 'description', 'id', e.target.value)} />
                                                    <textarea rows={2} value={c.description.en} className={`${inputCls} resize-none`} placeholder="Description (EN)"
                                                        onChange={(e) => updateCommission(i, 'description', 'en', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.dpm.commissions.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada komisi. Klik "Tambah Komisi" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Activities */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Dokumentasi Kegiatan</h4>
                                    <button type="button" onClick={addActivity}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Kegiatan
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.activities.map((act, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Kegiatan {i + 1}</span>
                                                <button type="button" onClick={() => removeActivity(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <input type="text" value={act.label.id} className={inputCls} placeholder="Label kategori (ID), misal: Kolaborasi Organisasi"
                                                        onChange={(e) => updateActivityBilingual(i, 'label', 'id', e.target.value)} />
                                                    <input type="text" value={act.label.en} className={inputCls} placeholder="Category label (EN)"
                                                        onChange={(e) => updateActivityBilingual(i, 'label', 'en', e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <input type="text" value={act.title.id} className={inputCls} placeholder="Judul Kegiatan (ID)"
                                                        onChange={(e) => updateActivityBilingual(i, 'title', 'id', e.target.value)} />
                                                    <input type="text" value={act.title.en} className={inputCls} placeholder="Activity Title (EN)"
                                                        onChange={(e) => updateActivityBilingual(i, 'title', 'en', e.target.value)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <textarea rows={3} value={act.description.id} className={`${inputCls} resize-none`} placeholder="Deskripsi (ID)"
                                                        onChange={(e) => updateActivityBilingual(i, 'description', 'id', e.target.value)} />
                                                    <textarea rows={3} value={act.description.en} className={`${inputCls} resize-none`} placeholder="Description (EN)"
                                                        onChange={(e) => updateActivityBilingual(i, 'description', 'en', e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-navy-700">Foto Dokumentasi</label>
                                                    <div className="flex flex-wrap gap-3">
                                                        {act.photos.map((p, pIdx) => (
                                                            <div key={pIdx} className="relative h-20 w-20 overflow-hidden rounded-xl border border-cream-300/60 bg-surface-50">
                                                                {p ? <img src={p} alt="" className="h-full w-full object-cover" /> : (
                                                                    <div className="flex h-full w-full items-center justify-center text-[10px] text-navy-700/50">Baru</div>
                                                                )}
                                                                <button type="button" onClick={() => removeActivityPhoto(i, pIdx)}
                                                                    className="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700">
                                                                    <Trash2 className="size-2.5" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-cream-300 text-navy-700 hover:border-brand-700 hover:text-brand-700">
                                                            <Plus className="size-4" />
                                                            <span className="mt-1 text-[10px] font-semibold">Foto</span>
                                                            <input type="file" accept="image/*" className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) addActivityPhotoSlot(i, file);
                                                                    e.target.value = '';
                                                                }} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.activities.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada kegiatan. Klik "Tambah Kegiatan" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="border-cream-300/40" />

                            {/* Footer stats */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Statistik Ringkas (footer halaman)</h4>
                                    <button type="button" onClick={addDiscaStat}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Statistik
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.student_association.stats.map((s, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Statistik {i + 1}</span>
                                                <button type="button" onClick={() => removeDiscaStat(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                <input type="text" value={s.value} className={inputCls} placeholder="Nilai, misal: 200+"
                                                    onChange={(e) => updateDiscaStat(i, 'value', e.target.value)} />
                                                <input type="text" value={s.label.id} className={inputCls} placeholder="Label (ID)"
                                                    onChange={(e) => updateDiscaStatLabel(i, 'id', e.target.value)} />
                                                <input type="text" value={s.label.en} className={inputCls} placeholder="Label (EN)"
                                                    onChange={(e) => updateDiscaStatLabel(i, 'en', e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                    {data.student_association.stats.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada statistik. Klik "Tambah Statistik" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Prospek Karier ── */}
                    {activeTab === 'prospects' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Prospek Karier</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Daftar jalur karir lulusan yang ditampilkan di bagian "Profil Kelulusan & Karir" pada homepage.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-sm font-bold text-ink-900">Jalur Karier</h4>
                                <button type="button" onClick={addTrack}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                    <Plus className="size-3.5" /> Tambah Jalur Karier
                                </button>
                            </div>
                            <div className="space-y-3">
                                {data.prospects.tracks.map((t, i) => (
                                    <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Jalur {i + 1}</span>
                                            <button type="button" onClick={() => removeTrack(i)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                <Trash2 className="size-2.5" /> Hapus
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Judul (ID)</label>
                                                    <input type="text" value={t.title_id} className={inputCls} placeholder="Logistics Analyst"
                                                        onChange={(e) => updateTrack(i, 'title_id', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Judul (EN)</label>
                                                    <input type="text" value={t.title_en} className={inputCls} placeholder="Logistics Analyst"
                                                        onChange={(e) => updateTrack(i, 'title_en', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                    <textarea rows={2} value={t.description_id} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateTrack(i, 'description_id', e.target.value)}
                                                        placeholder="Deskripsi singkat jalur karier..." />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                    <textarea rows={2} value={t.description_en} className={`${inputCls} resize-none`}
                                                        onChange={(e) => updateTrack(i, 'description_en', e.target.value)}
                                                        placeholder="Short career path description..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {data.prospects.tracks.length === 0 && (
                                    <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                        Belum ada jalur karier. Klik "Tambah Jalur Karier" untuk menambahkan.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Akreditasi ── */}
                    {activeTab === 'accreditation' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Akreditasi</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Informasi lembaga akreditasi dan daftar SK/keputusan yang ditampilkan di halaman /profil/akreditasi. Badge BAN-PT &amp; IABEE diatur di tab "Profil Prodi".</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-navy-700">Nama Lembaga Akreditasi</label>
                                <input type="text" value={data.accreditation.body_name} className={inputCls}
                                    placeholder="BAN-PT / LAM Teknik"
                                    onChange={(e) => setData('accreditation', { ...data.accreditation, body_name: e.target.value })} />
                            </div>

                            <BilingualInput label="Status Akreditasi"
                                idName="accreditation.status.id" enName="accreditation.status.en"
                                idValue={data.accreditation.status.id} enValue={data.accreditation.status.en}
                                onChangeId={(v) => setData('accreditation', { ...data.accreditation, status: { ...data.accreditation.status, id: v } })}
                                onChangeEn={(v) => setData('accreditation', { ...data.accreditation, status: { ...data.accreditation.status, en: v } })}
                            />

                            <BilingualInput label="Deskripsi Akreditasi" type="textarea" rows={4}
                                idName="accreditation.description.id" enName="accreditation.description.en"
                                idValue={data.accreditation.description.id} enValue={data.accreditation.description.en}
                                onChangeId={(v) => setData('accreditation', { ...data.accreditation, description: { ...data.accreditation.description, id: v } })}
                                onChangeEn={(v) => setData('accreditation', { ...data.accreditation, description: { ...data.accreditation.description, en: v } })}
                            />

                            <hr className="border-cream-300/40" />

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Daftar SK / Keputusan</h4>
                                    <button type="button" onClick={addDecree}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah SK
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.accreditation.decrees.map((d, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">SK {i + 1}</span>
                                                <button type="button" onClick={() => removeDecree(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul SK (ID)</label>
                                                        <input type="text" value={d.title.id} className={inputCls}
                                                            onChange={(e) => updateDecreeBilingual(i, 'title', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul SK (EN)</label>
                                                        <input type="text" value={d.title.en} className={inputCls}
                                                            onChange={(e) => updateDecreeBilingual(i, 'title', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Nomor SK</label>
                                                        <input type="text" value={d.number} className={inputCls} placeholder="1195/KPT/I/2018"
                                                            onChange={(e) => updateDecreeField(i, 'number', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Tanggal</label>
                                                        <input type="text" value={d.date} className={inputCls} placeholder="28/12/2018"
                                                            onChange={(e) => updateDecreeField(i, 'date', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Peringkat</label>
                                                        <input type="text" value={d.grade} className={inputCls} placeholder="B / –"
                                                            onChange={(e) => updateDecreeField(i, 'grade', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                        <textarea rows={2} value={d.description.id} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateDecreeBilingual(i, 'description', 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                        <textarea rows={2} value={d.description.en} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateDecreeBilingual(i, 'description', 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.accreditation.decrees.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada SK. Klik "Tambah SK" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Struktur Organisasi ── */}
                    {activeTab === 'org_structure' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Struktur Organisasi</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Deskripsi, bagan, dan daftar pengurus yang ditampilkan di halaman /profil/struktur-organisasi.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <BilingualInput label="Deskripsi" type="textarea" rows={4}
                                idName="org_structure.description.id" enName="org_structure.description.en"
                                idValue={data.org_structure.description.id} enValue={data.org_structure.description.en}
                                onChangeId={(v) => setData('org_structure', { ...data.org_structure, description: { ...data.org_structure.description, id: v } })}
                                onChangeEn={(v) => setData('org_structure', { ...data.org_structure, description: { ...data.org_structure.description, en: v } })}
                            />

                            <ImageUpload label="Bagan Struktur Organisasi (opsional)"
                                existingUrl={data.org_structure.chart_image}
                                onChange={(f) => setData('org_chart_image_file', f)}
                                onClearExisting={() => setData('org_structure', { ...data.org_structure, chart_image: null })}
                                error={errors.org_chart_image_file}
                            />

                            <hr className="border-cream-300/40" />

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Daftar Pengurus</h4>
                                    <button type="button" onClick={addMember}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Pengurus
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.org_structure.members.map((m, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Pengurus {i + 1}</span>
                                                <button type="button" onClick={() => removeMember(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Nama</label>
                                                        <input type="text" value={m.name} className={inputCls} placeholder="Dr. Femi Yulianti"
                                                            onChange={(e) => updateMemberField(i, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Email (opsional)</label>
                                                        <input type="email" value={m.email} className={inputCls} placeholder="nama@telkomuniversity.ac.id"
                                                            onChange={(e) => updateMemberField(i, 'email', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Jabatan (ID)</label>
                                                        <input type="text" value={m.role.id} className={inputCls} placeholder="Kaprodi Teknik Logistik"
                                                            onChange={(e) => updateMemberRole(i, 'id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Jabatan (EN)</label>
                                                        <input type="text" value={m.role.en} className={inputCls} placeholder="Head of Logistics Engineering Program"
                                                            onChange={(e) => updateMemberRole(i, 'en', e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.org_structure.members.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada pengurus. Klik "Tambah Pengurus" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: Statistik & Tracer Study ── */}
                    {activeTab === 'tracer' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">Statistik & Tracer Study</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Gambar hero dan data grafik tingkat keterserapan kerja (tracer study) di halaman /statistik.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <ImageUpload label="Gambar Hero Halaman Statistik"
                                existingUrl={data.tracer_stats.hero_image}
                                onChange={(f) => setData('statistics_hero_image_file', f)}
                                onClearExisting={() => setData('tracer_stats', { ...data.tracer_stats, hero_image: null })}
                                error={errors.statistics_hero_image_file}
                            />

                            <BilingualInput label="Keterangan Grafik (Caption)" type="textarea" rows={2}
                                idName="tracer_stats.caption.id" enName="tracer_stats.caption.en"
                                idValue={data.tracer_stats.caption.id} enValue={data.tracer_stats.caption.en}
                                onChangeId={(v) => setData('tracer_stats', { ...data.tracer_stats, caption: { ...data.tracer_stats.caption, id: v } })}
                                onChangeEn={(v) => setData('tracer_stats', { ...data.tracer_stats, caption: { ...data.tracer_stats.caption, en: v } })}
                            />

                            <hr className="border-cream-300/40" />

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Data Tingkat Keterserapan per Tahun</h4>
                                    <button type="button" onClick={addSeriesPoint}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Data Tahun
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.tracer_stats.series.map((s, i) => (
                                        <div key={i} className="flex items-center gap-3 rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-semibold text-navy-700">Tahun</label>
                                                <input type="number" value={s.year} className={inputCls}
                                                    onChange={(e) => updateSeriesPoint(i, 'year', parseInt(e.target.value) || 0)} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-semibold text-navy-700">Tingkat Keterserapan (%)</label>
                                                <input type="number" value={s.employment_rate} className={inputCls} min={0} max={100}
                                                    onChange={(e) => updateSeriesPoint(i, 'employment_rate', parseFloat(e.target.value) || 0)} />
                                            </div>
                                            <button type="button" onClick={() => removeSeriesPoint(i)}
                                                className="mt-5 inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                <Trash2 className="size-2.5" /> Hapus
                                            </button>
                                        </div>
                                    ))}
                                    {data.tracer_stats.series.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada data. Klik "Tambah Data Tahun" untuk menambahkan.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Tab: MBKM ── */}
                    {activeTab === 'mbkm' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-ink-900">MBKM (Merdeka Belajar Kampus Merdeka)</h3>
                                <p className="mt-0.5 text-xs text-navy-700">Gambar hero dan daftar skema program MBKM yang ditampilkan di halaman /mbkm.</p>
                            </div>
                            <hr className="border-cream-300/40" />

                            <ImageUpload label="Gambar Hero Halaman MBKM"
                                existingUrl={data.mbkm_content.hero_image}
                                onChange={(f) => setData('mbkm_hero_image_file', f)}
                                onClearExisting={() => setData('mbkm_content', { ...data.mbkm_content, hero_image: null })}
                                error={errors.mbkm_hero_image_file}
                            />

                            <hr className="border-cream-300/40" />

                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-ink-900">Skema Program MBKM</h4>
                                    <button type="button" onClick={addScheme}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700/8 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-700/15 transition-colors">
                                        <Plus className="size-3.5" /> Tambah Skema
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.mbkm_content.schemes.map((s, i) => (
                                        <div key={i} className="rounded-xl border border-cream-300/40 bg-surface-50/20 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Skema {i + 1}</span>
                                                <button type="button" onClick={() => removeScheme(i)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                                                    <Trash2 className="size-2.5" /> Hapus
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                                    <div className="space-y-1 md:col-span-1">
                                                        <label className="text-xs font-semibold text-navy-700">Konversi SKS</label>
                                                        <input type="text" value={s.sks} className={inputCls} placeholder="20 SKS"
                                                            onChange={(e) => updateScheme(i, 'sks', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul (ID)</label>
                                                        <input type="text" value={s.title_id} className={inputCls} placeholder="Magang Industri Bersertifikat"
                                                            onChange={(e) => updateScheme(i, 'title_id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Judul (EN)</label>
                                                        <input type="text" value={s.title_en} className={inputCls} placeholder="Certified Industry Internship"
                                                            onChange={(e) => updateScheme(i, 'title_en', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (ID)</label>
                                                        <textarea rows={2} value={s.desc_id} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateScheme(i, 'desc_id', e.target.value)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-semibold text-navy-700">Deskripsi (EN)</label>
                                                        <textarea rows={2} value={s.desc_en} className={`${inputCls} resize-none`}
                                                            onChange={(e) => updateScheme(i, 'desc_en', e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {data.mbkm_content.schemes.length === 0 && (
                                        <p className="rounded-xl border border-dashed border-cream-300 py-6 text-center text-xs text-navy-700/40">
                                            Belum ada skema. Klik "Tambah Skema" untuk menambahkan. Jika dikosongkan, halaman publik akan menampilkan 6 skema bawaan.
                                        </p>
                                    )}
                                </div>
                            </div>
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
