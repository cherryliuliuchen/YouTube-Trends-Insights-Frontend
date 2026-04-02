import Card from 'react-bootstrap/Card'

type Props = {
  title: string
  value: string
  description: string
  valueTitle?: string
}

export function InsightMetricCard({ title, value, description, valueTitle }: Props) {
  return (
    <Card className="showcaseCard h-100">
      <Card.Body className="py-3">
        <div className="small text-body-secondary mb-1">{title}</div>
        <div className="h5 mb-2 textTruncateOneLine" title={valueTitle ?? value}>
          {value}
        </div>
        <div className="small text-body-secondary mb-0">{description}</div>
      </Card.Body>
    </Card>
  )
}

