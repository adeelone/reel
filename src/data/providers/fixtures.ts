import type { MediaDetail, MediaSummary, PersonDetail } from '../../types/media';

export const fixtureTitles: MediaSummary[] = [
  {
    id: 'movie-550',
    tmdbId: 550,
    kind: 'movie',
    title: 'Midnight Archive',
    year: '2024',
    posterPath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdropPath: '/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg',
    voteAverage: 8.4,
    overview: 'A meticulous archivist finds a forgotten film that changes how a city remembers itself.'
  },
  {
    id: 'movie-13',
    tmdbId: 13,
    kind: 'movie',
    title: 'North Star',
    year: '1994',
    posterPath: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdropPath: '/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
    voteAverage: 8.8,
    overview: 'A warm, funny odyssey through chance, grief, and the stories people carry.'
  },
  {
    id: 'tv-1399',
    tmdbId: 1399,
    kind: 'tv',
    title: 'The Long Kingdom',
    year: '2011',
    posterPath: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdropPath: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
    voteAverage: 8.5,
    overview: 'Rival houses, impossible choices, and an era bending under old promises.'
  },
  {
    id: 'tv-66732',
    tmdbId: 66732,
    kind: 'tv',
    title: 'Strange Signals',
    year: '2016',
    posterPath: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdropPath: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    voteAverage: 8.6,
    overview: 'A missing child, a secret facility, and a town learning how close wonder sits to dread.'
  },
  {
    id: 'movie-155',
    tmdbId: 155,
    kind: 'movie',
    title: 'City in Shadow',
    year: '2008',
    posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropPath: '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    voteAverage: 9.0,
    overview: 'A masked vigilante, a criminal philosopher, and a city pushed to its moral edge.'
  }
];

export const fixtureDetail: MediaDetail = {
  ...fixtureTitles[0],
  runtime: 118,
  tagline: 'Every frame remembers.',
  certification: 'PG-13',
  genres: ['Drama', 'Mystery', 'Thriller'],
  status: 'Released',
  originalLanguage: 'en',
  budget: 18000000,
  revenue: 74000000,
  providers: ['Max', 'Prime Video'],
  cast: [
    { id: 'p1', name: 'Mara Voss', role: 'Elena Vale' },
    { id: 'p2', name: 'Jon Bell', role: 'Simon Rake' },
    { id: 'p3', name: 'Ari Chen', role: 'Mina' }
  ],
  crew: [{ id: 'p4', name: 'Nora Ives', role: 'Director' }],
  videos: [{ id: 'yt-1', name: 'Official Trailer', youtubeKey: 'dQw4w9WgXcQ' }],
  seasons: [
    { seasonNumber: 1, name: 'Season 1', episodeCount: 8, airDate: '2024-03-12', voteAverage: 8.2 }
  ],
  keywords: ['archives', 'memory', 'noir']
};

export const fixturePerson: PersonDetail = {
  id: 'p1',
  name: 'Mara Voss',
  biography: 'Known for grounded performances in quiet thrillers and character dramas.',
  knownFor: fixtureTitles.slice(0, 3)
};
