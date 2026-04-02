import { useQuery } from '@tanstack/react-query'

import { getDbHealth } from '../api/health'
import { queryKeys } from './queryKeys'

export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health.db(),
    queryFn: getDbHealth,
  })
}

