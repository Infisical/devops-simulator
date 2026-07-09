import type { PipNotice as PipNoticeData } from '../game/engine'

interface Props {
  notice: PipNoticeData
  onContinue: () => void
}

export default function PipNotice({ notice, onContinue }: Props) {
  const isStart = notice.kind === 'pip-start'
  return (
    <div className={`event-card promotion-card ${isStart ? 'pip-start' : 'pip-lifted'}`}>
      <div className="promotion-flash">
        {isStart ? '** PERFORMANCE IMPROVEMENT PLAN **' : '** PIP LIFTED **'}
      </div>
      <p className="event-log promotion-text">{notice.text}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        {isStart ? '[ acknowledge ]' : '[ continue ]'}
      </button>
    </div>
  )
}
