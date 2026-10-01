import type { ReactNode } from 'react'

const INK = 'currentColor'
const ACCENT = '#f97316'

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-6 rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
      {children}
      <figcaption className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  )
}

/** A horizontal range bar with a highlighted "default" band and labeled ticks. */
function RangeBarDiagram({
  min,
  max,
  bandStart,
  bandEnd,
  unit,
  caption,
}: {
  min: number
  max: number
  bandStart: number
  bandEnd: number
  unit: string
  caption: string
}) {
  const w = 560
  const h = 70
  const trackX = 20
  const trackW = w - 40
  const scale = (v: number) => trackX + ((v - min) / (max - min)) * trackW

  return (
    <Figure caption={caption}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <rect x={trackX} y={28} width={trackW} height={10} rx={5} fill="#e5e5e5" className="dark:fill-neutral-700" />
        <rect
          x={scale(bandStart)}
          y={28}
          width={scale(bandEnd) - scale(bandStart)}
          height={10}
          rx={5}
          fill={ACCENT}
        />
        <text x={scale(min)} y={20} textAnchor="start" fontSize="11" fill={INK}>
          {min}
          {unit}
        </text>
        <text x={scale(max)} y={20} textAnchor="end" fontSize="11" fill={INK}>
          {max}
          {unit}
        </text>
        <text x={(scale(bandStart) + scale(bandEnd)) / 2} y={55} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
          {bandStart}–{bandEnd}
          {unit}
        </text>
      </svg>
    </Figure>
  )
}

/** Ascending step bars (e.g. a warm-up ramp). */
function StepRampDiagram({ steps, caption }: { steps: { label: string; value: number }[]; caption: string }) {
  const w = 560
  const h = 160
  const barW = 70
  const gap = 14
  const maxVal = Math.max(...steps.map((s) => s.value))
  const chartH = 110

  return (
    <Figure caption={caption}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {steps.map((s, i) => {
          const barH = (s.value / maxVal) * chartH
          const x = 10 + i * (barW + gap)
          const y = 130 - barH
          const isLast = i === steps.length - 1
          return (
            <g key={s.label}>
              <rect x={x} y={y} width={barW} height={barH} rx={6} fill={isLast ? ACCENT : '#fdba74'} />
              <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>
                {s.value}%
              </text>
              <text x={x + barW / 2} y={148} textAnchor="middle" fontSize="10" fill={INK} opacity={0.7}>
                {s.label}
              </text>
            </g>
          )
        })}
      </svg>
    </Figure>
  )
}

/** Two labeled bar groups side by side, for a before/after or A-vs-B comparison. */
function ComparisonBarsDiagram({
  left,
  right,
  unit,
  caption,
}: {
  left: { label: string; value: number }
  right: { label: string; value: number }
  unit: string
  caption: string
}) {
  const w = 560
  const h = 150
  const maxVal = Math.max(left.value, right.value)
  const chartH = 90
  const barW = 110

  function bar(x: number, item: { label: string; value: number }, color: string) {
    const barH = (item.value / maxVal) * chartH
    const y = 110 - barH
    return (
      <g key={item.label}>
        <rect x={x} y={y} width={barW} height={barH} rx={8} fill={color} />
        <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
          {item.value}
          {unit}
        </text>
        <text x={x + barW / 2} y={130} textAnchor="middle" fontSize="11" fill={INK} opacity={0.75}>
          {item.label}
        </text>
      </g>
    )
  }

  return (
    <Figure caption={caption}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {bar(130, left, '#d4d4d4')}
        {bar(320, right, ACCENT)}
      </svg>
    </Figure>
  )
}

export function getDiagramForSlug(slug: string): ReactNode | null {
  switch (slug) {
    case '5-signs-you-need-a-deload-week':
      return (
        <ComparisonBarsDiagram
          left={{ label: 'Normal week', value: 4 }}
          right={{ label: 'Deload week', value: 2 }}
          unit=' sets'
          caption="Same exercises, same weight — a deload cuts set count roughly in half, not the weight on the bar."
        />
      )
    case 'how-to-warm-up-before-lifting':
      return (
        <StepRampDiagram
          steps={[
            { label: 'Bar', value: 0 },
            { label: 'Step 1', value: 50 },
            { label: 'Step 2', value: 70 },
            { label: 'Step 3', value: 90 },
            { label: 'Work set', value: 100 },
          ]}
          caption="A warm-up ramp as a percentage of your work weight — generated automatically by the warm-up calculator."
        />
      )
    case 'should-you-train-to-failure':
      return (
        <RangeBarDiagram
          min={6}
          max={10}
          bandStart={7}
          bandEnd={9}
          unit=""
          caption="RPE scale — most working sets should land in the 7-9 range, with true 10s reserved for low-cost isolation work."
        />
      )
    case 'best-rep-range-for-muscle-growth':
      return (
        <RangeBarDiagram
          min={1}
          max={30}
          bandStart={6}
          bandEnd={12}
          unit=" reps"
          caption="The evidence-backed effective range runs roughly 6-30 reps; 6-12 is the common, practical default."
        />
      )
    case 'how-much-protein-do-you-need':
      return (
        <RangeBarDiagram
          min={1.0}
          max={3.0}
          bandStart={1.6}
          bandEnd={2.2}
          unit="g/kg"
          caption="Daily protein target for someone training with weights — grams per kilogram of bodyweight."
        />
      )
    case 'how-often-should-you-train-each-muscle-group':
      return (
        <ComparisonBarsDiagram
          left={{ label: 'Once/week', value: 12 }}
          right={{ label: 'Twice/week', value: 12 }}
          unit=' sets'
          caption="Same total weekly volume (12 sets), split across one long session vs. two fresher ones."
        />
      )
    default:
      return null
  }
}
