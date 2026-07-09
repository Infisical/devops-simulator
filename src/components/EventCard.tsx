import type { GameEvent } from '../game/types'

interface Props {
  event: GameEvent
  banner: string | null
  onChoose: (index: number) => void
}

export default function EventCard({ event, banner, onChoose }: Props) {
  return (
    <div className="event-card">
      {banner && <div className="banner">&gt; {banner}</div>}
      <p className="event-log">
        <span className="prompt">$ tail -f /var/log/reality</span>
        <br />
        {event.log}
      </p>
      <div className="choices">
        {event.choices.map((choice, i) => (
          <button key={choice.label} className="choice-btn" onClick={() => onChoose(i)}>
            {i + 1}) {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}
