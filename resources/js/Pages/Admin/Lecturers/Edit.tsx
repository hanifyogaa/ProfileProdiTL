import AdminLayout from '@/Layouts/AdminLayout';
import BilingualInput from '@/components/admin/BilingualInput';
import ImageUpload from '@/components/admin/ImageUpload';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

interface EduRow {
    degree: string;
    institution: string;
    year: string;
}

interface TeachingRow {
    semester: string;
    coursesString: string;
}

interface LecturerItem {
    id: number;
    name: string;
    nidn: string | null;
    functional_position: string | null;
    position_id: string | null;
    position_en: string | null;
    bio_id: string | null;
    bio_en: string | null;
    expertise: string[] | null;
    education: EduRow[] | null;
    teaching_history: Array<{ semester: string; courses: string[] }> | null;
    photo: string | null;
    scholar_url: string | null;
    scholar_id: string | null;
    sinta_url: string | null;
    sinta_id: string | null;
    scopus_url: string | null;
    scopus_id: string | null;
    email: string | null;
    order: number;
    is_active: boolean;
}

interface EditProps {
    lecturer: LecturerItem;
}

export default function Edit({ lecturer }: EditProps) {
    // 1. Map initial education
    const initialEdu: EduRow[] = lecturer.education && lecturer.education.length > 0 
        ? lecturer.education 
        : [{ degree: '', institution: '', year: '' }];

    // 2. Map initial teaching history
    const initialTeaching: TeachingRow[] = lecturer.teaching_history && lecturer.teaching_history.length > 0
        ? lecturer.teaching_history.map(row => ({
            semester: row.semester,
            coursesString: Array.isArray(row.courses) ? row.courses.join(', ') : ''
        }))
        : [{ semester: '', coursesString: '' }];

    // 3. Map initial expertise
    const initialExpertise = lecturer.expertise && lecturer.expertise.length > 0
        ? lecturer.expertise.join(', ')
        : '';

    const [eduRows, setEduRows] = useState<EduRow[]>(initialEdu);
    const [teachingRows, setTeachingRows] = useState<TeachingRow[]>(initialTeaching);
    const [expertiseInput, setExpertiseInput] = useState(initialExpertise);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: lecturer.name || '',
        nidn: lecturer.nidn || '',
        functional_position: lecturer.functional_position || '',
        position_id: lecturer.position_id || '',
        position_en: lecturer.position_en || '',
        bio_id: lecturer.bio_id || '',
        bio_en: lecturer.bio_en || '',
        expertise: lecturer.expertise || [] as string[],
        education: lecturer.education || [] as any[],
        teaching_history: lecturer.teaching_history || [] as any[],
        photo: lecturer.photo, // existing string URL
        photo_file: null as File | null, // new file
        scholar_url: lecturer.scholar_url || '',
        scholar_id: lecturer.scholar_id || '',
        sinta_url: lecturer.sinta_url || '',
        sinta_id: lecturer.sinta_id || '',
        scopus_url: lecturer.scopus_url || '',
        scopus_id: lecturer.scopus_id || '',
        email: lecturer.email || '',
        order: lecturer.order || 0,
        is_active: lecturer.is_active ?? true,
    });

    const addEduRow = () => {
        setEduRows([...eduRows, { degree: '', institution: '', year: '' }]);
    };

    const removeEduRow = (index: number) => {
        setEduRows(eduRows.filter((_, i) => i !== index));
    };

    const updateEduRow = (index: number, field: keyof EduRow, value: string) => {
        const updated = [...eduRows];
        updated[index][field] = value;
        setEduRows(updated);
    };

    const addTeachingRow = () => {
        setTeachingRows([...teachingRows, { semester: '', coursesString: '' }]);
    };

    const removeTeachingRow = (index: number) => {
        setTeachingRows(teachingRows.filter((_, i) => i !== index));
    };

    const updateTeachingRow = (index: number, field: keyof TeachingRow, value: string) => {
        const updated = [...teachingRows];
        updated[index][field] = value;
        setTeachingRows(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const expertiseArray = expertiseInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const cleanEdu = eduRows.filter(row => row.degree && row.institution);

        const cleanTeaching = teachingRows
            .filter(row => row.semester && row.coursesString)
            .map(row => ({
                semester: row.semester,
                courses: row.coursesString.split(',').map(c => c.trim()).filter(Boolean)
            }));

        post(route('admin.lecturers.update', lecturer.id), {
            forceFormData: true,
            onBefore: () => {
                data.expertise = expertiseArray;
                data.education = cleanEdu;
                data.teaching_history = cleanTeaching;
            }
        });
    };

    return (
        <AdminLayout title="Edit Profil Dosen">
            <Head title={`Admin - Edit Dosen: ${lecturer.name}`} />

            <div className="mb-6">
                <Link
                    href={route('admin.lecturers.index')}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-brand-700 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface-0 border border-cream-300/40 p-6 md:p-8 rounded-2xl shadow-sm space-y-6 max-w-4xl">
                <div>
                    <h2 className="text-lg font-bold text-ink-900 mb-1">Edit Profil Dosen / Staff</h2>
                    <p className="text-xs text-navy-700">Perbarui rincian riwayat pendidikan, kepakaran, riwayat pengajaran, atau tautan publikasi.</p>
                </div>

                <hr className="border-cream-300/40" />

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Nama Lengkap & Gelar</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                            required
                        />
                        {errors.name && <p className="text-xs text-red-600 font-medium">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">NIDN</label>
                        <input
                            type="text"
                            value={data.nidn}
                            onChange={(e) => setData('nidn', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.nidn && <p className="text-xs text-red-600 font-medium">{errors.nidn}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-ink-900">Jabatan Fungsional</label>
                        <input
                            type="text"
                            value={data.functional_position}
                            onChange={(e) => setData('functional_position', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-2">
                        <label className="text-sm font-semibold text-ink-900">Email Dosen (Telkom University)</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                        />
                        {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email}</p>}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BilingualInput
                        label="Jabatan Struktural / Posisi (Contoh: Kaprodi)"
                        idName="position_id"
                        enName="position_en"
                        idValue={data.position_id}
                        enValue={data.position_en}
                        onChangeId={(val) => setData('position_id', val)}
                        onChangeEn={(val) => setData('position_en', val)}
                    />

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
                                Profil Dosen Aktif & Tampilkan
                            </label>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <BilingualInput
                    label="Biodata / Biografi Singkat"
                    idName="bio_id"
                    enName="bio_en"
                    idValue={data.bio_id}
                    enValue={data.bio_en}
                    type="textarea"
                    rows={4}
                    onChangeId={(val) => setData('bio_id', val)}
                    onChangeEn={(val) => setData('bio_en', val)}
                />

                {/* Expertise (Tags Input) */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-ink-900">Bidang Keahlian / Kepakaran</label>
                    <input
                        type="text"
                        value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)}
                        placeholder="Pisahkan dengan koma (Contoh: Smart Warehousing, Digital Supply Chain)"
                        className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0"
                    />
                    <p className="text-[11px] text-navy-700">Pisahkan setiap tag dengan tanda koma `,`.</p>
                </div>

                {/* Education Repeater */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-ink-900">Riwayat Pendidikan Tinggi</label>
                        <button
                            type="button"
                            onClick={addEduRow}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-xs font-bold transition-all border border-brand-200"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Gelar</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        {eduRows.map((row, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-surface-50/30 border border-cream-300/20 p-3 rounded-xl">
                                <input
                                    type="text"
                                    placeholder="Gelar/Jenjang (Contoh: S3)"
                                    value={row.degree}
                                    onChange={(e) => updateEduRow(index, 'degree', e.target.value)}
                                    className="flex-[1] px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Institusi Kampus (Contoh: ITB)"
                                    value={row.institution}
                                    onChange={(e) => updateEduRow(index, 'institution', e.target.value)}
                                    className="flex-[3] px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Tahun Lulus (Contoh: 2018)"
                                    value={row.year}
                                    onChange={(e) => updateEduRow(index, 'year', e.target.value)}
                                    className="flex-[1] px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeEduRow(index)}
                                    className="p-1.5 hover:bg-red-50 text-navy-700 hover:text-red-600 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teaching History Repeater */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-ink-900">Riwayat Pengajaran Terakhir</label>
                        <button
                            type="button"
                            onClick={addTeachingRow}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-xs font-bold transition-all border border-brand-200"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Semester</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        {teachingRows.map((row, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-surface-50/30 border border-cream-300/20 p-3 rounded-xl">
                                <input
                                    type="text"
                                    placeholder="Semester (Contoh: Ganjil 2024/2025)"
                                    value={row.semester}
                                    onChange={(e) => updateTeachingRow(index, 'semester', e.target.value)}
                                    className="flex-[2] px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Mata Kuliah (Pisahkan dengan koma)"
                                    value={row.coursesString}
                                    onChange={(e) => updateTeachingRow(index, 'coursesString', e.target.value)}
                                    className="flex-[4] px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-surface-0 focus:ring-1 focus:ring-brand-700 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeTeachingRow(index)}
                                    className="p-1.5 hover:bg-red-50 text-navy-700 hover:text-red-600 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profiles & Scholar IDs */}
                <div className="border border-cream-300/20 p-4 rounded-xl bg-surface-50/20 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700">Akun Publikasi (Scholar, Sinta, Scopus)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Google Scholar URL</label>
                            <input
                                type="text"
                                value={data.scholar_url}
                                onChange={(e) => setData('scholar_url', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Google Scholar ID</label>
                            <input
                                type="text"
                                value={data.scholar_id}
                                onChange={(e) => setData('scholar_id', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Sinta Profile URL</label>
                            <input
                                type="text"
                                value={data.sinta_url}
                                onChange={(e) => setData('sinta_url', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Sinta ID</label>
                            <input
                                type="text"
                                value={data.sinta_id}
                                onChange={(e) => setData('sinta_id', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Scopus URL</label>
                            <input
                                type="text"
                                value={data.scopus_url}
                                onChange={(e) => setData('scopus_url', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-navy-700">Scopus ID</label>
                            <input
                                type="text"
                                value={data.scopus_id}
                                onChange={(e) => setData('scopus_id', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-cream-300 text-xs focus:ring-1 focus:ring-brand-700 outline-none bg-surface-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Photo Upload */}
                <ImageUpload
                    label="Foto Dosen / Staff"
                    existingUrl={data.photo}
                    onChange={(file) => setData('photo_file', file)}
                    onClearExisting={() => setData('photo', null)}
                    error={errors.photo_file}
                />

                {/* Submit Actions */}
                <div className="pt-4 border-t border-cream-300/40 flex justify-end space-x-3">
                    <Link
                        href={route('admin.lecturers.index')}
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
                        <span>{processing ? 'Menyimpan...' : 'Perbarui Dosen'}</span>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
