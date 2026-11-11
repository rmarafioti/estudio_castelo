# Estudio Castelo: this site

Everything particular to this website. The shared CMS docs in `docs/cms/` are synced unchanged from the client-kit repo and never edited here. Where they say "recorded in `docs/site.md`", the value is below.

## Site Details

| Detail              | Value                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Website name        | Estudio Castelo                                                                                          |
| Production URL      | `https://www.estudiocastelo.com`: the exact URL stored in the CMS, no redirect                           |
| Vercel project      | `estudio-castelo`, in 3DWD's Vercel Pro team                                                             |
| CMS environment     | production only (`https://api.3dwebdev.com`); no local CMS testing                                       |
| CMS media folder    | `estudiocastelo`: this site's upload folder in 3DWD's Cloudinary account, given by the CMS               |
| Static image folder | `estudio_castelo`: the site's own images (`_data/photos.js`: hero, logo), in the same Cloudinary account |
| Pages               | `/` (hero), `/about`, `/originalArtwork` (CMS gallery); `/featureThree` is an unlinked placeholder       |

`next/image` loads only from `3dwd/estudiocastelo/` (production uploads) and `estudio_castelo/` (the site's own images), set in `next.config.mjs`. The base's `3dwd-dev/estudiocastelo/` entry (local CMS testing) and the two gallery crop entries from `docs/cms/galleries.md` are left out on purpose (see Quirks).

## Abilities this site uses

- **Galleries (live):** read `docs/cms/galleries.md`. One gallery, Gallery Code `zfobc1lj`, renders on `/originalArtwork` (`GALLERY_CODE` in its `page.js`). The page is a static Server Component that calls `getGallery(GALLERY_CODE)` and shows the 404 page when it returns null. The grid and modal are the `Artwork_Gallery` client island, given the images as props. Full images only (crops unused); a caption shows under the modal image when present. The page's heading and paragraph are the site's own copy, hardcoded, not the gallery's `title`/`copy`. Built: `_lib/getGallery.js`, `_components/Artwork_Gallery.jsx`, `_components/Image_Gallery_Modal.jsx`.
- **Posts (in the CMS, not used):** this site shows no posts. `docs/cms/posts.md` doesn't apply until Rich decides otherwise; there is no `getPosts.js`.

The Gallery Code belongs to one gallery and never changes. If that gallery is deleted and a new one is made, the new gallery has a new code: update `GALLERY_CODE` and this file.

## Quirks

- **Production CMS only:** there is no local CMS testing for this site. `.env.local` points `HEADLESS_CMS_API_URL` at `https://api.3dwebdev.com` with production's key and secret (in 1Password, 3DWD Clients). That's why `next.config.mjs` has no `3dwd-dev/` entry.
- **No crops:** the gallery renders full images only, so `next.config.mjs` has no crop entries. Add the two from `docs/cms/galleries.md` → Images if the site starts using thumbnail or mobile crops. Until then, that doc's "Done when" line about crop entries doesn't apply here.
- Locally, the CMS sends its revalidate call to the stored production URL, not to this machine. After a dashboard change, POST to `localhost:3000/api/revalidate` by hand (with the webhook secret) to see it.
