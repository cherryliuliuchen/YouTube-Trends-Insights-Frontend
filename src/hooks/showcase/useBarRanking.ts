import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { useShowcaseBarRanking } from './useShowcaseBarRanking'

export function useBarRanking(filters: AnalyticsFilters) {
  return useShowcaseBarRanking(filters)
}

