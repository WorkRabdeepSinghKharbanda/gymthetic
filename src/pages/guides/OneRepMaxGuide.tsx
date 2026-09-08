import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import GuideLayout from '../../components/GuideLayout'

export default function OneRepMaxGuide() {
  useSeo({
    title: 'How to Calculate Your One-Rep Max (1RM)',
    description: 'How the Epley formula estimates your one-rep max from a normal working set, and how to train off a percentage table without ever testing a true max.',
    path: '/guides/how-to-calculate-your-1rm',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Calculate Your One-Rep Max (1RM)',
      description: 'How the Epley formula estimates your one-rep max from a normal working set.',
      author: { '@type': 'Organization', name: 'Gymthetic' },
      mainEntityOfPage: 'https://gymthetic.vercel.app/guides/how-to-calculate-your-1rm',
      datePublished: '2026-09-08',
      dateModified: '2026-09-08',
    },
  })

  return (
    <GuideLayout
      title="How to Calculate Your One-Rep Max (1RM)"
      dek="Your one-rep max is the heaviest weight you could lift for a single rep — here's how to estimate it without actually attempting one."
      currentPath="/guides/how-to-calculate-your-1rm"
    >
      <h2>Why estimate instead of test</h2>
      <p>
        A true 1RM test is a maximal, all-out single lift — useful for powerlifters on meet day, but risky and
        fatiguing for everyday training. Instead, most programs estimate it from a normal working set (say, 5-10
        reps) using a formula, then use that number to set training percentages.
      </p>

      <h2>The Epley formula</h2>
      <p>
        Gymthetic's <Link to="/calculators/one-rep-max">1RM calculator</Link> uses the Epley formula:
      </p>
      <p className="font-mono text-xs">1RM ≈ weight × (1 + reps ÷ 30)</p>
      <p>
        Lift 100kg for 5 reps and the formula estimates a 1RM of about 117kg. It gets less accurate above ~12
        reps (endurance sets don't map cleanly to a single max), so it's most reliable for sets in the 1-10 rep
        range.
      </p>

      <h2>Using the number</h2>
      <p>
        Once you have an estimated 1RM, most programming works off a percentage of it rather than the number
        itself — 70% for higher-rep volume work, 85-90% for strength-focused sets. Run yours through the{' '}
        <Link to="/calculators/one-rep-max">1RM calculator</Link> to get a full percentage table, then use the{' '}
        <Link to="/calculators/plates">plate calculator</Link> to work out what to actually load on the bar, and
        the <Link to="/calculators/warmup">warm-up calculator</Link> to ramp up to it without burning energy on
        warm-up sets.
      </p>

      <h2>Track it over time</h2>
      <p>
        Log your sets in the <Link to="/tracker">tracker</Link> and Gymthetic estimates your 1RM after every
        session automatically, charts the trend per lift, and flags a lift as plateaued if it hasn't set a new
        high in a few weeks. Check <Link to="/standards">strength standards</Link> to see how your current
        numbers compare to typical beginner-to-elite bodyweight ratios.
      </p>
    </GuideLayout>
  )
}
