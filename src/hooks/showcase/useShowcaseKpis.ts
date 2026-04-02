import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { useFilters } from '../useFilters'
import { useShowcaseBarRanking } from './useShowcaseBarRanking'
import { useShowcaseTrends } from './useShowcaseTrends'

export type ShowcaseKpis = {
  countriesCovered: string
  categoriesTracked: string
  highestTrendScore: string
  topTrendingVideo: string
  averageEngagementRate: string
  totalItems: string
}

const EMPTY_KPIS: ShowcaseKpis = {
  countriesCovered: '--',
  categoriesTracked: '--',
  highestTrendScore: '--',
  topTrendingVideo: 'No data',
  averageEngagementRate: '--',
  totalItems: '--',
}

function formatScore(value: number | undefined) {
  if (value == null || Number.isNaN(value)) return '--'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
}

function formatPercent(value: number | undefined) {
  if (value == null || Number.isNaN(value)) return '--'
  return `${(value * 100).toFixed(2)}%`
}

function truncateLabel(label: string | undefined, maxLength = 44) {
  if (!label) return 'No data'
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label
}

export function useShowcaseKpis(filters: AnalyticsFilters) {
  const filtersQuery = useFilters()
  const trendsQuery = useShowcaseTrends(filters)
  const barQuery = useShowcaseBarRanking(filters)

  const countriesCovered =
    filtersQuery.data?.countries != null
      ? String(filtersQuery.data.countries.length)
      : EMPTY_KPIS.countriesCovered
  const categoriesTracked =
    filtersQuery.data?.categories != null
      ? String(filtersQuery.data.categories.length)
      : EMPTY_KPIS.categoriesTracked

  const highestTrendScore = formatScore(barQuery.data?.items?.[0]?.value)
  const topTrendingVideo = truncateLabel(barQuery.data?.items?.[0]?.label)
  const averageEngagementRate = formatPercent(
    trendsQuery.data?.items.length
      ? trendsQuery.data.items.reduce((acc, item) => acc + item.engagement_rate, 0) /
          trendsQuery.data.items.length
      : undefined,
  )
  const totalItems =
    trendsQuery.data?.meta?.count != null
      ? String(trendsQuery.data.meta.count)
      : EMPTY_KPIS.totalItems

  return {
    data: {
      countriesCovered,
      categoriesTracked,
      highestTrendScore,
      topTrendingVideo,
      averageEngagementRate,
      totalItems,
    } satisfies ShowcaseKpis,
    isLoading:
      filtersQuery.isLoading || trendsQuery.isLoading || barQuery.isLoading,
    isError: filtersQuery.isError || trendsQuery.isError || barQuery.isError,
    error: filtersQuery.error ?? trendsQuery.error ?? barQuery.error,
    queries: {
      filters: filtersQuery,
      trends: trendsQuery,
      bar: barQuery,
    },
  }
}

