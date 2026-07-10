import { rl } from './rle'

export type SceneKey =
  | 'office'
  | 'security'
  | 'newsroom'
  | 'opportunity'
  | 'nemesis'
  | 'pip'
  | 'promotion'
  | 'ending-good'
  | 'ending-bad'

const SCENE_WIDTH = 26
const SCENE_HEIGHT = 20

function wrow(spans: [number, string][]): string {
  const s = rl(spans)
  return s
}

// extend a 16-row scene to the full canvas height by repeating its final (floor) row
function extend(rows: string[]): string[] {
  const filler = rows[rows.length - 1]
  const out = [...rows]
  while (out.length < SCENE_HEIGHT) out.push(filler)
  return out
}

const OFFICE = extend([
  wrow([[26, 'c']]),
  wrow([[3, 'c'], [3, 'C'], [3, 'c'], [3, 'C'], [14, 'c']]),
  wrow([[3, 'c'], [3, 'C'], [3, 'c'], [3, 'C'], [14, 'c']]),
  wrow([[2, 'c'], [22, 'C'], [2, 'c']]),
  wrow([[8, 'c'], [2, 'g'], [16, 'c']]),
  wrow([[8, 'c'], [2, 'g'], [4, 'c'], [10, 'n'], [2, 'c']]),
  wrow([[8, 'c'], [2, 'G'], [4, 'c'], [1, 'n'], [8, 'm'], [1, 'n'], [2, 'c']]),
  wrow([[14, 'c'], [1, 'n'], [3, 'm'], [2, 'M'], [3, 'm'], [1, 'n'], [2, 'c']]),
  wrow([[14, 'c'], [1, 'n'], [8, 'm'], [1, 'n'], [2, 'c']]),
  wrow([[14, 'c'], [10, 'n'], [2, 'c']]),
  wrow([[6, 'd'], [8, 'O'], [12, 'O']]),
  wrow([[6, 'd'], [20, 'O']]),
  wrow([[26, 'd']]),
])

const SECURITY = extend([
  wrow([[26, 'R']]),
  wrow([[10, 'R'], [6, 'r'], [10, 'R']]),
  wrow([[3, 'R'], [20, 'r'], [3, 'R']]),
  wrow([[26, 'r']]),
  wrow([[8, 'r'], [2, 'n'], [16, 'r']]),
  wrow([[8, 'r'], [2, 'n'], [4, 'r'], [10, 'N'], [2, 'r']]),
  wrow([[8, 'r'], [2, 'N'], [4, 'r'], [1, 'N'], [8, 'k'], [1, 'N'], [2, 'r']]),
  wrow([[14, 'r'], [1, 'N'], [8, 'R'], [1, 'N'], [2, 'r']]),
  wrow([[14, 'r'], [1, 'N'], [3, 'k'], [2, 'w'], [3, 'k'], [1, 'N'], [2, 'r']]),
  wrow([[14, 'r'], [10, 'N'], [2, 'r']]),
  wrow([[6, 'D'], [8, 'O'], [12, 'O']]),
  wrow([[6, 'D'], [20, 'O']]),
  wrow([[26, 'D']]),
])

const NEWSROOM = extend([
  wrow([[26, 'C']]),
  wrow([[26, 'C']]),
  wrow([[6, 'C'], [1, 'N'], [13, 'k'], [1, 'N'], [5, 'C']]),
  wrow([[6, 'C'], [1, 'N'], [4, 'k'], [5, 'y'], [4, 'k'], [1, 'N'], [5, 'C']]),
  wrow([[6, 'C'], [1, 'N'], [4, 'k'], [2, 'y'], [3, 'Y'], [4, 'k'], [1, 'N'], [5, 'C']]),
  wrow([[6, 'C'], [1, 'N'], [13, 'k'], [1, 'N'], [5, 'C']]),
  wrow([[6, 'C'], [1, 'N'], [13, 'N'], [1, 'N'], [5, 'C']]),
  wrow([[8, 'C'], [10, 'N'], [8, 'C']]),
  wrow([[8, 'C'], [1, 'N'], [8, 'O'], [1, 'N'], [8, 'C']]),
  wrow([[26, 'C']]),
  wrow([[6, 'd'], [14, 'O'], [6, 'd']]),
  wrow([[6, 'd'], [14, 'o'], [6, 'd']]),
  wrow([[26, 'd']]),
  wrow([[3, 'r'], [20, 'w'], [3, 'r']]),
  wrow([[3, 'r'], [20, 'd'], [3, 'r']]),
  wrow([[26, 'd']]),
])

const OPPORTUNITY = extend([
  wrow([[26, 'y']]),
  wrow([[26, 'y']]),
  wrow([[9, 'y'], [8, 'w'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [2, 'w'], [1, 'Y'], [3, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'y'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'y']]),
  wrow([[9, 'D'], [1, 'O'], [6, 'w'], [1, 'O'], [9, 'D']]),
  wrow([[9, 'D'], [8, 'O'], [9, 'D']]),
  wrow([[2, 'D'], [3, 'k'], [4, 'D'], [4, 'k'], [4, 'D'], [4, 'k'], [3, 'D'], [2, 'D']]),
  wrow([[2, 'D'], [3, 'k'], [4, 'D'], [4, 'k'], [4, 'D'], [4, 'k'], [3, 'D'], [2, 'D']]),
  wrow([[26, 'D']]),
])

const NEMESIS = extend([
  wrow([[26, 'X']]),
  wrow([[26, 'X']]),
  wrow([[10, 'X'], [6, 'x'], [10, 'X']]),
  wrow([[8, 'X'], [2, 'x'], [6, 'X'], [2, 'x'], [8, 'X']]),
  wrow([[7, 'X'], [2, 'x'], [8, 'X'], [2, 'x'], [7, 'X']]),
  wrow([[8, 'X'], [10, 'x'], [8, 'X']]),
  wrow([[9, 'X'], [2, 'x'], [4, 'k'], [2, 'x'], [9, 'X']]),
  wrow([[9, 'X'], [8, 'k'], [9, 'X']]),
  wrow([[9, 'X'], [2, 'k'], [4, 'x'], [2, 'k'], [9, 'X']]),
  wrow([[26, 'X']]),
  wrow([[9, 'N'], [8, 'k'], [9, 'N']]),
  wrow([[9, 'N'], [1, 'k'], [6, 'N'], [1, 'k'], [9, 'N']]),
  wrow([[26, 'N']]),
])

const PIP = extend([
  wrow([[26, 'd']]),
  wrow([[26, 'd']]),
  wrow([[7, 'd'], [12, 'w'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [10, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [2, 'w'], [6, 'r'], [2, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [2, 'w'], [1, 'r'], [4, 'R'], [1, 'r'], [2, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [2, 'w'], [6, 'r'], [2, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [10, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [2, 'w'], [1, 'k'], [4, 'w'], [1, 'k'], [2, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [2, 'w'], [1, 'k'], [4, 'w'], [1, 'k'], [2, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [1, 'N'], [10, 'w'], [1, 'N'], [7, 'd']]),
  wrow([[7, 'd'], [12, 'N'], [7, 'd']]),
  wrow([[26, 'd']]),
])

const PROMOTION = extend([
  wrow([[3, 'y'], [4, 'c'], [3, 'r'], [6, 'c'], [3, 'g'], [4, 'c'], [3, 'y']]),
  wrow([[26, 'c']]),
  wrow([[10, 'c'], [1, 'y'], [4, 'c'], [1, 'r'], [10, 'c']]),
  wrow([[26, 'c']]),
  wrow([[8, 'c'], [1, 'g'], [8, 'c'], [1, 'y'], [8, 'c']]),
  wrow([[26, 'c']]),
  wrow([[11, 'c'], [4, 'Y'], [11, 'c']]),
  wrow([[10, 'c'], [1, 'Y'], [4, 'y'], [1, 'Y'], [10, 'c']]),
  wrow([[10, 'c'], [1, 'Y'], [4, 'y'], [1, 'Y'], [10, 'c']]),
  wrow([[11, 'c'], [1, 'Y'], [2, 'y'], [1, 'Y'], [11, 'c']]),
  wrow([[6, 'd'], [5, 'c'], [1, 'Y'], [2, 'Y'], [1, 'Y'], [5, 'c'], [6, 'd']]),
  wrow([[6, 'd'], [14, 'O'], [6, 'd']]),
  wrow([[26, 'd']]),
])

const ENDING_GOOD = extend([
  wrow([[26, 'y']]),
  wrow([[26, 'y']]),
  wrow([[6, 'y'], [4, 'w'], [16, 'y']]),
  wrow([[8, 'y'], [4, 'w'], [14, 'y']]),
  wrow([[26, 'y']]),
  wrow([[26, 'y']]),
  wrow([[9, 'G'], [8, 'y'], [9, 'G']]),
  wrow([[9, 'g'], [3, 'G'], [2, 'y'], [3, 'G'], [9, 'g']]),
  wrow([[9, 'g'], [8, 'G'], [9, 'g']]),
  wrow([[9, 'g'], [1, 'O'], [6, 'g'], [1, 'O'], [9, 'g']]),
  wrow([[9, 'd'], [1, 'O'], [6, 'd'], [1, 'O'], [9, 'd']]),
  wrow([[9, 'd'], [8, 'O'], [9, 'd']]),
  wrow([[26, 'd']]),
])

const ENDING_BAD = extend([
  wrow([[26, 'N']]),
  wrow([[26, 'N']]),
  wrow([[8, 'N'], [2, 'C'], [16, 'N']]),
  wrow([[8, 'N'], [2, 'C'], [16, 'N']]),
  wrow([[26, 'N']]),
  wrow([[9, 'N'], [8, 'n'], [9, 'N']]),
  wrow([[9, 'N'], [1, 'k'], [6, 'n'], [1, 'k'], [9, 'N']]),
  wrow([[9, 'N'], [8, 'n'], [9, 'N']]),
  wrow([[26, 'N']]),
  wrow([[26, 'n']]),
  wrow([[10, 'n'], [2, 'O'], [2, 'O'], [2, 'O'], [10, 'n']]),
  wrow([[10, 'n'], [6, 'O'], [10, 'n']]),
  wrow([[10, 'n'], [1, 'O'], [1, 'w'], [2, 'O'], [1, 'w'], [1, 'O'], [10, 'n']]),
  wrow([[10, 'n'], [6, 'O'], [10, 'n']]),
  wrow([[26, 'n']]),
])

export const SCENES: Record<SceneKey, string[]> = {
  office: OFFICE,
  security: SECURITY,
  newsroom: NEWSROOM,
  opportunity: OPPORTUNITY,
  nemesis: NEMESIS,
  pip: PIP,
  promotion: PROMOTION,
  'ending-good': ENDING_GOOD,
  'ending-bad': ENDING_BAD,
}

export const SCENE_WIDTH_PX = SCENE_WIDTH
export const SCENE_HEIGHT_PX = SCENE_HEIGHT
