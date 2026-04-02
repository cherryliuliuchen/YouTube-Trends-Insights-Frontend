import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'

import type { BarChartItem, TrendItem } from '../../api/types'
import { EmptyState } from '../common/EmptyState'
import { ErrorState } from '../common/ErrorState'
import { ChartPanel } from './ChartPanel'
import { InsightMetricCard } from './InsightMetricCard'
import { PageSection } from './PageSection'

type Props = {
  isDistributionLoading?: boolean
  rankingError?: unknown
  trendsError?: unknown
  rankingItems: BarChartItem[]
  trendItems: TrendItem[]
}

export function SecondaryAnalyticsSection({
  isDistributionLoading = false,
  rankingError,
  trendsError,
  rankingItems,
  trendItems,
}: Props) {
  const topTrend = rankingItems[0]?.label ?? 'No top video'

  const topEngagementItem = trendItems.reduce<TrendItem | null>((best, item) => {
    if (!best || item.engagement_rate > best.engagement_rate) return item
    return best
  }, null)

  const strongestChannel = trendItems.reduce<Record<string, number>>((acc, item) => {
    const key = item.channel_name || 'Unknown channel'
    acc[key] = (acc[key] ?? 0) + item.trending_score
    return acc
  }, {})

  const strongestChannelEntry = Object.entries(strongestChannel).sort(
    (a, b) => b[1] - a[1],
  )[0]

  const scoreValues = trendItems.map((item) => item.trending_score).sort((a, b) => a - b)
  const q1 = scoreValues[Math.floor((scoreValues.length - 1) * 0.25)] ?? 0
  const q2 = scoreValues[Math.floor((scoreValues.length - 1) * 0.5)] ?? 0
  const q3 = scoreValues[Math.floor((scoreValues.length - 1) * 0.75)] ?? 0

  const bucketCounts = trendItems.reduce(
    (acc, item) => {
      if (item.trending_score <= q1) acc.low += 1
      else if (item.trending_score <= q2) acc.midLow += 1
      else if (item.trending_score <= q3) acc.midHigh += 1
      else acc.high += 1
      return acc
    },
    { low: 0, midLow: 0, midHigh: 0, high: 0 },
  )

  const totalBuckets =
    bucketCounts.low + bucketCounts.midLow + bucketCounts.midHigh + bucketCounts.high

  return (
    <PageSection
      id="secondary-analytics"
      title="Secondary insights"
      subtitle="Supporting modules that add context without competing with the primary ranking view."
      className="mb-4 mb-lg-5"
    >
      <Row className="g-3">
        <Col xs={12} md={6} xl={4}>
          <InsightMetricCard
            title="Top video"
            value={topTrend}
            valueTitle={topTrend}
            description="Highest ranking label in the current snapshot."
          />
        </Col>
        <Col xs={12} md={6} xl={4}>
          <InsightMetricCard
            title="Highest engagement item"
            value={topEngagementItem?.video_title ?? 'No engagement data'}
            valueTitle={topEngagementItem?.video_title}
            description={
              topEngagementItem
                ? `${(topEngagementItem.engagement_rate * 100).toFixed(2)}% engagement on ${topEngagementItem.snapshot_date}.`
                : 'No engagement insight available for this selection.'
            }
          />
        </Col>
        <Col xs={12} md={12} xl={4}>
          <InsightMetricCard
            title="Strongest channel"
            value={strongestChannelEntry?.[0] ?? 'No channel data'}
            valueTitle={strongestChannelEntry?.[0]}
            description={
              strongestChannelEntry
                ? `Combined trend score ${new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 0,
                  }).format(strongestChannelEntry[1])}.`
                : 'No channel score aggregation available.'
            }
          />
        </Col>

        <Col xs={12}>
          <ChartPanel
            title="Score distribution snapshot"
            subtitle="Quartile distribution of /api/trends item scores for the current filters."
            height={220}
            isLoading={isDistributionLoading}
          >
            {trendsError ? (
              <ErrorState title="Distribution panel unavailable" error={trendsError} />
            ) : trendItems.length === 0 ? (
              <EmptyState title="No trend items" description="No rows returned from /api/trends." />
            ) : (
              <div className="d-flex flex-column gap-3">
                {[
                  { label: 'Lower quartile', value: bucketCounts.low },
                  { label: 'Mid-lower quartile', value: bucketCounts.midLow },
                  { label: 'Mid-upper quartile', value: bucketCounts.midHigh },
                  { label: 'Upper quartile', value: bucketCounts.high },
                ].map((bucket) => {
                  const percent = totalBuckets > 0 ? (bucket.value / totalBuckets) * 100 : 0
                  return (
                    <div key={bucket.label}>
                      <div className="d-flex justify-content-between mb-1 small">
                        <span className="text-body-secondary">{bucket.label}</span>
                        <span className="fw-semibold">{bucket.value}</span>
                      </div>
                      <ProgressBar now={percent} aria-label={`${bucket.label} distribution bar`} />
                    </div>
                  )
                })}
              </div>
            )}
          </ChartPanel>
        </Col>
      </Row>
      {rankingError ? (
        <div className="mt-3">
          <ErrorState title="Top ranking insight unavailable" error={rankingError} />
        </div>
      ) : null}
    </PageSection>
  )
}

