export type MediaKind = 'movie' | 'tv';

export type MediaSummary = {
  id: string;
  tmdbId: number;
  kind: MediaKind;
  title: string;
  year: string;
  posterPath: string;
  backdropPath: string;
  voteAverage: number;
  overview: string;
};

export type Credit = {
  id: string;
  name: string;
  role: string;
};

export type Video = {
  id: string;
  name: string;
  youtubeKey: string;
};

export type Season = {
  seasonNumber: number;
  name: string;
  episodeCount: number;
  airDate?: string;
  voteAverage?: number;
};

export type MediaDetail = MediaSummary & {
  runtime?: number;
  tagline?: string;
  certification?: string;
  genres: string[];
  status?: string;
  originalLanguage?: string;
  budget?: number;
  revenue?: number;
  providers: string[];
  cast: Credit[];
  crew: Credit[];
  videos: Video[];
  seasons: Season[];
  keywords: string[];
};

export type PersonDetail = {
  id: string;
  name: string;
  biography: string;
  knownFor: MediaSummary[];
};
