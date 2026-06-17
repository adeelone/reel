import { Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PosterCard } from '../components/media/PosterCard';
import {
  exportLetterboxdCsv,
  exportLibraryJson,
  importLibraryJson,
  libraryStats,
  useLibraryStore,
} from '../data/repo/libraryStore';

export function ListsRoute() {
  const state = useLibraryStore();
  const stats = libraryStats();
  const watchlist = state.watchlist.map((id) => state.items[id]).filter(Boolean);
  const watched = state.watched.map((id) => state.items[id]).filter(Boolean);
  const favorites = state.favorites.map((id) => state.items[id]).filter(Boolean);
  const copyExport = (value: string) => navigator.clipboard.writeText(value);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Library</h1>
        <div className="button-row">
          <button type="button" onClick={() => copyExport(exportLibraryJson())}>
            <Download size={18} /> JSON
          </button>
          <button type="button" onClick={() => copyExport(exportLetterboxdCsv())}>
            <Download size={18} /> CSV
          </button>
          <label className="file-button">
            Import JSON
            <input
              type="file"
              accept="application/json"
              onChange={async (event) => {
                const file = event.currentTarget.files?.[0];
                if (file) importLibraryJson(await file.text());
                event.currentTarget.value = '';
              }}
            />
          </label>
        </div>
      </div>
      <section className="stats-panel">
        <span>{stats.watchlist} watchlist</span>
        <span>{stats.watched} watched</span>
        <span>{stats.favorites} favorites</span>
        <span>{stats.averageRating.toFixed(1)} avg rating</span>
      </section>
      <h2>Smart lists</h2>
      <div className="list-grid">
        {state.smartLists.map((list) => (
          <article className="list-card" key={list.id}>
            <Link to={list.href}>{list.title}</Link>
            <small>{new Intl.DateTimeFormat('en-US').format(new Date(list.createdAt))}</small>
            <button type="button" onClick={() => state.removeSmartList(list.id)} aria-label={`Remove ${list.title}`}>
              <Trash2 size={16} /> Remove
            </button>
          </article>
        ))}
      </div>
      <h2>Watchlist</h2>
      <div className="poster-grid">
        {watchlist.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
      <h2>Watched</h2>
      <div className="poster-grid">
        {watched.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
      <h2>Favorites</h2>
      <div className="poster-grid">
        {favorites.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
