import type { PipNotice as PipNoticeData } from '../game/engine'
import Scene from '../art/Scene'

interface Props {
  notice: PipNoticeData
  onContinue: () => void
}

export default function PipNotice({ notice, onContinue }: Props) {
  const isStart = notice.kind === 'pip-start'
  return (
    <div className={`event-card promotion-card ${isStart ? 'pip-start' : 'pip-lifted'}`}>
      <Scene scene="pip" mood={isStart ? 'stressed' : 'happy'} />
      <div className="promotion-flash">
        {isStart ? 'Performance Improvement Plan' : 'PIP lifted'}
      </div>
      <p className="event-log promotion-text">{notice.text}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        {isStart ? 'Acknowledge' : 'Continue'}
      </button>
    </div>
  )
}
