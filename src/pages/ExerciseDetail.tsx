import { Link, useParams } from 'react-router-dom'
import { getExerciseBySlug } from '../data/exercises'
import { personalRecords } from '../lib/storage'
import { useFavorites } from '../hooks/useFavorites'
import { useSeo } from '../hooks/useSeo'
import FavoriteButton from '../components/FavoriteButton'

export default function ExerciseDetail() {
  const { slug } = useParams()
  const exercise = slug ? getExerciseBySlug(slug) : undefined
  const { isFavorite, toggle } = useFavorites()
  const pr = slug ? personalRecords()[slug] : undefined

  useSeo({
    title: exercise ? exercise.name : 'Exercise not found',
    description: exercise
      ? `How to perform the ${exercise.name}: technique, primary/secondary muscles worked, common mistakes, and plateau-breaking tips.`
      : 'Exercise not found.',
    path: `/exercises/${slug ?? ''}`,
    jsonLd: exercise
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: exercise.name,
          description: `How to perform the ${exercise.name}, targeting ${exercise.primaryMuscles.join(', ')}.`,
          step: exercise.howTo.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text,
          })),
        }
      : undefined,
  })

  if (!exercise) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">Exercise not found.</p>
        <Link to="/exercises" className="mt-4 inline-block text-orange-500 hover:underline">
          Back to library
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/exercises" className="text-sm text-orange-500 hover:underline">
        ← Back to library
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          {exercise.muscleGroup}
        </span>
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold uppercase text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
          {exercise.category}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{exercise.name}</h1>
        <FavoriteButton active={isFavorite(exercise.slug)} onClick={() => toggle(exercise.slug)} />
      </div>

      {pr && (
        <p className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">
          PR: {pr.weight}kg × {pr.reps} ({new Date(pr.date).toLocaleDateString()}) — est. 1RM {Math.round(pr.est1rm)}kg
        </p>
      )}

      <div className="mt-6 grid gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <p>
          <strong className="text-neutral-900 dark:text-white">Primary:</strong> {exercise.primaryMuscles.join(', ')}
        </p>
        {exercise.secondaryMuscles.length > 0 && (
          <p>
            <strong className="text-neutral-900 dark:text-white">Secondary:</strong> {exercise.secondaryMuscles.join(', ')}
          </p>
        )}
      </div>

      <Section title="How to perform it" items={exercise.howTo} />
      <Section title="Common mistakes" items={exercise.commonMistakes} />
      <Section title="Break through a plateau" items={exercise.plateauTips} highlight />

      <Link
        to={`/tracker?exercise=${exercise.slug}`}
        className="mt-8 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
      >
        Log this lift
      </Link>
    </div>
  )
}

function Section({ title, items, highlight }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className="mt-6">
      <h2 className={`text-lg font-semibold ${highlight ? 'text-orange-500' : 'text-neutral-900 dark:text-white'}`}>
        {title}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
