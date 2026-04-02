import type { AnalyticsFilters } from '../../components/showcase/FilterBar'
import { useShowcaseTrends } from './useShowcaseTrends'

export function useTrendItems(filters: AnalyticsFilters) {
  return useShowcaseTrends(filters)
}

