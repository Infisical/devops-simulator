import type { GameEvent, Stats } from '../game/types'
import type { SceneKey } from './scenes'
import type { Mood } from './character'

export function sceneForTag(tag?: string): SceneKey {
  switch (tag) {
    case 'security':
      return 'security'
    case 'disruption':
      return 'newsroom'
    case 'exit':
      return 'opportunity'
    case 'nemesis':
      return 'nemesis'
    default:
      return 'office'
  }
}

export function sceneForEvent(event: GameEvent): SceneKey {
  return sceneForTag(event.tag)
}

export function moodForStats(stats: Stats): Mood {
  const values = Object.values(stats)
  const worst = Math.min(...values)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  if (worst <= 15) return 'panicked'
  if (worst <= 32) return 'stressed'
  if (avg >= 70) return 'happy'
  return 'neutral'
}

export function moodForDeltas(deltas: Partial<Stats> | undefined): Mood {
  const sum = Object.values(deltas ?? {}).reduce((a: number, b) => a + (b ?? 0), 0)
  if (sum > 4) return 'happy'
  if (sum < -4) return 'stressed'
  return 'neutral'
}
