# CLAUDE.md — Estudio Castelo

@docs/client-website.md

## Project Overview

The codebase for Estudio Castelo (`https://www.estudiocastelo.com`), a static website presenting the artist Felipe de Sousa and his work. The site owner manages part of the site's content in the 3D Web Dev Headless CMS: today, the Original Artwork gallery. This site fetches that content from the CMS's public API and renders it. Everything else on the site (pages, layout, styling, the hero and logo images) lives in this repo.

- **The site owner** manages CMS content in the CMS dashboard (`https://3dwebdev.com/dashboard`). They never edit that content in this repo.
- **The CMS** stores the content, serves it from its public API (`GET /api/public/galleries/:slug` for this site), and calls this site's `POST /api/revalidate` whenever something changes.
- **This repo** renders that content statically and builds every other page of the site.

This repo was built from Rich's frontend scaffold, so it carries scaffold elements that aren't in use yet (see Scaffold elements below).

This site has no login, no database, no user accounts and no user data. Its connection to the CMS is specced in full in `docs/client-website.md`.

Production: this site runs on Vercel at `https://www.estudiocastelo.com`. The CMS API runs at `https://api.3dwebdev.com`.

## Site Details

| Detail              | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Website name        | Estudio Castelo                                                                                          |
| Production URL      | `https://www.estudiocastelo.com`: the exact URL stored in the CMS, no redirect                           |
| Vercel project      | `estudio-castelo`, in 3DWD's Vercel Pro team                                                             |
| CMS environment     | production only (`https://api.3dwebdev.com`); no local CMS testing                                       |
| CMS media folder    | `estudiocastelo`: this site's upload folder in 3DWD's Cloudinary account, given by the CMS               |
| Static image folder | `estudio_castelo`: the site's own images (`_data/photos.js`: hero, logo), in the same Cloudinary account |
| CMS content used    | gallery, Gallery Code `zfobc1lj` → `/originalArtwork` (`GALLERY_CODE` in its `page.js`)                  |
| Gallery rendering   | full images only (crops unused); captions under the modal image when present; header text hardcoded      |
| Pages               | `/` (hero), `/about`, `/originalArtwork` (CMS gallery); `/featureThree` is an unlinked placeholder       |

The Gallery Code belongs to one gallery and never changes. If that gallery is deleted and a new one is made, the new gallery has a new code: update `GALLERY_CODE` and this table.

## Tech Stack Summary

- Framework: Next.js 16 (App Router) / JavaScript
- Rendering: static. Server Components by default; CMS content is fetched at build/regeneration time.
- CMS data: one `server-only` `cmsFetch()` plus a `getX()` function per resource, and `src/app/api/revalidate/route.js` for on-demand revalidation
- Images: `next/image`. CMS images come from this site's upload folder in 3DWD's Cloudinary account; the site's own images live in its own Cloudinary folder.
- Testing: Vitest
- Hosting: Vercel, in 3DWD's Vercel Pro team

## Project Architecture

```
root
├── src/
│   ├── test/
│   │   ├── setup.js                   *stubs server-only; sets the HEADLESS_CMS_* vars to undefined before each test
│   │   └── helpers.js                 *mockFetch (the only fake network)
│   └── app/
│       ├── _components/               *all one-time and reusable components
│       │   ├── Artwork_Gallery.jsx    *client island: the artwork grid + modal, given the CMS gallery's images as props
│       │   ├── Image_Gallery_Modal.jsx *client: the pop-over viewer (full image, prev/next/close, caption)
│       │   ├── Fade_In_Section.jsx    *client: fades its children in when visible
│       │   ├── Responsive_Image_Layout.jsx *the hero's <picture> with desktop and mobile sources
│       │   ├── Scroll_To_top.jsx      *resets scroll position on route change
│       │   └── forms/                 *scaffold: Contact_Form.jsx + Form_Modal.jsx (EmailJS), not used on any page yet
│       ├── _data/
│       │   └── photos.js              *the site's own images (heroPhoto, siteLogo), in the estudio_castelo Cloudinary folder
│       ├── _hooks/                    *client-only UI hooks, never CMS data (usePhotoGallery, useModal, useVisibility)
│       ├── _layout/                   *Navbar.jsx and Footer.jsx
│       ├── _lib/
│       │   ├── cmsFetch.js            *the only place the CMS API is called (server-only)
│       │   └── getGallery.js          *galleries: cmsFetch("/api/public/galleries/:slug", …)
│       ├── _styling/                  *all module.css files (snake_case names)
│       ├── about/page.js              *About page
│       ├── originalArtwork/page.js    *Server Component: getGallery(GALLERY_CODE), hardcoded header, Artwork_Gallery
│       ├── featureThree/page.js       *scaffold: placeholder page, not linked in the Navbar
│       ├── api/
│       │   └── revalidate/
│       │       └── route.js           *POST only: checks the webhook secret, expires the "cms" tag
│       ├── globals.css                *global styling
│       ├── layout.js                  *root layout (ScrollToTop, Navbar, Footer, site-wide metadata)
│       └── page.js                    *home page (hero)
├── public/                            *static files
├── docs/
│   └── client-website.md              *the client guide (changed only from a CMS Documentation Sync handoff)
├── .env.example                       *the three HEADLESS_CMS_* names, empty values
├── .gitignore                         *create-next-app's, plus !.env.example so the example is committed
├── .prettierignore                    *docs/client-website.md, so npm run format never edits the guide
├── .prettierrc
├── eslint.config.mjs                  *ESLint (Next.js config), run with npm run lint
├── jsconfig.json                      *the `@/*` → `src/*` import alias
├── next.config.mjs                    *images.remotePatterns: only this site's two Cloudinary folders
├── vitest.config.mjs                  *node environment, @ → src alias, setup file, mocks and stubs reset per test
├── CLAUDE.md                          *project context, loaded automatically every session
└── README.md                          *human-facing overview and local setup
```

*Folders prefixed with an underscore are excluded from routing. Every tested file has its `*.test.js` next to it (see Unit Tests).

## Scaffold elements

This repo was built from a scaffold repo, so some elements are kept for possible later use even though nothing uses them today. They are not dead code: don't remove them, and don't raise them as dead code in a review, unless Rich asks.

- `_components/forms/` (`Contact_Form.jsx`, `Form_Modal.jsx`), the `useModal` hook and the `NEXT_PUBLIC_EMAILJS_*` vars `Contact_Form` reads. ESLint ignores `forms/` (`eslint.config.mjs`) until it is used.
- `featureThree/page.js` and its commented-out Navbar link
- the commented-out `icons` metadata in `layout.js`

When one of them is put into use, finish it (its lint errors, header comment, metadata) and remove it from this list.

## The CMS Integration

`docs/client-website.md` is the source of truth for everything between this site and the CMS: env vars, the response shapes, `cmsFetch()` and the `getX()` functions, rendering rules, the revalidate route, and the Next.js version checks. Follow it exactly. This site uses its Galleries section; its posts sections don't apply here (no posts are shown), but stay in the file because the guide is shared.

- It is the client guide: every client repo copies it from the pilot (Stevie The Dog) and tailors only its own CLAUDE.md. Its facts come from the CMS backend's docs, which are the source of truth. It changes only from a backend Documentation Sync handoff, never on its own in this repo. If it looks wrong or out of date, tell Rich.
- Before writing or changing any caching code, check the installed Next.js version as the guide's "Check the installed Next.js version" section says. Read `AGENTS.md` (if `next dev` has written one) and the docs bundled in `node_modules/next/dist/docs/`, not memory. Next.js APIs change between versions.

## Project Setup

Set up once, then kept:

- **`.gitignore`:** create-next-app ignores `.env*`, which also hides `.env.example`. `!.env.example` keeps it committed.
- **`.prettierignore`:** lists `docs/client-website.md`, so `npm run format` never edits the guide.
- **`vitest.config.mjs`:** the node environment, the setup file, `resolve.alias` for @ → `src` (Vitest doesn't read the `jsconfig.json` paths), and `mockReset`, `unstubEnvs` and `unstubGlobals` set to true.
- **`src/test/setup.js`:** stubs `server-only`, and sets the three `HEADLESS_CMS_*` vars to undefined in a `beforeEach`, so a real key or secret can never reach a test.
- **npm warnings:** eslint 10 is newer than the `^9` peer range of some `eslint-config-next` plugins, so npm prints peer warnings; lint runs fine. npm 11 may also warn that `unrs-resolver` has an unapproved postinstall script; that's harmless too.

## Anti-Patterns to Avoid

**Never call the CMS outside `cmsFetch()`:**
`_lib/cmsFetch.js` is the only place the CMS API is called. It adds the API key, the cache tags and the hourly fallback, unwraps `{ data }` and throws on errors. A second fetch to the CMS anywhere else would drift from those rules.

**Never expose the API key or webhook secret:**
`HEADLESS_CMS_API_KEY` and `HEADLESS_CMS_WEBHOOK_SECRET` are `server-only`. Never prefix them with `NEXT_PUBLIC_`, never read them in a Client Component, never commit them, never log them or the Authorization header.

**Never fetch CMS data from the browser:**
No `useEffect` or client-side hook that calls the CMS. `cmsFetch()` imports `server-only`, and only Server Components call the `getX()` functions. A browser fetch would expose the key and render the content after the page loads, which hurts SEO.

**A page that renders CMS content must never quietly become dynamic:**
Fast static pages and SEO are why this site exists. Don't use `cookies()`, `headers()`, `searchParams`, `cache: "no-store"` or `dynamic = "force-dynamic"` on any page that renders CMS content. After any change to one, confirm in the `next build` output that the page is still ○ or ●, not ƒ.

**Never render CMS text as HTML:**
CMS text (a caption, for example) is a plain React text node. Never use `dangerouslySetInnerHTML`.

**Never render an empty field:**
Optional CMS fields (a gallery image's `caption`, the gallery's `title` and `copy`) may be `null`. Skip them; never render "`null`" or an empty element.

**Never hardcode CMS content:**
Content the CMS manages comes only from the CMS. No sample images, fallback copy or placeholder content in the repo. The Original Artwork heading and paragraph are the site's own copy (Site Details), not the gallery's `title`/`copy`.

**Never add a redirect in front of the stored URL:**
The CMS calls the exact URL it has stored. A www ↔ bare-domain redirect drops the Authorization header and breaks revalidation. Domain redirects are set up in Vercel only after checking that the stored URL is the one the site is served on.

**The revalidate route does one thing:**
Check the secret, expire the cms tag, respond. No other work, no logging of the request.

**Never make aesthetic styling decisions:**
No CSS frameworks, no component libraries, no color, font or spacing choices. Styling is owned entirely by Rich. The agent's only layout job is basic structural formatting (flexbox only) to keep content readable. New CMS-driven elements (a caption, for example) are added unstyled, for Rich to style.

## Patterns and Preferences

**One shared CMS fetch, one function per resource:**
`cmsFetch(path, { tag, empty, notFound })` in `_lib/cmsFetch.js`:

- returns empty when `HEADLESS_CMS_API_URL` is unset, so the site still builds before it is wired up
- sends `GET {HEADLESS_CMS_API_URL}{path}` with `Authorization: Bearer <HEADLESS_CMS_API_KEY>`
- caches with `next: { tags: ["cms", tag], revalidate: 3600 }`: the shared cms tag lets the revalidate route expire every resource at once, and `revalidate: 3600` is the hourly fallback. Keep revalidate on every CMS fetch: the request sends an Authorization header, and Next.js 16 only caches such a request when it has an explicit cache setting
- returns `notFound` on a 404 when the caller passes one (`null` for a gallery, so the page can call `notFound()` and show the 404 page); without it, a 404 throws like any other error
- throws on a non-2xx response, so a failed regeneration keeps the last good page
- returns the unwrapped data

Each CMS resource gets its own function in `_lib/`, named `getX` (`getGallery` today), which calls `cmsFetch` with its path, its own tag and its empty value (`null` for a single item, `[]` for a list). These play the role per-resource hooks play in a client app, but run only in Server Components. A new `getX` is added only once the CMS serves that data and `docs/client-website.md` specs it. Adding one is a new `getX` file, its rendering per the guide, its test, and a row in Site Details.

**Where CMS content renders is decided per client:**
On its own route or inside an existing page through a component in `_components/`. Either way the page is a Server Component that calls `getX()`, and it builds static. Record the choice in Site Details.

**Interactive CMS content is a client island fed by props:**
When CMS content needs browser interaction (the artwork modal), the page (a Server Component) fetches it and passes it as props to a small `"use client"` component (`Artwork_Gallery.jsx`). The island never fetches CMS data and never sees a secret; the page still prerenders statically.

**`_hooks/` is for client-only UI:**
Hooks there handle browser interaction (a modal, visibility) and never fetch CMS data. File names are camelCase prefixed with use.

**Server Components by default:**
Add `"use client"` only to a small interactive island, never to a page that fetches CMS content. No Context or state library unless more than one component actually needs the value.

**Every image goes through `next/image`:**
CMS images use the `src`, `width`, `height` and `altText` the CMS sends (`alt={altText}`), and come from this site's upload folder in 3DWD's Cloudinary account (Site Details). The site's own images live in its own Cloudinary folder and also carry real `width`, `height` and alt.

**The site's own data:**
Data the site uses that isn't CMS content lives in `_data/` (`_data/photos.js`: the hero and logo).

**Every page has metadata:**
Each page exports metadata with at least a title and description, since search is the reason the site is static. (Pages that are still `"use client"` can't export metadata; moving their client parts into islands is how to add it.)

**Saving notes:**
When Rich asks to save or remember something, write it into the most fitting project md file (`CLAUDE.md` or `README.md`, never `docs/client-website.md`), not only into private memory, so it survives a context clear. In plan mode, where only the plan file can be edited, put the doc edit in the plan.

**In-line comments:**
Keep all code readable and explicit. Comments explain the logic in more abstract code, and every comment must be validated and true. Each file has a header comment explaining its purpose (add one when touching a file that lacks it).

## Out of Scope (do not build)

- Anything that writes to the CMS: no forms, admin pages or editing of CMS content. The site owner uses the CMS dashboard.
- Any CMS endpoint not specced in `docs/client-website.md`.
- Login, user accounts, a database, or storing any visitor data.
- Posts, or a page per gallery image, until Rich asks.

## Code Style

Formatting is Prettier with default settings (`.prettierrc`), run before every commit (`npm run format`), plus `npm run lint` clean. These are this repo's own conventions; new files follow them.

- **File naming:** components in Snake_Case.jsx (`Artwork_Gallery.jsx`, `Image_Gallery_Modal.jsx`); hooks in camelCase.js prefixed with use; CSS modules in snake_case (`original_artwork.module.css`); everything else camelCase.js (`cmsFetch.js`, `getGallery.js`).
- **File shape, top to bottom:** header comment → `"use client"` if needed → imports (React, then Next, then third-party, then local, then styles) → module constants (`UPPER_SNAKE`) → helpers → the main export. Inside a component: hooks and state → derived values → handlers → JSX.
- **Exports:** components and pages use `export default function Snake_Case_Name`. Hooks are arrow functions with a default export (`const usePhotoGallery = (…) => {…}; export default usePhotoGallery;`). Lib functions are named exports (`export function getGallery`).
- **Functions:** function declarations for components and helpers; arrow functions for hooks, handlers and inline callbacks.
- **Naming:** CMS fetchers are `getX`. Booleans read as questions (`isOpen`). Use the vocabulary of `docs/client-website.md` (gallery, image, caption, slug / Gallery Code), not synonyms.
- **Control flow:** early returns over nested if/else. No nested ternaries in JSX.
- **Quotes:** Prettier's defaults (double quotes). The guide's snippets already use them, so a copied snippet doesn't change on `npm run format`.

## Code Review

A review is read-only. It produces findings; it never edits code. Fixes are their own task: plan in plan mode, Rich approves, build, verify, PR.

### Checklist

1. **Style is consistent** with Code Style above. If two files do the same thing two ways and neither is documented, raise it as a decision.
2. **No dead code:** unused imports, components, hooks, files, env vars, commented-out code. Scaffold elements (listed above) are exempt.
3. **Explicit, then DRY:** extract on the third copy, or the second when the copies could drift.
4. **Comments are necessary and true**, and every file keeps an accurate header comment.
5. **Docs match code:** the architecture tree, Site Details, Progress line, `README.md` and `.env.example` describe what is in the repo.
6. **The integration still matches `docs/client-website.md`:** run its "Done when" list (the gallery parts) against the code.
7. **The Anti-Patterns still hold:** `cmsFetch` only, secrets `server-only`, no browser fetch, static CMS pages, no HTML injection, no empty fields, no hardcoded content, no aesthetic styling.
8. **Every CMS state renders:** gallery missing (404 page), images with and without a caption, 1 to 30 images.
9. **Tooling is clean:** `npm test`, `npm run lint`, `npm run format` (no diff) and `npm run build` pass, with every CMS page static.

### Output

Findings as a list, most important first. Each has: file and line, checklist item, what's wrong, proposed fix, and type: **bug**, **cleanup** or **doc**. Anything that needs Rich's style or spec call is marked **decision**, with no fix proposed until he decides.

## Unit Tests

Vitest, node environment. `npm test` runs the suite once; `npm run test:watch` while working. A failing test blocks a commit the same as a failing build.

### What is tested

The CMS boundary, where a mistake breaks the site silently or leaks a secret:

- **`cmsFetch()`:** returns empty when `HEADLESS_CMS_API_URL` is unset, without calling fetch; sends `GET {url}{path}` with `Authorization: Bearer <key>`; passes `next: { tags: ["cms", tag], revalidate: 3600 }`; returns the unwrapped data; returns the `notFound` value on a `404` when one is given, and throws on a `404` when none is; throws on a non-2xx response (`401`, `429`, `500`).
- **Each `getX()`:** its wiring: the path, its tag, its empty value (and `getGallery`'s `notFound` value).
- **The revalidate route:** `401` with the documented body for a missing header, a wrong secret, and an unset `HEADLESS_CMS_WEBHOOK_SECRET`; `200` and the cms tag expired for the right secret. For the unset-secret case, send a full `Bearer <secret>`, not `"Bearer "` with nothing after it: header values are trimmed, so it arrives as `"Bearer"` and fails on length alone, and the test would pass even with the guard deleted.
- **A bug that was fixed:** write the failing test first, then fix the code, so it can't come back.

Don't write a test for: static markup, styling, metadata, a constant, or Next.js behaviour itself. Rendering is checked by hand (see Manual testing).

### The pattern every test follows

- **Location and naming:** the test sits next to the file it tests (`cmsFetch.test.js`, `route.test.js`). Shared support lives in `src/test/`. One describe per unit; each it reads as a behaviour sentence: `it("throws when the CMS returns 401")`.
- **Arrange → Act → Assert,** separated by a blank line. One behaviour per test.
- **Test behaviour, not implementation:** assert on what was sent to the CMS (URL, headers, next options) and what came back, or on the route's response, never on internals.
- **Mock only the edges:**
  - The network, through `mockFetch` in `src/test/helpers.js`, which replaces the global fetch. No test calls the real CMS.
  - `revalidateTag` from `next/cache` (`vi.mock`), to assert which tag was expired.
  - `server-only`, stubbed in `src/test/setup.js`, because it throws outside a Next.js server build.
  - Env vars with `vi.stubEnv`, never real values. The real API key and webhook secret never appear in a test.
  - Nothing else in our own code is mocked.
- **Responses come from the contract:** mock bodies use the shapes and messages in `docs/client-website.md`, copied word for word.
- **Independent:** mocks and stubbed env vars reset after each test (`vitest.config.mjs`). Tests pass in any order and alone.
- **No snapshots.**
- **Same rules as the rest of the code:** Code Style and Code Review apply to test files too.

### Manual testing

This site uses the production CMS only (Site Details). Locally, `.env.local` points `HEADLESS_CMS_API_URL` at `https://api.3dwebdev.com` with production's key and secret; `/originalArtwork` should show the gallery. Then a static `next build` (`/originalArtwork` ○), `next start`, and a wrong-secret `401` on the deployed route. The CMS sends its revalidate call to the stored production URL, so locally, after a dashboard change, POST to `localhost:3000/api/revalidate` with the secret by hand to see it. The CMS operator runs the webhook and live-update tests from the backend repo.

Content created in the CMS for testing belongs to the CMS database. List everything a test created so Rich can have it deleted.

## Workflow Checklist

- Branch from an up-to-date main
- Check the relevant spec (`docs/client-website.md` for anything touching CMS content)
- Create a plan in plan mode (EnterPlanMode / ExitPlanMode), never as a chat message
- On approval, build
- Checks after building:
  - Self-review the diff against Code Review → Checklist
  - `npm test` green; new or changed CMS code has tests per Unit Tests
  - `npm run lint`, `npm run format` and `npm run build` are clean, and every CMS page builds as static
  - Every CMS call goes through `cmsFetch()`
  - No secret is `NEXT_PUBLIC_`, committed, logged or read in a Client Component
  - No aesthetic styling added
  - Verified in the browser (`npm run dev`, then `next start` after a build)
  - Test content listed for deletion
- Only commit once the code is reviewed and approved and every check is green
- Commit, push and open a PR; Rich merges it on GitHub

When Rich says to commit, first update the Progress line below to describe the state after the PR merges, on the same branch. After a merge Rich runs `/clear`, so the next task starts from this file and `docs/` alone. Anything worth keeping must be written here first.

## Progress

CMS gallery integration done (`feat/cms-gallery`, 4 November). Dependencies: Next.js and eslint-config-next 16.4.4 (supersedes Dependabot's 16.4.1 PR, which can be closed), plus `server-only`, Vitest and Prettier; production dependencies audit clean. `docs/client-website.md` copied unchanged from the pilot. `cmsFetch`, `getGallery` and the revalidate route come from the guide and are tested (16 tests). `/originalArtwork` is a static Server Component (1h fallback) that fetches gallery `zfobc1lj` and shows the 404 page when it's missing. The grid and modal live in the `Artwork_Gallery` client island with the original styling, and a caption shows unstyled under the modal image when present. The `originalArtwork` array was removed from `_data/photos.js`. `next/image` loads only from `3dwd/estudiocastelo/` and `estudio_castelo/`. Lint is clean: `Navbar.jsx` closes the mobile menu on every route change without an effect (reset during render when `usePathname()` changes, and it stays closed on a return to the page it was opened on, PR #3), `Responsive_Image_Layout.jsx` passes `alt` explicitly, and ESLint ignores the scaffold `forms/` folder. The whole repo is Prettier-formatted.

Tested against the production CMS before merging: the gallery prerenders 12 images, `next/image` refuses other folders, and the local revalidate route returns 401 for a missing or wrong secret and 200 for the right one. `https://www.estudiocastelo.com` serves with no redirect (the bare domain 308s to www). The three `HEADLESS_CMS_*` vars are set on Vercel (`estudio-castelo`) with production's key and secret. No CMS test content was created.

Live checks after the merge: `/originalArtwork` serves the 12 gallery images and a wrong-secret `POST https://www.estudiocastelo.com/api/revalidate` returns 401. The original gallery (`test-test-test`) was deleted by accident on 5 November and replaced with a new gallery, Gallery Code `zfobc1lj` (`fix/gallery-code-zfobc1lj`): it prerendered 12 images in a local production build. Still to do: after the merge, confirm the live `/originalArtwork` shows the new gallery; then edit the gallery in the dashboard and confirm the change shows after one refresh.

## Plan Authoring

When in plan mode, write the plan to be legible cold, understandable by someone who never saw the conversation that produced it. State what's being built, which files will be touched, and why this approach was chosen. Spell out what "same pattern as before" or "as discussed" means instead of writing it.

## Delegating to Subagents

Use subagents for research, exploration and investigation for a plan, and for completing smaller tasks.
