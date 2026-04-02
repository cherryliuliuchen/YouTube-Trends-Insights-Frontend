import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { TimeSeriesMetric, TimeSeriesResponse } from '../../api/types'
import {
  buildTimeSeriesChartRows,
  buildTimeSeriesSummary,
  formatMetricValue,
  formatSeriesDate,
  metricLabel,
} from '../../utils/timeseries'
import { EmptyState } from '../common/EmptyState'
import { ErrorState } from '../common/ErrorState'
import { ChartPanel } from './ChartPanel'

type Props = {
  data?: TimeSeriesResponse
  isLoading?: boolean
  error?: unknown
}

const COLORS = ['#00A6FB', '#22C55E', '#F59E0B', '#EC4899', '#7C3AED', '#14B8A6']

export function TimeSeriesTrendSection({ data, isLoading = false, error }: Props) {
  const rows = data ? buildTimeSeriesChartRows(data.series) : []
  const series = data?.series ?? []
  const metric: TimeSeriesMetric = data?.filters.metric ?? 'trending_score'

  return (
    <section id="timeseries-trend" className="mb-3">
      <ChartPanel
        title={`${metricLabel(metric)} by ${data?.filters.group_by ?? 'group'}`}
        subtitle={buildTimeSeriesSummary(data)}
        height={420}
        isLoading={isLoading}
      >
        {error ? (
          <ErrorState title="Failed to load time-series chart" error={error} />
        ) : !data || series.length === 0 || rows.length === 0 ? (
          <EmptyState
            title="No time-series data"
            description="Try adjusting metric, grouping, or selection filters."
          />
        ) : (
          <div style={{ width: '100%', height: 420 }} aria-label="Time-series trend chart">
            <ResponsiveContainer>
              <LineChart data={rows} margin={{ top: 8, right: 20, left: 6, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbe5f1" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatSeriesDate}
                  tick={{ fontSize: 12, fill: '#475569' }}
                />
                <YAxis
                  tickFormatter={(value) => formatMetricValue(Number(value), metric)}
                  tick={{ fontSize: 12, fill: '#475569' }}
                  width={84}
                />
                <Tooltip
                  labelFormatter={(label) => formatSeriesDate(String(label))}
                  formatter={(value) => formatMetricValue(Number(value ?? 0), metric)}
                />
                <Legend />
                {series.map((line, index) => (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.label}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2.5}
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </ChartPanel>
    </section>
  )
}

