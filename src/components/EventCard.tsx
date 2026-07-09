import { useEffect, useState } from 'react'
import type { GameEvent } from '../game/types'

interface Props {
  event: GameEvent
  onChoose: (index: number) => void
}

const TAG_LABEL: Record<string, string> = {
  security: '⚠ SECURITY INCIDENT',
  disruption: '⚡ COMPANY NEWS',
  exit: '💰 EXIT OPPORTUNITY',
  nemesis: '☠ THE MIGRATION AGAIN',
}

const TAG_CLASS: Record<string, string> = {
  security: 'tag-security',
  disruption: 'tag-disruption',
  exit: 'tag-exit',
  nemesis: 'tag-nemesis',
}

export default function EventCard({ event, onChoose }: Props) {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTyped('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTyped(event.log.slice(0, i))
      if (i >= event.log.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 12)
    return () => clearInterval(interval)
  }, [event.log])

  function skip() {
    setTyped(event.log)
    setDone(true)
  }

  return (
    <div className={`event-card ${event.tag ? 'tagged' : ''}`}>
      {event.tag && TAG_LABEL[event.tag] && (
        <div className={`event-tag ${TAG_CLASS[event.tag]}`}>{TAG_LABEL[event.tag]}</div>
      )}
      <p className="event-log" onClick={skip}>
        <span className="prompt">$ tail -f /var/log/reality</span>
        <br />
        {typed}
        {!done && <span className="cursor-blink">▌</span>}
      </p>
      <div className={`choices ${done ? 'choices-visible' : 'choices-hidden'}`}>
        {event.choices.map((choice, i) => (
          <button key={choice.label} className="choice-btn" onClick={() => onChoose(i)} disabled={!done}>
            {i + 1}) {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}
