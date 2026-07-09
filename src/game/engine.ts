import type { Ending, GameEvent, Stats } from './types'
import { EVENTS } from './events'
import { DISRUPTION_EVENTS, EXIT_EVENTS } from './disruptions'
import { RANKS, PROMOTION_LINES, MAX_EVENTS, DISRUPTION_CHANCE } from './ranks'

export interface GameState {
  stats: Stats
  rankIndex: number
  eventsSinceLastPromotion: number
  eventsPlayed: number
  usedEventIds: string[]
  currentEvent: GameEvent
  banner: string | null
  ending: Ending | null
  lastChoiceResult: string | null
}

const INITIAL_STATS: Stats = { sanity: 50, uptime: 50, reputation: 50, karma: 50 }

const FIRED_REASONS: Record<keyof Stats, string> = {
  sanity: 'You quietly closed your laptop, walked outside, and never came back. HR calls it "resignation." You call it "surviving."',
  uptime: 'Production went down one time too many. Your manager used the word "accountability" seven times in one meeting.',
  reputation: 'Nobody trusts your PRs, your postmortems, or your standup updates anymore. You are let go "to pursue other opportunities."',
  karma: 'Enough people complained about you in enough 1:1s. It finally caught up with you.',
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, n))
}

function applyEffects(stats: Stats, effects: Partial<Stats>): Stats {
  return {
    sanity: clamp(stats.sanity + (effects.sanity ?? 0)),
    uptime: clamp(stats.uptime + (effects.uptime ?? 0)),
    reputation: clamp(stats.reputation + (effects.reputation ?? 0)),
    karma: clamp(stats.karma + (effects.karma ?? 0)),
  }
}

function findFiredStat(stats: Stats): keyof Stats | null {
  const keys = Object.keys(stats) as (keyof Stats)[]
  for (const key of keys) {
    if (stats[key] <= 0) return key
  }
  return null
}

function pickFrom(pool: GameEvent[]): GameEvent {
  return pool[Math.floor(Math.random() * pool.length)]
}

function eligiblePool(rankIndex: number, usedIds: string[]): GameEvent[] {
  const inBand = EVENTS.filter(
    (e) => e.minRank <= rankIndex && (e.maxRank ?? 5) >= rankIndex
  )
  const unused = inBand.filter((e) => !usedIds.includes(e.id))
  return unused.length > 0 ? unused : inBand
}

function eligibleDisruptions(rankIndex: number): GameEvent[] {
  return DISRUPTION_EVENTS.filter((e) => e.minRank <= rankIndex)
}

function eligibleExits(rankIndex: number): GameEvent[] {
  return EXIT_EVENTS.filter((e) => e.minRank <= rankIndex)
}

function avgStat(stats: Stats): number {
  return (stats.sanity + stats.uptime + stats.reputation + stats.karma) / 4
}

export function newGame(): GameState {
  return {
    stats: INITIAL_STATS,
    rankIndex: 0,
    eventsSinceLastPromotion: 0,
    eventsPlayed: 0,
    usedEventIds: [],
    currentEvent: pickFrom(eligiblePool(0, [])),
    banner: null,
    ending: null,
    lastChoiceResult: null,
  }
}

export function currentRankTitle(rankIndex: number): string {
  return RANKS[rankIndex].title
}

export function resolveChoice(state: GameState, choiceIndex: number): GameState {
  const choice = state.currentEvent.choices[choiceIndex]

  // Exit events: the first choice is always the "cash out and retire" win.
  if (state.currentEvent.tag === 'exit' && choiceIndex === 0) {
    return {
      ...state,
      lastChoiceResult: choice.result,
      ending: {
        kind: 'retired',
        headline: 'EARLY RETIREMENT',
        reason: `You cashed out. Peak title: ${currentRankTitle(state.rankIndex)}.`,
      },
    }
  }

  const newStats = applyEffects(state.stats, choice.effects)
  const usedIds = [...state.usedEventIds, state.currentEvent.id]
  const eventsPlayed = state.eventsPlayed + 1

  const firedStat = findFiredStat(newStats)
  if (firedStat) {
    return {
      ...state,
      lastChoiceResult: choice.result,
      stats: newStats,
      usedEventIds: usedIds,
      eventsPlayed,
      ending: {
        kind: 'fired',
        headline: 'YOU HAVE BEEN FIRED',
        reason: FIRED_REASONS[firedStat],
      },
    }
  }

  if (eventsPlayed >= MAX_EVENTS) {
    const good = avgStat(newStats) >= 55
    return {
      ...state,
      lastChoiceResult: choice.result,
      stats: newStats,
      usedEventIds: usedIds,
      eventsPlayed,
      ending: good
        ? {
            kind: 'forced-good',
            headline: 'QUIETLY PROMOTED INTO IRRELEVANCE',
            reason: 'You got so good at your job that leadership moved you into a strategic role with no responsibilities. This is, functionally, retirement.',
          }
        : {
            kind: 'forced-bad',
            headline: 'LAID OFF IN THE NEXT ROUND OF CUTS',
            reason: 'You survived every incident but not the org chart. "Restructuring," they called it.',
          },
    }
  }

  const eventsSinceLastPromotion = state.eventsSinceLastPromotion + 1
  const rankInfo = RANKS[state.rankIndex]

  if (eventsSinceLastPromotion >= rankInfo.eventsToPromote) {
    if (state.rankIndex === RANKS.length - 1) {
      const exitChance = Math.max(0.12, Math.min(0.75, 0.15 + (avgStat(newStats) - 50) / 100 * 0.5))
      if (Math.random() < exitChance) {
        const exits = eligibleExits(state.rankIndex)
        return {
          ...state,
          lastChoiceResult: choice.result,
          stats: newStats,
          usedEventIds: usedIds,
          eventsPlayed,
          eventsSinceLastPromotion: 0,
          currentEvent: pickFrom(exits),
          banner: null,
        }
      }
      return {
        ...state,
        lastChoiceResult: choice.result,
        stats: newStats,
        usedEventIds: usedIds,
        eventsPlayed,
        eventsSinceLastPromotion: 0,
        currentEvent: pickFrom(eligiblePool(state.rankIndex, usedIds)),
        banner: null,
      }
    }

    if (Math.random() < DISRUPTION_CHANCE) {
      const disruptions = eligibleDisruptions(state.rankIndex)
      return {
        ...state,
        lastChoiceResult: choice.result,
        stats: newStats,
        usedEventIds: usedIds,
        eventsPlayed,
        eventsSinceLastPromotion: 0,
        currentEvent: pickFrom(disruptions),
        banner: null,
      }
    }

    const newRankIndex = state.rankIndex + 1
    return {
      ...state,
      lastChoiceResult: choice.result,
      stats: newStats,
      usedEventIds: usedIds,
      eventsPlayed,
      rankIndex: newRankIndex,
      eventsSinceLastPromotion: 0,
      currentEvent: pickFrom(eligiblePool(newRankIndex, usedIds)),
      banner: PROMOTION_LINES[newRankIndex - 1] ?? null,
    }
  }

  return {
    ...state,
    lastChoiceResult: choice.result,
    stats: newStats,
    usedEventIds: usedIds,
    eventsPlayed,
    eventsSinceLastPromotion,
    currentEvent: pickFrom(eligiblePool(state.rankIndex, usedIds)),
    banner: null,
  }
}
