# Admin Architecture — Prodi Teknik Logistik (FRI, Telkom University)

> Dokumen referensi integrasi antara Filament Admin Panel dan halaman publik Inertia/React.
> Stack: Laravel 13 · Filament v5.6.7 · Inertia.js v2 · React · Tailwind CSS v4

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ADMIN PANEL                             │
│              /admin  (Filament v5, Livewire/Blade)              │
│                                                                 │
│  ┌────────────────┐   ┌──────────────────┐   ┌──────────────┐  │
│  │   Resources    │   │  Custom Pages    │   │  Dashboard   │  │
│  │ (CRUD models)  │   │ WebsiteSettings  │   │  Widgets     │  │
│  └───────┬────────┘   └────────┬─────────┘   └──────┬───────┘  │
└──────────┼─────────────────────┼────────────────────┼──────────┘
           │                     │                    │
           ▼                     ▼                    │
    ┌──────────────┐     ┌──────────────┐             │
    │  Models/DB   │     │  settings    │             │
    │  (MySQL)     │     │  table       │             │
    └──────┬───────┘     └──────┬───────┘             │
           │                   │                      │
           └──────────┬────────┘                      │
                      ▼                               │
          ┌───────────────────────┐                   │
          │    PageController /   │◄──────────────────┘
          │    HomeController     │   (reads count for stats)
          └──────────┬────────────┘
                     │  Inertia::render('Page', [props])
                     ▼
          ┌───────────────────────┐
          │   React Pages         │
          │   (resources/js/Pages)│
          │   useLocale() ID/EN   │
          └───────────────────────┘
```

### Data Flow — Setting Key

```
Admin mengisi WebsiteSettings
        ↓
Setting::updateOrCreate(['key' => 'hero'], ['value' => [...]])
        ↓
settings table: { key: 'hero', value: JSON }
        ↓
PageController: Setting::getValue('hero')
        ↓
Inertia::render('Home', ['hero' => $data])
        ↓
React: const { hero } = props; hero.title[locale]
```

### Data Flow — Resource (Model)

```
Admin mengisi NewsResource form
        ↓
News::create([...]) / News::update([...])
        ↓
news table (MySQL)
        ↓
PageController: News::published()->paginate(9)
        ↓
Inertia::render('NewsList', ['news' => $paginated])
        ↓
React: news.data.map(item => <NewsCard item={item} />)
```

---

## 2. Public Page ↔ Admin Integration Map

| Route | Page Component | Admin Source | Controller Method | Status |
|-------|---------------|--------------|-------------------|--------|
| `/` | Home.tsx | Multiple (see §3) | HomeController@index | ✅ Penuh |
| `/profil` | About.tsx | Setting: `greeting`, `distinctiveness`, `about_content` | PageController@about | ✅ Penuh |
| `/profil/akreditasi` | Accreditation.tsx | Setting: `accreditation` | PageController@accreditation | ✅ Penuh |
| `/kurikulum` | Curriculum.tsx | CourseResource → `courses` table | PageController@curriculum | ✅ Penuh |
| `/dosen` | Lecturers.tsx | LecturerResource → `lecturers` table | PageController@lecturers | ✅ Penuh |
| `/berita` | NewsList.tsx | NewsResource → `news` table | PageController@news | ✅ Penuh |
| `/berita/{slug}` | NewsDetail.tsx | NewsResource → `news` table | PageController@newsDetail | ✅ Penuh |
| `/galeri` | Gallery.tsx | GalleryResource → `galleries` table | PageController@gallery | ✅ Penuh |
| `/prestasi` | AchievementsList.tsx | AchievementResource → `achievements` table | PageController@achievements | ✅ Penuh |
| `/agenda` | ActivitiesList.tsx | ActivityResource → `activities` table | PageController@activities | ✅ Penuh |
| `/laboratorium` | LabsList.tsx | LabResource → `labs` table | PageController@labs | ✅ Penuh |
| `/kemitraan` | Partnerships.tsx | PartnerResource → `partners` table | PageController@partnerships | ✅ Penuh |
| `/riset` | Research.tsx | Setting: `research_areas` | PageController@research | ✅ Penuh |
| `/mbkm` | Mbkm.tsx | Setting: `mbkm_content` | PageController@mbkm | ✅ Penuh |
| `/statistik` | Statistics.tsx | StatResource + Setting: `tracer_stats` | PageController@statistics | ✅ Penuh |
| `/faq` | Faq.tsx | FaqResource → `faqs` table | PageController@faq | ✅ Penuh |
| `/kontak` | Contact.tsx | Setting: `contact`, `site_meta`, `socials` | PageController@contact | ✅ Penuh |

---

## 3. Home Page Data Sources

`HomeController@index` mengambil data dari beberapa sumber sekaligus:

| Section Home | Sumber | Key / Model |
|---|---|---|
| Hero banner | Setting | `hero` |
| Stats strip | StatResource | `stats` table (orderBy order) |
| Sambutan Kaprodi | Setting | `greeting` |
| Keunggulan (Distinctiveness) | Setting | `distinctiveness` |
| Prospek Karir | Setting | `prospects` |
| Tracer Study chart | Setting | `tracer_stats` |
| Mitra | PartnerResource | `partners` table |
| Berita Terkini | NewsResource | `news` table (latest 3 published) |
| Kegiatan Featured | ActivityResource | `activities` table (featured) |
| Laboratorium | LabResource | `labs` table |
| Mata Kuliah Unggulan | CourseResource | `courses` table (is_signature=true) |
| Prestasi | AchievementResource | `achievements` table |

---

## 4. Setting Key Reference

Semua disimpan di tabel `settings` sebagai JSON. Akses via `Setting::getValue('key')`.

### `hero`
```json
{
  "eyebrow": { "id": "...", "en": "..." },
  "title": { "id": "...", "en": "..." },
  "subtitle": { "id": "...", "en": "..." },
  "image": null,
  "primary_cta": {
    "label": { "id": "Daftar Sekarang", "en": "Apply Now" },
    "href": "https://smb.telkomuniversity.ac.id/"
  },
  "secondary_cta": {
    "label": { "id": "Jelajahi Program", "en": "Explore Program" },
    "href": "/kurikulum"
  }
}
```

### `site_meta`
```json
{
  "name": "Teknik Logistik – Telkom University",
  "address": "Fakultas Rekayasa Industri, Telkom University, Jl. Telekomunikasi No.1, Bandung"
}
```

### `contact`
```json
{ "email": "disca@telkomuniversity.ac.id", "phone": "+62 22 756 4108" }
```

### `socials`
```json
{ "instagram": "https://instagram.com/...", "line": "...", "tiktok": "..." }
```

### `greeting`
```json
{
  "name": "Nama Kaprodi, S.T., M.T., Ph.D.",
  "photo": null,
  "quote": { "id": "...", "en": "..." },
  "attribution": { "id": "Kepala Program Studi", "en": "Head of Study Program" },
  "link_href": "/profil"
}
```

### `distinctiveness`
```json
{
  "heading": { "id": "...", "en": "..." },
  "body": { "id": "...", "en": "..." },
  "link_href": "/kurikulum",
  "points": [
    { "title_id": "...", "title_en": "...", "description_id": "...", "description_en": "..." }
  ]
}
```

### `prospects`
```json
{
  "heading": { "id": "...", "en": "..." },
  "tracks": [
    { "title_id": "...", "title_en": "...", "description_id": "...", "description_en": "..." }
  ]
}
```

### `tracer_stats`
```json
{
  "caption": { "id": "...", "en": "..." },
  "series": [
    { "year": "2022", "employment_rate": 78 },
    { "year": "2023", "employment_rate": 83 }
  ]
}
```

### `curriculum_summary`
```json
{ "total_sks": 145, "semesters": 8, "pdf_url": null }
```

### `about_content`
```json
{
  "visi": {
    "id": "Menjadi Program Studi S1 Teknik Logistik yang unggul...",
    "en": "To become an internationally standardized..."
  },
  "misi": [
    { "id": "Menyelenggarakan pendidikan...", "en": "To organize education..." },
    { "id": "Mengembangkan riset inovatif...", "en": "To develop innovative research..." },
    { "id": "Melaksanakan pengabdian kepada masyarakat...", "en": "To conduct community service..." }
  ],
  "history": {
    "id": "Program Studi S1 Teknik Logistik Universitas Telkom didirikan...",
    "en": "Telkom University's Logistics Engineering program was established..."
  }
}
```

### `accreditation`
```json
{
  "body_name": "LAM Teknik",
  "status": {
    "id": "Terakreditasi: UNGGUL",
    "en": "Accreditation Rank: UNGGUL (Excellent)"
  },
  "description": {
    "id": "Peringkat akreditasi tertinggi yang diberikan oleh lembaga akreditasi nasional.",
    "en": "The highest accreditation tier awarded by a national accreditation body."
  },
  "decrees": [
    {
      "title": { "id": "SK Akreditasi LAM Teknik 2025", "en": "LAM Teknik Decree (2025)" },
      "number": "No: 0451/SK/LAM-Teknik/IV/2025",
      "description": {
        "id": "Menetapkan predikat Akreditasi \"Unggul\" yang berlaku hingga tahun 2030.",
        "en": "Established the \"Unggul\" rank valid through 2030."
      }
    }
  ]
}
```

### `research_areas`
```json
{
  "areas": [
    {
      "icon": "code",
      "title": { "id": "Sistem Logistik Digital", "en": "Digital Logistics Systems" },
      "description": { "id": "...", "en": "..." }
    },
    {
      "icon": "compass",
      "title": { "id": "Model Riset Operasional", "en": "Operations Research Modeling" },
      "description": { "id": "...", "en": "..." }
    },
    {
      "icon": "heart",
      "title": { "id": "Pengabdian Masyarakat", "en": "Community Service" },
      "description": { "id": "...", "en": "..." }
    }
  ]
}
```

Icon values yang valid: `code`, `compass`, `heart`, `flask`, `briefcase`, `book`, `star`, `globe`

### `mbkm_content`
```json
{
  "description": {
    "id": "Program MBKM memfasilitasi mahasiswa Teknik Logistik...",
    "en": "MBKM program enables Logistics Engineering students..."
  },
  "programs": [
    {
      "title": { "id": "Magang Industri Bersertifikat", "en": "Certified Industry Internships" },
      "description": { "id": "...", "en": "..." }
    },
    {
      "title": { "id": "Pertukaran Mahasiswa", "en": "Student Exchange" },
      "description": { "id": "...", "en": "..." }
    }
  ]
}
```

---

## 5. Filament Resource Index

| Resource | Model | Nav Group | Nav Sort | Table Key Fields |
|---|---|---|---|---|
| NewsResource | News | Konten Utama | 1 | title_id, category, status, is_featured, published_at |
| ActivityResource | Activity | Konten Utama | 2 | title_id, type, date, is_featured |
| AchievementResource | Achievement | Konten Utama | 3 | title_id, level, date, holder |
| GalleryResource | Gallery | Konten Utama | 4 | image, title_id, category, order, is_published |
| LecturerResource | Lecturer | Akademik | 1 | photo, name, nidn, functional_position, is_active, order |
| CourseResource | Course | Akademik | 2 | code, name_id, semester, sks, type, is_signature |
| LabResource | Lab | Akademik | 3 | name, focus, order |
| StatResource | Stat | Umum | 1 | metric, value, label_id, order |
| PartnerResource | Partner | Umum | 2 | name, logo, type, order |
| FaqResource | Faq | Pengaturan | 2 | question_id, category, order, is_active |
| SettingResource | Setting | Pengaturan | 3 | key, value (raw JSON) |

**Custom Page:**
| Page | Nav Group | Nav Sort | Manages |
|---|---|---|---|
| WebsiteSettings | Pengaturan | 1 | 13 Setting keys via bilingual form |

---

## 6. File Structure Map

```
app/
├── Filament/
│   ├── Pages/
│   │   └── WebsiteSettings.php         ← Custom Livewire page, 13 Setting keys
│   ├── Resources/
│   │   ├── Achievements/               ← AchievementResource + Form/Table/Pages
│   │   ├── Activities/                 ← ActivityResource
│   │   ├── Courses/                    ← CourseResource
│   │   ├── Faqs/                       ← FaqResource
│   │   ├── Galleries/                  ← GalleryResource
│   │   ├── Labs/                       ← LabResource
│   │   ├── Lecturers/                  ← LecturerResource (+ education/teaching repeaters)
│   │   ├── News/                       ← NewsResource
│   │   ├── Partners/                   ← PartnerResource
│   │   ├── Settings/                   ← SettingResource (raw JSON, advanced use)
│   │   └── Stats/                      ← StatResource
│   └── Widgets/
│       ├── ContentOverviewWidget.php   ← Dashboard: 7 real-time counts
│       ├── LatestNewsWidget.php        ← Dashboard: tabel 5 berita terbaru
│       └── DraftNewsWidget.php         ← Dashboard: tabel draft berita
├── Http/Controllers/
│   ├── HomeController.php              ← Serves /  (aggregates multiple sources)
│   └── PageController.php             ← Serves all other public pages
├── Models/
│   ├── Achievement.php  Activity.php  Course.php
│   ├── Faq.php  Gallery.php  Lab.php  Lecturer.php
│   ├── News.php  Partner.php  Setting.php  Stat.php
│   └── User.php
└── Providers/Filament/
    └── AdminPanelProvider.php          ← Panel config, colors, fonts, widgets

resources/
├── js/
│   ├── contexts/LocaleContext.tsx      ← ID/EN toggle (localStorage)
│   ├── Layouts/MainLayout.tsx          ← Shared Navbar + Footer
│   └── Pages/                         ← All public Inertia pages
│       ├── Home.tsx
│       ├── About.tsx  Accreditation.tsx  Curriculum.tsx
│       ├── Lecturers.tsx
│       ├── NewsList.tsx  NewsDetail.tsx
│       ├── Gallery.tsx  AchievementsList.tsx  ActivitiesList.tsx
│       ├── LabsList.tsx  Partnerships.tsx
│       ├── Research.tsx  Mbkm.tsx
│       ├── Statistics.tsx  Faq.tsx  Contact.tsx
│       └── ...
└── views/filament/pages/
    └── website-settings.blade.php      ← Alpine.js tabbed form for WebsiteSettings

database/
├── migrations/                         ← 15 migrations, all run
└── seeders/
    ├── DatabaseSeeder.php              ← Entry point, calls all seeders
    ├── AdminSeeder.php                 ← admin@proditl.ac.id / admin123
    ├── HomeContentSeeder.php           ← Seeds all 13 Setting keys + content
    ├── GallerySeeder.php               ← 8 gallery placeholder rows
    └── FaqSeeder.php                   ← 7 bilingual FAQ rows
```

---

## 7. Integration Checklist

| Halaman | Route | DB/Admin Source | Bilingual | Status |
|---------|-------|----------------|-----------|--------|
| Home | `/` | ✅ Multi-source | ✅ | ✅ Lengkap |
| Profil / About | `/profil` | ✅ Setting: about_content, greeting, distinctiveness | ✅ | ✅ Lengkap |
| Akreditasi | `/profil/akreditasi` | ✅ Setting: accreditation | ✅ | ✅ Lengkap |
| Kurikulum | `/kurikulum` | ✅ CourseResource | ✅ | ✅ Lengkap |
| Dosen & Staf | `/dosen` | ✅ LecturerResource | ✅ | ✅ Lengkap |
| Berita | `/berita` | ✅ NewsResource | ✅ | ✅ Lengkap |
| Detail Berita | `/berita/{slug}` | ✅ NewsResource | ✅ | ✅ Lengkap |
| Galeri Foto | `/galeri` | ✅ GalleryResource | ✅ | ✅ Lengkap |
| Prestasi | `/prestasi` | ✅ AchievementResource | ✅ | ✅ Lengkap |
| Agenda Kegiatan | `/agenda` | ✅ ActivityResource | ✅ | ✅ Lengkap |
| Laboratorium | `/laboratorium` | ✅ LabResource | ✅ | ✅ Lengkap |
| Kemitraan | `/kemitraan` | ✅ PartnerResource | ✅ | ✅ Lengkap |
| Riset & PKM | `/riset` | ✅ Setting: research_areas | ✅ | ✅ Lengkap |
| MBKM | `/mbkm` | ✅ Setting: mbkm_content | ✅ | ✅ Lengkap |
| Statistik | `/statistik` | ✅ StatResource + tracer_stats | ✅ | ✅ Lengkap |
| FAQ | `/faq` | ✅ FaqResource | ✅ | ✅ Lengkap |
| Kontak | `/kontak` | ✅ Setting: contact, site_meta, socials | ✅ | ✅ Lengkap |

---

## 8. Admin Access

- **URL:** `/admin`
- **Email:** `admin@proditl.ac.id`
- **Password:** `admin123`
- Untuk reset: `php artisan db:seed --class=AdminSeeder`

---

## 9. Design Identity (Nawasena Sancaya)

Admin panel mengikuti identitas visual yang sama dengan halaman publik:

| Token | Hex | Penggunaan |
|-------|-----|-----------|
| amber-500 | `#D99F60` | Primary color, accent |
| brand-700 | `#8C6441` | Active nav, headings |
| brand-800 | `#6E4E33` | Logo, dark headings |
| surface-0 | `#FFFDFB` | Card/sidebar background |
| surface-50 | `#ECEBE9` | Body background |
| navy-700 | `#505666` | Nav item text |
| ink-900 | `#24141F` | Dark text |

Font: **Fraunces** (headings/logo) · **Plus Jakarta Sans** (body/UI)

CSS diinjeksi via `panels::styles.after` renderHook di `AdminPanelProvider.php`.

---

*Last updated: 2026-06-22 — Dokumen ini di-generate otomatis dari eksplorasi kodebase.*
