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
  smartLists: SmartList[];
  preferences: Preferences;
  toggleWatchlist: (item: MediaSummary) => void;
  toggleWatched: (item: MediaSummary) => void;
  toggleFavorite: (item: MediaSummary) => void;
  rate: (item: MediaSummary, value: number) => void;
  note: (id: string, value: string) => void;
  tag: (id: string, tags: string[]) => void;
  saveSmartList: (list: SmartList) => void;
  removeSmartList: (id: string) => void;
  updatePreferences: (preferences: Partial<Preferences>) => void;
};

const storageKey = 'reel.library.v1';

export type SmartList = {
  id: string;
  title: string;
  href: string;
  createdAt: string;
};

export type Preferences = {
  region: string;
  language: string;
  ratingMode: '10' | '5';
  theme: 'dark' | 'light' | 'true-black';
};

const defaultPreferences: Preferences = {
  region: 'US',
  language: 'en-US',
  ratingMode: '10',
  theme: 'dark',
};

function load(): Partial<LibraryState> {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Partial<LibraryState>;
  } catch {
    return {};
  }
}

function persist(state: LibraryState) {
  const { watchlist, watched, favorites, items, ratings, notes, tags, smartLists, preferences } = state;
  localStorage.setItem(
    storageKey,
    JSON.stringify({ watchlist, watched, favorites, items, ratings, notes, tags, smartLists, preferences }),
  );
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
  smartLists: load().smartLists ?? [],
  preferences: { ...defaultPreferences, ...(load().preferences ?? {}) },
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
  tag: (id, tags) =>
    set((state) => {
      const next = { ...state, tags: { ...state.tags, [id]: tags } };
      persist(next);
      return next;
    }),
  saveSmartList: (list) =>
    set((state) => {
      const withoutDuplicate = state.smartLists.filter((entry) => entry.href !== list.href);
      const next = { ...state, smartLists: [list, ...withoutDuplicate].slice(0, 20) };
      persist(next);
      return next;
    }),
  removeSmartList: (id) =>
    set((state) => {
      const next = { ...state, smartLists: state.smartLists.filter((list) => list.id !== id) };
      persist(next);
      return next;
    }),
  updatePreferences: (preferences) =>
    set((state) => {
      const next = { ...state, preferences: { ...state.preferences, ...preferences } };
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

export function importLibrarySnapshot(snapshot: Partial<LibraryState>) {
  localStorage.setItem(storageKey, JSON.stringify(snapshot));
  useLibraryStore.setState({
    watchlist: snapshot.watchlist ?? [],
    watched: snapshot.watched ?? [],
    favorites: snapshot.favorites ?? [],
    items: snapshot.items ?? {},
    ratings: snapshot.ratings ?? {},
    notes: snapshot.notes ?? {},
    tags: snapshot.tags ?? {},
    smartLists: snapshot.smartLists ?? [],
    preferences: { ...defaultPreferences, ...(snapshot.preferences ?? {}) },
  });
}

export function importLibraryJson(value: string) {
  const parsed = JSON.parse(value) as Partial<LibraryState>;
  importLibrarySnapshot(parsed);
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
