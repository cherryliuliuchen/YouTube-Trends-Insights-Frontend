import { apiClient } from './client'
import type { TrendsQueryParams, TrendsResponse } from './types'

export async function getTrends(params: TrendsQueryParams): Promise<TrendsResponse> {
  const res = await apiClient.get<TrendsResponse>('/api/trends', { params })
  return res.data
}

