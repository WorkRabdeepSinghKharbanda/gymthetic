import type { MuscleGroup } from '../data/exercises'

interface Zone {
  group: MuscleGroup
  x: number
  y: number
  w: number
  h: number
}

const FRONT_ZONES: Zone[] = [
  { group: 'Shoulders', x: 15, y: 28, w: 25, h: 18 },
  { group: 'Shoulders', x: 120, y: 28, w: 25, h: 18 },
  { group: 'Chest', x: 48, y: 50, w: 64, h: 32 },
  { group: 'Biceps', x: 8, y: 50, w: 20, h: 38 },
  { group: 'Biceps', x: 132, y: 50, w: 20, h: 38 },
  { group: 'Core', x: 55, y: 86, w: 50, h: 36 },
  { group: 'Legs', x: 48, y: 126, w: 28, h: 68 },
  { group: 'Legs', x: 84, y: 126, w: 28, h: 68 },
]

const BACK_ZONES: Zone[] = [
  { group: 'Shoulders', x: 15, y: 28, w: 25, h: 18 },
  { group: 'Shoulders', x: 120, y: 28, w: 25, h: 18 },
  { group: 'Back', x: 48, y: 46, w: 64, h: 48 },
  { group: 'Triceps', x: 8, y: 50, w: 20, h: 38 },
  { group: 'Triceps', x: 132, y: 50, w: 20, h: 38 },
  { group: 'Forearms', x: 6, y: 88, w: 16, h: 32 },
  { group: 'Forearms', x: 138, y: 88, w: 16, h: 32 },
  { group: 'Legs', x: 48, y: 126, w: 28, h: 68 },
  { group: 'Legs', x: 84, y: 126, w: 28, h: 68 },
]

function colorFor(volume: number, max: number): string {
  if (!volume) return '#e5e5e5'
  const t = max > 0 ? volume / max : 0
  const opacity = 0.25 + 0.75 * Math.min(1, t)
  return `rgba(249,115,22,${opacity.toFixed(2)})`
}

function Body({ zones, volumes, max }: { zones: Zone[]; volumes: Record<string, number>; max: number }) {
  return (
    <svg viewBox="0 0 160 210" className="w-full max-w-[140px]">
      <ellipse cx="80" cy="14" rx="16" ry="16" fill="#d4d4d4" className="dark:fill-neutral-700" />
      {zones.map((z, i) => {
        const volume = volumes[z.group] ?? 0
        return (
          <rect key={i} x={z.x} y={z.y} width={z.w} height={z.h} rx={8} fill={colorFor(volume, max)}>
            <title>
              {z.group}: {Math.round(volume)}kg this week
            </title>
          </rect>
        )
      })}
    </svg>
  )
}

/** Front/back body diagram, muscle zones colored by this week's training volume. */
export default function MuscleHeatmap({ volumes }: { volumes: Record<string, number> }) {
  const max = Math.max(0, ...Object.values(volumes))
  return (
    <div className="flex justify-center gap-8">
      <div className="text-center">
        <Body zones={FRONT_ZONES} volumes={volumes} max={max} />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Front</p>
      </div>
      <div className="text-center">
        <Body zones={BACK_ZONES} volumes={volumes} max={max} />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Back</p>
      </div>
    </div>
  )
}
