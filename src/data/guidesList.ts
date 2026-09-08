export interface GuideListItem {
  to: string
  title: string
  description: string
  icon: string
}

export const GUIDES: GuideListItem[] = [
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
