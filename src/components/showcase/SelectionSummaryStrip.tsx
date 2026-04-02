import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

import type { TrendDateRange } from '../../api/types'
import type { AnalyticsFilters } from './FilterBar'

type Props = {
  filters: AnalyticsFilters
  countryLabel?: string
  categoryLabel?: string
  timeRangeLabel?: string
  itemCount?: number
  dateRange?: TrendDateRange
}

export function SelectionSummaryStrip({
  filters,
  countryLabel,
  categoryLabel,
  timeRangeLabel,
  itemCount,
  dateRange,
}: Props) {
  return (
    <Card className="showcaseCard summaryStrip mb-4 mb-lg-5" aria-label="Current selection summary">
      <Card.Body className="py-2 px-3 px-lg-4">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="small text-body-secondary me-1">Current selection</span>
          <Badge bg="light" text="dark" className="border">
            Country: {countryLabel ?? filters.country}
          </Badge>
          <Badge bg="light" text="dark" className="border">
            Category: {categoryLabel ?? filters.category}
          </Badge>
          <Badge bg="light" text="dark" className="border">
            Time range: {timeRangeLabel ?? filters.timeRange}
          </Badge>
          <Badge bg="light" text="dark" className="border">
            Limit: {filters.limit}
          </Badge>
          {itemCount != null ? (
            <Badge bg="light" text="dark" className="border">
              Items: {itemCount}
            </Badge>
          ) : null}
          {dateRange ? (
            <Badge bg="light" text="dark" className="border">
              Window: {dateRange.start_date} to {dateRange.end_date}
            </Badge>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  )
}

