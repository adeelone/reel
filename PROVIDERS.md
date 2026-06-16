# Providers

## TMDB

TMDB is the default source for movies, TV, search, people, images, and watch provider metadata. Use a read-only v3 key in `VITE_TMDB_API_KEY`.

## OMDb

OMDb is reserved for Rotten Tomatoes and Metacritic score augmentation. It should be lazy-loaded only when `VITE_OMDB_API_KEY` is present.

## Trakt

Trakt is reserved for advanced list import/export. It should stay behind `VITE_TRAKT_CLIENT_ID` and never block core browsing.

## JustWatch

TMDB watch providers are the initial source. If JustWatch is added, implement the `WatchProvider` interface and keep region as a required parameter.

## Fallback Chain

1. Live configured provider.
2. Cached query data.
3. Local fixture or empty state.

## Adding a Provider

Create one file in `src/data/providers`, normalize to shared types, add fixture-backed tests, and route it through the interface contract.
