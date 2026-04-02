import type { BarChartItem, TrendDateRange } from '../../api/types'
import { EmptyState } from '../common/EmptyState'
import { ErrorState } from '../common/ErrorState'
import { ChartPanel } from './ChartPanel'
import { PageSection } from './PageSection'
import { RankingBars } from './RankingBars'

type Props = {
  isLoading?: boolean
  error?: unknown
  rankingItems: BarChartItem[]
  dateRange?: TrendDateRange
}

export function MainTrendSection({
  isLoading = false,
  error,
  rankingItems,
  dateRange,
}: Props) {
  // TODO: switch this section to a true longitudinal trend chart
  // when backend provides a historical time-series endpoint.
  const dateRangeText =
    dateRange != null ? `${dateRange.start_date} to ${dateRange.end_date}` : undefined

  return (
    <PageSection
      id="main-trend"
      title="Ranked snapshot view"
      subtitle="Supporting ranking module from /api/charts/bar for quick top-item comparison."
      className="mb-3"
    >
      <ChartPanel
        title="Top trending videos by score"
        subtitle={dateRangeText ? `Selected snapshot window: ${dateRangeText}` : 'Selected filter snapshot'}
        height={420}
        isLoading={isLoading}
      >
        {error ? (
          <ErrorState title="Failed to load ranking chart" error={error} />
        ) : rankingItems.length === 0 ? (
          <EmptyState title="No ranking data" description="Try another filter set." />
        ) : (
          <>
            <p className="small text-body-secondary mb-3">
              Scores represent ranking intensity for the selected filters, higher bars indicate stronger snapshot momentum.
            </p>
            <RankingBars items={rankingItems} maxItems={10} />
          </>
        )}
      </ChartPanel>
    </PageSection>
  )
}

