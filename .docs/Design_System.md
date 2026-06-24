# Design System & Panduan Pengembangan UI
## Program Studi Teknik Logistik — "Nawasena Sancaya" Identity

Dokumen ini adalah **panduan wajib** untuk pengembangan dan penyeragaman desain seluruh halaman publik maupun admin. Gunakan Beranda (`/`) sebagai patokan visual tertinggi — setiap halaman lain harus diangkat mendekati kualitas dan kedalaman visual yang sama.

---

## Daftar Isi

1. [Design Tokens](#1-design-tokens)
2. [Tipografi](#2-tipografi)
3. [Komponen Animasi](#3-komponen-animasi)
4. [Pola Layout](#4-pola-layout)
5. [Pola Hero & Page Header](#5-pola-hero--page-header)
6. [Rekomendasi Latar Belakang & Foto per Halaman](#6-rekomendasi-latar-belakang--foto-per-halaman)
7. [Audit Status & Roadmap per Halaman](#7-audit-status--roadmap-per-halaman)
8. [Panduan Halaman Admin](#8-panduan-halaman-admin)
9. [Checklist Sebelum Merge](#9-checklist-sebelum-merge)

---

## 1. Design Tokens

### Warna (Tailwind `theme.extend.colors`)

```js
colors: {
  amber:   { 500: '#D99F60', 600: '#C08A4C' },
  brand:   { 700: '#8C6441', 800: '#6E4E33' },
  cream:   { 300: '#AC9587' },
  surface: { 0: '#FFFDFB', 50: '#ECEBE9' },
  navy:    { 700: '#505666' },
  ink:     { 900: '#24141F' },
}
```

### Aturan Penggunaan Warna

| Konteks | Token | Hex |
|---|---|---|
| Background halaman default | `surface-0` | `#FFFDFB` |
| Background section alternating | `surface-50` | `#ECEBE9` |
| Teks body | `navy-700` | `#505666` |
| Teks heading | `ink-900` | `#24141F` |
| Aksen primer (CTA, badge) | `brand-700` | `#8C6441` |
| Aksen hover / dark CTA | `brand-800` | `#6E4E33` |
| Aksen golden (label dekoratif, ikon) | `amber-500` | `#D99F60` |
| Border default | `cream-300/20` | `rgba(172,149,135,0.20)` |
| Border focus | `brand-700` | `#8C6441` |
| Teks putih hanya di atas | `brand-700+` atau image scrim ≥45% | — |

**Larangan keras:** tidak ada biru, ungu, atau gradien biru-ungu di mana pun. Satu-satunya "biru" yang diizinkan adalah `navy-700` (#505666) untuk teks body.

### Overlay & Scrim

```
Dark section scrim : rgba(36,20,31,0.88)   — untuk foto hero full
Medium scrim       : rgba(36,20,31,0.65)   — untuk modal backdrop
Light scrim        : rgba(36,20,31,0.45)   — untuk card image overlay
Blur backdrop      : backdrop-filter: blur(8px) — selalu menyertai scrim modal
```

---

## 2. Tipografi

### Font Families

| Peran | Font | Fallback |
|---|---|---|
| Display / Heading | Fraunces (serif) | Georgia, serif |
| Body / UI | Plus Jakarta Sans | Inter, sans-serif |

Hanya dua font. Tidak boleh menambah font ketiga.

### Scale

| Elemen | Class | Ukuran |
|---|---|---|
| H1 halaman | `font-display text-4xl sm:text-5xl font-semibold` | clamp(2.5rem, 5vw, 4rem) |
| H2 section | `font-display text-3xl font-bold` | — |
| H3 card | `font-display text-xl font-semibold` | — |
| Body | `text-base leading-relaxed` | 1rem, line-height 1.6 |
| Caption / meta | `text-xs` | 0.75rem |
| Label badge (uppercase) | `text-[9px] font-bold tracking-[0.20em] uppercase` | — |

**Larangan:** jangan justify body text, jangan font-size di bawah 9px untuk teks yang harus dibaca.

---

## 3. Komponen Animasi

### `<Reveal>` — Komponen Utama

File: `resources/js/components/Reveal.tsx`

```tsx
<Reveal variant="fade-up" delay={0.1}>
  {/* konten */}
</Reveal>
```

**Props:**

| Prop | Default | Keterangan |
|---|---|---|
| `variant` | `"fade-up"` | `"fade-up"`, `"fade-down"`, `"fade-left"`, `"fade-right"`, `"zoom-in"` |
| `delay` | `0` | Detik (float). Stagger per item: `delay={index * 0.06}` |
| `y` | `40` | Jarak gerak vertikal (px) untuk fade-up/down |
| `threshold` | `0.12` | 12% elemen terlihat untuk trigger |

**Durasi transisi:** 1.8 detik, easing `[0.22, 1, 0.36, 1]` (custom cubic bezier — tidak boleh diubah).

**Reduced motion:** otomatis menonaktifkan animasi jika user mengaktifkan `prefers-reduced-motion`. Tidak perlu penanganan manual.

### Pola Stagger (Kartu dalam Grid)

```tsx
{items.map((item, index) => (
  <Reveal key={item.id} delay={index * 0.06} variant="fade-up">
    <Card ... />
  </Reveal>
))}
```

Gunakan `0.05`–`0.08` per item. Jangan lebih dari `0.12` agar tidak terasa lambat.

### Animasi Scroll Parallax (`framer-motion`)

Digunakan di: Hero (3-layer), KaprodiGreeting (portrait drift).

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const yBg  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
const yText = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
```

Terapkan parallax pada: setiap hero halaman yang menggunakan foto penuh.

### Accordion / Expandable (`AnimatePresence`)

```tsx
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.24, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      {/* konten tersembunyi */}
    </motion.div>
  )}
</AnimatePresence>
```

Digunakan di: FAQ, Teaching History modal dosen, Struktur Kurikulum.

### Hover Elevation (Card)

```tsx
className="transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(36,20,31,0.18)]"
```

Terapkan pada semua kartu yang bisa diklik / dibuka.

### Modal (Spring Physics)

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.90, y: 28 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.90, y: 28 }}
  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
>
```

---

## 4. Pola Layout

### Container Width

```tsx
// Halaman konten teks-berat (About, Curriculum, FAQ, Contact)
<div className="mx-auto max-w-[1000px] px-6">

// Halaman visual grid (Gallery, Achievements, News, Partners)
<div className="mx-auto max-w-[1100px] px-6">

// Halaman dosen & halaman khusus
<div className="mx-auto max-w-[1200px] px-6">
```

### Section Spacing

```
Padding vertikal antar section besar : py-20 sm:py-28
Padding vertikal section dalam card  : p-6 md:p-8
Gap antar kartu                      : gap-6
Gap antar elemen dalam card          : gap-4
```

### Asimetri (Non-negotiable)

Jangan layout centered-everything simetris. Gunakan asymmetric split:

```tsx
// Contoh: 7 kolom teks, 5 kolom gambar
<div className="grid grid-cols-12 gap-8">
  <div className="col-span-12 md:col-span-7"> {/* teks */} </div>
  <div className="col-span-12 md:col-span-5"> {/* gambar */} </div>
</div>

// Mirror untuk section berikutnya
<div className="col-span-12 md:col-span-5"> {/* gambar kiri */} </div>
<div className="col-span-12 md:col-span-7"> {/* teks kanan */} </div>
```

### Dark Section Band

Gunakan untuk memecah monotoni putih di tengah halaman:

```tsx
<section style={{ background: '#24141F' }} className="py-20 sm:py-28">
  {/* konten dengan teks putih */}
</section>
```

Selalu letakkan gradient bridge di atas dan bawah dark section:

```tsx
{/* Bridge masuk ke dark */}
<div className="h-6" style={{ background: 'linear-gradient(to bottom, #FFFDFB, #24141F)' }} />
<section style={{ background: '#24141F' }} className="...">...</section>
{/* Bridge keluar dari dark */}
<div className="h-6" style={{ background: 'linear-gradient(to bottom, #24141F, #FFFDFB)' }} />
```

### Pill Label (Section Identifier)

```tsx
<span className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
  style={{ background: 'rgba(140,100,65,0.12)', color: '#8C6441' }}>
  Tentang Kami
</span>
```

Gunakan di setiap section heading sebagai identitas. Jangan emoji.

### Card Standar

```tsx
<div className="rounded-2xl border bg-surface-0 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-md"
  style={{ borderColor: 'rgba(172,149,135,0.20)' }}>
```

### Featured Card (Kaprodi, highlight utama)

```tsx
<div className="rounded-3xl border shadow-lg"
  style={{ borderColor: 'rgba(172,149,135,0.25)', background: 'rgba(255,253,251,0.80)', backdropFilter: 'blur(16px)' }}>
```

---

## 5. Pola Hero & Page Header

### Hero Cinematic (Level 1 — Beranda & Halaman Utama Fitur)

Untuk halaman yang butuh impact visual tinggi. Menggunakan foto penuh dengan parallax.

```tsx
<section className="relative min-h-screen overflow-hidden" style={{ background: '#24141F' }}>
  {/* Layer 1: Background foto dengan parallax */}
  <motion.div className="absolute inset-0" style={{ y: yBg }}>
    <img src={photo} className="size-full object-cover" style={{ opacity: 0.45 }} />
  </motion.div>

  {/* Layer 2: Scrim gradient bawah */}
  <div className="absolute inset-0 pointer-events-none"
    style={{ background: 'linear-gradient(to top, rgba(36,20,31,0.95) 0%, rgba(36,20,31,0.3) 60%, transparent 100%)' }} />

  {/* Layer 3: Konten teks */}
  <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-40 pb-24">
    <Reveal variant="fade-up">
      <span className="pill-label">Label Section</span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-4">Judul</h1>
      <p className="mt-4 text-lg" style={{ color: 'rgba(172,149,135,0.9)' }}>Deskripsi</p>
    </Reveal>
  </div>
</section>
```

**Cocok untuk:** Berita, Galeri, Laboratorium, Riset, Prestasi, Agenda, MBKM.

### Page Header Minimal (Level 2 — Halaman Konten)

Untuk halaman yang lebih content-centric dan tidak butuh foto hero besar.

```tsx
<div className="mx-auto max-w-[1000px] px-6 pt-32 pb-12">
  <Reveal variant="fade-up">
    <span className="pill-label">Akademik</span>
    <h1 className="font-display mt-4 text-4xl sm:text-5xl font-semibold" style={{ color: '#24141F' }}>
      Judul Halaman
    </h1>
    <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: '#505666' }}>
      Deskripsi singkat halaman.
    </p>
  </Reveal>
</div>
```

**Cocok untuk:** Kurikulum, FAQ, Kontak, Statistik, Kemitraan.

### Page Header dengan Foto Split (Level 1.5)

Untuk halaman yang butuh visual tapi tidak full-screen.

```tsx
<div className="grid grid-cols-12 gap-8 items-center pt-32 pb-16">
  <div className="col-span-12 md:col-span-7">
    {/* Teks + pill label */}
  </div>
  <div className="col-span-12 md:col-span-5">
    <div className="aspect-[4/3] overflow-hidden rounded-3xl">
      <img src={photo} className="size-full object-cover" />
    </div>
  </div>
</div>
```

**Cocok untuk:** Profil, Kurikulum, Kemitraan.

---

## 6. Rekomendasi Latar Belakang & Foto per Halaman

### Konsep Foto

Semua foto harus merepresentasikan dunia **Teknik Logistik / Supply Chain Digital**. Kategori foto yang relevan:

| Kategori | Kata Kunci Pencarian |
|---|---|
| Operasional logistik | warehouse, forklift, shipping containers, cargo handling |
| Teknologi & data | supply chain dashboard, IoT sensors, data analytics, digital logistics |
| Aktivitas kampus | lecture hall, students working, laboratory, workshop |
| Industri | port operations, fleet management, cold chain, last-mile delivery |
| Kolaborasi | business meeting, handshake, partnership, seminar |

> Untuk produksi: gunakan foto asli dari kegiatan Prodi. Foto Unsplash digunakan sebagai placeholder sementara.

---

### Per Halaman: Status & Rekomendasi

#### `/` — Beranda (REFERENSI UTAMA ✅)

**Status:** Sudah lengkap. Ini adalah patokan.

**Background per section:**
- Hero: foto slideshow logistik (warehouse, cargo, supply chain) — dark overlay 45%
- Stats Strip: `brand-800` (#6E4E33) solid dark
- Distinctiveness: `surface-50` (#ECEBE9) warm off-white
- Kaprodi Greeting: `surface-0` dengan foto portrait dosen
- Featured Carousel: `ink-900` (#24141F) full dark immersive
- Latest News: `surface-0`
- Partners Marquee: `surface-50`
- Ambient Band: foto paralaks dekoratif dengan heavy scrim
- Admission CTA: `brand-700` atau foto kampus dengan scrim

---

#### `/profil` — Tentang Prodi (PERLU UPGRADE ⚠️)

**Status saat ini:** Baik, tapi header polos tanpa foto.

**Yang perlu ditambahkan:**
- Hero Level 1.5: split 7-5 dengan foto dosen/lab/kampus di kanan
- Section Visi-Misi sudah punya dark card (`brand-800`) — pertahankan
- Tambahkan section `Sejarah` dengan foto arsip kampus Telkom di background

**Rekomendasi foto:**
- Header split: foto mahasiswa di lab logistik atau foto kampus Telkom
- Section akreditasi: foto sertifikat / kegiatan penilaian IABEE
- Section visi-misi: foto abstrak/aerial kota dan rantai pasok

**Animasi yang perlu ditambahkan:**
- Reveal pada setiap card akreditasi (fade-left / fade-right alternating)
- Parallax ringan pada section sejarah

---

#### `/kurikulum` — Kurikulum & Mata Kuliah (PERLU UPGRADE ⚠️)

**Status saat ini:** Sangat polos. Table-heavy, hampir tanpa visual.

**Yang perlu ditambahkan:**
- Page Header Level 2 dengan pill label "Akademik"
- Dark section band sebelum tabel Struktur Kurikulum dengan teks pengantar
- Tambahkan foto (buku kurikulum, kelas, atau infografis) di atas tabel

**Rekomendasi foto & background:**
- Header: ilustrasi abstrak curriculum/course structure (minimal, warm tones)
- Section "Profil Lulusan": foto wisuda atau foto alumni di tempat kerja + scrim ringan
- Section PEO/PLO: `surface-50` dengan border highlight brand-700

**Animasi yang perlu ditambahkan:**
- Reveal pada setiap section (saat ini sudah ada beberapa)
- Highlight row aktif pada tabel saat hover (sudah ada `hover:bg-amber-500/4`)
- Tambahkan stagger reveal pada baris tabel saat semester di-expand

---

#### `/berita` — Berita & Artikel (PERLU UPGRADE ⚠️)

**Status saat ini:** Grid kartu berita — moderate.

**Yang perlu ditambahkan:**
- Hero Level 1 dengan foto "orang membaca berita / konferensi pers" — dark cinematic
- Filter kategori pill yang sudah ada di Gallery — terapkan di sini
- Tambahkan "Berita Unggulan" (featured news card besar) di atas grid

**Rekomendasi foto & background:**
- Hero: foto seminar / press conference logistik — gelap dramatis
- Featured news card: foto berita unggulan full-bleed dengan scrim bawah + judul overlay
- Grid kartu: foto thumbnail per berita

**Animasi:**
- Reveal stagger pada grid kartu
- Featured card hover elevation

---

#### `/berita/{slug}` — Detail Berita (MODERATE ✅)

**Status saat ini:** Sudah baik. Prose-focused dengan accent brand colors.

**Yang perlu ditambahkan:**
- Foto featured image sudah ada, tapi tambahkan parallax ringan pada foto tersebut
- "Reading progress bar" tipis (brand-700) di atas halaman saat scroll
- Tambahkan pill label kategori yang lebih menonjol

**Animasi:**
- Tambahkan parallax pada featured image (faktor rendah: `y: ['0%', '10%']`)

---

#### `/galeri` — Galeri Foto (BAIK ✅)

**Status saat ini:** Sudah baik. Photo-focused dengan lightbox.

**Yang perlu ditambahkan:**
- Hero Level 1 sederhana (bukan full-screen): header gelap dengan foto kolase 3-4 gambar kecil sebagai background dekoratif
- Atau: overlay teks di atas mosaic foto blur

**Rekomendasi background header:**
- Mosaic/collage foto dari galeri itu sendiri (4 foto, masing-masing opacity 30%, blur 4px)
- Teks heading putih di atas

---

#### `/prestasi` — Prestasi & Penghargaan (PERLU UPGRADE ⚠️)

**Status saat ini:** List kartu vertikal — moderate.

**Yang perlu ditambahkan:**
- Hero Level 1: foto mahasiswa menerima trophy / podium wisuda dengan dark overlay — sangat impactful
- Stats row sebelum list: "5 Juara Internasional | 12 Penghargaan Nasional | dll" — gunakan StatsStrip atau variasi-nya
- "Achievement of the Year" featured card besar di atas

**Rekomendasi foto:**
- Hero: foto kompetisi/penghargaan — gelap dramatis dengan amber accent di teks
- Featured achievement: foto dokumentasi penghargaan paling bergengsi

**Animasi:**
- Reveal pada hero + stats row + featured card
- Stagger reveal sudah ada pada list kartu

---

#### `/agenda` — Agenda & Kegiatan (PERLU UPGRADE ⚠️)

**Status saat ini:** Grid kartu kegiatan — moderate.

**Yang perlu ditambahkan:**
- Hero Level 1: foto kegiatan kampus (seminar, workshop) — cinematic
- Section "Kegiatan Mendatang" (upcoming) vs "Kegiatan Lalu" (past) — split dengan dark band
- Timeline visual untuk kegiatan mendatang

**Rekomendasi foto:**
- Hero: foto seminar atau workshop mahasiswa logistik
- Background section past events: `surface-50` dengan slight opacity foto dekoratif

---

#### `/laboratorium` — Laboratorium & Fasilitas (PERLU UPGRADE ⚠️)

**Status saat ini:** Belum jelas implementasinya sebagai halaman mandiri.

**Rekomendasi desain:**
- Hero Level 1: foto interior lab (robotics, warehouse simulation, data analytics) — sangat impactful
- Grid lab: kartu besar (bento) dengan foto tiap lab + nama + deskripsi singkat
- Section detail tiap lab (expandable atau link ke anchor): foto + deskripsi + peralatan + PJ Lab

**Rekomendasi foto:**
- Hero: foto lab terbaik (paling modern, paling impresif)
- Kartu tiap lab: foto interior lab masing-masing
- Background alternating: dark band dengan foto lab ke-2 sebagai ambient background

---

#### `/kemitraan` — Kemitraan Industri & Akademik (PERLU UPGRADE ⚠️)

**Status saat ini:** Text-heavy, sangat polos.

**Yang perlu ditambahkan:**
- Hero Level 1.5: header split dengan foto "business partnership / handshake" di kanan
- Section "Mitra Industri" vs "Mitra Akademik" — pisahkan dengan dark band atau tab
- Logo partner: tampilkan logo (jika ada) di dalam card, bukan hanya teks nama
- Stats "30+ Mitra Industri | 15+ Mitra Akademik" di bawah hero

**Rekomendasi foto:**
- Header: foto rapat MoU, handshake, atau company visit
- Background section industri: foto warehouse/pabrik dengan scrim ringan (opacity 8%)

---

#### `/riset` — Penelitian (MODERATE ✅)

**Status saat ini:** Grid kartu dengan category color pills — sudah cukup baik.

**Yang perlu ditambahkan:**
- Hero Level 1: foto penelitian/laboratorium data — dark cinematic
- Stats row: "25 Penelitian Aktif | 8 Publikasi Internasional | 3 HKI"

**Rekomendasi foto:**
- Hero: foto dosen di depan whiteboard/komputer — penelitian atmosfer

---

#### `/dosen` — Dosen & Staf Akademik (BERWARNA ✅)

**Status saat ini:** Sudah baik dengan modal detail yang kaya.

**Yang perlu ditambahkan:**
- Hero / page header yang lebih berkarakter — saat ini hanya H1 polos
- Tambahkan foto kampus atau foto dosen bersama sebagai background header (full-width, dark overlay)
- Subtle texture atau pattern di background section staff (bukan polos putih)

**Rekomendasi foto:**
- Header: foto "all faculty" atau foto kampus Telkom dari luar — gelap dengan amber teks
- Background section Kaprodi: `surface-50` atau warm cream sedikit berbeda dari putih

---

#### `/faq` — FAQ (SEDANG ✅)

**Status saat ini:** Accordion dengan amber accents — sudah cukup.

**Yang perlu ditambahkan:**
- Page header sedikit lebih berkarakter: tambahkan foto atau ilustrasi ringan di samping heading
- Tambahkan CTA di bagian bawah: "Masih ada pertanyaan? Hubungi kami →"

---

#### `/kontak` — Hubungi Kami (SEDANG ✅)

**Status saat ini:** Form + info cards — fungsional.

**Yang perlu ditambahkan:**
- Foto gedung Telkom University atau denah lokasi di bawah section info
- Embed Google Maps atau foto lokasi kampus
- Hero header yang lebih hangat: foto reception/lobby Telkom dengan scrim

**Rekomendasi foto:**
- Header: foto pintu masuk gedung Fakultas Rekayasa Industri / Telkom University
- Di bawah form: foto kampus landscape (aerial) atau foto peta

---

#### `/statistik` — Fakta & Statistik (PERLU UPGRADE ⚠️)

**Status saat ini:** Metric cards dan chart — sangat polos.

**Yang perlu ditambahkan:**
- Dark hero band dengan big number highlight: "145 SKS | 8 Semester | 50+ Dosen"
- Section TracerChart dengan background warm cream + label penjelasan
- Infografis sederhana untuk "Sebaran Alumni" atau "Prospek Karir"

**Rekomendasi background:**
- Hero stat banner: `brand-800` dark dengan teks amber/putih
- Chart section: `surface-50` (#ECEBE9)

---

## 7. Audit Status & Roadmap per Halaman

### Skala Prioritas

| Level | Keterangan |
|---|---|
| 🔴 Urgent | Halaman sangat polos, tidak ada hero, tidak ada animasi, tidak mencerminkan identitas |
| 🟡 Moderate | Ada beberapa elemen baik tapi perlu hero upgrade dan tambahan animasi |
| 🟢 Good | Sudah berwarna, sudah ada animasi, perlu fine-tuning minor |

### Status per Halaman

| Halaman | Route | Status | Prioritas |
|---|---|---|---|
| Beranda | `/` | ✅ Referensi utama | — |
| Profil | `/profil` | 🟡 Header polos | Medium |
| Kurikulum | `/kurikulum` | 🔴 Sangat polos | **Tinggi** |
| Dosen & Staf | `/dosen` | 🟢 Baik | Low |
| Berita | `/berita` | 🟡 Perlu hero | Medium |
| Detail Berita | `/berita/{slug}` | 🟢 Baik | Low |
| Galeri | `/galeri` | 🟢 Baik | Low |
| Prestasi | `/prestasi` | 🟡 Perlu hero & stats | Medium |
| Agenda | `/agenda` | 🟡 Perlu hero | Medium |
| Laboratorium | `/laboratorium` | 🔴 Belum jelas | **Tinggi** |
| Kemitraan | `/kemitraan` | 🔴 Sangat polos | **Tinggi** |
| Riset | `/riset` | 🟢 Sudah cukup baik | Low |
| Statistik | `/statistik` | 🔴 Sangat polos | **Tinggi** |
| FAQ | `/faq` | 🟢 Sudah cukup baik | Low |
| Kontak | `/kontak` | 🟡 Perlu foto | Low |

---

## 8. Panduan Halaman Admin

Admin adalah area kerja internal — desainnya berbeda dari publik (lebih clean, fungsional) namun tetap harus konsisten dalam palet warna.

### Prinsip Desain Admin

1. **Background:** `surface-0` (#FFFDFB) untuk semua panel utama
2. **Sidebar / Section alternating:** `surface-50` (#ECEBE9)
3. **Border:** `border-cream-300/40` di semua card dan divider
4. **Aksen interaktif:** `brand-700` untuk link, hover, active state
5. **Status badges:**
   - Published/Aktif: `bg-green-100 text-green-800`
   - Draft/Nonaktif: `bg-amber-100 text-amber-800`
   - Danger/Delete: `bg-red-50 text-red-600 border border-red-200`
6. **Tidak ada parallax atau animasi scroll di halaman admin.** Animasi terbatas pada: hover state, accordion expand (AnimatePresence), dan form state transitions.

### Form Styling Standar (Admin)

```tsx
// Label
<label className="text-xs font-semibold text-navy-700">Nama Field</label>

// Input
<input className="w-full rounded-xl border border-cream-300 bg-surface-0 px-4 py-2.5 text-sm outline-none
  focus:border-brand-700 focus:ring-1 focus:ring-brand-700/20" />

// Helper text
<p className="text-xs italic text-navy-700/60">Teks bantuan</p>

// Error
<p className="text-xs font-medium text-red-600">Pesan error</p>
```

### Tab Sidebar (Settings)

```tsx
// Active tab
className="bg-amber-500 text-ink-900 shadow-sm"

// Inactive tab
className="text-navy-700 hover:bg-surface-50 hover:text-ink-900"
```

### Tombol Admin

```tsx
// Primary action (Save, Create)
className="bg-brand-700 hover:bg-brand-800 text-surface-0 rounded-full px-6 py-2.5 font-semibold"

// Secondary action (Add item, minor action)
className="bg-brand-700/8 hover:bg-brand-700/15 text-brand-700 rounded-xl px-4 py-2"

// Danger action (Delete)
className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl px-4 py-2"
```

### Konsistensi yang Harus Dijaga di Admin

| Halaman Admin | Yang Harus Disinkronkan dengan Publik |
|---|---|
| Settings (Hero) | Hero section Beranda |
| Settings (Sambutan Kaprodi) | KaprodiGreeting di Beranda & Profil |
| Settings (Profil Prodi) | Section akreditasi di `/profil` |
| Settings (Distinctiveness) | Distinctiveness section di Beranda |
| Lecturers CRUD | Modal dosen di `/dosen` |
| News CRUD | Grid & detail berita di `/berita` |
| Stats CRUD | StatsStrip di Beranda & `/profil` |
| Galleries CRUD | Grid galeri di `/galeri` |

---

## 9. Checklist Sebelum Merge

Gunakan checklist ini setiap kali menyelesaikan halaman baru atau update halaman yang sudah ada:

### Visual

- [ ] Halaman menggunakan warna dari token resmi (tidak ada hex random di luar token)
- [ ] Tidak ada ungu, biru, atau gradien biru-ungu
- [ ] Teks putih hanya di atas `brand-700+` atau di atas foto dengan scrim ≥45%
- [ ] Font: hanya Fraunces (heading) dan Plus Jakarta Sans (body)
- [ ] Ada pill label di atas setiap H2 section heading
- [ ] Layout tidak center-everything simetris — ada asimetri (split kolom, bento, dll.)

### Animasi

- [ ] Setiap section heading dibungkus `<Reveal>`
- [ ] Setiap grid card menggunakan `delay={index * 0.06}` stagger
- [ ] Accordion / expandable menggunakan `AnimatePresence` dengan height+opacity
- [ ] Card hover menggunakan `-translate-y-2` dan `shadow` elevation
- [ ] Modal menggunakan spring physics (stiffness: 300, damping: 28)
- [ ] `prefers-reduced-motion` otomatis ditangani oleh `<Reveal>` — tidak perlu penanganan manual

### Foto & Background

- [ ] Setiap halaman punya setidaknya satu foto bermakna (bukan hanya ikon/teks)
- [ ] Foto hero menggunakan `fetchpriority="high"` dan dipreload
- [ ] Foto di bawah fold menggunakan `loading="lazy"`
- [ ] Foto yang menggunakan overlay dark: scrim ≥45% agar teks terbaca
- [ ] Alt text disi untuk setiap gambar

### Aksesibilitas

- [ ] Contrast ratio teks ≥ 4.5:1 (WCAG 2.1 AA)
- [ ] Focus ring terlihat pada semua elemen interaktif
- [ ] Carousel/lightbox dapat dioperasikan dengan keyboard
- [ ] `lang` attribute sudah sesuai locale aktif

### Bilingual

- [ ] Semua teks UI tersedia dalam bahasa ID dan EN
- [ ] Toggle bahasa tidak ada mixed-language dalam satu view
- [ ] String EN diuji untuk wrap (20-30% lebih panjang dari ID)

### Performa

- [ ] LCP image preloaded (`fetchpriority="high"`)
- [ ] Gambar besar menggunakan format WebP
- [ ] Animasi dinonaktifkan saat elemen off-screen (IntersectionObserver via `<Reveal>`)

---

*Dokumen ini harus diperbarui setiap kali ada perubahan pada design system atau penambahan pola baru. Terakhir diperbarui: Juni 2026.*
