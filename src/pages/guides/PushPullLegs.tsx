import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import GuideLayout from '../../components/GuideLayout'

const FAQS = [
  {
    q: 'How many days a week should I train PPL?',
    a: 'Most lifters run it 6 days a week (push, pull, legs, repeat) or 3 days a week with rest days between each. Six days gives each muscle group two hits per week; three days is easier to recover from and sustain long-term.',
  },
  {
    q: 'Is PPL good for beginners?',
    a: 'Yes, as long as you start with the 3-day version. Six days a week of new-to-training volume tends to outpace a beginner\'s recovery before their work capacity catches up.',
  },
  {
    q: 'PPL vs. upper/lower — which is better?',
    a: "Neither is objectively better. PPL spreads volume across more, more focused sessions (better for higher weekly volume); upper/lower needs fewer days and suits people who can't train 5-6x/week.",
  },
]

export default function PushPullLegs() {
  useSeo({
    title: 'Push Pull Legs (PPL) Split: The Complete Guide',
    description: 'What the push/pull/legs training split is, why it works, and a sample weekly schedule for both 6-day and 3-day versions.',
    path: '/guides/push-pull-legs-split',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Push Pull Legs (PPL) Split: The Complete Guide',
          description: 'What the push/pull/legs training split is, why it works, and a sample weekly schedule.',
          author: { '@type': 'Organization', name: 'Gymthetic' },
          mainEntityOfPage: 'https://gymthetic.vercel.app/guides/push-pull-legs-split',
          datePublished: '2026-09-08',
          dateModified: '2026-09-08',
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  })

  return (
    <GuideLayout
      title="Push Pull Legs (PPL) Split: The Complete Guide"
      dek="A training split organized around movement pattern instead of body part — simple to program, easy to scale up or down."
    >
      <h2>What is a push/pull/legs split?</h2>
      <p>
        Push Pull Legs groups every lift into one of three categories: <strong>push</strong> (chest, shoulders,
        triceps — anything where you move weight away from your body), <strong>pull</strong> (back, biceps —
        anything where you pull weight toward you), and <strong>legs</strong> (quads, hamstrings, glutes, calves).
        Each training day hits one category, so every muscle group gets trained without a session ever fighting
        for recovery with the one before it.
      </p>

      <h2>Why it works</h2>
      <p>
        Grouping by movement pattern means the muscles worked in one session are almost entirely rested by the
        time the same pattern comes around again. It also keeps session length reasonable — you're not trying
        to squeeze chest, back, and legs into a single day — while still letting you hit each muscle group
        multiple times a week if you run the 6-day version.
      </p>

      <h2>Sample schedule — 6 day</h2>
      <ul>
        <li>Day 1: Push — <Link to="/exercises?category=push">browse push exercises</Link></li>
        <li>Day 2: Pull — <Link to="/exercises?category=pull">browse pull exercises</Link></li>
        <li>Day 3: Legs — <Link to="/exercises?category=legs">browse leg exercises</Link></li>
        <li>Day 4: Push</li>
        <li>Day 5: Pull</li>
        <li>Day 6: Legs</li>
        <li>Day 7: Rest</li>
      </ul>

      <h2>Sample schedule — 3 day (beginner-friendly)</h2>
      <ul>
        <li>Day 1: Push</li>
        <li>Day 2: Rest</li>
        <li>Day 3: Pull</li>
        <li>Day 4: Rest</li>
        <li>Day 5: Legs</li>
        <li>Day 6-7: Rest</li>
      </ul>

      <h2>Put it into practice</h2>
      <p>
        Use <Link to="/">Today's Focus</Link> on the home page to get a randomized session for whichever
        category is up next, or build a fixed routine once in <Link to="/templates">Templates</Link> and log
        the whole session in one tap every time it comes around. Either way, <Link to="/tracker">the tracker</Link>{' '}
        keeps a rolling push/pull/legs volume trend so you can see whether one category is lagging the others.
      </p>

      <h2>FAQ</h2>
      {FAQS.map((f) => (
        <div key={f.q}>
          <p className="font-semibold text-neutral-900 dark:text-white">{f.q}</p>
          <p>{f.a}</p>
        </div>
      ))}
    </GuideLayout>
  )
}
