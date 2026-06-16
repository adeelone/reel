# Architecture

Reel is split into app routing, reusable UI, provider data access, local repository state, and domain helpers.

## Routing

`src/app/router.tsx` defines all public routes. Route modules own their data queries and URL parameters so deep links can reproduce search, discover, title, person, list, calendar, and tonight states.

## Data Providers

`src/data/providers/contracts.ts` defines `MovieProvider`, `TVProvider`, `PersonProvider`, `SearchProvider`, and `WatchProvider`. `tmdb.ts` is the default implementation and falls back to fixtures when no TMDB key is present.

## Cache

TanStack Query wraps all provider calls. Defaults are set in `src/main.tsx` with ten-minute stale time and one-hour garbage collection. Endpoint-specific TTLs can be added per query key as integrations mature.

## Local Repository

`src/data/repo/libraryStore.ts` stores watchlist, watched, favorites, ratings, notes, tags, and known media items. It currently persists to localStorage and exposes export helpers. The next step is swapping storage internals to IndexedDB without changing route code.

## Sync

Sync is behind `VITE_SYNC_ENABLED`. The planned Supabase model is:

- `profiles`: account metadata and preferences.
- `library_items`: media item snapshots.
- `user_title_state`: watchlist, watched, favorite, rating, notes, tags.
- `custom_lists`: list metadata.
- `custom_list_items`: ordered list members.

Conflict resolution is last-write-wins per item, with a future review surface when local and remote edits both changed offline.

## PWA

`vite-plugin-pwa` generates the service worker and caches the app shell. Local library data remains on-device unless sync is enabled.
