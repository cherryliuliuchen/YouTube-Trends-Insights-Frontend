import Alert from 'react-bootstrap/Alert'

import { getErrorMessage } from '../../utils/formatters'

export function ErrorState({
  title,
  error,
}: {
  title?: string
  error: unknown
}) {
  const message = getErrorMessage(error)
  return (
    <Alert variant="danger" role="alert" aria-live="assertive" className="mb-0">
      {title ? <div className="fw-semibold mb-1">{title}</div> : null}
      <div className="text-break">{message}</div>
    </Alert>
  )
}

