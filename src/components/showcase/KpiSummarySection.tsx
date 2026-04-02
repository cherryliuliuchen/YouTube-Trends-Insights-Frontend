import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { ErrorState } from '../common/ErrorState'
import { KpiCard } from './KpiCard'
import { PageSection } from './PageSection'
import { KpiSkeletonCard } from './skeletons/KpiSkeletonCard'

type KpiItem = {
  title: string
  value: string
  hint: string
  valueTitle?: string
}

type Props = {
  isLoading?: boolean
  items: KpiItem[]
  error?: unknown
}

export function KpiSummarySection({ isLoading = false, items, error }: Props) {
  return (
    <PageSection
      id="kpi-summary"
      title="Snapshot"
      subtitle="Quick metrics to orient users before deeper chart exploration."
      className="mb-3"
    >
      {error ? <ErrorState title="Failed to compute KPI summary" error={error} /> : null}
      <Row className="g-3">
        {items.map((item) => (
          <Col key={item.title} xs={12} sm={6} lg={3}>
            {isLoading ? (
              <KpiSkeletonCard />
            ) : (
              <KpiCard
                title={item.title}
                value={item.value}
                hint={item.hint}
                valueTitle={item.valueTitle}
              />
            )}
          </Col>
        ))}
      </Row>
    </PageSection>
  )
}

