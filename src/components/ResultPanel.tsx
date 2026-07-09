interface Props {
  text: string
  onContinue: () => void
}

export default function ResultPanel({ text, onContinue }: Props) {
  return (
    <div className="event-card result-panel">
      <p className="event-log">{text || '...'}</p>
      <button className="choice-btn continue-btn" onClick={onContinue}>
        [ press any key to continue ]
      </button>
    </div>
  )
}
