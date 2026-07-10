import { useState } from 'react'
import { newGame, resolveChoice, currentRankTitle, type GameState } from './game/engine'
import StatsBar from './components/StatsBar'
import EventCard from './components/EventCard'
import ResultPanel from './components/ResultPanel'
import Promotion from './components/Promotion'
import PipNotice from './components/PipNotice'
import EndScreen from './components/EndScreen'
import Scene from './art/Scene'

type Phase = 'intro' | 'event' | 'result' | 'notice' | 'promotion' | 'ended'

function App() {
  const [game, setGame] = useState<GameState | null>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [lastTag, setLastTag] = useState<string | undefined>(undefined)

  function start() {
    setGame(newGame())
    setPhase('event')
  }

  function choose(index: number) {
    if (!game) return
    setLastTag(game.currentEvent.tag)
    const next = resolveChoice(game, index)
    setGame(next)
    setPhase(next.ending ? 'ended' : 'result')
  }

  function continueAfterResult() {
    if (game?.notice) setPhase('notice')
    else if (game?.banner) setPhase('promotion')
    else setPhase('event')
  }

  function continueAfterNotice() {
    setPhase(game?.banner ? 'promotion' : 'event')
  }

  function continueAfterPromotion() {
    setPhase('event')
  }

  function restart() {
    setGame(newGame())
    setPhase('event')
  }

  return (
    <div className="game-shell">
      <div className="title-bar">
        <span>DevOps Simulator</span>
        <span className="title-bar-sub">presented by Infisical</span>
      </div>

      {phase === 'intro' && (
        <div className="event-card">
          <Scene scene="office" mood="neutral" />
          <p className="event-log">
            Day one. Keep production up, keep your sanity up, keep your job — and survive long
            enough that your stock options might actually be worth something.
          </p>
          <div className="choices">
            <button className="choice-btn" onClick={start}>
              Start shift
            </button>
          </div>
        </div>
      )}

      {game && phase === 'event' && (
        <>
          <StatsBar stats={game.stats} deltas={game.lastDeltas} />
          <div className="rank-line">
            rank: {currentRankTitle(game.rankIndex)} · day {game.eventsPlayed + 1}
            {game.pipWindowRemaining !== null && (
              <span className="pip-indicator"> · ON PIP ({game.pipWindowRemaining} left)</span>
            )}
          </div>
          <EventCard key={game.currentEvent.id} event={game.currentEvent} stats={game.stats} onChoose={choose} />
        </>
      )}

      {game && phase === 'result' && (
        <>
          <StatsBar stats={game.stats} deltas={game.lastDeltas} />
          <div className="rank-line">
            rank: {currentRankTitle(game.rankIndex)} · day {game.eventsPlayed + 1}
            {game.pipWindowRemaining !== null && (
              <span className="pip-indicator"> · ON PIP ({game.pipWindowRemaining} left)</span>
            )}
          </div>
          <ResultPanel text={game.lastChoiceResult ?? ''} deltas={game.lastDeltas} tag={lastTag} onContinue={continueAfterResult} />
        </>
      )}

      {game && phase === 'notice' && game.notice && (
        <PipNotice notice={game.notice} onContinue={continueAfterNotice} />
      )}

      {game && phase === 'promotion' && game.banner && (
        <Promotion text={game.banner} onContinue={continueAfterPromotion} />
      )}

      {game && phase === 'ended' && game.ending && (
        <EndScreen
          ending={game.ending}
          stats={game.stats}
          rankIndex={game.rankIndex}
          eventsPlayed={game.eventsPlayed}
          onRestart={restart}
        />
      )}

      <div className="footer">devops-simulator · presented by Infisical</div>
    </div>
  )
}

export default App
