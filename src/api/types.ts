export type ApiUnknownRecord = Record<string, unknown>

export type HealthResponse =
  | {
      status?: 'ok' | 'error' | string
      ok?: boolean
      message?: string
      details?: ApiUnknownRecord
    }
  | ApiUnknownRecord

export type FilterOption = {
  label: string
  value: string
}

export type FiltersResponse = {
  countries: FilterOption[]
  categories: FilterOption[]
  time_ranges: FilterOption[]
}

export type TrendFilters = {
  country: string
  category: string
  time_range: string
  limit: number
}

export type TrendDateRange = {
  start_date: string
  end_date: string
}

export type TrendItem = {
  video_id: string
  video_title: string
  channel_id: string
  channel_name: string
  country_code: string
  country_name: string
  category_code: string
  category_name: string
  snapshot_date: string
  published_at: string
  duration_seconds: number
  default_language: string | null
  source_platform: string
  views: number
  likes: number
  comments: number
  engagement_rate: number
  trending_score: number
  search_rank: number
  rank: number
}

export type TrendsResponse = {
  filters: TrendFilters
  date_range: TrendDateRange
  items: TrendItem[]
  meta: {
    count: number
    sorted_by: string
  }
}

export type BarChartItem = {
  label: string
  value: number
}

export type BarChartResponse = {
  title: string
  filters: TrendFilters
  items: BarChartItem[]
}

export type TrendsQueryParams = {
  country: string
  category: string
  time_range: string
  limit?: number
}

export type TimeSeriesMetric =
  | 'trending_score'
  | 'views'
  | 'likes'
  | 'comments'
  | 'engagement_rate'

export type TimeSeriesGroupBy = 'country' | 'category'

export type TimeSeriesFilters = {
  countries?: string[]
  category?: string
  time_range: string
  metric: TimeSeriesMetric
  group_by: TimeSeriesGroupBy
}

export type TimeSeriesPoint = {
  date: string
  value: number
}

export type TimeSeriesSeries = {
  key: string
  label: string
  data: TimeSeriesPoint[]
}

export type TimeSeriesResponse = {
  filters: TimeSeriesFilters
  date_range: TrendDateRange
  series: TimeSeriesSeries[]
}

export type VideosByKeywordItem = ApiUnknownRecord

export type VideosByKeywordResponse =
  | {
      items?: VideosByKeywordItem[]
      data?: VideosByKeywordItem[]
      [key: string]: unknown
    }
  | VideosByKeywordItem[]
  | ApiUnknownRecord

export type VideosByKeywordParams = {
  keyword: string
  limit?: number
}

