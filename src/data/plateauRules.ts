export interface PlateauAdvice {
  weeksStalled: string
  checklist: string[]
  suggestions: string[]
}

export function getPlateauAdvice(weeksStalled: number): PlateauAdvice {
  if (weeksStalled < 2) {
    return {
      weeksStalled: '< 2 weeks',
      checklist: ['Is this normal week-to-week fluctuation?', 'Check sleep and stress from the last few days.'],
      suggestions: ['Too early to call it a plateau — keep training as programmed.'],
    }
  }
  if (weeksStalled < 4) {
    return {
      weeksStalled: '2-4 weeks',
      checklist: [
        'Is bar speed slowing on your top sets?',
        'Are you tracking reps in reserve (RIR) accurately?',
        'Is nutrition/sleep consistent with when you were progressing?',
      ],
      suggestions: [
        'Add one extra working set for 1-2 weeks before changing anything else.',
        'Tighten form — film your lift and compare to earlier videos.',
        'Make sure warm-ups aren\'t eating into working-set energy.',
      ],
    }
  }
  if (weeksStalled < 8) {
    return {
      weeksStalled: '4-8 weeks',
      checklist: [
        'Has weekly volume for this muscle group actually changed?',
        'Are you rotating the exact same rep range every session?',
        'Any nagging joint pain limiting effort?',
      ],
      suggestions: [
        'Run a 5-7 day deload (50-60% volume) then retest.',
        'Change rep range for 3 weeks (e.g. 5s → 8-10s) then return to strength range.',
        'Swap in a variation (e.g. pause reps, tempo reps) to hit a sticking point differently.',
      ],
    }
  }
  return {
    weeksStalled: '8+ weeks',
    checklist: [
      'Has this lift been programmed with any variation in 2+ months?',
      'Is total weekly training volume trending flat or down?',
      'Are recovery basics (sleep, calories, stress) actually in place?',
    ],
    suggestions: [
      'Full block reset: 2-week deload, then restart at ~85% of stalled weight with fresh progression.',
      'Cycle to a different primary variation for 6-8 weeks (e.g. front squat instead of back squat) then return.',
      'Audit calories — an extended plateau across multiple lifts often means underrecovery, not undertraining.',
    ],
  }
}
