import { Play, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../data/images';
import type { MediaSummary } from '../../types/media';

export function BackdropHero({ item }: { item: MediaSummary }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(9,9,11,.94), rgba(9,9,11,.35)), url(${imageUrl(item.backdropPath, 'w1280')})`,
      }}
    >
      <div className="hero-copy">
        <span className="eyebrow">Trending now</span>
        <h1>{item.title}</h1>
        <p>{item.overview}</p>
        <div className="hero-actions">
          <Link className="button primary" to={`/${item.kind}/${item.id}`}>
            <Play size={18} /> Open details
          </Link>
          <Link className="button secondary" to="/lists">
            <Plus size={18} /> Add to list
          </Link>
        </div>
      </div>
    </section>
  );
}
