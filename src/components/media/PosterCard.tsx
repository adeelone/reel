import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../data/images';
import { useLibraryStore } from '../../data/repo/libraryStore';
import type { MediaSummary } from '../../types/media';

type PosterCardProps = {
  item: MediaSummary;
};

export function PosterCard({ item }: PosterCardProps) {
  const toggleWatchlist = useLibraryStore((state) => state.toggleWatchlist);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const isWatchlisted = useLibraryStore((state) => state.watchlist.includes(item.id));
  const isFavorite = useLibraryStore((state) => state.favorites.includes(item.id));

  return (
    <article className="poster-card">
      <Link to={`/${item.kind}/${item.id}`} aria-label={`Open ${item.title}`}>
        <img src={imageUrl(item.posterPath, 'w342')} alt="" loading="lazy" />
        <div className="poster-meta">
          <strong>{item.title}</strong>
          <span>{item.year} · {item.voteAverage.toFixed(1)}</span>
        </div>
      </Link>
      <div className="poster-actions">
        <button type="button" aria-label="Toggle watchlist" className={isWatchlisted ? 'active' : ''} onClick={() => toggleWatchlist(item)}>
          <Plus size={16} />
        </button>
        <button type="button" aria-label="Toggle favorite" className={isFavorite ? 'active' : ''} onClick={() => toggleFavorite(item)}>
          <Heart size={16} />
        </button>
      </div>
    </article>
  );
}
