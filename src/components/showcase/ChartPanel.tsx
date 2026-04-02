import { SectionShell } from './SectionShell'
import { ChartSkeleton } from './skeletons/ChartSkeleton'

type Props = {
  title: string
  subtitle: string
  children?: React.ReactNode
  height?: number
  isLoading?: boolean
}

export function ChartPanel({
  title,
  subtitle,
  children,
  height = 360,
  isLoading = false,
}: Props) {
  return (
    <SectionShell title={title} subtitle={subtitle}>
      {isLoading ? (
        <ChartSkeleton height={height} />
      ) : children ?? (
        <div
          className="chartPlaceholder"
          style={{ minHeight: `${height}px` }}
          role="img"
          aria-label={`${title} placeholder chart area`}
        >
          <div className="placeholderGrid" />
          <div className="placeholderLine" />
        </div>
      )}
    </SectionShell>
  )
}

