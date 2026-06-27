# Security Testing Checklist — Pre-Go-Live

Manual verification pass before flipping the Teknik Logistik site live. Run through every item below; do not deploy until all boxes are checked.

## 1. Auth gate (`is_admin`)

- [ ] `/register` returns 404 — no signup form reachable anywhere.
- [ ] Log in as a non-admin user → visit `/admin` (Filament) → expect 403, not a dashboard.
- [ ] Same non-admin user → visit `/admin/news`, `/admin/lecturers`, or any other legacy controller route directly by URL → expect 403, not a list/edit page.
- [ ] Log in as the real admin account → confirm `/admin` and all `/admin/*` controller routes work normally (no false-positive lockout).
- [ ] Attempt 6+ rapid failed logins on `/login` → expect a `429` (rate-limited) response, not unlimited retries.

## 2. Stored XSS (sanitizer)

- [ ] As admin, create/edit a News, Activity, Research, or CommunityService entry with body containing `<script>alert(1)</script>` and `<img src=x onerror=alert(2)>`.
- [ ] View the saved record in the admin edit form → confirm the script/onerror are gone, normal formatting (bold, links, lists, images) still present.
- [ ] View the public page (`/berita/{slug}`, `/agenda/{slug}`, `/riset/{id}`, `/pengabdian/{id}`) → confirm no alert fires; view page source to confirm tags are actually stripped server-side (not just hidden by CSS).

## 3. Session / cookie hygiene

- [ ] On the real domain with HTTPS, inspect cookies in browser devtools → `laravel_session` should have `Secure` and `HttpOnly` flags set.
- [ ] Confirm the site is unreachable over plain `http://` (should redirect to HTTPS, or not respond at all if TLS-only is enforced).

## 4. Debug/error exposure

- [ ] Trigger a deliberate error in production (bad route, malformed input) → confirm a generic error page, **not** a stack trace with file paths and env values. This is the real test of whether `APP_DEBUG=false` took effect on the live server.
- [ ] Visit `/up` (Laravel health check) → should return 200 with no sensitive info.

## 5. File upload sanity

- [ ] Upload a valid image (news cover, lecturer photo, etc.) through admin → confirm it renders on the public page (confirms `storage:link` was also run on the live server — running it locally does not carry over).
- [ ] Attempt to upload a non-image file disguised with an image extension (e.g. a `.php` file renamed to `.jpg`) → must be rejected by Laravel's `image` validation rule.

## 6. Credentials / secrets

- [ ] Confirm the SSH password in `scratch/run_ssh.py` has been rotated on the server (not just gitignored locally).
- [ ] Confirm no leftover test accounts (e.g. placeholder admin password, `normaluser@test.local`) exist on the production DB.
- [ ] Confirm `.env` is not web-accessible — try fetching `https://yourdomain/.env` directly, must 404.

## 7. General route surface

- [ ] Walk every public route in CLAUDE.md's route table (`/profil`, `/kurikulum`, `/dosen`, `/berita`, `/galeri`, `/prestasi`, `/agenda`, `/laboratorium`, `/kemitraan`, `/riset`, `/mbkm`, `/statistik`, `/faq`, `/kontak`) as a logged-out visitor → confirm none accidentally require auth or leak admin-only data.
- [ ] Confirm the admission CTA still links out to `https://smb.telkomuniversity.ac.id/` (not broken by route changes).

## Sign-off

- [ ] All sections above checked.
- [ ] Issues found (if any) logged and resolved before go-live: _______________
- [ ] Checked by: _______________  Date: _______________
