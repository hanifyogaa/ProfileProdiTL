# UI/UX Plan & Design Rules
## Website Teknik Logistik · Digital Supply Chain — FRI Telkom University (Redesign)

**Companion to:** PRD.md, Home_Page_Plan.md
**Design identity:** "Nawasena Sancaya" — warm amber/brown, grounded, editorial, credible.
**Mandate:** Replace a generic WordPress/Elementor template with a site that has a real point of view.

---

## 1. Design Principles (the rules)

1. **Warm, grounded, editorial — not corporate-generic.** This program has a real identity (DISCA "Nawasena Sancaya" amber theme, e-logistik specialization, BUMN/Telkom backing). Lean into warmth, craft, and substance.
2. **No AI-slop, no template tells.** Explicitly avoid: centered-everything, three identical glassmorphism cards in a row, purple-blue gradients, generic stock-hero + big centered headline + two pill buttons, emoji bullets as decoration, perfectly symmetric stacks. Also avoid the current site's failings: caption-only slideshows, orphan pages, theme-default clutter.
3. **Asymmetry & editorial rhythm.** Off-center heroes, varied column widths, intentional whitespace, overlapping elements, clear typographic hierarchy.
4. **Motion is subtle and earns its place.** Parallax layers + gentle Ken Burns imagery. No spinning 3D, no gratuitous bounce. Everything respects `prefers-reduced-motion`.
5. **Performance is a design constraint.** If an effect drops below 60fps on mid-range Android, cut it.
6. **Evidence over adjectives.** For a study-program profile, real numbers, real photos, real accreditation marks persuade more than marketing copy. Show, then tell.
7. **Serve three readers at once.** Every home section should land for a student (aspiration), a parent (reassurance), or an assessor (evidence). Most should do two.

### 1.1 Redesign intent vs. current site
| Current site (WordPress/Elementor) | Redesign |
|---|---|
| Caption slideshow as hero | Purposeful parallax hero with value prop + dual CTA |
| Thin home page (greeting + 1 paragraph) | Multi-audience single-scroll narrative |
| Template clutter, orphan pages | Clean IA, no orphan routes |
| English-leaning, inconsistent | Bilingual ID/EN, consistent toggle |
| Generic blue WordPress theme | Distinct warm amber/brown identity |
| No data/charts | Tracer-study + fact-&-figures charts |

---

## 2. Color System

Sampled from the brand reference (DISCA "Nawasena Sancaya" identity).

| Token | Hex | Use |
|---|---|---|
| `--amber-500` (primary) | `#D99F60` | Hero gradient, primary accents, highlights |
| `--amber-600` | `#C08A4C` | Hover states, deeper accents |
| `--brand-700` (secondary) | `#8C6441` | Buttons, pills, headings on light bg |
| `--brand-800` | `#6E4E33` | Strong accents, footer |
| `--cream-300` | `#AC9587` | Muted surfaces, dividers |
| `--surface-50` | `#ECEBE9` | Page background (warm off-white) |
| `--surface-0` | `#FFFDFB` | Cards, raised surfaces |
| `--navy-700` (contrast) | `#505666` | Body text, contrast accent (from jackets) |
| `--ink-900` | `#24141F` | Headlines, max-contrast text |

**Hero gradient:** `linear-gradient(135deg,#D99F60 0%,#C08A4C 45%,#8C6441 100%)`.

**Contrast rules:** body text in `--navy-700`/`--ink-900` on `--surface-50/0` (passes AA). White text only on `--brand-700`+ or over a ≥45% image scrim.

> Do NOT introduce blues/purples outside `--navy-700`. The palette stays warm.

---

## 3. Typography

- **Display / Headings:** warm humanist serif — **Fraunces** (H1–H2). Carries the elegant, slightly editorial feel hinted by the brand's script "Media Partner" lockup, without using a script for body.
- **Body / UI:** **Plus Jakarta Sans** (Indonesian-designed grotesque; nods to local identity) with Inter fallback.
- **Type ramp:** H1 `clamp(2.5rem,5vw,4rem)` / H2 `2rem` / H3 `1.5rem` / body `1rem` / small `0.875rem`.
- **Rules:** one display + one sans max. Body line-height 1.6. Tracking slightly tight on display, normal on body. Never justify body. Bilingual copy must not break the ramp — EN strings tend longer; test both.

---

## 4. Layout & Grid

- 12-col grid, max content width `1200px`, gutters `24px`.
- **Asymmetric hero:** headline + dual CTA left (7 cols), animated image stack right (5 cols); stacks on mobile (text first).
- Section rhythm alternates: full-bleed band → contained → offset card → full-bleed. No monotonous identical centered stack.
- Spacing scale (Tailwind): 4/8/12/16/24/32/48/64/96.
- Radii: cards `rounded-2xl`, pills `rounded-full` (brand pill), images `rounded-xl`. Vary intentionally — not rounded-everything-the-same.

---

## 5. Hero & Motion Spec

**Composition**
- Background: amber gradient + low-opacity texture/photo layer.
- **Parallax (3 layers):** back (gradient/texture, slowest), mid (soft blurred shapes / brand pattern), front (real cut-out photo of students/lab, echoing brand portrait style).
- **Motion:** slow Ken Burns on photo (scale 1.0→1.06, ~12s, ease, alternate, infinite); layers shift a few px on scroll via Framer Motion `useScroll` + `useTransform`.
- **NO** full 3D scene. Ceiling is CSS transform parallax or one decorative `<canvas>` blob.

**Performance & a11y**
- Pause motion off-screen (IntersectionObserver) and on `prefers-reduced-motion`.
- GPU-friendly transforms only (`translate`/`scale`); `will-change` sparingly.
- Static hero fallback (no JS / reduced motion). LCP image preloaded, `fetchpriority="high"`.

---

## 6. Carousels

Use **Embla Carousel** (lightweight, accessible) — never a heavy slider lib (a lesson from the current Elementor slideshow).
- **Featured (home):** large editorial slides, photo + caption + link, autoplay 6s, pause on hover/focus, dots + arrows, swipe.
- **Partner logos:** slow continuous marquee, grayscale → color on hover, pauses on hover.
- **Achievements / gallery:** peek-style (partial next slide visible) for editorial feel.
- Rules: keyboard accessible (arrows), `aria-roledescription="carousel"`, never autoplay faster than 5s, always pausable.

---

## 7. Components

| Component | Notes |
|---|---|
| Navbar | Sticky; transparent over hero → solid on scroll. Logo left (dual lockup: "Teknik Logistik · Digital Supply Chain"), links center-right, ID/EN toggle + search right. Mobile: slide-in drawer (brand-800 bg, cream links). |
| Buttons | Primary = brand-700 pill, white text ("Daftar Sekarang" → SMB); secondary = outline brand; tertiary = text + underline-on-hover. |
| Cards | Warm surface, soft shadow, `rounded-2xl`, image-top. Vary sizes (bento) — never 3 identical. |
| News card | Image, category chip, title, date, excerpt. Hover: lift + image zoom. |
| Lecturer card | Portrait, name, NIDN, expertise tags, Sinta/Scholar links. Filter chips above grid. |
| Stat counter | Big display number + bilingual label; count-up on scroll-in (final value on reduced-motion). |
| Chart | Recharts; warm palette; accessible labels; responsive. |
| Lightbox | Gallery photos; keyboard + swipe. |
| Language toggle | ID/EN segmented control; persists across pages. |
| Footer | brand-800 bg, cream text; sitemap columns, socials (IG @disca.telkomuniv / LINE / TikTok), address, accreditation badge, Telkom University lockup. |

---

## 8. Free Template / Starter Guidance

Per the call — **free starter for structure, then re-skin so it doesn't look templated. Build it to look like a premium template without buying one.**

- **Admin:** Filament v3 (free, MIT) — polished panel; theme it amber/brown.
- **Public starter (free, MIT):**
  - Laravel **Breeze (React + Inertia)** — official, minimal base. *(Top pick.)*
  - **HyperUI / Preline / TailGrids** free Tailwind blocks — copy individual sections, then restyle with the tokens here.
  - shadcn/ui (free) for accessible primitives (dialog, dropdown, tabs).
- **Rules to escape the "template look":**
  1. Swap default fonts for the §3 system.
  2. Re-color everything warm — zero leftover indigo/slate.
  3. Break symmetry: asymmetric hero, varied card sizes, off-grid accents.
  4. Use real program photography.
  5. Vary radii intentionally.
  6. Keep one signature element: the pill-shaped section labels echoing the brand's "DIES NATALIS" / "Media Partner" pill.

---

## 9. Tailwind Tokens (drop-in)

```js
// tailwind.config.js — theme.extend
colors: {
  amber:  { 500:'#D99F60', 600:'#C08A4C' },
  brand:  { 700:'#8C6441', 800:'#6E4E33' },
  cream:  { 300:'#AC9587' },
  surface:{ 0:'#FFFDFB', 50:'#ECEBE9' },
  navy:   { 700:'#505666' },
  ink:    { 900:'#24141F' },
},
fontFamily: {
  display: ['Fraunces','serif'],
  sans: ['"Plus Jakarta Sans"','Inter','sans-serif'],
}
```

```css
.bg-hero { background: linear-gradient(135deg,#D99F60 0%,#C08A4C 45%,#8C6441 100%); }
@media (prefers-reduced-motion: reduce){ * { animation:none!important; transition:none!important; } }
```

---

## 10. Bilingual (ID/EN) UX Rules
- Toggle visible on every page (navbar, persists via session/URL).
- ID is default; EN is full parity, not partial.
- Don't mix languages within one view — switch the whole page.
- Layouts must tolerate EN strings running ~20–30% longer than ID; test buttons/nav for wrap.
- Dates, numbers localized (e.g., "17 Juni 2026" / "June 17, 2026").
- `lang` attribute updates on toggle; `hreflang` tags for SEO.

---

## 11. Accessibility Checklist
- [ ] Contrast ≥ 4.5:1 text, 3:1 large text/UI.
- [ ] All images alt text (admin-enforced).
- [ ] Keyboard: nav, carousels, lightbox, forms, toggle.
- [ ] Visible focus rings (amber, 2px).
- [ ] `prefers-reduced-motion` disables parallax/Ken Burns/count-up.
- [ ] Form labels + error messaging; aria-live for submit status.
- [ ] Landmarks (header/nav/main/footer) + skip-to-content.

---

## 12. Do / Don't Summary

**Do:** warm asymmetric layouts, real photos, subtle parallax, editorial type, pill accents, Embla carousels, count-up stats, bilingual parity, accessible motion fallbacks, evidence (numbers/badges).

**Don't:** purple-blue gradients, 3 identical glass cards, full 3D scenes, autoplay-fast slideshows (the old site's mistake), centered-everything, emoji decoration, generic stock hero, leftover template indigo, orphan pages, motion that ignores reduced-motion.
