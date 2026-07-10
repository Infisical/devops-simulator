interface Props {
  rows: string[]
  palette: Record<string, string>
  className?: string
}

export default function PixelArt({ rows, palette, className }: Props) {
  const height = rows.length
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0)
  const rects: { x: number; y: number; fill: string }[] = []

  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const token = row[x]
      if (token === '.' || token === ' ') continue
      const fill = palette[token]
      if (!fill) continue
      rects.push({ x, y, fill })
    }
  })

  return (
    <svg
      className={`pixel-art ${className ?? ''}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax meet"
      shapeRendering="crispEdges"
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
