import { useQuery } from '@tanstack/react-query';
import { BookmarkPlus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../components/filters/FilterBar';
import { PosterCard } from '../components/media/PosterCard';
import { tmdbMovieProvider } from '../data/providers/tmdb';
import { useLibraryStore } from '../data/repo/libraryStore';
import type { MediaKind } from '../types/media';

export function DiscoverRoute() {
  const [params] = useSearchParams();
  const saveSmartList = useLibraryStore((state) => state.saveSmartList);
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
      <div className="page-header">
        <h1>Discover</h1>
        <button
          type="button"
          onClick={() =>
            saveSmartList({
              id: crypto.randomUUID(),
              title: params.toString() ? `Discover: ${params.toString()}` : 'Discover: popular movies',
              href: `/discover${params.toString() ? `?${params.toString()}` : ''}`,
              createdAt: new Date().toISOString(),
            })
          }
        >
          <BookmarkPlus size={18} /> Save smart list
        </button>
      </div>
      <FilterBar />
      <div className="poster-grid">
        {(query.data ?? []).map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
