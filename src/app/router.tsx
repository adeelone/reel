import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/system/AppShell';
import { CalendarRoute } from '../routes/calendar';
import { CollectionRoute } from '../routes/collection';
import { DetailRoute } from '../routes/detail';
import { DiscoverRoute } from '../routes/discover';
import { HomeRoute } from '../routes/home';
import { ListsRoute } from '../routes/lists';
import { PersonRoute } from '../routes/person';
import { SearchRoute } from '../routes/search';
import { SettingsRoute } from '../routes/settings';
import { TonightRoute } from '../routes/tonight';
import { TvEpisodeRoute, TvSeasonRoute } from '../routes/tvSeason';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: 'discover', element: <DiscoverRoute /> },
      { path: 'search', element: <SearchRoute /> },
      { path: 'movie/:id', element: <DetailRoute kind="movie" /> },
      { path: 'tv/:id', element: <DetailRoute kind="tv" /> },
      { path: 'tv/:id/season/:season', element: <TvSeasonRoute /> },
      { path: 'tv/:id/season/:season/episode/:episode', element: <TvEpisodeRoute /> },
      { path: 'person/:id', element: <PersonRoute /> },
      { path: 'collection/:id', element: <CollectionRoute /> },
      { path: 'lists', element: <ListsRoute /> },
      { path: 'lists/:slug', element: <ListsRoute /> },
      { path: 'calendar', element: <CalendarRoute /> },
      { path: 'tonight', element: <TonightRoute /> },
      { path: 'settings', element: <SettingsRoute /> }
    ]
  }
]);
