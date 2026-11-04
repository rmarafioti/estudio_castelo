# Estudio Castelo

The website for Estudio Castelo, the art studio of Felipe de Sousa: `https://www.estudiocastelo.com`.

A static Next.js site. The Original Artwork gallery is managed by the site owner in the 3D Web Dev Headless CMS and fetched at build/regeneration time; everything else lives in this repo. The CMS connection is specced in [docs/client-website.md](docs/client-website.md), and project conventions are in [CLAUDE.md](CLAUDE.md).

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the three `HEADLESS_CMS_*` values (production's, from 1Password). Without them the site still builds, but `/originalArtwork` shows the 404 page.
3. `npm run dev` and open `http://localhost:3000`

## Scripts

- `npm run dev`: development server
- `npm run build` / `npm start`: production build and server
- `npm test` / `npm run test:watch`: Vitest unit tests
- `npm run lint`: ESLint
- `npm run format`: Prettier
