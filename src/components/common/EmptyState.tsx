import Alert from 'react-bootstrap/Alert'

export function EmptyState({
  title = 'No data',
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <Alert variant="secondary" className="mb-0" role="status" aria-live="polite">
      <div className="fw-semibold">{title}</div>
      {description ? <div className="text-body-secondary">{description}</div> : null}
    </Alert>
  )
}

