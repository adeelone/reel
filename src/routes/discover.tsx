import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../components/filters/FilterBar';
import { PosterCard } from '../components/media/PosterCard';
import { tmdbMovieProvider } from '../data/providers/tmdb';
import type { MediaKind } from '../types/media';

export function DiscoverRoute() {
  const [params] = useSearchParams();
  const kind = (params.get('type') ?? 'movie') as MediaKind;
  const query = useQuery({
    queryKey: ['discover', params.toString()],
    queryFn: () =>
      tmdbMovieProvider.discover({
        kind,
        genre: params.get('genre') ?? undefined,
        provider: params.get('provider') ?? undefined,
        sort: params.get('sort') ?? undefined,
        region: 'US',
      }),
  });

  return (
    <div className="page">
      <h1>Discover</h1>
      <FilterBar />
      <div className="poster-grid">
        {(query.data ?? []).map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
