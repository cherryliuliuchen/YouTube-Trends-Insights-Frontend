import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const statusText = error.response?.statusText
    const prefix =
      status != null ? `Request failed (${status}${statusText ? ` ${statusText}` : ''})` : 'Request failed'

    const data = error.response?.data
    if (data == null) return error.message ? `${prefix}: ${error.message}` : prefix

    if (typeof data === 'string') return `${prefix}: ${data}`
    try {
      return `${prefix}: ${JSON.stringify(data)}`
    } catch {
      return `${prefix}: ${String(data)}`
    }
  }

  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : 'Unknown error'
}

