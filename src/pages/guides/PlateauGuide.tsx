import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import GuideLayout from '../../components/GuideLayout'

export default function PlateauGuide() {
  useSeo({
    title: 'How to Break a Strength Training Plateau',
    description: 'Why lifts stall, and the deload, exercise-variation, and RPE-autoregulation toolkit for breaking through a plateau.',
    path: '/guides/breaking-a-strength-plateau',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Break a Strength Training Plateau',
      description: 'Why lifts stall, and the toolkit for breaking through a plateau.',
      author: { '@type': 'Organization', name: 'Gymthetic' },
      mainEntityOfPage: 'https://gymthetic.vercel.app/guides/breaking-a-strength-plateau',
    },
  })

  return (
    <GuideLayout
      title="How to Break a Strength Training Plateau"
      dek="Every lifter stalls eventually. Here's what usually causes it, and the concrete fixes worth trying before adding more sets."
    >
      <h2>What a plateau actually is</h2>
      <p>
        A plateau is a stretch of sessions on a lift with no new estimated-1RM high — the number stops moving
        even though you're still training it. Gymthetic's <Link to="/tracker">tracker</Link> flags this
        automatically once a lift goes 3+ weeks without a new best.
      </p>

      <h2>Common causes</h2>
      <ul>
        <li><strong>Accumulated fatigue</strong> — weeks of training without a break in intensity or volume.</li>
        <li><strong>Same rep range, forever</strong> — the same 3x5 or 4x8 scheme with no variation to force adaptation.</li>
        <li><strong>A weak point in the lift</strong> — a specific sticking point (lockout, off-the-chest, etc.) that general volume doesn't address.</li>
        <li><strong>Under-recovery</strong> — sleep, food, or stress outside the gym capping what training can do.</li>
      </ul>

      <h2>The toolkit</h2>
      <p>
        <strong>Deload.</strong> Cut volume roughly 40-50% at the same intensity for a week, then resume normal
        programming. This is the first thing to try — it's cheap and reverses accumulated fatigue without losing
        technique or strength.
      </p>
      <p>
        <strong>Change the rep range.</strong> If you've been running the same scheme for months, a few weeks in
        a different range (lower reps/heavier if you've been doing volume work, or vice versa) can restart
        progress.
      </p>
      <p>
        <strong>Autoregulate with RPE.</strong> Log an RPE (rate of perceived exertion, 6-10) with every set in
        the tracker. If your last session's RPE was 9-10, that's a sign to hold weight or back off, not push
        through — Gymthetic surfaces this hint automatically on the log form.
      </p>
      <p>
        <strong>Attack the specific sticking point.</strong> Every exercise page on Gymthetic has plateau-specific
        tips for that lift — check the <Link to="/exercises">exercise library</Link> entry for the one you're
        stuck on.
      </p>

      <h2>Get a personalized checklist</h2>
      <p>
        Run your stalled lift through the <Link to="/calculators/plateau-breaker">plateau breaker calculator</Link>{' '}
        for a checklist tailored to how long you've been stuck, or check{' '}
        <Link to="/standards">strength standards</Link> to see whether the plateau is near a level threshold
        (progress often slows as you approach the next tier).
      </p>
    </GuideLayout>
  )
}
