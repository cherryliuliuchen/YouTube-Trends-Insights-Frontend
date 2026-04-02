import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { getBarChart } from '../../api/charts'
import { queryKeys } from '../queryKeys'
import type { TrendsQueryParams } from '../../api/types'

function toParams(filters: AnalyticsFilters): TrendsQueryParams {
  return {
    country: filters.country,
    category: filters.category,
    time_range: filters.timeRange,
    limit: filters.limit,
  }
}

export function useShowcaseBarRanking(filters: AnalyticsFilters) {
  const params = toParams(filters)

  return useQuery({
    queryKey: queryKeys.charts.bar(params),
    queryFn: () => getBarChart(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

