export type StatKey = 'sanity' | 'uptime' | 'reputation' | 'karma'

export type Stats = Record<StatKey, number>

export interface Choice {
  label: string
  result: string
  effects: Partial<Stats>
}

export interface GameEvent {
  id: string
  minRank: number
  maxRank?: number
  tag?: 'security' | 'disruption' | 'exit' | 'nemesis'
  log: string
  choices: Choice[]
  requiresFlag?: string
  setFlag?: string
}

export interface RankInfo {
  title: string
  eventsToPromote: number
}

export type EndingKind = 'fired' | 'retired' | 'forced-good' | 'forced-bad'

export interface Ending {
  kind: EndingKind
  headline: string
  reason: string
}
