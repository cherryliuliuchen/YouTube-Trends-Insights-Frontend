import { useQuery } from '@tanstack/react-query'

import { getFilters } from '../api/filters'
import { queryKeys } from './queryKeys'

export function useFilters() {
  return useQuery({
    queryKey: queryKeys.filters.all(),
    queryFn: getFilters,
  })
}

