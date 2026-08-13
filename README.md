# Ashokkumar T — Portfolio (Phase 1 + Phase 2: Frontend + Backend + Admin)

Production frontend + backend for a MERN developer portfolio. Frontend:
React, Vite, Tailwind CSS v4, Framer Motion, React Router, Axios. Admin
panel talks to the companion `ashokkumar-portfolio-backend` API.

## What's here

- Public site: Hero (with your real photo, 3D mouse-parallax tilt, and a
  curtain-reveal load animation), About, Skills, Projects (+ detail pages
  with 3D hover tilt), Education, GitHub (live public stats), Contact
- Admin dashboard at `/admin` — JWT-protected, with:
  - **Overview** — live counts pulled from the API
  - **Profile** editor (name, roles, bio, socials, avatar upload)
  - **Projects** manager (create/edit/delete, banner upload, full case-study fields)
  - **Skills & Education** manager (inline add/edit/delete)
  - **Messages** inbox (contact form submissions — mark read / delete)
  - Dark mode toggle, scoped to the admin dashboard only
- A discreet admin entry point in the footer (small dot → `/admin/login`)

## Connecting to the backend

1. Get the backend running first — see `ashokkumar-portfolio-backend/README.md`.
2. In this project:
   ```bash
   cp .env.example .env
   # edit VITE_API_URL if your backend isn't on localhost:5000
   npm install
   npm run dev
   ```
3. Log in at `/admin/login` with the credentials you created via
   `npm run seed:admin` in the backend.

## What's still static (by design, for now)

The **public-facing** Home page (Hero, About, Skills, Projects, Education)
still reads from `src/data/profile.js` rather than the live API — the admin
dashboard writes to MongoDB, but the public site doesn't fetch from it yet.
That's the natural next step: swap each public section's data source from
the static file to `api.get(...)`, the same pattern already used throughout
the admin pages. Say the word and I'll wire that up.

## Design system

- **Colors:** off-white background (`#EEEFE9`), near-black ink text, coral
  eyebrow labels, emerald accents — flat, no gradients
- **Type:** Fraunces (display/serif), Inter (body/labels)
- **Depth:** real 3D — mouse-parallax tilt on the hero portrait and project
  cards (via Framer Motion `useMotionValue`/`useTransform`), not just
  drop-shadows
- **Signature element:** numbered editorial section headers (`01. About`)

## Project structure

```
src/
  components/       Public site components
  components/admin/ Admin layout, sidebar, protected route, image uploader
  pages/            Home, ProjectDetail
  pages/admin/      Login, Overview, Profile, Projects, Skills/Education, Messages
  context/          AuthContext (JWT session)
  services/         api.js — axios instance with auth interceptor
  data/             profile.js — still powers the public site (see above)
public/
  resume.pdf, favicon.svg
```

## Editing content right now

- **Public site copy** (until the fetch-from-API step above): edit `src/data/profile.js`
- **Admin-managed data** (profile fields, projects, skills, education, messages): via `/admin` once logged in

