import Card from 'react-bootstrap/Card'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function SectionShell({ title, subtitle, children }: Props) {
  return (
    <Card className="showcaseCard">
      <Card.Header className="showcaseCardHeader">
        <h3 className="h6 fw-semibold mb-1">{title}</h3>
        {subtitle ? <div className="text-body-secondary small">{subtitle}</div> : null}
      </Card.Header>
      <Card.Body className="showcaseCardBody">{children}</Card.Body>
    </Card>
  )
}

