import { apiClient } from './client'
import type { FiltersResponse } from './types'

export async function getFilters(): Promise<FiltersResponse> {
  const res = await apiClient.get<FiltersResponse>('/api/filters')
  return res.data
}

