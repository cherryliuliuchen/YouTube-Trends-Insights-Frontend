import Card from 'react-bootstrap/Card'

type Props = {
  title: string
  description: string
}

export function InsightCard({ title, description }: Props) {
  return (
    <Card className="showcaseCard h-100">
      <Card.Body>
        <Card.Title as="h3" className="h6">
          {title}
        </Card.Title>
        <Card.Text className="text-body-secondary mb-0">{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

