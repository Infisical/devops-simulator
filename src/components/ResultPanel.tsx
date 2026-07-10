import type { Stats } from '../game/types'
import Scene from '../art/Scene'
import { sceneForTag, moodForDeltas } from '../art/sceneFor'

interface Props {
  text: string
  deltas?: Partial<Stats>
  tag?: string
  onContinue: () => void
}

export default function ResultPanel({ text, deltas, tag, onContinue }: Props) {
  return (
    <div className="event-card result-panel">
      <Scene scene={sceneForTag(tag)} mood={moodForDeltas(deltas)} />
      <p className="event-log">{text || '...'}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}
