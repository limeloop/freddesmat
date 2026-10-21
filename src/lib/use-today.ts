import { useSyncExternalStore } from 'react'

const noop = () => () => {}

function todayIso() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/**
 * Dagens datum (ÅÅÅÅ-MM-DD) i besökarens tidszon.
 * Sidan förrenderas vid bygget, så på servern är värdet `null` – ingen hydreringskrock.
 */
export function useToday() {
  return useSyncExternalStore(noop, todayIso, () => null)
}
