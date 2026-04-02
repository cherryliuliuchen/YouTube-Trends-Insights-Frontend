import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import type { FilterOption } from '../../api/types'
import type { TimeSeriesGroupBy, TimeSeriesMetric } from '../../api/types'
import { ErrorState } from '../common/ErrorState'

export type AnalyticsFilters = {
  country: string
  compareCategory?: string
  category: string
  timeRange: string
  limit: number
  metric: TimeSeriesMetric
  groupBy?: TimeSeriesGroupBy
}

type Props = {
  value: AnalyticsFilters
  onChange: (next: AnalyticsFilters) => void
  onReset: () => void
  countries: FilterOption[]
  categories: FilterOption[]
  timeRanges: FilterOption[]
  isLoading?: boolean
  error?: unknown
}

export function FilterBar({
  value,
  onChange,
  onReset,
  countries,
  categories,
  timeRanges,
  isLoading = false,
  error,
}: Props) {
  return (
    <section id="global-filters" className="mb-2">
      {error ? (
        <ErrorState title="Failed to load filter options" error={error} />
      ) : null}
      <div className="showcaseCard filterCard p-2">
        <Row className="g-2 align-items-end flex-nowrap overflow-auto pb-1">
          <Col xs="auto">
            <Form.Group controlId="filter-country">
              <Form.Label className="small mb-1">Country</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select country"
                value={value.country}
                disabled={isLoading || countries.length === 0}
                onChange={(e) => onChange({ ...value, country: e.target.value })}
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label} ({country.value})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="filter-compare-category">
              <Form.Label className="small mb-1">Compare category</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select comparison category"
                value={value.compareCategory ?? ''}
                disabled={isLoading || categories.length === 0}
                onChange={(e) =>
                  onChange({
                    ...value,
                    compareCategory: e.target.value || undefined,
                  })
                }
              >
                <option value="">None</option>
                {categories
                  .filter((category) => category.value !== value.category)
                  .map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.value})
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="filter-category">
              <Form.Label className="small mb-1">Category</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select category"
                value={value.category}
                disabled={isLoading || categories.length === 0}
                onChange={(e) => onChange({ ...value, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.value})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="filter-time-range">
              <Form.Label className="small mb-1">Time range</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select time range"
                value={value.timeRange}
                disabled={isLoading || timeRanges.length === 0}
                onChange={(e) => onChange({ ...value, timeRange: e.target.value })}
              >
                {timeRanges.map((timeRange) => (
                  <option key={timeRange.value} value={timeRange.value}>
                    {timeRange.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="filter-metric">
              <Form.Label className="small mb-1">Metric</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select time-series metric"
                value={value.metric}
                onChange={(e) =>
                  onChange({ ...value, metric: e.target.value as TimeSeriesMetric })
                }
              >
                <option value="trending_score">Trending score</option>
                <option value="views">Views</option>
                <option value="likes">Likes</option>
                <option value="comments">Comments</option>
                <option value="engagement_rate">Engagement rate</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group controlId="filter-limit">
              <Form.Label className="small mb-1">Limit</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Select item limit"
                value={String(value.limit)}
                disabled={isLoading}
                onChange={(e) => onChange({ ...value, limit: Number(e.target.value) })}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto" className="d-grid">
            <Button
              type="button"
              size="sm"
              variant="outline-secondary"
              aria-label="Reset all filters"
              onClick={onReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  )
}

