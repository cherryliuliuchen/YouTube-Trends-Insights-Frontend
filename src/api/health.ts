import { apiClient } from './client'
import type { HealthResponse } from './types'

export async function getDbHealth(): Promise<HealthResponse> {
  const res = await apiClient.get<HealthResponse>('/api/health/db')
  return res.data
}

