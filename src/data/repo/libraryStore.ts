import { create } from 'zustand';
import type { MediaSummary } from '../../types/media';

type LibraryState = {
  watchlist: string[];
  watched: string[];
  favorites: string[];
  items: Record<string, MediaSummary>;
  ratings: Record<string, number>;
  notes: Record<string, string>;
  tags: Record<string, string[]>;
  toggleWatchlist: (item: MediaSummary) => void;
  toggleWatched: (item: MediaSummary) => void;
  toggleFavorite: (item: MediaSummary) => void;
  rate: (item: MediaSummary, value: number) => void;
  note: (id: string, value: string) => void;
};

const storageKey = 'reel.library.v1';

function load(): Partial<LibraryState> {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<LibraryState>;
  } catch {
    return {};
  }
}

function persist(state: LibraryState) {
  const { watchlist, watched, favorites, items, ratings, notes, tags } = state;
  localStorage.setItem(storageKey, JSON.stringify({ watchlist, watched, favorites, items, ratings, notes, tags }));
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((entry) => entry !== id) : [...list, id];
}

export const useLibraryStore = create<LibraryState>((set) => ({
  watchlist: load().watchlist ?? [],
  watched: load().watched ?? [],
  favorites: load().favorites ?? [],
  items: load().items ?? {},
  ratings: load().ratings ?? {},
  notes: load().notes ?? {},
  tags: load().tags ?? {},
  toggleWatchlist: (item) =>
    set((state) => {
      const next = {
        ...state,
        watchlist: toggle(state.watchlist, item.id),
        items: { ...state.items, [item.id]: item },
      };
      persist(next);
      return next;
    }),
  toggleWatched: (item) =>
    set((state) => {
      const next = { ...state, watched: toggle(state.watched, item.id), items: { ...state.items, [item.id]: item } };
      persist(next);
      return next;
    }),
  toggleFavorite: (item) =>
    set((state) => {
      const next = {
        ...state,
        favorites: toggle(state.favorites, item.id),
        items: { ...state.items, [item.id]: item },
      };
      persist(next);
      return next;
    }),
  rate: (item, value) =>
    set((state) => {
      const next = {
        ...state,
        ratings: { ...state.ratings, [item.id]: value },
        items: { ...state.items, [item.id]: item },
      };
      persist(next);
      return next;
    }),
  note: (id, value) =>
    set((state) => {
      const next = { ...state, notes: { ...state.notes, [id]: value } };
      persist(next);
      return next;
    }),
}));

export function exportLibraryJson() {
  return JSON.stringify(load(), null, 2);
}

export function exportLetterboxdCsv() {
  const state = getSnapshot();
  const rows = ['Title,Year,Rating,WatchedDate,Review'];

  Object.values(state.items ?? {}).forEach((item) => {
    const rating = state.ratings?.[item.id] ?? '';
    const watchedDate = state.watched?.includes(item.id) ? new Date().toISOString().slice(0, 10) : '';
    const review = state.notes?.[item.id] ?? '';
    rows.push([item.title, item.year, rating, watchedDate, review].map(csvCell).join(','));
  });

  return rows.join('\n');
}

export function libraryStats() {
  const state = getSnapshot();
  const rated = Object.values(state.ratings ?? {});
  return {
    watchlist: state.watchlist?.length ?? 0,
    watched: state.watched?.length ?? 0,
    favorites: state.favorites?.length ?? 0,
    averageRating: rated.length ? rated.reduce((sum, value) => sum + value, 0) / rated.length : 0,
  };
}

export function getSnapshot() {
  return getLocalStorageSnapshot();
}

function getLocalStorageSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<LibraryState>;
  } catch {
    return {};
  }
}

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
