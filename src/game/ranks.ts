import type { RankInfo } from './types'

export const RANKS: RankInfo[] = [
  { title: 'Junior DevOps Engineer', eventsToPromote: 2 },
  { title: 'DevOps Engineer', eventsToPromote: 2 },
  { title: 'Senior DevOps Engineer', eventsToPromote: 2 },
  { title: 'Staff Engineer', eventsToPromote: 3 },
  { title: 'Principal Engineer', eventsToPromote: 3 },
  { title: 'CTO', eventsToPromote: 3 },
]

export const PROMOTION_LINES: string[] = [
  "You've been promoted to DevOps Engineer. The pager still finds you, now with a raise attached.",
  "You've been promoted to Senior DevOps Engineer. People start asking your opinion in meetings, against your will.",
  "You've been promoted to Staff Engineer. You now attend meetings about meetings.",
  "You've been promoted to Principal Engineer. Your job is now 40% Slack, 40% politics, 20% actual engineering.",
  "You've been promoted to CTO. Congratulations, you are now responsible for everything and blamed for slightly more.",
]

export const MAX_EVENTS = 22
export const DISRUPTION_CHANCE = 0.18
export const EFFECT_MULTIPLIER = 1.6
