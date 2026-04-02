import React from 'react'
import { useSearchParams } from 'react-router-dom'

import type { FilterOption } from '../api/types'
import { FilterBar, type AnalyticsFilters } from '../components/showcase/FilterBar'
import { KpiSummarySection } from '../components/showcase/KpiSummarySection'
import { MainTrendSection } from '../components/showcase/MainTrendSection'
import { TimeSeriesTrendSection } from '../components/showcase/TimeSeriesTrendSection'
import { useBarRanking } from '../hooks/showcase/useBarRanking'
import { useShowcaseKpis } from '../hooks/showcase/useShowcaseKpis'
import { useShowcaseTimeSeries } from '../hooks/showcase/useShowcaseTimeSeries'
import { useTrendItems } from '../hooks/showcase/useTrendItems'
import { useFilters } from '../hooks/useFilters'

type ShowcaseView = 'overview' | 'snapshot-overview'

export function AnalyticsShowcasePage() {
  const DEFAULT_FILTERS: AnalyticsFilters = {
    country: 'SE',
    compareCategory: '24',
    category: '28',
    timeRange: 'last_week',
    limit: 10,
    metric: 'trending_score',
  }

  const [filters, setFilters] = React.useState(DEFAULT_FILTERS)
  const filtersQuery = useFilters()
  const [searchParams] = useSearchParams()
  const activeView: ShowcaseView =
    searchParams.get('view') === 'snapshot-overview' ? 'snapshot-overview' : 'overview'

  const resolveDefaultValue = React.useCallback(
    (options: FilterOption[] | undefined, preferred: string) => {
      if (!options || options.length === 0) return preferred
      return options.some((option) => option.value === preferred)
        ? preferred
        : options[0].value
    },
    [],
  )

  React.useEffect(() => {
    if (!filtersQuery.data) return
    setFilters((prev) => ({
      ...prev,
      country: resolveDefaultValue(filtersQuery.data.countries, prev.country),
      category: resolveDefaultValue(filtersQuery.data.categories, prev.category),
      timeRange: resolveDefaultValue(filtersQuery.data.time_ranges, prev.timeRange),
    }))
  }, [filtersQuery.data, resolveDefaultValue])

  const handleReset = React.useCallback(() => {
    if (!filtersQuery.data) {
      setFilters(DEFAULT_FILTERS)
      return
    }
    setFilters({
      ...DEFAULT_FILTERS,
      country: resolveDefaultValue(filtersQuery.data.countries, DEFAULT_FILTERS.country),
      category: resolveDefaultValue(
        filtersQuery.data.categories,
        DEFAULT_FILTERS.category,
      ),
      timeRange: resolveDefaultValue(
        filtersQuery.data.time_ranges,
        DEFAULT_FILTERS.timeRange,
      ),
    })
  }, [filtersQuery.data, resolveDefaultValue])

  const kpisQuery = useShowcaseKpis(filters)
  const trendsQuery = useTrendItems(filters)
  const barRankingQuery = useBarRanking(filters)
  const timeSeriesQuery = useShowcaseTimeSeries(filters)

  return (
    <article>
      {activeView === 'overview' ? (
        <>
          <FilterBar
            value={filters}
            onChange={setFilters}
            onReset={handleReset}
            countries={filtersQuery.data?.countries ?? []}
            categories={filtersQuery.data?.categories ?? []}
            timeRanges={filtersQuery.data?.time_ranges ?? []}
            isLoading={filtersQuery.isLoading}
            error={filtersQuery.error}
          />
          <TimeSeriesTrendSection
            data={timeSeriesQuery.data}
            isLoading={timeSeriesQuery.isLoading}
            error={timeSeriesQuery.error}
          />
        </>
      ) : (
        <>
          <KpiSummarySection
            isLoading={kpisQuery.isLoading}
            error={kpisQuery.error}
            items={[
              {
                title: 'Countries Covered',
                value: kpisQuery.data.countriesCovered,
                hint: 'Available countries from filter options',
              },
              {
                title: 'Categories Tracked',
                value: kpisQuery.data.categoriesTracked,
                hint: 'Available categories from filter options',
              },
              {
                title: 'Highest Trend Score',
                value: kpisQuery.data.highestTrendScore,
                hint: 'Top score from current ranking snapshot',
              },
              {
                title: 'Top Trending Video',
                value: kpisQuery.data.topTrendingVideo,
                valueTitle: kpisQuery.data.topTrendingVideo,
                hint: `Items in selection: ${kpisQuery.data.totalItems}, avg engagement: ${kpisQuery.data.averageEngagementRate}`,
              },
            ]}
          />
          <MainTrendSection
            isLoading={barRankingQuery.isLoading}
            error={barRankingQuery.error}
            rankingItems={barRankingQuery.data?.items ?? []}
            dateRange={trendsQuery.data?.date_range}
          />
        </>
      )}
    </article>
  )
}
