import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getTimeSeries } from '../../api/timeseries'
import type { TimeSeriesQueryParams } from '../../api/timeseries'
import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { queryKeys } from '../queryKeys'

function toParams(filters: AnalyticsFilters): TimeSeriesQueryParams {
  return {
    countries: [filters.country],
    category: undefined,
    time_range: filters.timeRange,
    metric: filters.metric,
    group_by: 'category',
  }
}

export function useShowcaseTimeSeries(filters: AnalyticsFilters) {
  const params = toParams(filters)
  return useQuery({
    queryKey: queryKeys.charts.timeSeries({
      countries: params.countries,
      category: params.category,
      time_range: params.time_range,
      metric: params.metric ?? 'trending_score',
      group_by: params.group_by ?? 'category',
    }),
    queryFn: async () => {
      const response = await getTimeSeries(params)
      const wantedKeys = [filters.category, filters.compareCategory].filter(
        (value): value is string => Boolean(value),
      )

      if (wantedKeys.length === 0) return response

      return {
        ...response,
        series: response.series.filter((series) => wantedKeys.includes(series.key)),
      }
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

