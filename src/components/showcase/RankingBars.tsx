import ProgressBar from 'react-bootstrap/ProgressBar'

import type { BarChartItem } from '../../api/types'

type Props = {
  items: BarChartItem[]
  maxItems?: number
}

export function RankingBars({ items, maxItems = 8 }: Props) {
  const visible = items.slice(0, maxItems)
  const maxValue = visible[0]?.value ?? 0

  return (
    <ol className="rankingList d-flex flex-column gap-3 mb-0 ps-0" aria-label="Ranked trending videos">
      {visible.map((item, index) => {
        const normalized = maxValue > 0 ? (item.value / maxValue) * 100 : 0
        return (
          <li key={`${item.label}-${index}`} className="rankingItem">
            <div className="d-flex justify-content-between align-items-center mb-1 gap-3">
              <span className="small rankingLabel textTruncateOneLine" title={item.label}>
                {index + 1}. {item.label}
              </span>
              <span className="small fw-semibold rankingValue" aria-label={`Score ${item.value}`}>
                {new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 0,
                }).format(item.value)}
              </span>
            </div>
            <ProgressBar
              now={normalized}
              label=""
              aria-label={`${item.label} ranking bar`}
            />
          </li>
        )
      })}
    </ol>
  )
}

