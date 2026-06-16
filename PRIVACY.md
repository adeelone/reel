# Privacy

Reel is anonymous-first. Without sync enabled, library data stays in the browser and the app only contacts configured content providers such as TMDB.

## Stored Locally

- Watchlist, watched, and favorites.
- Ratings, private notes, and tags.
- Known media item snapshots needed to render lists.
- Settings such as region, language, providers, and rating mode.

## Sync

Sync is disabled by default. When enabled, local data is migrated to the account on first sign-in. Deleting an account must delete remote data and clear local data.

## Analytics

No third-party analytics are configured by default. Plausible or Umami can be added through `VITE_ANALYTICS_PROVIDER`.

## Delete Data

Use Settings to clear local browser data. Remote deletion is part of the future Supabase sync surface.
