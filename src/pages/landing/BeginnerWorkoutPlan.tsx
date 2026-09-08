import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import GuideLayout from '../../components/GuideLayout'

export default function BeginnerWorkoutPlan() {
  useSeo({
    title: 'Beginner Workout Plan: Your First 3 Months in the Gym',
    description: 'A simple 3-day full-body or push/pull/legs plan for your first months of lifting, with what to actually focus on while everything is new.',
    path: '/beginner-workout-plan',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Beginner Workout Plan: Your First 3 Months in the Gym',
      description: 'A simple 3-day plan for your first months of lifting.',
      author: { '@type': 'Organization', name: 'Gymthetic' },
      mainEntityOfPage: 'https://gymthetic.vercel.app/beginner-workout-plan',
      datePublished: '2026-09-08',
      dateModified: '2026-09-08',
    },
  })

  return (
    <GuideLayout
      title="Beginner Workout Plan: Your First 3 Months in the Gym"
      dek="You don't need a complicated program in year one — you need consistency, a few basic lifts, and to log what you do."
      currentPath="/beginner-workout-plan"
    >
      <h2>Start with 3 days a week</h2>
      <p>
        Three full-body-ish sessions a week (or a light <Link to="/guides/push-pull-legs-split">push/pull/legs</Link>{' '}
        rotation) is plenty of stimulus for a new lifter and easy to actually stick to. Six days a week sounds
        more serious but usually just leads to burnout before your body adapts.
      </p>

      <h2>Sample week</h2>
      <ul>
        <li>Day 1 (Push): Bench press, overhead press, tricep pushdown — <Link to="/best-chest-exercises">chest exercises</Link>, <Link to="/best-shoulder-exercises">shoulder exercises</Link></li>
        <li>Day 2 (Pull): Lat pulldown or pull-up, barbell row, curl — <Link to="/best-back-exercises">back exercises</Link></li>
        <li>Day 3 (Legs): Squat or leg press, romanian deadlift, calf raise — <Link to="/best-leg-exercises">leg exercises</Link></li>
      </ul>

      <h2>What actually matters right now</h2>
      <p>
        <strong>Form before weight.</strong> Every exercise page in the <Link to="/exercises">library</Link> has
        a how-to and a common-mistakes list — read both before adding weight to a new lift.
      </p>
      <p>
        <strong>Log every session.</strong> Use the <Link to="/tracker">tracker</Link> from day one. "Am I
        getting stronger" is a much easier question to answer with numbers than with memory.
      </p>
      <p>
        <strong>Add weight slowly.</strong> A small, steady increase (2.5kg) each time you hit your target reps
        beats big jumps that wreck your form. Gymthetic's tracker suggests this automatically based on your last
        session.
      </p>
      <p>
        <strong>Eat enough.</strong> Run your numbers through the <Link to="/calculators/tdee">TDEE calculator</Link>{' '}
        — under-eating is one of the most common reasons beginners feel like a program "isn't working."
      </p>

      <h2>After 3 months</h2>
      <p>
        Once the basic lifts feel familiar, check where you stand against typical{' '}
        <Link to="/standards">strength standards</Link>, and if a lift stops moving, read{' '}
        <Link to="/guides/breaking-a-strength-plateau">how to break a plateau</Link> before changing anything
        else.
      </p>
    </GuideLayout>
  )
}
