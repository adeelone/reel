import { Download } from 'lucide-react';
import { PosterCard } from '../components/media/PosterCard';
import { exportLibraryJson, libraryStats, useLibraryStore } from '../data/repo/libraryStore';

export function ListsRoute() {
  const state = useLibraryStore();
  const stats = libraryStats();
  const watchlist = state.watchlist.map((id) => state.items[id]).filter(Boolean);
  const watched = state.watched.map((id) => state.items[id]).filter(Boolean);
  const favorites = state.favorites.map((id) => state.items[id]).filter(Boolean);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Library</h1>
        <button type="button" onClick={() => navigator.clipboard.writeText(exportLibraryJson())}><Download size={18} /> Export JSON</button>
      </div>
      <section className="stats-panel">
        <span>{stats.watchlist} watchlist</span>
        <span>{stats.watched} watched</span>
        <span>{stats.favorites} favorites</span>
        <span>{stats.averageRating.toFixed(1)} avg rating</span>
      </section>
      <h2>Watchlist</h2>
      <div className="poster-grid">{watchlist.map((item) => <PosterCard key={item.id} item={item} />)}</div>
      <h2>Watched</h2>
      <div className="poster-grid">{watched.map((item) => <PosterCard key={item.id} item={item} />)}</div>
      <h2>Favorites</h2>
      <div className="poster-grid">{favorites.map((item) => <PosterCard key={item.id} item={item} />)}</div>
    </div>
  );
}
