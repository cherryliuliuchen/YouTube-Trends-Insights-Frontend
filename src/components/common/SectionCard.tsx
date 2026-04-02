import Card from 'react-bootstrap/Card'

export function SectionCard({
  title,
  subtitle,
  rightSlot,
  children,
}: {
  title: string
  subtitle?: string
  rightSlot?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-start justify-content-between gap-3">
        <div>
          <div className="fw-semibold">{title}</div>
          {subtitle ? (
            <div className="text-body-secondary small text-break">{subtitle}</div>
          ) : null}
        </div>
        {rightSlot ? <div className="flex-shrink-0">{rightSlot}</div> : null}
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

