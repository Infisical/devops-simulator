import type { Stats } from '../game/types'

interface Props {
  text: string
  deltas?: Partial<Stats>
  onContinue: () => void
}

function outcomeIcon(deltas?: Partial<Stats>): { glyph: string; className: string } {
  const sum = Object.values(deltas ?? {}).reduce((a: number, b) => a + (b ?? 0), 0)
  if (sum > 0) return { glyph: '📈', className: 'outcome-up' }
  if (sum < 0) return { glyph: '📉', className: 'outcome-down' }
  return { glyph: '➖', className: 'outcome-flat' }
}

export default function ResultPanel({ text, deltas, onContinue }: Props) {
  const { glyph, className } = outcomeIcon(deltas)
  return (
    <div className="event-card result-panel">
      <div className={`result-icon ${className}`} aria-hidden="true">
        {glyph}
      </div>
      <p className="event-log">{text || '...'}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        [ press any key to continue ]
      </button>
    </div>
  )
}
