import type {
  TimeSeriesMetric,
  TimeSeriesResponse,
  TimeSeriesSeries,
} from '../api/types'

export type TimeSeriesChartRow = {
  date: string
  [seriesLabel: string]: string | number
}

export function buildTimeSeriesChartRows(series: TimeSeriesSeries[]): TimeSeriesChartRow[] {
  const byDate = new Map<string, TimeSeriesChartRow>()

  for (const line of series) {
    for (const point of line.data) {
      const row = byDate.get(point.date) ?? { date: point.date }
      row[line.label] = point.value
      byDate.set(point.date, row)
    }
  }

  return [...byDate.values()].sort((a, b) => String(a.date).localeCompare(String(b.date)))
}

export function formatSeriesDate(date: string) {
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function metricLabel(metric: TimeSeriesMetric) {
  switch (metric) {
    case 'views':
      return 'Views'
    case 'likes':
      return 'Likes'
    case 'comments':
      return 'Comments'
    case 'engagement_rate':
      return 'Engagement rate'
    case 'trending_score':
    default:
      return 'Trending score'
  }
}

export function formatMetricValue(value: number, metric: TimeSeriesMetric) {
  if (metric === 'engagement_rate') return `${(value * 100).toFixed(2)}%`
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
}

export function buildTimeSeriesSummary(response: TimeSeriesResponse | undefined) {
  if (!response) return 'Time-series comparison for current selections.'
  const lines = response.series.map((s) => s.label).join(', ')
  const metric = metricLabel(response.filters.metric)
  return `Showing ${metric} over ${response.date_range.start_date} to ${response.date_range.end_date} for ${lines || 'selected groups'}.`
}

