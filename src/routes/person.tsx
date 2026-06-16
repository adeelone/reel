import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MediaRail } from '../components/media/MediaRail';
import { tmdbPersonProvider } from '../data/providers/tmdb';

export function PersonRoute() {
  const { id = 'p1' } = useParams();
  const person = useQuery({ queryKey: ['person', id], queryFn: () => tmdbPersonProvider.detail(id) });
  if (!person.data)
    return (
      <div className="page">
        <h1>Loading person</h1>
      </div>
    );
  return (
    <div className="page">
      <h1>{person.data.name}</h1>
      <p>{person.data.biography}</p>
      <MediaRail title="Known for" items={person.data.knownFor} />
    </div>
  );
}
