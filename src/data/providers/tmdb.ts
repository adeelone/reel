import type { DiscoverFilters, MovieProvider, PersonProvider, SearchProvider, TVProvider, WatchProvider } from './contracts';
import { fixtureDetail, fixturePerson, fixtureTitles } from './fixtures';
import type { MediaKind, MediaSummary, PersonDetail } from '../../types/media';

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined;
const baseUrl = 'https://api.themoviedb.org/3';

async function request<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  if (!apiKey) throw new Error('TMDB key not configured');
  const url = new URL(`${baseUrl}${path}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', String(params.language ?? 'en-US'));
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && key !== 'language') url.searchParams.set(key, String(value));
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

type TmdbItem = {
  id: number;
  media_type?: MediaKind;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
  overview?: string;
};

function mapItem(item: TmdbItem, fallbackKind: MediaKind): MediaSummary {
  const kind = item.media_type === 'tv' || item.media_type === 'movie' ? item.media_type : fallbackKind;
  const title = item.title ?? item.name ?? 'Untitled';
  const date = item.release_date ?? item.first_air_date ?? '';
  return {
    id: `${kind}-${item.id}`,
    tmdbId: item.id,
    kind,
    title,
    year: date ? date.slice(0, 4) : 'TBA',
    posterPath: item.poster_path ?? '',
    backdropPath: item.backdrop_path ?? '',
    voteAverage: item.vote_average ?? 0,
    overview: item.overview ?? ''
  };
}

async function list(path: string, kind: MediaKind, params: Record<string, string | number | undefined> = {}) {
  if (!apiKey) return fixtureTitles.filter((title) => title.kind === kind || path.includes('trending'));
  const data = await request<{ results: TmdbItem[] }>(path, params);
  return data.results.map((item) => mapItem(item, kind)).filter((item) => item.posterPath);
}

export const tmdbMovieProvider: MovieProvider = {
  trending: (window) => list(`/trending/all/${window}`, 'movie'),
  inTheaters: () => list('/movie/now_playing', 'movie', { region: 'US' }),
  topRated: () => list('/movie/top_rated', 'movie'),
  discover: (filters: DiscoverFilters) => list(`/discover/${filters.kind}`, filters.kind, { sort_by: filters.sort === 'rating' ? 'vote_average.desc' : 'popularity.desc', region: filters.region ?? 'US' }),
  async detail(id: string) {
    if (!apiKey) return { ...fixtureDetail, id };
    const tmdbId = id.replace('movie-', '');
    const data = await request<TmdbItem & { runtime?: number; tagline?: string; genres?: { name: string }[]; status?: string; budget?: number; revenue?: number; original_language?: string }>(`/movie/${tmdbId}`);
    return {
      ...mapItem(data, 'movie'),
      runtime: data.runtime,
      tagline: data.tagline,
      genres: data.genres?.map((genre) => genre.name) ?? [],
      status: data.status,
      budget: data.budget,
      revenue: data.revenue,
      originalLanguage: data.original_language,
      providers: [],
      cast: [],
      crew: [],
      videos: [],
      seasons: [],
      keywords: []
    };
  }
};

export const tmdbTvProvider: TVProvider = {
  popular: () => list('/tv/popular', 'tv'),
  async detail(id: string) {
    return { ...(await tmdbMovieProvider.detail(id)), kind: 'tv' };
  }
};

export const tmdbSearchProvider: SearchProvider = {
  async search(query: string, kind: MediaKind | 'person' = 'movie') {
    if (!query.trim()) return [];
    if (!apiKey) return fixtureTitles.filter((title) => title.title.toLowerCase().includes(query.toLowerCase()));
    const path = kind === 'person' ? '/search/person' : `/search/${kind}`;
    const data = await request<{ results: TmdbItem[] }>(path, { query });
    return data.results.map((item) => mapItem(item, kind === 'person' ? 'movie' : kind)).filter((item) => item.posterPath);
  }
};

export const tmdbPersonProvider: PersonProvider = {
  async detail(id: string): Promise<PersonDetail> {
    if (!apiKey) return { ...fixturePerson, id };
    const data = await request<{ id: number; name: string; biography?: string }>(`/person/${id}`);
    return { id: String(data.id), name: data.name, biography: data.biography ?? '', knownFor: [] };
  }
};

export const tmdbWatchProvider: WatchProvider = {
  async providers(_id: string, _kind: MediaKind, region: string) {
    if (!apiKey) return region === 'US' ? ['Max', 'Prime Video'] : ['Netflix'];
    return [];
  }
};
