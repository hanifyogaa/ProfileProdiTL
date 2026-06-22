# Main Page (Home) Plan
## Website Teknik Logistik · Digital Supply Chain — FRI Telkom University (Redesign)

**Companion to:** PRD.md, UI_UX_Plan.md
**Route:** `/`
**Priority:** Built first (Day 2) for stakeholder demo.
**Audience:** All public personas at once — prospective students (aspiration), parents (reassurance), accreditation assessors (evidence).
**Language:** Bilingual ID/EN (toggle in navbar). Copy below is provided in both; ID is default.

> **Content status:** Real content is drawn from the current site (Kaprodi greeting, e-logistik specialization, 145 SKS / 8 semesters, industry visits, SMB admission link). Stats are **aspirational placeholders** flagged `[REVISI]` for stakeholder confirmation. Media is **mixed real + placeholder**.

---

## 1. The Home Page's Job

In one scroll, a visitor should grasp: **what** the program is (e-logistik, IT-based), **why it's credible** (accreditation, Telkom/BUMN backing, industry partners), **what's alive** (news, activities, achievements), **what graduates become** (career outcomes), and **how to apply** (SMB).

- **Primary CTA:** "Daftar Sekarang" / "Apply Now" → `https://smb.telkomuniversity.ac.id/`
- **Secondary CTA:** "Jelajahi Program" / "Explore the Program" → scrolls to About / links to `/profil`.

**Narrative arc:** Aspiration (hero) → Distinctiveness (e-logistik) → Trust (stats, greeting) → Proof (news, achievements, outcomes) → Conversion (admission CTA).

---

## 2. Section Order (top → bottom)

| # | Section | Serves | Motion |
|---|---|---|---|
| 1 | Navbar | all | Transparent → solid on scroll |
| 2 | Hero | student (aspire) | Parallax (3 layers) + Ken Burns |
| 3 | Stats strip | parent + assessor (evidence) | Count-up on scroll-in |
| 4 | Why e-logistik (distinctiveness) | student + parent | Fade/slide-in |
| 5 | Kaprodi greeting | parent + assessor | Static, portrait + quote |
| 6 | Featured carousel (highlights) | all | Embla, autoplay 6s |
| 7 | Latest news & activities | student | Hover lift |
| 8 | Curriculum snapshot | student + assessor | Static |
| 9 | Career prospects / graduate profile | student + parent | Reveal |
| 10 | Achievements | all | Peek carousel |
| 11 | Tracer-study chart | parent + assessor | Animate-in once |
| 12 | Labs & facilities | student + assessor | Parallax-lite |
| 13 | Industry & academic partners | parent + assessor | Slow marquee |
| 14 | Admission CTA band | student | Static, bold |
| 15 | Footer | all | — |

> Rhythm rule: alternate full-bleed → contained → offset. Never stack identical centered sections (the old site's slideshow problem).

---

## 3. Section-by-Section Spec (with real bilingual copy)

### 3.1 Navbar
- Sticky. Transparent over hero → `surface-0` + soft shadow after ~80px.
- Left: dual lockup **"Teknik Logistik · Digital Supply Chain"** + Telkom mark.
- Center-right: Beranda · Profil · Kurikulum · Dosen · Berita · Galeri · Statistik · Kontak.
- Right: **ID/EN toggle** + search icon.
- Mobile: hamburger → slide-in drawer (brand-800 bg, cream links).

### 3.2 Hero
- **Layout:** asymmetric — text left (7 cols), animated photo stack right (5 cols). Mobile: stacked, text first.
- **Eyebrow pill (ID):** "Fakultas Rekayasa Industri · Telkom University"
- **H1 (ID):** "Teknik Logistik berbasis IT, dirancang untuk masa depan rantai pasok."
  **H1 (EN):** "IT-based Logistics Engineering, built for the future of supply chains."
- **Subhead (ID):** "Program Studi S1 Teknik Logistik dengan warna keilmuan e-logistik — memadukan rekayasa industri, teknologi informasi, dan manajemen rantai pasok digital."
  **Subhead (EN):** "An undergraduate Logistics Engineering program with an e-logistics focus — combining industrial engineering, information technology, and digital supply chain management."
- **CTAs:** Primary pill "Daftar Sekarang" / "Apply Now" → SMB. Secondary outline "Jelajahi Program" / "Explore the Program".
- **Media:** real cut-out photo of students/lab (front layer) + amber gradient + texture. Ken Burns + scroll parallax. Static fallback on reduced-motion.

### 3.3 Stats Strip  `[REVISI — angka placeholder]`
- Full-bleed brand-800 band, cream text. 4 metrics, count-up on scroll-in:
  - **Akreditasi:** "Unggul" `[REVISI]`  /  label ID "Akreditasi" · EN "Accreditation"
  - **145** "SKS · 8 Semester"  /  "Credits · 8 Semesters"  *(real)*
  - **30+** "Mitra Industri" `[REVISI]`  /  "Industry Partners"
  - **90%+** "Lulusan Terserap < 6 Bulan" `[REVISI]`  /  "Graduates Employed < 6 Months"
- Data from `stats` table (admin-managed). Reduced-motion → shows final value.

### 3.4 Why e-logistik (Distinctiveness)
- Contained, asymmetric. Heading ID "Apa yang membuat kami berbeda" / EN "What makes us different".
- **Body (ID):** "Keunggulan kami adalah warna keilmuan *e-logistik* — dipilih karena dukungan PT Telkom Indonesia sebagai BUMN platform telekomunikasi. Kami mengembangkan sistem logistik masa kini dan masa depan: dari rantai pasok digital, analitik data, hingga otomasi gudang."
- **Body (EN):** "Our edge is an *e-logistics* specialization — chosen thanks to PT Telkom Indonesia, the state-owned telecommunications platform. We build the logistics systems of today and tomorrow: digital supply chains, data analytics, and warehouse automation."
- Three honest sub-points (not 3 identical glass cards — vary sizes/bento): **Digital Supply Chain · Logistics Analytics · Automation & Systems**. Link: "Tentang program →" / "About the program →" → `/profil`.

### 3.5 Kaprodi Greeting (Sambutan)
- Offset card: portrait left, quote right (or stacked on mobile).
- **Quote (ID):** "Selamat datang di Program Studi S1 Teknik Logistik Universitas Telkom. Kurikulum kami dirancang 145 SKS dalam delapan semester, memadukan matematika dan ilmu dasar, pendidikan umum, dan topik keteknikan logistik."
- **Quote (EN):** parity translation.
- Attribution: "Kepala Program Studi" / "Head of Program". Link "Baca selengkapnya →" / "Read more →" → `/profil` (HoP greeting). *(Confirm current Kaprodi name/photo with stakeholder.)*

### 3.6 Featured Carousel (Highlights)
- Embla, large editorial slides: photo + caption + link, autoplay 6s, pause on hover/focus, dots + arrows, swipe.
- Seed slides from real activities: **Kunjungan Industri PT HAVI Logistics**, **Workshop ASEAN Logistics Business Readiness**, **Kunjungan PT Pertamina RU V Balikpapan**, **Kunjungan PT Garuda Food**. Source: featured `activities`/`news`.

### 3.7 Latest News & Activities
- Heading "Berita & Kegiatan" / "News & Activities" + "Semua berita →" / "All news →".
- Bento grid of 3–4 cards (vary sizes — not 3 identical): image, category chip, title, date, excerpt. Hover: lift + image zoom. Source: latest published `news`.

### 3.8 Curriculum Snapshot
- "Kurikulum" / "Curriculum". Snapshot: **145 SKS · 8 semester**, course-type split (wajib/pilihan), 3–4 signature courses as chips (e.g., Digital Supply Chain, Logistics Systems Modeling, Warehouse & Inventory). Buttons: "Lihat kurikulum" / "View curriculum" → `/kurikulum`; "Unduh PDF" / "Download PDF".

### 3.9 Career Prospects / Graduate Profile
- "Prospek Karier" / "Career Prospects". From current site's graduate profile: lulusan berkontribusi sebagai **tenaga profesional (analis, engineer, manajer), akademisi/peneliti, dan wirausahawan** di bidang logistik berbasis IT.
- Present as 3 role tracks (vary layout). EN parity. Link → `/academic/graduate-profile` equivalent (`/profil` or dedicated).

### 3.10 Achievements (Prestasi)
- Peek-style Embla. Cards: photo, title, level (national/intl), year, holder. Link "Semua prestasi →" / "All achievements →" → `/prestasi`.

### 3.11 Tracer-Study Chart  `[REVISI — data placeholder]`
- One Recharts chart: graduate employment rate by year, or intake trend. Warm palette, accessible labels, responsive. Animate-in once; static on reduced-motion. Caption notes source/year. Link → `/statistik`.

### 3.12 Labs & Facilities
- Horizontal cards / light-parallax band of lab & facility photos (e-logistik lab, simulation, etc.). Link → `/laboratorium`. Mixed real/placeholder images.

### 3.13 Industry & Academic Partners
- Slow marquee of partner logos (grayscale → color on hover, pauses on hover). Seed: HAVI Logistics, Garuda Food, Pertamina, + placeholders. Link → `/kemitraan`.

### 3.14 Admission CTA Band
- Full-bleed amber gradient. Headline ID "Siap menjadi insinyur logistik masa depan?" / EN "Ready to become a future logistics engineer?" Sub: admission timeline hint. Primary "Daftar Sekarang" / "Apply Now" → SMB; secondary "Hubungi kami" / "Contact us" → `/kontak`.

### 3.15 Footer
- brand-800 bg, cream text. Columns: program info + address (Fakultas Rekayasa Industri, Telkom University), quick links, contact, socials (IG @disca.telkomuniv · LINE · TikTok). Accreditation badge + Telkom University lockup. ID/EN copyright line.

---

## 4. Data Needed for Home (controller props)

`HomeController@index` → `Inertia::render('Home', [...])`:
- `hero` (settings: eyebrow, title{id,en}, subtitle{id,en}, image, ctas)
- `stats` (array of {metric, value, unit, label{id,en}}) — placeholders flagged
- `distinctiveness` (e-logistik sub-points, bilingual)
- `greeting` (kaprodi name, photo, quote{id,en})
- `featured` (carousel items from activities/news)
- `latestNews` (4 items)
- `curriculumSummary` (total_sks=145, semesters=8, signature courses)
- `prospects` (3 role tracks, bilingual)
- `achievements` (6 items)
- `tracerStats` (chart series) — placeholder flagged
- `labs` (4–6 items)
- `partners` (logos)
- `settings` (contact, socials, accreditation)

All from admin-managed tables — no hardcoded content (seeded for the Day-2 demo).

---

## 5. Component Tree (React)

```
<Home>
 ├─ <Navbar />            // ID/EN toggle, transparent→solid
 ├─ <Hero />             // Framer Motion parallax + Ken Burns
 ├─ <StatsStrip />       // count-up [REVISI placeholders]
 ├─ <Distinctiveness />  // e-logistik, bento (not 3 identical)
 ├─ <KaprodiGreeting />
 ├─ <FeaturedCarousel /> // Embla autoplay
 ├─ <LatestNews />       // bento grid
 ├─ <CurriculumSnapshot />
 ├─ <CareerProspects />
 ├─ <Achievements />     // Embla peek
 ├─ <TracerChart />      // Recharts [REVISI]
 ├─ <LabsFacilities />
 ├─ <PartnersMarquee />
 ├─ <AdmissionCta />
 └─ <Footer />
```

Shared: `<SectionLabel>` (pill eyebrow), `<Button>`, `<Card>`, `<Reveal>` (scroll-in wrapper, reduced-motion guard), `<LangText>` (renders ID/EN by current locale).

---

## 6. Motion & Performance Rules (home-specific)
- Hero LCP image: preload, explicit width/height, `fetchpriority="high"`.
- Lazy-load below the fold (`loading="lazy"`, dynamic import for carousel/chart).
- Framer Motion only; GPU-friendly transforms; never animate layout props.
- Every animated section wrapped in `<Reveal>` → respects `prefers-reduced-motion`.
- Pause hero motion + marquee when off-screen (IntersectionObserver).
- Target: Lighthouse mobile ≥ 90, LCP < 2.5s, CLS < 0.1.

---

## 7. Responsive Behavior

| Breakpoint | Hero | News grid | Carousels |
|---|---|---|---|
| Mobile (<640) | Stacked, text first | 1 col | 1 slide, swipe |
| Tablet (≥768) | Side-by-side starts | 2 col | 1.5 peek |
| Desktop (≥1024) | Full asymmetric 7/5 | 3–4 bento | 2–3 visible |

Tap targets ≥ 44px; type scales via `clamp()`; bilingual strings tested for wrap.

---

## 8. Build Order (Day 2)
1. Page shell + Navbar (ID/EN toggle) + Footer + theme tokens.
2. Hero (static first) → parallax + Ken Burns → reduced-motion fallback.
3. StatsStrip + count-up (placeholder data).
4. Distinctiveness + KaprodiGreeting.
5. FeaturedCarousel + LatestNews + Achievements (Embla).
6. CurriculumSnapshot, CareerProspects, TracerChart, LabsFacilities, PartnersMarquee, AdmissionCta.
7. Responsive + performance + reduced-motion pass.
8. Seed bilingual content for demo.

---

## 9. Acceptance Criteria (home)
- [ ] Serves all four public personas in one scroll (aspiration → evidence → conversion).
- [ ] Hero parallax ~60fps on mid-range Android; static fallback on reduced-motion.
- [ ] Stats count-up fires once; final value if reduced-motion; all flagged `[REVISI]` editable in admin.
- [ ] News + featured carousel populate from seeded/admin data (no hardcoding).
- [ ] ID/EN toggle switches the whole page; EN at full parity.
- [ ] Chart renders from `stats` table.
- [ ] Fully responsive sm→xl; CTAs reach SMB + contact.
- [ ] Lighthouse mobile performance ≥ 90, accessibility ≥ 90.
- [ ] Passes "no AI-slop" rules: warm palette, asymmetric hero, no purple, no 3 identical glass cards, no autoplay-fast slideshow.

---

## 10. Open Questions for Stakeholder
1. Confirm current **Kaprodi name + photo** for the greeting section.
2. Confirm/replace the **four stat values** (`[REVISI]` placeholders): accreditation rank, partner count, employment rate.
3. Provide **real hero + lab/facility photos**, or approve placeholders for the demo.
4. Confirm **partner logos** cleared for public display.
5. Approve **tracer-study data** for the chart, or keep as illustrative placeholder.
6. Confirm the **dual brand lockup** wording ("Teknik Logistik · Digital Supply Chain").
