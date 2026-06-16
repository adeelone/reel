# Reel

Reel is a calm, personal movie and TV database for discovering, tracking, rating, and choosing what to watch tonight.

It is built as a Vite + React 18 + TypeScript app with React Router, TanStack Query, Zustand, a provider abstraction around TMDB, local-first library persistence, PWA support, and test coverage for the data and UI paths that matter most.

## Features

- Home rails for trending, in theaters, top rated, popular TV, and hidden gems.
- Universal search and URL-backed discover filters.
- Movie and TV detail pages with watch actions, ratings, private notes, providers, cast, seasons, and recommendations.
- Watchlist, watched, favorites, ratings, notes, and JSON export stored locally by default.
- Tonight picker that returns three mood-aware picks and supports locking a pick.
- PWA manifest and offline shell through `vite-plugin-pwa`.
- English-first i18n-ready formatting through `Intl` APIs.

## Stack

- Vite + React 18 + strict TypeScript for a fast SPA build.
- React Router for deep-linkable pages and URL-owned filters.
- TanStack Query for provider cache and stale-while-revalidate behavior.
- Zustand for local library/session state.
- CSS variables with a dark-first visual system; Tailwind is included for teams that want to migrate token utilities later.
- Vitest + Testing Library for unit/component tests and Playwright for browser flows.
- Supabase sync is documented and feature-flagged, but not enabled by default.

## Quickstart

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_TMDB_API_KEY` to use live TMDB data. Without a key, Reel uses deterministic fixtures so the app still runs and tests do not need the network.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

## Environment

- `VITE_TMDB_API_KEY`: read-only public TMDB v3 key.
- `VITE_OMDB_API_KEY`: optional score augmenter.
- `VITE_TRAKT_CLIENT_ID`: optional Trakt integration.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`: optional sync.
- `VITE_SYNC_ENABLED`: gates account sync.
- `VITE_ANALYTICS_PROVIDER`: optional Plausible or Umami.

## Assumptions

- The first release is an SPA, not a Next.js app, so backend sync is represented by interfaces and documentation rather than a live server.
- Anonymous mode is the default. Account sync is behind `VITE_SYNC_ENABLED`.
- TMDB watch providers are the default streaming source. JustWatch can be added behind the same `WatchProvider` interface.
- Fixture data is included so CI and local runs work without live network access.
- `npm` is used in scripts and CI because this workstation does not currently expose `pnpm`; `packageManager` still pins the intended pnpm version.

## Deployment

### Vercel

Import the repo, set `VITE_TMDB_API_KEY`, and use the default Vite settings: build command `npm run build`, output directory `dist`.

### Netlify

Create a new site from Git, set the same env vars, use `npm run build`, and publish `dist`.

### GitHub Pages

Enable Pages for GitHub Actions and add a deploy workflow that uploads `dist`. For project pages, set Vite `base` if the app is not served at the domain root.

## Provider Swaps

Providers live behind interfaces in `src/data/providers/contracts.ts`. To add or swap a provider:

1. Implement the relevant interface in `src/data/providers`.
2. Normalize provider results into `MediaSummary` or `MediaDetail`.
3. Register the implementation where the route query calls are made.
4. Add fixtures and tests so CI does not depend on the provider.

## Known Limitations

- Live TMDB credits, videos, watch providers, and keywords are wired for detail pages; configuration caching is still minimal.
- IndexedDB persistence is represented by the repo layer contract; the current implementation uses localStorage for the initial build.
- Supabase account sync is documented but not wired to live tables.
- Native app via Capacitor, watch-party rooms, co-watching presence, embedding-based recommendations, social graph picks, and a Year in Review page are not in this release.
