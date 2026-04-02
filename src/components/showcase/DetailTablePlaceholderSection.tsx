import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import type { TrendItem } from '../../api/types'
import { EmptyState } from '../common/EmptyState'
import { ErrorState } from '../common/ErrorState'
import { PageSection } from './PageSection'

type Props = {
  items: TrendItem[]
  isLoading?: boolean
  error?: unknown
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`
}

export function DetailTablePlaceholderSection({
  items,
  isLoading = false,
  error,
}: Props) {
  const topRow = items[0]

  return (
    <PageSection
      id="detail-table"
      title="Detailed records"
      subtitle="Snapshot items from /api/trends for auditability and deeper inspection."
      className="mb-2 mb-lg-3"
    >
      <Card className="showcaseCard">
        <Card.Body>
          <p className="small text-body-secondary mb-3">
            {topRow
              ? `Showing ${items.length} ranked rows, top entry is from ${topRow.channel_name} on ${topRow.snapshot_date}.`
              : 'Use this table to inspect ranking details for each returned item.'}
          </p>
          {isLoading ? (
            <div className="text-body-secondary">Loading detail table…</div>
          ) : error ? (
            <ErrorState title="Failed to load detail rows" error={error} />
          ) : items.length === 0 ? (
            <EmptyState title="No trend rows" description="Try broadening filters or increasing limit." />
          ) : (
            <div className="table-responsive">
              <Table hover className="showcaseTable align-middle mb-0">
                <caption className="visuallyHidden">
                  Ranked trending videos table for the current filters
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Video</th>
                    <th scope="col">Channel</th>
                    <th scope="col">Snapshot Date</th>
                    <th scope="col" className="text-end">Views</th>
                    <th scope="col" className="text-end">Likes</th>
                    <th scope="col" className="text-end">Comments</th>
                    <th scope="col" className="text-end">Engagement</th>
                    <th scope="col" className="text-end">Trend Score</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.video_id}-${item.snapshot_date}`}>
                      <td className="fw-semibold">{item.rank}</td>
                      <td className="tableVideoTitle" title={item.video_title}>
                        {item.video_title}
                      </td>
                      <td className="tableChannelName textTruncateOneLine" title={item.channel_name}>{item.channel_name}</td>
                      <td>{item.snapshot_date}</td>
                      <td className="text-end">{formatNumber(item.views)}</td>
                      <td className="text-end">{formatNumber(item.likes)}</td>
                      <td className="text-end">{formatNumber(item.comments)}</td>
                      <td className="text-end">{formatPercent(item.engagement_rate)}</td>
                      <td className="text-end fw-semibold">{formatNumber(item.trending_score)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </PageSection>
  )
}

