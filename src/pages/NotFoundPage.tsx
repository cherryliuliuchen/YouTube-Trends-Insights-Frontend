import { Alert } from 'react-bootstrap'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import { ROUTE_PATHS } from '../routes'

export function NotFoundPage() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Page not found'

  const details =
    isRouteErrorResponse(error) && error.data
      ? error.data
      : 'The page you requested does not exist, or an unexpected error occurred.'

  return (
    <section aria-labelledby="not-found-title">
      <h1 id="not-found-title" className="mb-3">
        {title}
      </h1>
      <Alert variant="warning">
        <div className="fw-semibold mb-1">Details</div>
        <div className="text-break">{String(details)}</div>
      </Alert>
      <Link to={ROUTE_PATHS.root}>Go to test page</Link>
    </section>
  )
}

