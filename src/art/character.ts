import { rl } from './rle'

export type Mood = 'neutral' | 'happy' | 'stressed' | 'panicked' | 'sad'

// character canvas: 14 wide x 17 tall
const HAIRTOP = rl([[5, '.'], [4, 'h'], [5, '.']])
const HAIRWIDE = rl([[3, '.'], [8, 'h'], [3, '.']])
const FOREHEAD = rl([[2, '.'], [1, 'h'], [8, 'p'], [1, 'h'], [2, '.']])
const EYES = rl([[2, '.'], [1, 'h'], [2, 'p'], [1, 'k'], [3, 'p'], [1, 'k'], [1, 'p'], [1, 'h'], [2, '.']])
const CHEEKS = FOREHEAD
const NECK = rl([[5, '.'], [4, 'p'], [5, '.']])
const TORSO = rl([[3, '.'], [8, 'b'], [3, '.']])
const TIE = rl([[3, '.'], [3, 'b'], [2, 'r'], [3, 'b'], [3, '.']])
const HEM = TORSO
const PANTSTOP = rl([[4, '.'], [6, 'k'], [4, '.']])
const PANTS = PANTSTOP
const LEGS = rl([[4, '.'], [2, 'k'], [2, '.'], [2, 'k'], [4, '.']])
const FEET = rl([[3, '.'], [3, 'n'], [2, '.'], [3, 'n'], [3, '.']])
const SHADOW = rl([[5, '.'], [4, 'D'], [5, '.']])

const MOUTH_NEUTRAL = rl([[2, '.'], [1, 'h'], [3, 'p'], [2, 'k'], [3, 'p'], [1, 'h'], [2, '.']])
const MOUTH_HAPPY = rl([[2, '.'], [1, 'h'], [2, 'p'], [4, 'k'], [2, 'p'], [1, 'h'], [2, '.']])
const MOUTH_OPEN = rl([[2, '.'], [1, 'h'], [2, 'p'], [3, 'k'], [3, 'p'], [1, 'h'], [2, '.']])

interface PersonOpts {
  row0?: string
  row1?: string
  row3eyes?: string
  row4?: string
  mouth?: string
  row6neck?: string
  armToken?: string
}

function person(opts: PersonOpts): string[] {
  const {
    row0 = HAIRTOP,
    row1 = HAIRWIDE,
    row3eyes = EYES,
    row4 = CHEEKS,
    mouth = MOUTH_NEUTRAL,
    row6neck = NECK,
    armToken = 'b',
  } = opts
  const arms = rl([[1, '.'], [2, armToken], [8, 'b'], [2, armToken], [1, '.']])
  return [
    row0, row1, FOREHEAD, row3eyes, row4, mouth, row6neck, arms,
    TORSO, TIE, TIE, HEM, PANTSTOP, PANTS, LEGS, FEET, SHADOW,
  ]
}

export const CHARACTER_MOODS: Record<Mood, string[]> = {
  neutral: person({}),
  happy: person({
    row0: rl([[5, '.'], [4, 'h'], [4, '.'], [1, 'y']]),
    row6neck: rl([[5, '.'], [4, 'p'], [3, '.'], [1, 'p'], [1, '.']]),
    mouth: MOUTH_HAPPY,
    armToken: 'p',
  }),
  stressed: person({
    row1: rl([[3, '.'], [8, 'h'], [1, '.'], [1, 'C'], [1, '.']]),
    row6neck: rl([[1, '.'], [1, 'p'], [3, '.'], [4, 'p'], [3, '.'], [1, 'p'], [1, '.']]),
    armToken: 'p',
  }),
  panicked: person({
    row0: rl([[5, '.'], [4, 'h'], [3, '.'], [1, 'r'], [1, '.']]),
    row3eyes: rl([[2, '.'], [1, 'h'], [2, 'p'], [1, 'z'], [3, 'p'], [1, 'z'], [1, 'p'], [1, 'h'], [2, '.']]),
    row6neck: rl([[1, '.'], [1, 'p'], [3, '.'], [4, 'p'], [3, '.'], [1, 'p'], [1, '.']]),
    mouth: MOUTH_OPEN,
    armToken: 'p',
  }),
  sad: person({
    row4: rl([[2, '.'], [1, 'h'], [3, 'p'], [1, 'C'], [4, 'p'], [1, 'h'], [2, '.']]),
  }),
}

export const CHARACTER_WIDTH = 14
export const CHARACTER_HEIGHT = 17
