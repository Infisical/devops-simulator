import { useState } from 'react'
import type { Ending, Stats } from '../game/types'
import { currentRankTitle } from '../game/engine'

interface Props {
  ending: Ending
  stats: Stats
  rankIndex: number
  eventsPlayed: number
  onRestart: () => void
}

const HEADLINE_CLASS: Record<Ending['kind'], string> = {
  fired: 'headline-fired',
  retired: 'headline-retired',
  'forced-good': 'headline-retired',
  'forced-bad': 'headline-fired',
}

export default function EndScreen({ ending, stats, rankIndex, eventsPlayed, onRestart }: Props) {
  const [copied, setCopied] = useState(false)
  const peakTitle = currentRankTitle(rankIndex)
  const won = ending.kind === 'retired' || ending.kind === 'forced-good'

  const playUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = won
    ? `I survived ${eventsPlayed} days in DevOps Simulator and retired early as ${peakTitle}.\n\n${ending.reason}\n\nPlay: ${playUrl}`
    : `I lasted ${eventsPlayed} days in DevOps Simulator before getting fired as ${peakTitle}.\n\n"${ending.reason}"\n\nPlay: ${playUrl}`

  function copyResult() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function shareToX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="event-card end-screen">
      <h1 className={HEADLINE_CLASS[ending.kind]}>{ending.headline}</h1>
      <p className="event-log">{ending.reason}</p>
      <div className="end-stats">
        <div>Peak title: {peakTitle}</div>
        <div>Days survived: {eventsPlayed}</div>
        <div>
          Final stats — Sanity {stats.sanity} · Uptime {stats.uptime} · Reputation {stats.reputation} · Karma {stats.karma}
        </div>
      </div>
      <div className="choices">
        <button className="choice-btn" onClick={copyResult}>
          {copied ? 'copied to clipboard' : 'copy result'}
        </button>
        <button className="choice-btn" onClick={shareToX}>
          share on X
        </button>
        <button className="choice-btn" onClick={onRestart}>
          play again
        </button>
      </div>
    </div>
  )
}
