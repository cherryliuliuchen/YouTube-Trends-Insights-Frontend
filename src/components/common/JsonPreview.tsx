import { EmptyState } from './EmptyState'

type Props = {
  value: unknown
  maxHeightPx?: number
  ariaLabel?: string
}

function safeStringify(value: unknown) {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

export function JsonPreview({
  value,
  maxHeightPx = 320,
  ariaLabel = 'JSON preview',
}: Props) {
  if (value == null) {
    return <EmptyState title="No response body" />
  }

  return (
    <pre
      className="jsonPreview mb-0"
      style={{ maxHeight: maxHeightPx }}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {safeStringify(value)}
    </pre>
  )
}

