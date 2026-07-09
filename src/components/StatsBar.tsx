import { useEffect, useState } from 'react'
import type { Stats } from '../game/types'
import { STAT_CONTEXT } from '../game/engine'

const LABELS: Record<keyof Stats, string> = {
  sanity: 'SANITY',
  uptime: 'UPTIME',
  reputation: 'REPUTATION',
  karma: 'KARMA',
}

interface Props {
  stats: Stats
  deltas?: Partial<Stats>
}

export default function StatsBar({ stats, deltas }: Props) {
  const [visibleDeltas, setVisibleDeltas] = useState<Partial<Stats>>({})
  const [flashKeys, setFlashKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!deltas || Object.keys(deltas).length === 0) return
    setVisibleDeltas(deltas)
    setFlashKeys(new Set(Object.keys(deltas)))
    const t = setTimeout(() => {
      setVisibleDeltas({})
      setFlashKeys(new Set())
    }, 1400)
    return () => clearTimeout(t)
  }, [deltas])

  const keys = Object.keys(stats) as (keyof Stats)[]

  let worstKey: keyof Stats | null = null
  let worstValue = 100
  for (const key of keys) {
    if (stats[key] < worstValue) {
      worstValue = stats[key]
      worstKey = key
    }
  }
  const contextLine =
    worstKey && worstValue <= 15
      ? STAT_CONTEXT[worstKey].critical
      : worstKey && worstValue <= 32
        ? STAT_CONTEXT[worstKey].strained
        : null

  return (
    <div className="stats-bar">
      {keys.map((key) => {
        const value = stats[key]
        const level = value <= 15 ? 'critical' : value <= 32 ? 'strained' : 'ok'
        const delta = visibleDeltas[key]
        return (
          <div className="stat-row" key={key}>
            <span className="stat-label">{LABELS[key]}</span>
            <span className="bar-track">
              <span
                className={`bar-fill bar-${level} ${flashKeys.has(key) ? 'bar-flash' : ''}`}
                style={{ width: `${value}%` }}
              />
            </span>
            <span className="stat-value">{value}</span>
            {delta !== undefined && delta !== 0 && (
              <span className={`stat-delta ${delta > 0 ? 'delta-up' : 'delta-down'}`}>
                {delta > 0 ? `+${delta}` : delta}
              </span>
            )}
          </div>
        )
      })}
      {contextLine && <div className="stat-context">⚠ {contextLine}</div>}
    </div>
  )
}
