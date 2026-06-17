import { createBrowserRouter } from 'react-router-dom';
import { RouteError } from '../components/common/RouteError';
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
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomeRoute />, errorElement: <RouteError /> },
      { path: 'discover', element: <DiscoverRoute />, errorElement: <RouteError /> },
      { path: 'search', element: <SearchRoute />, errorElement: <RouteError /> },
      { path: 'movie/:id', element: <DetailRoute kind="movie" />, errorElement: <RouteError /> },
      { path: 'tv/:id', element: <DetailRoute kind="tv" />, errorElement: <RouteError /> },
      { path: 'tv/:id/season/:season', element: <TvSeasonRoute />, errorElement: <RouteError /> },
      { path: 'tv/:id/season/:season/episode/:episode', element: <TvEpisodeRoute />, errorElement: <RouteError /> },
      { path: 'person/:id', element: <PersonRoute />, errorElement: <RouteError /> },
      { path: 'collection/:id', element: <CollectionRoute />, errorElement: <RouteError /> },
      { path: 'lists', element: <ListsRoute />, errorElement: <RouteError /> },
      { path: 'lists/:slug', element: <ListsRoute />, errorElement: <RouteError /> },
      { path: 'calendar', element: <CalendarRoute />, errorElement: <RouteError /> },
      { path: 'tonight', element: <TonightRoute />, errorElement: <RouteError /> },
      { path: 'settings', element: <SettingsRoute />, errorElement: <RouteError /> },
    ],
  },
]);
