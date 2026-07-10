export function rl(spans: [number, string][]): string {
  return spans.map(([n, t]) => t.repeat(n)).join('')
}
