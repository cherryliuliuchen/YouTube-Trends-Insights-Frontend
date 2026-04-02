import { Col, Row } from 'react-bootstrap'

import { SectionCard } from '../components/common/SectionCard'
import { ErrorState } from '../components/common/ErrorState'
import { JsonPreview } from '../components/common/JsonPreview'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useBarChart } from '../hooks/useBarChart'
import { useFilters } from '../hooks/useFilters'
import { useHealth } from '../hooks/useHealth'
import { useVideosByKeyword } from '../hooks/useVideosByKeyword'
import { useTrends } from '../hooks/useTrends'

const QUERY_PARAMS = {
  country: 'SE',
  category: '28',
  timeRange: 'last_week',
  limit: 10,
} as const

const VIDEOS_QUERY_PARAMS = {
  keyword: 'barn_or_kid',
  limit: 20,
} as const

export function TestConnectionPage() {
  const health = useHealth()
  const filters = useFilters()
  const trends = useTrends({
    country: QUERY_PARAMS.country,
    category: QUERY_PARAMS.category,
    time_range: QUERY_PARAMS.timeRange,
    limit: QUERY_PARAMS.limit,
  })
  const bar = useBarChart({
    country: QUERY_PARAMS.country,
    category: QUERY_PARAMS.category,
    time_range: QUERY_PARAMS.timeRange,
    limit: QUERY_PARAMS.limit,
  })
  const videos = useVideosByKeyword({
    keyword: VIDEOS_QUERY_PARAMS.keyword,
    limit: VIDEOS_QUERY_PARAMS.limit,
  })

  return (
    <section aria-labelledby="test-connection-title">
      <header className="mb-4">
        <h1 id="test-connection-title" className="mb-2">
          Frontend ↔ Backend connectivity
        </h1>
        <p className="text-body-secondary mb-0">
          This developer page calls your backend and renders responses for quick
          verification.
        </p>
      </header>

      <Row className="g-3">
        <Col xs={12} lg={6}>
          <SectionCard
            title="DB health"
            subtitle="GET /api/health/db"
            rightSlot={
              health.isFetching ? (
                <span className="text-body-secondary small">Refreshing…</span>
              ) : null
            }
          >
            {health.isLoading ? (
              <LoadingSpinner label="Loading DB health" />
            ) : health.isError ? (
              <ErrorState
                title="Failed to load DB health"
                error={health.error}
              />
            ) : (
              <JsonPreview value={health.data} />
            )}
          </SectionCard>
        </Col>

        <Col xs={12} lg={6}>
          <SectionCard title="Filters" subtitle="GET /api/filters">
            {filters.isLoading ? (
              <LoadingSpinner label="Loading filters" />
            ) : filters.isError ? (
              <ErrorState title="Failed to load filters" error={filters.error} />
            ) : (
              <JsonPreview value={filters.data} />
            )}
          </SectionCard>
        </Col>

        <Col xs={12}>
          <SectionCard
            title="Trends"
            subtitle={`GET /api/trends?country=${QUERY_PARAMS.country}&category=${QUERY_PARAMS.category}&time_range=${QUERY_PARAMS.timeRange}&limit=${QUERY_PARAMS.limit}`}
          >
            {trends.isLoading ? (
              <LoadingSpinner label="Loading trends" />
            ) : trends.isError ? (
              <ErrorState title="Failed to load trends" error={trends.error} />
            ) : (
              <JsonPreview value={trends.data} />
            )}
          </SectionCard>
        </Col>

        <Col xs={12}>
          <SectionCard
            title="Bar chart"
            subtitle={`GET /api/charts/bar?country=${QUERY_PARAMS.country}&category=${QUERY_PARAMS.category}&time_range=${QUERY_PARAMS.timeRange}&limit=${QUERY_PARAMS.limit}`}
          >
            {bar.isLoading ? (
              <LoadingSpinner label="Loading bar chart" />
            ) : bar.isError ? (
              <ErrorState title="Failed to load bar chart" error={bar.error} />
            ) : (
              <JsonPreview value={bar.data} />
            )}
          </SectionCard>
        </Col>

        <Col xs={12}>
          <SectionCard
            title="Videos by keyword"
            subtitle={`GET /videos/by-keyword/${VIDEOS_QUERY_PARAMS.keyword}?limit=${VIDEOS_QUERY_PARAMS.limit}`}
          >
            {videos.isLoading ? (
              <LoadingSpinner label="Loading videos" />
            ) : videos.isError ? (
              <ErrorState
                title="Failed to load videos by keyword"
                error={videos.error}
              />
            ) : (
              <JsonPreview value={videos.data} />
            )}
          </SectionCard>
        </Col>
      </Row>
    </section>
  )
}

