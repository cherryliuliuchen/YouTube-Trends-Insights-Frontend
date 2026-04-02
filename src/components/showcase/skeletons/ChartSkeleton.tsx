import { useId } from 'react'

type Props = {
  height?: number
}

export function ChartSkeleton({ height = 360 }: Props) {
  const id = useId()
  return (
    <div
      className="chartSkeleton"
      style={{ minHeight: `${height}px` }}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-describedby={id}
    >
      <div className="chartSkeletonGrid" />
      <div className="chartSkeletonLine" />
      <span id={id} className="visuallyHidden">
        Loading chart…
      </span>
    </div>
  )
}

