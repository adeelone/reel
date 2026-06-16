import type { MediaDetail, MediaKind, MediaSummary, PersonDetail } from '../../types/media';

export type DiscoverFilters = {
  kind: MediaKind;
  genre?: string;
  provider?: string;
  sort?: string;
  region?: string;
  language?: string;
};

export interface MovieProvider {
  trending(window: 'day' | 'week'): Promise<MediaSummary[]>;
  inTheaters(): Promise<MediaSummary[]>;
  topRated(): Promise<MediaSummary[]>;
  discover(filters: DiscoverFilters): Promise<MediaSummary[]>;
  detail(id: string): Promise<MediaDetail>;
}

export interface TVProvider {
  popular(): Promise<MediaSummary[]>;
  detail(id: string): Promise<MediaDetail>;
}

export interface PersonProvider {
  detail(id: string): Promise<PersonDetail>;
}

export interface SearchProvider {
  search(query: string, kind?: MediaKind | 'person'): Promise<MediaSummary[]>;
}

export interface WatchProvider {
  providers(id: string, kind: MediaKind, region: string): Promise<string[]>;
}
