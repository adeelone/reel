import type { MediaSummary } from '../../types/media';
import { PosterCard } from './PosterCard';

type MediaRailProps = {
  title: string;
  items: MediaSummary[];
};

export function MediaRail({ title, items }: MediaRailProps) {
  return (
    <section className="media-rail" aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>
      <div className="rail-heading">
        <h2 id={`${title.replace(/\s+/g, '-').toLowerCase()}-heading`}>{title}</h2>
      </div>
      <div className="rail-scroll" tabIndex={0}>
        {items.map((item) => (
          <PosterCard key={`${item.kind}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
