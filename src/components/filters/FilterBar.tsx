import { useSearchParams } from 'react-router-dom';

const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Animation'];
const providers = ['Netflix', 'Hulu', 'Prime Video', 'Max', 'Disney+'];

export function FilterBar() {
  const [params, setParams] = useSearchParams();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next);
  };

  return (
    <form className="filter-bar" aria-label="Discover filters">
      <label>
        Type
        <select value={params.get('type') ?? 'movie'} onChange={(event) => update('type', event.target.value)}>
          <option value="movie">Movies</option>
          <option value="tv">TV</option>
        </select>
      </label>
      <label>
        Genre
        <select value={params.get('genre') ?? ''} onChange={(event) => update('genre', event.target.value)}>
          <option value="">Any genre</option>
          {genres.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </label>
      <label>
        Provider
        <select value={params.get('provider') ?? ''} onChange={(event) => update('provider', event.target.value)}>
          <option value="">Any provider</option>
          {providers.map((provider) => (
            <option key={provider}>{provider}</option>
          ))}
        </select>
      </label>
      <label>
        Sort
        <select value={params.get('sort') ?? 'popularity'} onChange={(event) => update('sort', event.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="release">Release</option>
        </select>
      </label>
    </form>
  );
}
