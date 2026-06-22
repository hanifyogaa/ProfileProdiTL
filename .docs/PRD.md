# Product Requirements Document (PRD)
## Website Program Studi S1 Teknik Logistik · Digital Supply Chain
### Fakultas Rekayasa Industri, Telkom University — Redesign

**Version:** 2.0
**Owner:** Hanif (Tech Lead, LAA FRI)
**Stack:** Laravel 13 + Inertia.js + React + Tailwind CSS + MySQL/MariaDB
**Timeline:** 5 days (system build); home page prioritized for stakeholder demo
**Replaces:** Current WordPress/Elementor site at `ble.telkomuniversity.ac.id`
**Status:** Draft for stakeholder review

---

## 1. Overview

### 1.1 Context
The program currently runs a WordPress/Elementor site (`ble.telkomuniversity.ac.id`) branded "Digital Supply Chain Telkom University." It is content-thin on the home page (a slideshow of industry-visit captions, a Kaprodi greeting, a short program description, one admission button) and carries template/theme clutter (orphan pages like "Slide 1," "Sample Page," backup-settings pages). This project replaces it with a faster, custom, CMS-driven site that reads as a credible, modern study-program profile.

### 1.2 Purpose
A public-facing, CMS-driven website serving **everyone who evaluates the program**: prospective students (SMA), their parents, accreditation assessors (BAN-PT / LAM Teknik), and industry/academic partners. Content (news, lecturers, curriculum, charts, media) is managed by non-technical admins. Public pages are React-rendered for rich interaction (parallax, subtle motion, carousels) without sacrificing speed.

### 1.3 Goals
- Replace the WordPress site with a single-codebase Laravel 13 + Inertia + React app — no separate API.
- Win three audiences at once on the home page: **aspiration** (students), **reassurance** (parents), **evidence** (assessors).
- Bilingual **ID/EN from day one** — language toggle on every page.
- Fast & reliable on Indonesian mobile networks; Lighthouse mobile performance ≥ 90.
- Distinct "Nawasena Sancaya" warm amber/brown identity — NOT a generic template, NOT AI-slop.
- Admins publish news/media/stats without touching code.

### 1.4 Brand & Naming
- **Dual identity:** "**Teknik Logistik · Digital Supply Chain**" — the formal program name leads, the DSC identity (already known to students/alumni via DISCA) rides alongside.
- Visual identity: warm amber/brown "Nawasena Sancaya" palette (see UI_UX_Plan.md).

### 1.5 Non-Goals (v1)
- No student login/portal (handled by SIJAKI and existing systems).
- No e-commerce/payment.
- No heavy real-time 3D scenes — lightweight motion only (parallax + subtle moving imagery).
- Admission processing stays on `smb.telkomuniversity.ac.id` (we link out, not rebuild it).

---

## 2. Target Users & Use Cases

| Persona | What they need | What convinces them | Key pages |
|---|---|---|---|
| Prospective student (SMA) | Is this program exciting and worth it? | Career prospects, e-logistik distinctiveness, student life, achievements | Home, About, Curriculum, Prospects, Admission |
| Parent | Is it credible and will it lead to a job? | Accreditation, tracer study, industry partners, Telkom/BUMN backing | Home, Accreditation, Stats, Partnership |
| Accreditation assessor | Does it meet the standard? | Vision/mission, curriculum + CPL, lecturer qualifications, data | About, Curriculum, Lecturers, Stats |
| Industry / academic partner | Worth collaborating? | Partner roster, MoU, student/alumni quality, research | Partnership, Research, Contact |
| Content admin | Update easily | Simple CRUD, media library, draft/publish | Admin panel (Filament) |

**Design implication:** the home page must serve all four public personas in a single scroll — aspiration up top, evidence in the middle, conversion at the bottom.

---

## 3. Functional Requirements

### 3.1 Public Site
- **FR-1 Home** — multi-audience landing (full spec in Home_Page_Plan.md): parallax hero, dual CTA, stats, e-logistik distinctiveness, Kaprodi greeting, news, curriculum snapshot, achievements, tracer chart, facilities, partners, admission CTA.
- **FR-2 About / Profil** — vision, mission, history & decree (SK), Kaprodi greeting, accreditation status, organizational structure.
- **FR-3 Curriculum / Kurikulum** — 145 SKS across 8 semesters, course list per semester, learning outcomes (CPL), equivalence, downloadable PDF.
- **FR-4 Lecturers / Dosen & Staff** — profile cards (photo, NIDN, expertise, Sinta/Scholar), filter by expertise/lab.
- **FR-5 News & Activities / Berita** — list + detail, categories, tags, featured image, related, pagination, OG meta.
- **FR-6 Media Gallery** — photo grid (lightbox) + video embeds (YouTube/Vimeo; never self-host large files).
- **FR-7 Stats / Fact & Figures** — intake, graduates, employment/tracer, accreditation, partner count — admin-entered, charted.
- **FR-8 Achievements / Awards** — student & lecturer achievements; carousel + grid; level (national/intl).
- **FR-9 Activities / Events** — industry visits, workshops, guest lectures; upcoming + past.
- **FR-10 Laboratories & Study Groups** — labs (e-logistik focus) with descriptions + photos.
- **FR-11 Partnership / Cooperations** — partner logos, MoU summaries, collaboration CTA.
- **FR-12 Research & Community Service** — research areas, pengabdian masyarakat highlights.
- **FR-13 MBKM** — Merdeka Belajar Kampus Merdeka info.
- **FR-14 FAQ** — common admission/academic questions.
- **FR-15 Contact** — form (name, email, subject, message), Google Maps embed, socials (IG @disca.telkomuniv, LINE, TikTok).
- **FR-16 Search** — site-wide search for news & pages.
- **FR-17 Language toggle** — ID/EN on every page.

### 3.2 Admin Panel (CMS) — Filament v3
- **FR-A1** Auth + roles (admin/editor) via `spatie/laravel-permission`.
- **FR-A2** CRUD: News, Categories, Tags, Lecturers, Courses, Achievements, Activities/Events, Labs, Partners, Research, Media.
- **FR-A3** Stats manager — yearly metrics feeding public charts.
- **FR-A4** Media library — upload, auto-resize/compress (WebP), alt text enforced.
- **FR-A5** Draft / Publish / scheduled publish.
- **FR-A6** Settings — hero content, contact, socials, accreditation badge, site meta.
- **FR-A7** Bilingual fields (ID/EN) on all content entities.

---

## 4. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Lighthouse mobile ≥ 90; LCP < 2.5s; hero motion must not block render; lazy-load below fold; WebP media. |
| Reliability | Graceful fallback if motion unsupported; static hero image; respects `prefers-reduced-motion`. |
| Accessibility | WCAG 2.1 AA: alt text, keyboard nav, contrast ≥ 4.5:1, visible focus, skip-to-content. |
| SEO | SSR meta via Inertia head; sitemap.xml; OG/Twitter cards; semantic HTML; clean URLs (no orphan pages). |
| Security | Laravel 13 `PreventRequestForgery`; validation; rate-limited contact form; no secrets client-side. |
| i18n | ID default + EN toggle, session/URL based; all content entities bilingual. |
| Responsiveness | Mobile-first; sm/md/lg/xl; tap targets ≥ 44px. |
| Browser support | Last 2 versions Chrome/Edge/Firefox/Safari + Android Chrome. |
| Maintainability | Single repo; documented component library; seeded demo data; no template orphan pages. |

---

## 5. Technical Architecture

```
Browser (React + Inertia)
   │  Inertia page props (no separate API)
   ▼
Laravel 13 (PHP 8.3+)
   ├── Routes / Controllers → Inertia::render
   ├── Eloquent models: News, Lecturer, Course, Activity, Achievement,
   │                     Partner, Lab, Research, Stat, Media, Setting
   ├── Filament v3 admin panel (/admin)
   ├── Spatie Media Library (+ WebP conversions)
   ├── Spatie Permission (roles) · Spatie Sitemap
   └── Vite → React + Tailwind bundle
   ▼
DB: MySQL / MariaDB (chosen)
Storage: public disk / S3-compatible for media
Host: VPS (.virtualfri.id), Nginx + PHP-FPM
```

**Key packages**
- `inertiajs/inertia-laravel`, `@inertiajs/react`
- `filament/filament` (admin)
- `spatie/laravel-medialibrary`, `spatie/laravel-permission`, `spatie/laravel-sitemap`
- `mcamara/laravel-localization` (or built-in) for ID/EN
- Frontend: `react`, `framer-motion` (parallax/scroll), `embla-carousel-react` (carousels), `recharts` (charts), `react-intersection-observer`.

> **3D note:** No Three.js scene in v1. Parallax layers + Framer Motion + subtle Ken Burns image motion only. A single lazy-loaded `.glb` via R3F is a future, feature-flagged option — out of scope.

---

## 6. Data Model (core entities)

- **news**: id, title{id,en}, slug, excerpt{id,en}, body{id,en}, category_id, status, published_at, featured_image, views.
- **categories**, **tags** (+ pivot).
- **lecturers**: id, name, nidn, photo, expertise, bio{id,en}, scholar_url, sinta_url, lab_id, order.
- **courses**: id, code, name{id,en}, sks, semester, type (wajib/pilihan), cpl, description{id,en}.
- **activities**: id, title{id,en}, slug, body{id,en}, type (visit/workshop/lecture), date, location, cover.
- **achievements**: id, title{id,en}, level (national/intl), date, holder, cover.
- **partners**: id, name, logo, url, mou_summary{id,en}, type (industry/academic).
- **labs**: id, name, focus, description{id,en}, photos[].
- **research**: id, title{id,en}, area, year, members, summary{id,en}.
- **stats**: id, metric, year, value, unit, label{id,en}.
- **settings**: hero{id,en}, contact, socials, accreditation, site_meta (singleton/key-value).
- **media**: Spatie Media Library.

---

## 7. Pages → Routes (clean, no orphans)

| Route | Page | Source content (from current site) |
|---|---|---|
| `/` | Home | Greeting, program desc, activities, admission link |
| `/profil` | About | Vision/mission, history & decree, HoP greeting |
| `/profil/akreditasi` | Accreditation | Accreditation page |
| `/kurikulum` | Curriculum | 145 SKS / 8 sem, structure, CPL, equivalence |
| `/dosen` | Lecturers & Staff | Faculty & staff |
| `/berita` | News & Activities | Activities, news |
| `/berita/{slug}` | News detail | — |
| `/galeri` | Gallery | Gallery |
| `/prestasi` | Achievements | Awards |
| `/agenda` | Activities/Events | Activities |
| `/laboratorium` | Labs & Study Groups | Laboratories |
| `/kemitraan` | Partnership | Partnerships, cooperations |
| `/riset` | Research & Community | Research, community services |
| `/mbkm` | MBKM | MBKM |
| `/statistik` | Fact & Figures | Fact & figures |
| `/faq` | FAQ | FAQ |
| `/kontak` | Contact | Contact us |
| `/admin` | Filament panel | — |

Outbound: **Daftar / Apply →** `https://smb.telkomuniversity.ac.id/` (primary CTA, kept).

---

## 8. Milestones (5-day build)

| Day | Deliverable |
|---|---|
| 0 (now) | Planning docs (this PRD, UI/UX, Home Page Plan) approved by stakeholders. |
| 1 | Scaffold (Laravel 13 + Inertia + React + Tailwind + Vite), theme tokens, MySQL schema + migrations, Filament install, deploy pipeline. |
| 2 | **Home page built first** for stakeholder demo (all sections, seeded content, motion, responsive). |
| 3 | Filament resources (News, Lecturer, Course, Activity, Achievement, Partner, Stat, Settings) + media + roles; wire home to live data. |
| 4 | Inner pages (About, Curriculum, Lecturers, News list/detail, Gallery, Stats, Partnership). Mobile + perf pass. |
| 5 | i18n ID/EN, SEO/OG, sitemap, contact form, FAQ, QA, content load, production deploy. |

> **Honest caveat:** 5 days builds the *system*. Real photos/copy/video are produced in parallel; launch with seed/placeholder content where assets aren't ready (mixed real + placeholder confirmed by stakeholder).

---

## 9. Acceptance Criteria
- Home page demonstrable to stakeholders by end of Day 2, serving all four public personas in one scroll.
- Admin can create/publish news and it appears on `/berita` without code changes.
- Hero parallax runs ~60fps on mid-range Android; static fallback on `prefers-reduced-motion`.
- Charts render from admin-entered stat data.
- Every public page has working ID/EN toggle.
- Lighthouse mobile performance ≥ 90, accessibility ≥ 90.
- OG cards render correctly when a news URL is shared.
- No orphan/template pages in the sitemap.

---

## 10. Risks
| Risk | Mitigation |
|---|---|
| 5 days tight with content | Build system first; seed + placeholder media; fill post-launch. |
| Stats not finalized by stakeholder | Ship aspirational placeholders flagged for revision; admin-editable. |
| Heavy media slows site | WebP conversions, lazy-load, CDN, YouTube embeds for video. |
| Motion hurts performance | Framer Motion only, IntersectionObserver pause, reduced-motion fallback. |
| Looks templated ("AI slop") | Custom warm palette, asymmetric layout, real brand identity (UI_UX_Plan.md §1–2). |
| Migration from WordPress | Map old URLs → new routes; 301 redirects; preserve indexed news. |
