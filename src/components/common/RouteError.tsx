import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export function RouteError() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong';

  return (
    <section className="page">
      <div className="empty-state">
        <h1>{title}</h1>
        <p>Reel could not render this view. Try again or go back home.</p>
        <Link className="button primary" to="/">
          Home
        </Link>
      </div>
    </section>
  );
}
