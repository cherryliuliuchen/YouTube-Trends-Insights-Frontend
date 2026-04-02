import type {
  TimeSeriesGroupBy,
  TimeSeriesMetric,
  TrendsQueryParams,
  VideosByKeywordParams,
} from '../api/types'

export const queryKeys = {
  health: {
    db: () => ['health', 'db'] as const,
  },
  filters: {
    all: () => ['filters'] as const,
  },
  trends: {
    list: (params: TrendsQueryParams) => ['trends', params] as const,
    items: (params: TrendsQueryParams) => ['trends', 'items', params] as const,
  },
  charts: {
    bar: (params: TrendsQueryParams) => ['charts', 'bar', params] as const,
    timeSeries: (params: {
      countries?: string[]
      category?: string
      time_range: string
      metric: TimeSeriesMetric
      group_by: TimeSeriesGroupBy
    }) => ['charts', 'timeseries', params] as const,
  },
  showcase: {
    kpis: (params: TrendsQueryParams) => ['showcase', 'kpis', params] as const,
  },
  videos: {
    byKeyword: (params: VideosByKeywordParams) =>
      ['videos', 'byKeyword', params.keyword, params.limit ?? ''] as const,
  },
} as const

