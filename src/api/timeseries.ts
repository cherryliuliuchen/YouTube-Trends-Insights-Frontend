import { apiClient } from './client'
import type { TimeSeriesGroupBy, TimeSeriesMetric, TimeSeriesResponse } from './types'

export type TimeSeriesQueryParams = {
  countries?: string[]
  category?: string
  time_range: string
  metric?: TimeSeriesMetric
  group_by?: TimeSeriesGroupBy
}

export async function getTimeSeries(
  params: TimeSeriesQueryParams,
): Promise<TimeSeriesResponse> {
  const { countries, ...rest } = params
  const serialized = {
    ...rest,
    countries: countries?.length ? countries.join(',') : undefined,
  }

  const res = await apiClient.get<TimeSeriesResponse>('/api/charts/timeseries', {
    params: serialized,
  })
  return res.data
}

