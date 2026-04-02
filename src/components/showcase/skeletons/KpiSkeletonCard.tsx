import Card from 'react-bootstrap/Card'

export function KpiSkeletonCard() {
  return (
    <Card className="showcaseCard h-100" aria-busy="true" aria-live="polite">
      <Card.Body>
        <div className="skeletonLine skeletonTitle" />
        <div className="skeletonLine skeletonValue" />
        <div className="skeletonLine skeletonHint" />
      </Card.Body>
    </Card>
  )
}

