import Card from 'react-bootstrap/Card'

type Props = {
  title: string
  value: string
  hint?: string
  valueTitle?: string
}

export function KpiCard({ title, value, hint, valueTitle }: Props) {
  return (
    <Card className="showcaseCard kpiCard h-100">
      <Card.Body className="kpiCardBody">
        <div className="kpiTitle">{title}</div>
        <div className="kpiValue textTruncateOneLine" title={valueTitle ?? value}>
          {value}
        </div>
        {hint ? <div className="kpiHint">{hint}</div> : null}
      </Card.Body>
    </Card>
  )
}

