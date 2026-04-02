import { Spinner } from 'react-bootstrap'

export function LoadingSpinner({ label }: { label: string }) {
  return (
    <div
      className="d-flex align-items-center gap-2"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner animation="border" size="sm" aria-hidden="true" />
      <span className="text-body-secondary">{label}</span>
    </div>
  )
}

