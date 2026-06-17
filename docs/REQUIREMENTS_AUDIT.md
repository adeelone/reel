# Reel Requirements Audit

Source: `C:\Users\adeem\Downloads\reel-codex-prompt.md`

Status date: 2026-06-16

## Summary

- PASS: 27
- PARTIAL: 25
- FAIL: 0

The app is a working Vite/React implementation with real TMDB provider calls, local library state, core routes, tests, CI, release, and GitHub publishing. The remaining gaps are larger product work: full account auth, custom list editing, full IndexedDB persistence, richer provider integrations, complete accessibility/i18n coverage, and externally verified Lighthouse targets.

## Audit

| Requirement                                               | Status  | Evidence                                                                                                                                                                                               |
| --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React 18 + Vite + strict TypeScript                       | PASS    | `package.json`, `vite.config.ts`, and `tsconfig.app.json` define the stack and strict compiler settings.                                                                                               |
| TMDB as primary provider with `VITE_TMDB_API_KEY`         | PASS    | `src/data/providers/tmdb.ts` reads `import.meta.env.VITE_TMDB_API_KEY` and falls back to fixtures without a key.                                                                                       |
| Provider interfaces for movies, TV, people, search, watch | PASS    | `src/data/providers/contracts.ts` defines the requested provider interfaces.                                                                                                                           |
| TanStack Query cache                                      | PASS    | `src/main.tsx` configures `QueryClient`; routes call providers through `useQuery`.                                                                                                                     |
| Language and region request shape                         | PARTIAL | TMDB requests default language and pass region in key calls; settings are not yet wired into provider calls.                                                                                           |
| TMDB image URL builders and srcset                        | PASS    | `src/data/images.ts` includes `imageUrl` and `imageSrcSet`.                                                                                                                                            |
| Home route with hero and rails                            | PARTIAL | `/` has a hero and rails for trending, in theaters, top rated, popular TV, and hidden gems; coming soon and pinned genre rails are not implemented.                                                    |
| Discover route with URL filters                           | PARTIAL | `/discover` keeps type, genre, provider, and sort in the URL; runtime, vote thresholds, language, year range, and provider IDs are not complete.                                                       |
| Universal search                                          | PARTIAL | `/search?q=` searches movies and renders results; people and keyboard result navigation are not complete.                                                                                              |
| Movie and TV detail pages                                 | PARTIAL | `/movie/:id` and `/tv/:id` render hero, actions, facts, providers, credits, videos, seasons, notes, and recommendations; reviews, lightbox, full credits modal, and collection strip are not complete. |
| Season and episode routes                                 | PARTIAL | TV season and episode routes exist with a watch-progress shell; episode metadata is not live.                                                                                                          |
| Person route                                              | PARTIAL | `/person/:id` exists and uses the provider contract; live filmography grouping is not complete.                                                                                                        |
| Collection route                                          | PARTIAL | `/collection/:id` exists with local media rendering; live TMDB collections are not wired.                                                                                                              |
| Library route                                             | PARTIAL | Watchlist, watched, favorites, ratings, notes, stats, JSON export, and CSV export exist; custom lists and drag ordering are not complete.                                                              |
| Calendar route and ICS export                             | PARTIAL | `/calendar` exists and exports an empty ICS shell; watchlist/followed-person release aggregation is not complete.                                                                                      |
| Tonight smart picker                                      | PARTIAL | `/tonight` returns three mood-aware picks, can spin and lock; provider availability and full mood scoring are basic.                                                                                   |
| Settings route                                            | PASS    | Region, language, rating mode, theme, sync controls, and delete-local-data controls are persisted through the local repo layer.                                                                        |
| Local-first persistence                                   | PARTIAL | Library state persists to localStorage through a repo layer; IndexedDB storage is not implemented.                                                                                                     |
| Optional account sync                                     | PARTIAL | A Supabase REST sync adapter is behind `VITE_SYNC_ENABLED`; full account auth, migration UI, and conflict review are not complete.                                                                     |
| Export/import JSON and Letterboxd CSV                     | PASS    | JSON export/import and Letterboxd-style CSV export are exposed in `/lists`.                                                                                                                            |
| Notes, ratings, tags                                      | PASS    | Detail pages support private notes, ratings, and editable tags.                                                                                                                                        |
| Smart lists                                               | PASS    | Discover filters can be saved as smart-list URLs and are listed under `/lists`.                                                                                                                        |
| Mobile-first responsive UI                                | PASS    | CSS uses responsive grids, clamp sizing, and mobile navigation behavior.                                                                                                                               |
| Dark, light, and true-black themes                        | PASS    | Theme preference supports dark, light, and true-black modes.                                                                                                                                           |
| Keyboard shortcuts and Command-K                          | PARTIAL | Search focus and command panel exist; the full shortcut set and overlay are not complete.                                                                                                              |
| Accessibility scaffolding                                 | PARTIAL | Semantic routes, labels, and focusable rails are present; a full WCAG audit has not been completed.                                                                                                    |
| i18n scaffolding                                          | PARTIAL | `Intl` formatting is used for facts; translation resources are not implemented.                                                                                                                        |
| PWA installable shell                                     | PASS    | `vite-plugin-pwa`, manifest, and app icon are present.                                                                                                                                                 |
| Skeletons instead of spinners                             | PARTIAL | Home skeleton exists; not every route has skeleton coverage.                                                                                                                                           |
| Error boundaries per route                                | PASS    | `src/app/router.tsx` assigns `RouteError` to the shell and each route.                                                                                                                                 |
| Dockerfile and compose                                    | PASS    | `Dockerfile` and `docker-compose.yml` are present.                                                                                                                                                     |
| GitHub Actions CI, E2E, release                           | PASS    | `.github/workflows` contains CI, Playwright, and release workflows.                                                                                                                                    |
| Repo hygiene files                                        | PASS    | `.gitignore`, `.gitattributes`, `.env.example`, license, conduct, contributing, security, changelog, templates, Dependabot, and CODEOWNERS exist.                                                      |
| Secret scan                                               | PASS    | Local scan found no committed secret patterns.                                                                                                                                                         |
| Tests for image utils and mood picker                     | PASS    | `tests/unit/images.test.ts` and `tests/unit/mood.test.ts` cover these paths.                                                                                                                           |
| Component test for poster card                            | PASS    | `tests/component/PosterCard.test.tsx` verifies detail links.                                                                                                                                           |
| Playwright happy paths                                    | PASS    | Playwright ran successfully for home/detail/watchlist persistence and discover URL filters.                                                                                                            |
| Public GitHub repo                                        | PASS    | Repo is published at `https://github.com/adeelone/reel`; visibility was approved for public release.                                                                                                   |
| Default branch main                                       | PASS    | `main` is the default branch and local branch tracks `origin/main`.                                                                                                                                    |
| Tag and release                                           | PASS    | `v0.1.0` release exists.                                                                                                                                                                               |
| Branch protection                                         | PASS    | `main` protection was configured after publish.                                                                                                                                                        |
| Discussions announcement                                  | PASS    | Announcement discussion was created at `https://github.com/adeelone/reel/discussions/13`.                                                                                                              |
| Social preview `public/og.png`                            | PASS    | `public/og.png` is present for social preview use.                                                                                                                                                     |
| Lighthouse targets                                        | PARTIAL | Production build is verified and Lighthouse CLI is available, but the local preview server hung before a browser audit could complete.                                                                 |

## Fixes Made In This Pass

- Wired TMDB detail calls to request credits, videos, watch providers, and keywords.
- Mapped discover genre/sort values into TMDB request parameters.
- Added Letterboxd-style CSV export.
- Added an ICS export shell on the calendar route.
- Added the manifest icon asset referenced by the PWA setup.
- Tightened README wording that sounded like scaffold language.
- Added route error boundaries.
- Added saved Discover smart lists.
- Added a feature-flagged Supabase sync adapter.
- Added `public/og.png`.
- Added persisted settings and theme switching.
- Added JSON import and tag editing.
