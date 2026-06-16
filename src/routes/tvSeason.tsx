import { Link, useParams } from 'react-router-dom';

export function TvSeasonRoute() {
  const { id, season } = useParams();
  return (
    <div className="page">
      <h1>Season {season}</h1>
      <div className="episode-list">
        {Array.from({ length: 8 }, (_, index) => (
          <Link key={index} to={`/tv/${id}/season/${season}/episode/${index + 1}`}>Episode {index + 1}<small>Mark watched</small></Link>
        ))}
      </div>
    </div>
  );
}

export function TvEpisodeRoute() {
  const { season, episode } = useParams();
  return (
    <div className="page">
      <h1>Season {season}, Episode {episode}</h1>
      <p>Episode stills, runtime, overview, and watch progress live here.</p>
    </div>
  );
}
