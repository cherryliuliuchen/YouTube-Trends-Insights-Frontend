import { useQuery } from '@tanstack/react-query'

import { getBarChart } from '../api/charts'
import type { TrendsQueryParams } from '../api/types'
import { queryKeys } from './queryKeys'

export function useBarChart(params: TrendsQueryParams) {
  return useQuery({
    queryKey: queryKeys.charts.bar(params),
    queryFn: () => getBarChart(params),
  })
}

