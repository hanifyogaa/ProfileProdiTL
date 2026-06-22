# CLAUDE.md

Project rules for the Teknik Logistik · Digital Supply Chain website redesign (FRI, Telkom University). Read before writing any code. Full specs live in `.docs/PRD.md`, `.docs/Home_Page_Plan.md`, `.docs/UI_UX_Plan.md` — this file is the condensed, binding summary.

## Status
Planning stage. No application code exists yet — `.docs/` contains the only artifacts. Stack below is decided; scaffolding has not started.

## Stack (decided, do not deviate without asking)
- Laravel 13 (PHP 8.3+) + Inertia.js + React + Tailwind CSS, single codebase, no separate API.
- DB: MySQL/MariaDB.
- Admin: Filament v3 at `/admin`, with `spatie/laravel-permission` (roles), `spatie/laravel-medialibrary` (+ WebP conversions), `spatie/laravel-sitemap`.
- Frontend libs: `framer-motion` (parallax/scroll), `embla-carousel-react` (carousels), `recharts` (charts), `react-intersection-observer`.
- i18n: ID default + EN toggle (mcamara/laravel-localization or built-in), session/URL based, every content entity has `{id,en}` fields.
- No Three.js / 3D scenes in v1.

## Non-negotiable design rules ("Nawasena Sancaya" identity)
This is the most-repeated constraint across all three docs — treat it as a hard gate, not a suggestion.

**Never:** purple/blue gradients, 3 identical glassmorphism cards in a row, centered-everything symmetric stacks, generic stock-hero + big centered headline + two pill buttons, emoji-as-decoration, full 3D scenes, autoplay-faster-than-5s carousels, orphan/template pages, motion that ignores `prefers-reduced-motion`.

**Always:** warm amber/brown palette (see tokens below), asymmetric layouts (e.g. hero text 7 cols / image 5 cols), varied card sizes (bento, not uniform grids), real photos over stock, pill-shaped section-label accents, Embla for carousels, every animated element wrapped in a reduced-motion-aware `<Reveal>`.

### Color tokens (Tailwind `theme.extend`)
```js
colors: {
  amber:  { 500:'#D99F60', 600:'#C08A4C' },
  brand:  { 700:'#8C6441', 800:'#6E4E33' },
  cream:  { 300:'#AC9587' },
  surface:{ 0:'#FFFDFB', 50:'#ECEBE9' },
  navy:   { 700:'#505666' },
  ink:    { 900:'#24141F' },
}
```
Body text: `navy-700`/`ink-900` on `surface-50/0`. White text only on `brand-700`+ or over a ≥45% image scrim. No blues/purples outside `navy-700`.

### Typography
- Display/headings: **Fraunces** (serif). Body/UI: **Plus Jakarta Sans** (Inter fallback). One display + one sans, never more.
- H1 `clamp(2.5rem,5vw,4rem)`, body line-height 1.6, never justify body text.

## Bilingual (ID/EN) rules
- ID is default; EN must be full parity, never partial.
- Never mix languages in one view — toggle switches the whole page.
- EN strings run ~20-30% longer than ID — test nav/buttons for wrap.
- `lang` attribute updates on toggle; `hreflang` for SEO; localized dates/numbers.

## Performance & accessibility (hard targets)
- Lighthouse mobile performance ≥ 90, accessibility ≥ 90; LCP < 2.5s; CLS < 0.1.
- Hero LCP image: preload + `fetchpriority="high"`; lazy-load everything below the fold.
- Pause motion off-screen (IntersectionObserver) and fully respect `prefers-reduced-motion` (static fallbacks required, not optional).
- WCAG 2.1 AA: contrast ≥ 4.5:1, alt text on all images (admin-enforced), visible focus rings, keyboard nav on carousels/lightbox/forms, skip-to-content.

## Content & data rules
- No hardcoded content on public pages — everything (hero, stats, news, partners, etc.) comes from admin-managed tables via Inertia props, even seeded placeholder data for demos.
- Stat values currently flagged `[REVISI]` in `.docs/Home_Page_Plan.md` (accreditation rank, partner count, employment rate, tracer-study data) are placeholders pending stakeholder confirmation — keep them admin-editable, don't bake them into code/seeders as final.
- Admission/application flow is NOT rebuilt — primary CTA always links out to `https://smb.telkomuniversity.ac.id/`.

## Non-goals (v1)
No student login/portal, no e-commerce/payment, no heavy real-time 3D, no rebuilding the SMB admission flow.

## Build priority
Home page (`/`) is built first and must be demoable standalone — see `.docs/Home_Page_Plan.md` for the full section-by-section spec, bilingual (ID/EN) copy, and component tree before touching it.

## Routes
See `.docs/PRD.md` §7 for the full route table (`/profil`, `/kurikulum`, `/dosen`, `/berita`, `/galeri`, `/prestasi`, `/agenda`, `/laboratorium`, `/kemitraan`, `/riset`, `/mbkm`, `/statistik`, `/faq`, `/kontak`, `/admin`). Keep routes clean — no orphan pages (a direct failing of the site being replaced).
