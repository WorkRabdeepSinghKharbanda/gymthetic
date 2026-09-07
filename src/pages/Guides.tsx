import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

const GUIDES = [
  {
    to: '/guides/push-pull-legs-split',
    title: 'Push Pull Legs (PPL) Split: The Complete Guide',
    description: 'What PPL is, why it works, and a sample weekly schedule.',
    icon: '🗓️',
  },
  {
    to: '/guides/how-to-calculate-your-1rm',
    title: 'How to Calculate Your One-Rep Max (1RM)',
    description: 'The Epley formula explained, and how to train off a percentage table safely.',
    icon: '🏋️',
  },
  {
    to: '/guides/breaking-a-strength-plateau',
    title: 'How to Break a Strength Training Plateau',
    description: 'Why lifts stall, and the deload/variation/autoregulation toolkit to get moving again.',
    icon: '🧗',
  },
  {
    to: '/beginner-workout-plan',
    title: 'Beginner Workout Plan: Your First 3 Months',
    description: 'A simple 3-day plan and what to actually focus on while everything is new.',
    icon: '🌱',
  },
  {
    to: '/home-gym-workout-plan',
    title: 'No-Equipment Home Workout Plan',
    description: 'A bodyweight-only plan using push-ups, pull-ups, planks, and lunges.',
    icon: '🏠',
  },
]

export default function Guides() {
  useSeo({
    title: 'Guides',
    description: 'In-depth training guides: push/pull/legs programming, calculating your 1RM, and breaking through plateaus.',
    path: '/guides',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Guides</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">In-depth training guides to go with the tools.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {GUIDES.map((g) => (
          <Link
            key={g.to}
            to={g.to}
            className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="text-3xl">{g.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">{g.title}</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
