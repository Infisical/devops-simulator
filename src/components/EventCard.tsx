import type { GameEvent, Stats } from '../game/types'
import Scene from '../art/Scene'
import { sceneForEvent, moodForStats } from '../art/sceneFor'

interface Props {
  event: GameEvent
  stats: Stats
  onChoose: (index: number) => void
}

const TAG_LABEL: Record<string, string> = {
  security: 'SECURITY INCIDENT',
  disruption: 'COMPANY NEWS',
  exit: 'EXIT OPPORTUNITY',
  nemesis: 'THE MIGRATION AGAIN',
}

export default function EventCard({ event, stats, onChoose }: Props) {
  return (
    <div className="event-card">
      <Scene scene={sceneForEvent(event)} mood={moodForStats(stats)} />
      {event.tag && TAG_LABEL[event.tag] && (
        <div className={`event-tag tag-${event.tag}`}>{TAG_LABEL[event.tag]}</div>
      )}
      <p className="event-log">{event.log}</p>
      <div className="choices">
        {event.choices.map((choice, i) => (
          <button key={choice.label} className="choice-btn" onClick={() => onChoose(i)}>
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}
