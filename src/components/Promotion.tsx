import Scene from '../art/Scene'

interface Props {
  text: string
  onContinue: () => void
}

export default function Promotion({ text, onContinue }: Props) {
  return (
    <div className="event-card promotion-card">
      <Scene scene="promotion" mood="happy" />
      <div className="promotion-flash">Performance review complete</div>
      <p className="event-log promotion-text">{text}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        Accept new title
      </button>
    </div>
  )
}
