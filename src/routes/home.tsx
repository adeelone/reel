import { useQuery } from '@tanstack/react-query';
import { BackdropHero } from '../components/media/BackdropHero';
import { MediaRail } from '../components/media/MediaRail';
import { Skeleton } from '../components/common/Skeleton';
import { tmdbMovieProvider, tmdbTvProvider } from '../data/providers/tmdb';

export function HomeRoute() {
  const trending = useQuery({ queryKey: ['trending', 'day'], queryFn: () => tmdbMovieProvider.trending('day') });
  const topRated = useQuery({ queryKey: ['topRated'], queryFn: tmdbMovieProvider.topRated });
  const inTheaters = useQuery({ queryKey: ['inTheaters'], queryFn: tmdbMovieProvider.inTheaters });
  const tv = useQuery({ queryKey: ['popularTv'], queryFn: tmdbTvProvider.popular });

  if (trending.isLoading) return <Skeleton className="hero-skeleton" />;

  const hero = trending.data?.[0];

  return (
    <div className="route-stack">
      {hero ? <BackdropHero item={hero} /> : null}
      <MediaRail title="Trending today" items={trending.data ?? []} />
      <MediaRail title="In theaters" items={inTheaters.data ?? []} />
      <MediaRail title="Top rated" items={topRated.data ?? []} />
      <MediaRail title="Popular TV" items={tv.data ?? []} />
      <MediaRail title="Hidden gems" items={(trending.data ?? []).filter((item) => item.voteAverage >= 7.5)} />
    </div>
  );
}
