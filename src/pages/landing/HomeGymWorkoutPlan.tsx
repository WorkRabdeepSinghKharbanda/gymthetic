import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import GuideLayout from '../../components/GuideLayout'

export default function HomeGymWorkoutPlan() {
  useSeo({
    title: 'No-Equipment Home Workout Plan',
    description: 'A bodyweight-only training plan using push-ups, pull-ups, planks, and lunges — no gym required.',
    path: '/home-gym-workout-plan',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'No-Equipment Home Workout Plan',
      description: 'A bodyweight-only training plan — no gym required.',
      author: { '@type': 'Organization', name: 'Gymthetic' },
      mainEntityOfPage: 'https://gymthetic.vercel.app/home-gym-workout-plan',
      datePublished: '2026-09-08',
      dateModified: '2026-09-08',
    },
  })

  return (
    <GuideLayout
      title="No-Equipment Home Workout Plan"
      dek="Most of the exercise library assumes a barbell or a machine — here's what's actually worth doing with just your bodyweight."
    >
      <h2>What bodyweight training can and can't do</h2>
      <p>
        Bodyweight training builds real strength, especially for a beginner, but it plateaus faster than loaded
        training once your bodyweight itself stops being challenging — pull-ups and push-ups eventually need
        added resistance (a pack, a band) or higher skill variations to keep progressing. It's a genuinely good
        starting point, not a permanent substitute for a barbell.
      </p>

      <h2>A simple bodyweight-only session</h2>
      <ul>
        <li><Link to="/exercises/push-up">Push-up</Link> — chest, shoulders, triceps</li>
        <li><Link to="/exercises/pull-up">Pull-up</Link> (needs a bar) — back, biceps</li>
        <li><Link to="/exercises/walking-lunge">Walking lunge</Link> — quads, glutes, hamstrings</li>
        <li><Link to="/exercises/calf-raise">Calf raise</Link> — calves, no equipment needed off a step</li>
        <li><Link to="/exercises/plank">Plank</Link> — core, anti-extension strength</li>
        <li><Link to="/exercises/hanging-leg-raise">Hanging leg raise</Link> (needs a bar) — core</li>
      </ul>

      <h2>Making it progressive</h2>
      <p>
        Even without weight, you can still progress: more reps, slower tempo (a 3-second lower on a push-up is
        much harder than a fast one), or a harder lever (feet elevated push-ups, one-leg-at-a-time lunges).
        Whatever you change, log it in the <Link to="/tracker">tracker</Link> — reps and a note on the variation
        used — so you can tell whether you're actually progressing.
      </p>

      <h2>When to add equipment</h2>
      <p>
        A single adjustable dumbbell pair or a pull-up bar opens up most of the{' '}
        <Link to="/exercises">exercise library</Link> without needing a full gym. If bodyweight push-ups and
        pull-ups both start feeling easy for 15+ reps, that's the point where added load starts mattering more
        than added reps.
      </p>
    </GuideLayout>
  )
}
