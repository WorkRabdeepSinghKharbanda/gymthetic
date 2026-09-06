import { Link } from 'react-router-dom'
import MuscleGroupNav from '../components/MuscleGroupNav'
import TodaysFocus from '../components/TodaysFocus'

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
          Train smarter. <span className="text-orange-500">Break every plateau.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
          Exercise library, strength calculators, and a personal progress tracker —
          everything you need to plan your split and push past a stall, in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/exercises"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
          >
            Browse Exercises
          </Link>
          <Link
            to="/tracker"
            className="rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Start Tracking
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: '📚', title: 'Exercise Library', desc: 'Push/pull/legs, organized by muscle group, with plateau-specific tips per lift.' },
            { icon: '🧮', title: 'Calculators', desc: '1RM, TDEE/macros, and a plateau-breaker tool tailored to how long you’ve been stuck.' },
            { icon: '📈', title: 'Progress Tracker', desc: 'Log every session locally, watch your estimated 1RM trend, get auto plateau alerts.' },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">Browse by muscle group</h2>
        <MuscleGroupNav />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <TodaysFocus />
      </section>
    </div>
  )
}
