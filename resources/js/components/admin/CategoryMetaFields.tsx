import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NewsMetadata = {
    // Kunjungan Industri
    company_name?: string;
    location?: string;
    participant_count?: string;
    event_date?: string;

    // Prestasi Mahasiswa
    student_names?: string;
    competition_name?: string;
    competition_level?: string;
    award?: string;
    organizer?: string;

    // Riset & Penelitian
    lead_researcher?: string;
    team_members?: string;
    funding_source?: string;
    research_year?: string;
    publication_url?: string;

    // Pengabdian Masyarakat
    partner_community?: string;
    theme?: string;

    // Kemahasiswaan
    organization_name?: string;
    event_type?: string;

    // Pengumuman & Akademik
    target_audience?: string;
    deadline?: string;

    // Akademik
    semester?: string;
    academic_year?: string;

    // Kegiatan / Event
    event_end_date?: string;
    speaker?: string;
    activity_type?: string;
};

interface CategoryMetaFieldsProps {
    category: string;
    metadata: NewsMetadata;
    onChange: (key: keyof NewsMetadata, value: string) => void;
}

// ─── Shared field components ──────────────────────────────────────────────────

function MetaField({
    label,
    children,
    hint,
}: {
    label: string;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-semibold text-ink-900">{label}</label>
            {children}
            {hint && <p className="text-xs text-navy-700/60">{hint}</p>}
        </div>
    );
}

const inputCls =
    'w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 transition-all';

const selectCls =
    'w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-brand-700/10 focus:border-brand-700 outline-none text-sm bg-surface-0 transition-all';

// ─── Category sections ────────────────────────────────────────────────────────

function KunjunganFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Nama Perusahaan / Instansi">
                <input
                    type="text"
                    placeholder="e.g. PT. HAVI Logistics Indonesia"
                    value={meta.company_name || ''}
                    onChange={e => onChange('company_name', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Lokasi Kunjungan">
                <input
                    type="text"
                    placeholder="e.g. Karawang, Jawa Barat"
                    value={meta.location || ''}
                    onChange={e => onChange('location', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tanggal Kegiatan">
                <input
                    type="date"
                    value={meta.event_date || ''}
                    onChange={e => onChange('event_date', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Jumlah Peserta" hint="Jumlah mahasiswa / dosen yang ikut">
                <input
                    type="number"
                    placeholder="e.g. 45"
                    min={1}
                    value={meta.participant_count || ''}
                    onChange={e => onChange('participant_count', e.target.value)}
                    className={inputCls}
                />
            </MetaField>
        </div>
    );
}

function PrestasiFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Nama Mahasiswa / Tim" hint="Pisahkan dengan koma jika lebih dari satu">
                <input
                    type="text"
                    placeholder="e.g. Budi Santoso, Dewi Rahayu"
                    value={meta.student_names || ''}
                    onChange={e => onChange('student_names', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Nama Kompetisi / Lomba">
                <input
                    type="text"
                    placeholder="e.g. National Logistics Olympiad 2025"
                    value={meta.competition_name || ''}
                    onChange={e => onChange('competition_name', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tingkat Kompetisi">
                <select
                    value={meta.competition_level || ''}
                    onChange={e => onChange('competition_level', e.target.value)}
                    className={selectCls}
                >
                    <option value="">— Pilih Tingkat —</option>
                    <option value="Lokal / Kampus">Lokal / Kampus</option>
                    <option value="Regional">Regional</option>
                    <option value="Nasional">Nasional</option>
                    <option value="ASEAN">ASEAN</option>
                    <option value="Internasional">Internasional</option>
                </select>
            </MetaField>

            <MetaField label="Peringkat / Penghargaan">
                <input
                    type="text"
                    placeholder="e.g. Juara 1 / Best Paper Award"
                    value={meta.award || ''}
                    onChange={e => onChange('award', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Penyelenggara" hint="Instansi yang menyelenggarakan kompetisi">
                <input
                    type="text"
                    placeholder="e.g. Kementerian Pendidikan / ITS"
                    value={meta.organizer || ''}
                    onChange={e => onChange('organizer', e.target.value)}
                    className={inputCls}
                />
            </MetaField>
        </div>
    );
}

function RisetFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Peneliti Utama (PI)">
                <input
                    type="text"
                    placeholder="e.g. Dr. Ahmad Fauzi, S.T., M.T."
                    value={meta.lead_researcher || ''}
                    onChange={e => onChange('lead_researcher', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Anggota Tim" hint="Pisahkan dengan koma">
                <input
                    type="text"
                    placeholder="e.g. Siti Nurhaliza, M.T., ..."
                    value={meta.team_members || ''}
                    onChange={e => onChange('team_members', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Sumber Dana / Skema">
                <input
                    type="text"
                    placeholder="e.g. Hibah DRTPM Kemendikbud / Mandiri"
                    value={meta.funding_source || ''}
                    onChange={e => onChange('funding_source', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tahun Penelitian">
                <input
                    type="number"
                    placeholder={String(new Date().getFullYear())}
                    min={2000}
                    max={2099}
                    value={meta.research_year || ''}
                    onChange={e => onChange('research_year', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <div className="sm:col-span-2">
                <MetaField label="Link Publikasi / Jurnal" hint="URL artikel jurnal atau konferensi (opsional)">
                    <input
                        type="url"
                        placeholder="https://doi.org/..."
                        value={meta.publication_url || ''}
                        onChange={e => onChange('publication_url', e.target.value)}
                        className={inputCls}
                    />
                </MetaField>
            </div>
        </div>
    );
}

function PengabdianFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Lokasi Kegiatan">
                <input
                    type="text"
                    placeholder="e.g. Desa Citeureup, Bogor"
                    value={meta.location || ''}
                    onChange={e => onChange('location', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Mitra / Komunitas Sasaran">
                <input
                    type="text"
                    placeholder="e.g. UMKM Batik Lokal / Karang Taruna"
                    value={meta.partner_community || ''}
                    onChange={e => onChange('partner_community', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tema Pengabdian">
                <input
                    type="text"
                    placeholder="e.g. Digitalisasi Rantai Pasok UMKM"
                    value={meta.theme || ''}
                    onChange={e => onChange('theme', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Jumlah Peserta">
                <input
                    type="number"
                    placeholder="e.g. 30"
                    min={1}
                    value={meta.participant_count || ''}
                    onChange={e => onChange('participant_count', e.target.value)}
                    className={inputCls}
                />
            </MetaField>
        </div>
    );
}

function KemahasiswaanFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Nama Organisasi / UKM">
                <input
                    type="text"
                    placeholder="e.g. Himpunan Mahasiswa Teknik Logistik"
                    value={meta.organization_name || ''}
                    onChange={e => onChange('organization_name', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Jenis Kegiatan">
                <input
                    type="text"
                    placeholder="e.g. Seminar / Bakti Sosial / Lomba"
                    value={meta.event_type || ''}
                    onChange={e => onChange('event_type', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Penyelenggara">
                <input
                    type="text"
                    placeholder="e.g. BEM FRI / HMTL"
                    value={meta.organizer || ''}
                    onChange={e => onChange('organizer', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Jumlah Peserta">
                <input
                    type="number"
                    placeholder="e.g. 120"
                    min={1}
                    value={meta.participant_count || ''}
                    onChange={e => onChange('participant_count', e.target.value)}
                    className={inputCls}
                />
            </MetaField>
        </div>
    );
}

function PengumumanFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Ditujukan Kepada">
                <select
                    value={meta.target_audience || ''}
                    onChange={e => onChange('target_audience', e.target.value)}
                    className={selectCls}
                >
                    <option value="">— Pilih Audiens —</option>
                    <option value="Semua">Semua Civitas Akademika</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Tendik">Tenaga Kependidikan</option>
                </select>
            </MetaField>

            <MetaField label="Batas Waktu (Deadline)" hint="Opsional — kosongkan jika tidak ada deadline">
                <input
                    type="date"
                    value={meta.deadline || ''}
                    onChange={e => onChange('deadline', e.target.value)}
                    className={inputCls}
                />
            </MetaField>
        </div>
    );
}

function AkademikFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Semester">
                <select
                    value={meta.semester || ''}
                    onChange={e => onChange('semester', e.target.value)}
                    className={selectCls}
                >
                    <option value="">— Pilih Semester —</option>
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                </select>
            </MetaField>

            <MetaField label="Tahun Ajaran" hint="e.g. 2025/2026">
                <input
                    type="text"
                    placeholder="2025/2026"
                    value={meta.academic_year || ''}
                    onChange={e => onChange('academic_year', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Ditujukan Kepada">
                <select
                    value={meta.target_audience || ''}
                    onChange={e => onChange('target_audience', e.target.value)}
                    className={selectCls}
                >
                    <option value="">— Pilih Audiens —</option>
                    <option value="Semua">Semua Civitas Akademika</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Dosen">Dosen</option>
                </select>
            </MetaField>
        </div>
    );
}

function KegiatanFields({ meta, onChange }: { meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MetaField label="Jenis Kegiatan">
                <select
                    value={meta.activity_type || ''}
                    onChange={e => onChange('activity_type', e.target.value)}
                    className={selectCls}
                >
                    <option value="">— Pilih Jenis —</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Kuliah Tamu">Kuliah Tamu (Guest Lecture)</option>
                    <option value="Konferensi">Konferensi / Simposium</option>
                    <option value="Pameran">Pameran / Exhibition</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </MetaField>

            <MetaField label="Lokasi">
                <input
                    type="text"
                    placeholder="e.g. Aula FRI / Online (Zoom)"
                    value={meta.location || ''}
                    onChange={e => onChange('location', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tanggal Mulai">
                <input
                    type="date"
                    value={meta.event_date || ''}
                    onChange={e => onChange('event_date', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <MetaField label="Tanggal Selesai" hint="Opsional — isi jika kegiatan lebih dari satu hari">
                <input
                    type="date"
                    value={meta.event_end_date || ''}
                    onChange={e => onChange('event_end_date', e.target.value)}
                    className={inputCls}
                />
            </MetaField>

            <div className="sm:col-span-2">
                <MetaField label="Narasumber / Pembicara" hint="Pisahkan dengan koma jika lebih dari satu">
                    <input
                        type="text"
                        placeholder="e.g. Dr. Ir. Budi Hartono (Univ. Gadjah Mada)"
                        value={meta.speaker || ''}
                        onChange={e => onChange('speaker', e.target.value)}
                        className={inputCls}
                    />
                </MetaField>
            </div>
        </div>
    );
}

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
    string,
    { label: string; color: string; description: string; component: React.FC<{ meta: NewsMetadata; onChange: CategoryMetaFieldsProps['onChange'] }> } | null
> = {
    'Kunjungan Industri': {
        label: '🏭 Info Kunjungan Industri',
        color: 'bg-blue-50 border-blue-200',
        description: 'Lengkapi detail kunjungan industri untuk ditampilkan di halaman berita.',
        component: KunjunganFields,
    },
    'Prestasi': {
        label: '🏆 Info Prestasi',
        color: 'bg-amber-50 border-amber-200',
        description: 'Lengkapi detail prestasi mahasiswa / tim.',
        component: PrestasiFields,
    },
    'Riset': {
        label: '🔬 Info Riset & Penelitian',
        color: 'bg-purple-50 border-purple-200',
        description: 'Lengkapi detail penelitian untuk informasi yang lebih kaya.',
        component: RisetFields,
    },
    'Pengabdian': {
        label: '🤝 Info Pengabdian Masyarakat',
        color: 'bg-green-50 border-green-200',
        description: 'Lengkapi detail kegiatan pengabdian masyarakat.',
        component: PengabdianFields,
    },
    'Kemahasiswaan': {
        label: '👥 Info Kemahasiswaan',
        color: 'bg-teal-50 border-teal-200',
        description: 'Lengkapi info organisasi / kegiatan kemahasiswaan.',
        component: KemahasiswaanFields,
    },
    'Pengumuman': {
        label: '📢 Detail Pengumuman',
        color: 'bg-orange-50 border-orange-200',
        description: 'Tentukan audiens dan batas waktu pengumuman.',
        component: PengumumanFields,
    },
    'Akademik': {
        label: '📚 Info Akademik',
        color: 'bg-indigo-50 border-indigo-200',
        description: 'Informasi terkait semester dan tahun ajaran.',
        component: AkademikFields,
    },
    'Kegiatan': {
        label: '📅 Info Kegiatan / Event',
        color: 'bg-pink-50 border-pink-200',
        description: 'Lengkapi detail kegiatan atau event yang diselenggarakan.',
        component: KegiatanFields,
    },
    'Umum': null,
};

// ─── Main export ──────────────────────────────────────────────────────────────

export function CategoryMetaFields({ category, metadata, onChange }: CategoryMetaFieldsProps) {
    const config = CATEGORY_CONFIG[category];

    // No extra fields for 'Umum' or unrecognized categories
    if (!config) return null;

    const { label, color, description, component: Fields } = config;

    return (
        <div className={`rounded-2xl border p-5 space-y-5 ${color}`}>
            {/* Section header */}
            <div>
                <h3 className="text-sm font-bold text-ink-900">{label}</h3>
                <p className="text-xs text-navy-700/70 mt-0.5">{description}</p>
                <p className="text-[11px] text-navy-700/50 mt-1 italic">
                    ✦ Semua field di bagian ini bersifat opsional
                </p>
            </div>

            <hr className="border-current opacity-20" />

            {/* Dynamic fields */}
            <Fields meta={metadata} onChange={onChange} />
        </div>
    );
}
