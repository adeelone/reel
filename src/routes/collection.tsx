import { MediaRail } from '../components/media/MediaRail';
import { fixtureTitles } from '../data/providers/fixtures';

export function CollectionRoute() {
  return (
    <div className="page">
      <h1>Collection</h1>
      <p>Franchise and saga pages group related movies with shared cover art.</p>
      <MediaRail title="Titles in this collection" items={fixtureTitles.filter((item) => item.kind === 'movie')} />
    </div>
  );
}
