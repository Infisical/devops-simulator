import type { Stats } from '../game/types'

const LABELS: Record<keyof Stats, string> = {
  sanity: 'SANITY',
  uptime: 'UPTIME',
  reputation: 'REPUTATION',
  karma: 'KARMA',
}

function bar(value: number): string {
  const filled = Math.round(value / 10)
  return '▓'.repeat(filled) + '░'.repeat(10 - filled)
}

export default function StatsBar({ stats }: { stats: Stats }) {
  const keys = Object.keys(stats) as (keyof Stats)[]
  return (
    <div className="stats-bar">
      {keys.map((key) => (
        <div className="stat-row" key={key}>
          <span className="stat-label">{LABELS[key]}</span>
          <span className={`stat-track ${stats[key] <= 20 ? 'stat-danger' : ''}`}>
            {bar(stats[key])}
          </span>
          <span className="stat-value">{stats[key]}</span>
        </div>
      ))}
    </div>
  )
}
