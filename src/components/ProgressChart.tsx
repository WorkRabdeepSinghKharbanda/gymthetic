import type { LogEntry } from '../lib/storage'
import LineChart from './LineChart'

export default function ProgressChart({ logs, height }: { logs: LogEntry[]; height?: number }) {
  const points = logs.map((l) => l.weight * (1 + l.reps / 30))
  return <LineChart points={points} height={height} />
}
