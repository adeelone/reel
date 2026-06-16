import type {
  DiscoverFilters,
  MovieProvider,
  PersonProvider,
  SearchProvider,
  TVProvider,
  WatchProvider,
} from './contracts';
import { fixtureDetail, fixturePerson, fixtureTitles } from './fixtures';
import type { Credit, MediaDetail, MediaKind, MediaSummary, PersonDetail, Video } from '../../types/media';

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

type TmdbProviderResponse = {
  results?: Record<string, { flatrate?: TmdbProvider[]; rent?: TmdbProvider[]; buy?: TmdbProvider[] }>;
};

type TmdbProvider = {
  provider_name: string;
};

type TmdbCredit = {
  id: number;
  name: string;
  character?: string;
  job?: string;
};

type TmdbVideo = {
  id: string;
  name: string;
  key: string;
  site: string;
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
    overview: item.overview ?? '',
  };
}

async function list(path: string, kind: MediaKind, params: Record<string, string | number | undefined> = {}) {
  if (!apiKey) return fixtureTitles.filter((title) => title.kind === kind || path.includes('trending'));
  const data = await request<{ results: TmdbItem[] }>(path, params);
  return data.results.map((item) => mapItem(item, kind)).filter((item) => item.posterPath);
}

function genreIds(genre?: string) {
  const ids: Record<string, number> = {
    Action: 28,
    Animation: 16,
    Comedy: 35,
    Drama: 18,
    'Sci-Fi': 878,
    Thriller: 53,
  };
  return genre ? ids[genre] : undefined;
}

function providerNames(data?: TmdbProviderResponse, region = 'US') {
  const groups = data?.results?.[region];
  const providers = [...(groups?.flatrate ?? []), ...(groups?.rent ?? []), ...(groups?.buy ?? [])];
  return [...new Set(providers.map((provider) => provider.provider_name))];
}

function mapCredits(items: TmdbCredit[] = [], roleKey: 'character' | 'job'): Credit[] {
  return items.slice(0, 12).map((credit) => ({
    id: String(credit.id),
    name: credit.name,
    role: credit[roleKey] ?? 'Credit',
  }));
}

function mapVideos(items: TmdbVideo[] = []): Video[] {
  return items
    .filter((video) => video.site === 'YouTube')
    .slice(0, 6)
    .map((video) => ({ id: video.id, name: video.name, youtubeKey: video.key }));
}

export const tmdbMovieProvider: MovieProvider = {
  trending: (window) => list(`/trending/all/${window}`, 'movie'),
  inTheaters: () => list('/movie/now_playing', 'movie', { region: 'US' }),
  topRated: () => list('/movie/top_rated', 'movie'),
  discover: (filters: DiscoverFilters) =>
    list(`/discover/${filters.kind}`, filters.kind, {
      sort_by:
        filters.sort === 'rating'
          ? 'vote_average.desc'
          : filters.sort === 'release'
            ? 'primary_release_date.desc'
            : 'popularity.desc',
      region: filters.region ?? 'US',
      with_genres: genreIds(filters.genre),
    }),
  async detail(id: string) {
    if (!apiKey) return { ...fixtureDetail, id };
    const tmdbId = id.replace('movie-', '');
    const data = await request<
      TmdbItem & {
        runtime?: number;
        tagline?: string;
        genres?: { name: string }[];
        status?: string;
        budget?: number;
        revenue?: number;
        original_language?: string;
        credits?: { cast?: TmdbCredit[]; crew?: TmdbCredit[] };
        videos?: { results?: TmdbVideo[] };
        'watch/providers'?: TmdbProviderResponse;
        keywords?: { keywords?: { name: string }[] };
      }
    >(`/movie/${tmdbId}`, { append_to_response: 'credits,videos,watch/providers,keywords' });
    return {
      ...mapItem(data, 'movie'),
      runtime: data.runtime,
      tagline: data.tagline,
      genres: data.genres?.map((genre) => genre.name) ?? [],
      status: data.status,
      budget: data.budget,
      revenue: data.revenue,
      originalLanguage: data.original_language,
      providers: providerNames(data['watch/providers']),
      cast: mapCredits(data.credits?.cast, 'character'),
      crew: mapCredits(data.credits?.crew, 'job'),
      videos: mapVideos(data.videos?.results),
      seasons: [],
      keywords: data.keywords?.keywords?.map((keyword) => keyword.name).slice(0, 16) ?? [],
    };
  },
};

export const tmdbTvProvider: TVProvider = {
  popular: () => list('/tv/popular', 'tv'),
  async detail(id: string) {
    if (!apiKey) return { ...fixtureDetail, id, kind: 'tv' };
    const tmdbId = id.replace('tv-', '');
    const data = await request<
      TmdbItem & {
        episode_run_time?: number[];
        tagline?: string;
        genres?: { name: string }[];
        status?: string;
        original_language?: string;
        credits?: { cast?: TmdbCredit[]; crew?: TmdbCredit[] };
        videos?: { results?: TmdbVideo[] };
        'watch/providers'?: TmdbProviderResponse;
        seasons?: MediaDetail['seasons'];
        keywords?: { results?: { name: string }[] };
      }
    >(`/tv/${tmdbId}`, { append_to_response: 'credits,videos,watch/providers,keywords' });
    return {
      ...mapItem(data, 'tv'),
      runtime: data.episode_run_time?.[0],
      tagline: data.tagline,
      genres: data.genres?.map((genre) => genre.name) ?? [],
      status: data.status,
      originalLanguage: data.original_language,
      providers: providerNames(data['watch/providers']),
      cast: mapCredits(data.credits?.cast, 'character'),
      crew: mapCredits(data.credits?.crew, 'job'),
      videos: mapVideos(data.videos?.results),
      seasons: data.seasons ?? [],
      keywords: data.keywords?.results?.map((keyword) => keyword.name).slice(0, 16) ?? [],
    };
  },
};

export const tmdbSearchProvider: SearchProvider = {
  async search(query: string, kind: MediaKind | 'person' = 'movie') {
    if (!query.trim()) return [];
    if (!apiKey) return fixtureTitles.filter((title) => title.title.toLowerCase().includes(query.toLowerCase()));
    const path = kind === 'person' ? '/search/person' : `/search/${kind}`;
    const data = await request<{ results: TmdbItem[] }>(path, { query });
    return data.results
      .map((item) => mapItem(item, kind === 'person' ? 'movie' : kind))
      .filter((item) => item.posterPath);
  },
};

export const tmdbPersonProvider: PersonProvider = {
  async detail(id: string): Promise<PersonDetail> {
    if (!apiKey) return { ...fixturePerson, id };
    const data = await request<{ id: number; name: string; biography?: string }>(`/person/${id}`);
    return { id: String(data.id), name: data.name, biography: data.biography ?? '', knownFor: [] };
  },
};

export const tmdbWatchProvider: WatchProvider = {
  async providers(id: string, kind: MediaKind, region: string) {
    if (!apiKey) return region === 'US' ? ['Max', 'Prime Video'] : ['Netflix'];
    const tmdbId = id.replace(`${kind}-`, '');
    const data = await request<TmdbProviderResponse>(`/${kind}/${tmdbId}/watch/providers`);
    return providerNames(data, region);
  },
};
