import { useQuery } from '@tanstack/react-query';
import { Heart, ListPlus, Share2, TicketCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { RatingControl } from '../components/common/RatingControl';
import { MediaRail } from '../components/media/MediaRail';
import { imageUrl } from '../data/images';
import { fixtureTitles } from '../data/providers/fixtures';
import { tmdbMovieProvider, tmdbTvProvider } from '../data/providers/tmdb';
import { useLibraryStore } from '../data/repo/libraryStore';
import type { MediaKind } from '../types/media';

export function DetailRoute({ kind }: { kind: MediaKind }) {
  const { id = '' } = useParams();
  const detail = useQuery({
    queryKey: ['detail', kind, id],
    queryFn: () => (kind === 'movie' ? tmdbMovieProvider.detail(id) : tmdbTvProvider.detail(id))
  });
  const item = detail.data;
  const toggleWatchlist = useLibraryStore((state) => state.toggleWatchlist);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);
  const toggleWatched = useLibraryStore((state) => state.toggleWatched);
  const rate = useLibraryStore((state) => state.rate);
  const note = useLibraryStore((state) => state.note);
  const rating = useLibraryStore((state) => state.ratings[id] ?? 0);
  const privateNote = useLibraryStore((state) => state.notes[id] ?? '');

  if (!item) return <div className="page"><h1>Loading title</h1></div>;

  return (
    <article className="detail-page">
      <section className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(9,9,11,.96), rgba(9,9,11,.42)), url(${imageUrl(item.backdropPath, 'w1280')})` }}>
        <img className="detail-poster" src={imageUrl(item.posterPath, 'w500')} alt="" />
        <div>
          <span className="eyebrow">{item.year} · {item.runtime ? `${item.runtime} min` : 'Series'} · {item.certification ?? 'NR'}</span>
          <h1>{item.title}</h1>
          <p className="tagline">{item.tagline}</p>
          <p>{item.overview}</p>
          <div className="chip-row">{item.genres.map((genre) => <span className="chip" key={genre}>{genre}</span>)}</div>
          <div className="action-bar">
            <button type="button" onClick={() => toggleWatchlist(item)}><ListPlus size={18} /> Watchlist</button>
            <button type="button" onClick={() => toggleWatched(item)}><TicketCheck size={18} /> Watched</button>
            <button type="button" onClick={() => toggleFavorite(item)}><Heart size={18} /> Favorite</button>
            <button type="button" onClick={() => navigator.share?.({ title: item.title, url: location.href })}><Share2 size={18} /> Share</button>
          </div>
        </div>
      </section>
      <section className="detail-grid">
        <div>
          <h2>Where to watch</h2>
          <div className="provider-row">{item.providers.map((provider) => <span key={provider}>{provider}</span>)}</div>
          <h2>Cast & crew</h2>
          <div className="credit-row">{[...item.cast, ...item.crew].map((credit) => <span key={`${credit.id}-${credit.role}`}>{credit.name}<small>{credit.role}</small></span>)}</div>
          <h2>Media</h2>
          <div className="trailer-box">Trailers open with youtube-nocookie embeds when live TMDB videos are configured.</div>
          {item.seasons.length ? <h2>Seasons</h2> : null}
          <div className="season-grid">{item.seasons.map((season) => <a key={season.seasonNumber} href={`/tv/${item.id}/season/${season.seasonNumber}`}>{season.name}<small>{season.episodeCount} episodes</small></a>)}</div>
        </div>
        <aside>
          <RatingControl value={rating} onChange={(value) => rate(item, value)} />
          <label className="note-box">
            Private notes
            <textarea value={privateNote} onChange={(event) => note(item.id, event.target.value)} placeholder="Markdown notes stay private." />
          </label>
          <h2>Facts</h2>
          <dl className="facts">
            <dt>Status</dt><dd>{item.status}</dd>
            <dt>Language</dt><dd>{item.originalLanguage}</dd>
            <dt>Budget</dt><dd>{item.budget ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.budget) : 'Unknown'}</dd>
            <dt>Revenue</dt><dd>{item.revenue ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.revenue) : 'Unknown'}</dd>
          </dl>
        </aside>
      </section>
      <MediaRail title="Similar & recommended" items={fixtureTitles.filter((title) => title.id !== item.id)} />
    </article>
  );
}
