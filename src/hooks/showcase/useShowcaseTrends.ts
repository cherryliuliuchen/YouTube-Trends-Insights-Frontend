import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { getTrends } from '../../api/trends'
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

export function useShowcaseTrends(filters: AnalyticsFilters) {
  const params = toParams(filters)

  return useQuery({
    queryKey: queryKeys.trends.items(params),
    queryFn: () => getTrends(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

