interface Props {
  text: string
  onContinue: () => void
}

export default function Promotion({ text, onContinue }: Props) {
  return (
    <div className="event-card promotion-card">
      <div className="promotion-flash">** PERFORMANCE REVIEW COMPLETE **</div>
      <p className="event-log promotion-text">{text}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        [ accept new title ]
      </button>
    </div>
  )
}
