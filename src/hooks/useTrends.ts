import { useQuery } from '@tanstack/react-query'

import { getTrends } from '../api/trends'
import type { TrendsQueryParams } from '../api/types'
import { queryKeys } from './queryKeys'

export function useTrends(params: TrendsQueryParams) {
  return useQuery({
    queryKey: queryKeys.trends.list(params),
    queryFn: () => getTrends(params),
  })
}

