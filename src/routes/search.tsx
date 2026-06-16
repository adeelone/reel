import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { PosterCard } from '../components/media/PosterCard';
import { tmdbSearchProvider } from '../data/providers/tmdb';

export function SearchRoute() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const results = useQuery({
    queryKey: ['search', q],
    queryFn: () => tmdbSearchProvider.search(q),
    enabled: q.trim().length > 0,
  });

  return (
    <div className="page">
      <h1>Search</h1>
      <label className="search-box">
        <Search size={20} />
        <input
          value={q}
          onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {})}
          placeholder="Movies, TV, people"
          autoFocus
        />
      </label>
      {!q ? (
        <EmptyState
          title="Start with a title, actor, or mood"
          body="Recent searches will appear here after you search."
        />
      ) : null}
      <div className="poster-grid">
        {(results.data ?? []).map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
