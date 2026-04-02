import { apiClient } from './client'
import type { BarChartResponse, TrendsQueryParams } from './types'

export async function getBarChart(params: TrendsQueryParams): Promise<BarChartResponse> {
  const res = await apiClient.get<BarChartResponse>('/api/charts/bar', { params })
  return res.data
}

