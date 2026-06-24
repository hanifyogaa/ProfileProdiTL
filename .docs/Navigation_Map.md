# Navigation Map — Prodi Teknik Logistik Website

Reference document for developers. Derived from the official sitemap provided by stakeholders.
Last updated: 2026-06-24.

---

## 1. Overview

| Metric | Count |
|--------|-------|
| Top-level menu items | 7 |
| Sub-menu items | 23 |
| Internal pages (build here) | 14 |
| External links (open `_blank`) | 8 |
| PDF/Doc references ("Buku Kurikulum") | 6 |
| New routes needed (not in PRD.md) | 3 |
| PRD.md routes not in this nav map | 6 |

**Item type legend used throughout this doc:**
- `[INTERNAL]` — React page built and served by this Laravel app
- `[EXTERNAL]` — opens `target="_blank"` to a URL outside this app
- `[PDF/DOC]` — content sourced from Buku Kurikulum; rendered as section in `/kurikulum` + PDF download
- `[ANCHOR]` — anchor/section within an existing internal page (no separate route)

---

## 2. Navigation Tree

```
Home                                              [INTERNAL]  /
│
├── About Us
│   ├── Profil                                    [INTERNAL]  /profil
│   ├── Visi Misi                                 [PDF/DOC]   /profil#visi-misi  
│   ├── Sejarah                                   [ANCHOR]    /profil#sejarah
│   ├── Struktur Organisasi                       [INTERNAL]  /profil/struktur-organisasi  ❌ new route
│   ├── Staf Pengajar                             [INTERNAL]  /dosen
│   └── Tur Kampus                                [EXTERNAL]  https://360.telkomuniversity.ac.id/...
│
├── Academics
│   ├── Profil Lulusan                            [PDF/DOC]   /kurikulum#profil-lulusan
│   ├── Struktur Kurikulum                        [PDF/DOC]   /kurikulum#struktur-kurikulum
│   ├── Organigram                                [PDF/DOC]   /kurikulum#organigram
│   ├── Mata Kuliah Pilihan                       [ANCHOR]    /kurikulum#mata-kuliah-pilihan
│   ├── Program Educational Objective (PEO)       [PDF/DOC]   /kurikulum#peo
│   ├── Program Learning Outcome (PLO)            [PDF/DOC]   /kurikulum#plo
│   ├── Kalender Akademik                         [EXTERNAL]  https://bis.telkomuniversity.ac.id/kalender-akademik-telkomuniversity/
│   ├── Pedoman Akademik                          [EXTERNAL]  https://bis.telkomuniversity.ac.id/pedoman-akademik-telkom-university/
│   ├── Kode Etik                                 [EXTERNAL]  https://bis.telkomuniversity.ac.id/kode-etik-telkom-university/
│   ├── Ijazah & Transkrip                        [EXTERNAL]  https://basila.telkomuniversity.ac.id/basilav2/
│   ├── Tugas Akhir                               [EXTERNAL]  https://ta1.virtualfri.id/
│   └── Registrasi Mata Kuliah                    [EXTERNAL]  https://sirama.telkomuniversity.ac.id/404/  ⚠️
│
├── Activities
│   ├── Research                                  [INTERNAL]  /riset
│   ├── Community Services                        [INTERNAL]  /pengabdian  ❌ new route
│   ├── Laboratories                              [INTERNAL]  /laboratorium
│   ├── Student Association                       [INTERNAL]  /kemahasiswaan  ❌ new route
│   └── Competition and Award                     [INTERNAL]  /prestasi
│
├── News                                          [INTERNAL]  /berita
│
├── Admission                                     [EXTERNAL]  https://smb.telkomuniversity.ac.id/
│
├── Frequently Asked Question                     [INTERNAL]  /faq
│
└── Contact Us                                    [INTERNAL]  /kontak
```

---

## 3. Route Mapping Table

| Nav Label (EN) | Nav Label (ID) | Route | Type | PRD Status | Laravel Method | React Page | Notes |
|----------------|----------------|-------|------|------------|----------------|------------|-------|
| Home | Beranda | `/` | INTERNAL | ✅ Exists | `home()` | `Home.tsx` | |
| About Us > Profil | Profil | `/profil` | INTERNAL | ✅ Exists | `about()` | `About.tsx` | |
| About Us > Visi Misi | Visi Misi | `/profil#visi-misi` | PDF/DOC | ⚠️ Anchor only | `about()` | `About.tsx` | Section in `/profil`; see §5 |
| About Us > Sejarah | Sejarah | `/profil#sejarah` | ANCHOR | ⚠️ Anchor only | `about()` | `About.tsx` | Add `id="sejarah"` to history section |
| About Us > Struktur Organisasi | Struktur Organisasi | `/profil/struktur-organisasi` | INTERNAL | ❌ New | `orgStructure()` | `OrgStructure.tsx` | New page + route + model |
| About Us > Staf Pengajar | Staf Pengajar | `/dosen` | INTERNAL | ✅ Exists | `lecturers()` | `Lecturers.tsx` | |
| About Us > Tur Kampus | Tur Kampus | _(external)_ | EXTERNAL | — | — | — | Open `_blank`; see §6 |
| Academics > Profil Lulusan | Profil Lulusan | `/kurikulum#profil-lulusan` | PDF/DOC | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Admin-editable section; see §5 |
| Academics > Struktur Kurikulum | Struktur Kurikulum | `/kurikulum#struktur-kurikulum` | PDF/DOC | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Admin-editable section |
| Academics > Organigram | Organigram | `/kurikulum#organigram` | PDF/DOC | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Admin-editable section |
| Academics > Mata Kuliah Pilihan | Mata Kuliah Pilihan | `/kurikulum#mata-kuliah-pilihan` | ANCHOR | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Filter elective courses |
| Academics > PEO | Program Educational Objective | `/kurikulum#peo` | PDF/DOC | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Admin-editable section |
| Academics > PLO | Program Learning Outcome | `/kurikulum#plo` | PDF/DOC | ⚠️ Anchor only | `curriculum()` | `Curriculum.tsx` | Admin-editable section |
| Academics > Kalender Akademik | Kalender Akademik | _(external)_ | EXTERNAL | — | — | — | Open `_blank` |
| Academics > Pedoman Akademik | Pedoman Akademik | _(external)_ | EXTERNAL | — | — | — | Open `_blank` |
| Academics > Kode Etik | Kode Etik | _(external)_ | EXTERNAL | — | — | — | Open `_blank` |
| Academics > Ijazah & Transkrip | Ijazah & Transkrip | _(external)_ | EXTERNAL | — | — | — | Open `_blank` |
| Academics > Tugas Akhir | Tugas Akhir | _(external)_ | EXTERNAL | — | — | — | Open `_blank` |
| Academics > Registrasi MK | Registrasi Mata Kuliah | _(external)_ | EXTERNAL | — | — | — | ⚠️ URL path ends in `/404` — verify with IT |
| Activities > Research | Riset | `/riset` | INTERNAL | ✅ Exists | `research()` | `Research.tsx` | |
| Activities > Community Services | Pengabdian Masyarakat | `/pengabdian` | INTERNAL | ❌ New | `communityService()` | `CommunityService.tsx` | New page + route + model |
| Activities > Laboratories | Laboratorium | `/laboratorium` | INTERNAL | ✅ Exists | `labs()` | `LabsList.tsx` | |
| Activities > Student Association | Kemahasiswaan / HIMA | `/kemahasiswaan` | INTERNAL | ❌ New | `studentAssociation()` | `StudentAssociation.tsx` | New page + route + model |
| Activities > Competition and Award | Prestasi | `/prestasi` | INTERNAL | ✅ Exists | `achievements()` | `AchievementsList.tsx` | |
| News | Berita | `/berita` | INTERNAL | ✅ Exists | `news()` | `NewsList.tsx` | Detail: `/berita/{slug}` |
| Admission | Penerimaan | _(external)_ | EXTERNAL | — | — | — | Primary CTA → smb.telkomuniversity.ac.id |
| FAQ | FAQ | `/faq` | INTERNAL | ✅ Exists | `faq()` | `Faq.tsx` | |
| Contact Us | Kontak | `/kontak` | INTERNAL | ✅ Exists | `contact()` | `Contact.tsx` | |

---

## 4. Delta vs PRD.md

### 4a. Routes in PRD.md NOT appearing in this nav map

These routes exist (or are planned) in the codebase but are absent from the stakeholder-provided nav map. They should remain accessible via direct URL but may not need a primary navbar entry.

| Route | Page | Recommended placement | Notes |
|-------|------|-----------------------|-------|
| `/profil/akreditasi` | Akreditasi | Link within `/profil` page content | Not a standalone nav item; reference it from the About page body |
| `/galeri` | Galeri Foto | Footer link or `/profil` sidebar | Not in top nav; gallery content still valuable |
| `/agenda` | Agenda / Kalender Kegiatan | Consider merging into `/kemahasiswaan` or `/riset` | May overlap with Activities submenu |
| `/kemitraan` | Kemitraan & Mitra | Footer link | Useful for SEO but not primary nav |
| `/mbkm` | MBKM | Consider adding under Academics submenu | Student-facing; absence from nav is likely an oversight |
| `/statistik` | Statistik & Data | Footer link or About page | Tracer study data — not primary nav but SEO-valuable |

> **Action required:** Confirm with stakeholder which of these should be (a) added to the nav map, (b) footer-only, or (c) deprecated.

### 4b. New routes required by this nav map (not in PRD.md)

These three items appear in the stakeholder nav map but have no corresponding route, controller method, React page, or model in the current codebase.

| Route | Page Component | Model needed | Admin Resource | Priority |
|-------|---------------|--------------|----------------|----------|
| `/profil/struktur-organisasi` | `OrgStructure.tsx` | `OrgMember` or admin-managed Setting | `OrgStructureResource` or Setting key | Medium |
| `/pengabdian` | `CommunityService.tsx` | `CommunityService` | `CommunityServiceResource` | Medium |
| `/kemahasiswaan` | `StudentAssociation.tsx` | `StudentOrg` or static content | Setting key or `StudentOrgResource` | Low |

---

## 5. "Buku Kurikulum" Items — Implementation Strategy

Six nav sub-items are marked "Tercantum di Buku Kurikulum" (sourced from the curriculum book). These are not separate routes — they are **sections of the `/kurikulum` page**.

### Affected items
| Sub-menu | Proposed anchor | Content source |
|----------|----------------|----------------|
| Visi Misi (About Us) | `/profil#visi-misi` | Admin-managed (`about_content` Setting key) |
| Profil Lulusan | `/kurikulum#profil-lulusan` | Admin-managed rich text |
| Struktur Kurikulum | `/kurikulum#struktur-kurikulum` | Admin-managed + Course model |
| Organigram | `/kurikulum#organigram` | Admin-managed image upload |
| Program Educational Objective (PEO) | `/kurikulum#peo` | Admin-managed rich text |
| Program Learning Outcome (PLO) | `/kurikulum#plo` | Admin-managed rich text |

### Recommended approach

**Option A — Admin-editable sections (recommended):** Add the above as sections within `/kurikulum` with admin-editable rich text (Filament `curriculum_summary` Setting key or a dedicated `CurriculumSection` model). A "Download Buku Kurikulum (PDF)" button links to an admin-uploaded PDF. This keeps content live and searchable.

**Option B — PDF embed only:** Upload the Buku Kurikulum as a PDF, link each sub-menu item to the PDF with an anchor/page fragment. Simpler but not searchable or maintainable.

**Recommendation:** Option A for Profil Lulusan, PEO, PLO (text-heavy, frequently revised). Option B supplement (PDF download) for Organigram (image-heavy). Struktur Kurikulum is already rendered dynamically from the `courses` table.

### Nav link behavior for PDF/DOC items

When a sub-menu item maps to an anchor (`#section`), the nav link should:
1. If the user is already on `/kurikulum` → smooth-scroll to the anchor.
2. If the user is on another page → navigate to `/kurikulum#section` (browser handles scroll after page load).

---

## 6. External Links Reference

All external links must use `target="_blank" rel="noopener noreferrer"` per WCAG 2.1 (warn users that they're leaving).

| Nav Label | URL | Purpose | Flag |
|-----------|-----|---------|------|
| Tur Kampus | `https://360.telkomuniversity.ac.id/?_gl=...` | 360° virtual campus tour | URL contains tracking params — link may change; ask IT for canonical URL |
| Kalender Akademik | `https://bis.telkomuniversity.ac.id/kalender-akademik-telkomuniversity/` | Academic calendar (central university) | |
| Pedoman Akademik | `https://bis.telkomuniversity.ac.id/pedoman-akademik-telkom-university/` | Academic handbook PDF | |
| Kode Etik | `https://bis.telkomuniversity.ac.id/kode-etik-telkom-university/` | Ethics code PDF | |
| Ijazah & Transkrip | `https://basila.telkomuniversity.ac.id/basilav2/` | BASILA portal for degree/transcript | |
| Tugas Akhir | `https://ta1.virtualfri.id/` | Final project portal (FRI-specific) | |
| Registrasi Mata Kuliah | `https://sirama.telkomuniversity.ac.id/404/` | Course registration (SIRAMA) | ⚠️ URL ends in `/404` — likely a placeholder. Verify correct URL with IT before launch |
| Admission | `https://smb.telkomuniversity.ac.id/` | SMB admission portal | Primary CTA; never rebuild this flow in-app |

---

## 7. Navbar Implementation Notes

### Component structure

```
<Navbar>
  <NavLogo />                          // Link to /
  <NavMenu>
    <NavItem label="Home" href="/" />
    <NavDropdown label="About Us">
      <NavSubItem label="Profil" href="/profil" />
      <NavSubItem label="Visi Misi" href="/profil#visi-misi" />
      <NavSubItem label="Sejarah" href="/profil#sejarah" />
      <NavSubItem label="Struktur Organisasi" href="/profil/struktur-organisasi" />
      <NavSubItem label="Staf Pengajar" href="/dosen" />
      <NavSubItem label="Tur Kampus" href="https://..." external />
    </NavDropdown>
    <NavDropdown label="Academics">
      <!-- 12 sub-items: anchors + external links -->
    </NavDropdown>
    <NavDropdown label="Activities">
      <!-- 5 sub-items: all internal -->
    </NavDropdown>
    <NavItem label="News" href="/berita" />
    <NavItem label="Admission" href="https://smb.telkomuniversity.ac.id/" external />
    <NavItem label="FAQ" href="/faq" />
    <NavItem label="Contact Us" href="/kontak" />
  </NavMenu>
  <LanguageToggle />
</Navbar>
```

### Rules for the React navbar component

| Rule | Implementation |
|------|---------------|
| External items (`external` prop) | `<a href={href} target="_blank" rel="noopener noreferrer">` + external icon (e.g. `ArrowUpRight` from lucide-react, 12px) |
| Active state | `useRoute()` from ziggy or `usePage().url` — match current path with `href.startsWith(route)` for parent items |
| Anchor items in dropdowns | Plain `<a href="/profil#sejarah">` — Inertia `<Link>` does not handle in-page anchors reliably |
| Mobile menu | Hamburger toggle via `useState`; collapse on route change via `useEffect` watching `usePage().url` |
| Dropdown trigger | Desktop: hover (CSS `group-hover`); Mobile: tap to toggle (separate state per dropdown) |
| Max depth | 2 levels only (top-level + one dropdown) — no nested sub-sub-menus |
| EN labels | Navbar always uses the current locale; bilingual label map stored in a `NAV_ITEMS` constant, not CMS |
| Dropdown width | Min 220px to prevent wrap on EN strings (~20-30% longer than ID) |
| Sticky behavior | `position: sticky; top: 0; z-index: 50;` — backdrop-blur on scroll (see `UI_UX_Plan.md` Navbar spec) |

### Bilingual nav labels

```typescript
// resources/js/config/nav.ts  (or inline in Navbar component)
export const NAV_LABELS = {
  home:          { id: 'Beranda',     en: 'Home' },
  aboutUs:       { id: 'Tentang',     en: 'About Us' },
  profil:        { id: 'Profil',      en: 'Profile' },
  visiMisi:      { id: 'Visi Misi',   en: 'Vision & Mission' },
  sejarah:       { id: 'Sejarah',     en: 'History' },
  strukturOrg:   { id: 'Struktur Organisasi', en: 'Org Structure' },
  stafPengajar:  { id: 'Staf Pengajar', en: 'Faculty' },
  turKampus:     { id: 'Tur Kampus',  en: 'Campus Tour' },
  academics:     { id: 'Akademik',    en: 'Academics' },
  profilLulusan: { id: 'Profil Lulusan', en: 'Graduate Profile' },
  strukturKurikulum: { id: 'Struktur Kurikulum', en: 'Curriculum Structure' },
  organigram:    { id: 'Organigram',  en: 'Organigram' },
  mataKuliahPilihan: { id: 'Mata Kuliah Pilihan', en: 'Elective Courses' },
  peo:           { id: 'PEO',         en: 'Program Educational Objectives' },
  plo:           { id: 'PLO',         en: 'Program Learning Outcomes' },
  kalenderAkademik: { id: 'Kalender Akademik', en: 'Academic Calendar' },
  pedomanAkademik:  { id: 'Pedoman Akademik',  en: 'Academic Handbook' },
  kodeEtik:      { id: 'Kode Etik',   en: 'Code of Ethics' },
  ijazah:        { id: 'Ijazah & Transkrip', en: 'Diploma & Transcript' },
  tugasAkhir:    { id: 'Tugas Akhir', en: 'Final Project' },
  registrasiMK:  { id: 'Registrasi MK', en: 'Course Registration' },
  activities:    { id: 'Aktivitas',   en: 'Activities' },
  research:      { id: 'Riset',       en: 'Research' },
  communityService: { id: 'Pengabdian', en: 'Community Services' },
  laboratories:  { id: 'Laboratorium', en: 'Laboratories' },
  studentAssoc:  { id: 'Kemahasiswaan', en: 'Student Association' },
  competition:   { id: 'Prestasi',    en: 'Competition & Award' },
  news:          { id: 'Berita',      en: 'News' },
  admission:     { id: 'Penerimaan',  en: 'Admission' },
  faq:           { id: 'FAQ',         en: 'FAQ' },
  contact:       { id: 'Kontak',      en: 'Contact Us' },
};
```

---

## 8. Open Questions (Pre-launch checklist)

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Confirm correct URL for Registrasi Mata Kuliah (currently points to `/404`) | IT / Akademik | Open |
| 2 | Confirm canonical URL for Tur Kampus (current URL has tracking params) | IT | Open |
| 3 | Should `/mbkm` appear under Academics or Activities sub-menu? | Stakeholder | Open | akademik
| 4 | Should `/galeri`, `/statistik`, `/kemitraan`, `/agenda` appear in footer nav? | Stakeholder | Open | 
| 5 | Is `/profil/struktur-organisasi` a simple org chart image (admin-uploaded) or a full member directory? | Stakeholder | Open |
| 6 | Is `/pengabdian` (Community Services) a single page or paginated list like `/berita`? | Stakeholder | Open |
| 7 | Is `/kemahasiswaan` (Student Association) an about page for HIMA or a full org portal? | Stakeholder | Open |
| 8 | Will the Buku Kurikulum PDF be uploaded and downloadable from the website? | Prodi | Open |
