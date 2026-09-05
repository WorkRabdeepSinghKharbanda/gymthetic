export default function LineChart({ points, height = 140 }: { points: number[]; height?: number }) {
  if (points.length < 2) {
    return <p className="text-sm text-neutral-500 dark:text-neutral-400">Log at least 2 sessions to see a trend.</p>
  }

  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const width = 500
  const stepX = width / (points.length - 1)

  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = height - ((p - min) / range) * (height - 20) - 10
    return `${x},${y}`
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full text-orange-500">
      <polyline points={coords.join(' ')} fill="none" stroke="currentColor" strokeWidth={2} />
      {points.map((_, i) => {
        const [x, y] = coords[i].split(',').map(Number)
        return <circle key={i} cx={x} cy={y} r={3} fill="currentColor" />
      })}
    </svg>
  )
}
