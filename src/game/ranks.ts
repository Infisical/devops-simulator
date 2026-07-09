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
  "You've been promoted to DevOps Engineer. The pager still finds you, now with a raise attached and a LinkedIn post you didn't ask for.",
  "You've been promoted to Senior DevOps Engineer. People start asking your opinion in meetings, against your will, and quoting it back to you incorrectly.",
  "You've been promoted to Staff Engineer. You now attend meetings about meetings, and occasionally a meeting about whether this meeting should exist.",
  "You've been promoted to Principal Engineer. Your job is now 40% Slack, 40% politics, 15% actual engineering, and 5% pretending the first two don't count.",
  "You've been promoted to CTO. Congratulations, you are now responsible for everything and blamed for slightly more than that.",
]

export const MAX_EVENTS = 22
export const DISRUPTION_CHANCE = 0.18
export const EFFECT_MULTIPLIER = 1.6

// PIP: triggered when reputation or uptime craters. While active, work-related
// event effects (regular shifts, security incidents, the nemesis ticket) hit harder
// in both directions — everything you do is under a microscope.
export const PIP_TRIGGER_THRESHOLD = 30
export const PIP_RECOVER_THRESHOLD = 45
export const PIP_WINDOW_EVENTS = 6
export const PIP_EFFECT_MULTIPLIER = 1.5
export const MIN_EVENTS_BEFORE_PIP = 3
