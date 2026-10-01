export interface ComparisonRow {
  dimension: string
  competitor: string
  gymthetic: string
}

export interface Faq {
  q: string
  a: string
}

export interface AlternativeEntry {
  slug: string
  competitor: string
  title: string
  description: string
  intro: string
  comparison: ComparisonRow[]
  whenCompetitorBetter: string[]
  howToSwitch: string[]
  faqs: Faq[]
}

export const ALTERNATIVES: AlternativeEntry[] = [
  {
    slug: 'strong-app-alternative',
    competitor: 'Strong',
    title: 'Strong App Alternative: A Free, No-Signup Workout Tracker',
    description: 'A free, account-free alternative to the Strong workout tracker app — no subscription, no sign-in, runs in any browser.',
    intro: "Strong is a well-regarded iOS/Android workout logging app built around a cloud account and an Apple Watch companion. If you don't need the mobile-native extras and just want a fast, free way to log lifts and see your 1RM trend, Gymthetic covers the core job with nothing to install or sign up for.",
    comparison: [
      { dimension: 'Account required', competitor: 'Yes — sign-in for cloud sync', gymthetic: 'No — open the site and start logging' },
      { dimension: 'Where your data lives', competitor: "Their servers (synced to your account)", gymthetic: 'Your browser only (localStorage) — nothing leaves your device' },
      { dimension: 'Cost', competitor: 'Free tier with limits; full history/Apple Watch app behind a subscription', gymthetic: 'Every feature free, no paywall, no trial' },
      { dimension: 'Built-in calculators', competitor: '1RM tracking', gymthetic: '1RM, TDEE/macros, plate math, warm-up ramp, plateau breaker, and strength standards, all in one place' },
      { dimension: 'Exercise guidance', competitor: 'Exercise images and names', gymthetic: 'Written how-to steps, common mistakes, and plateau-specific tips per exercise' },
      { dimension: 'Offline use', competitor: 'Native app, fully offline', gymthetic: 'Installable as a PWA, works offline once visited' },
      { dimension: 'Cross-device sync', competitor: 'Yes, via account', gymthetic: "No — by design, no account means no server-side sync; use Export/Import JSON to carry data between devices manually" },
    ],
    whenCompetitorBetter: [
      'You want an Apple Watch companion app or push notifications mid-workout.',
      'You train from multiple devices regularly and want your history to follow you automatically without a manual export/import step.',
      'You specifically want a native mobile app experience over a browser tab.',
    ],
    howToSwitch: [
      "Pick a split — read the push/pull/legs guide, or build your own routine in Templates.",
      'Log your first session in the Tracker — no account screen to get through.',
      "If you're mid-program, just start logging from today; there's no import path from Strong's data format.",
      'Set up a daily reminder (Tracker page) so you keep the habit without the app notification Strong would have sent.',
    ],
    faqs: [
      {
        q: 'Is Gymthetic really free with no trial period?',
        a: 'Yes. There is no account, no payment screen, and no feature locked behind a subscription.',
      },
      {
        q: 'Can I import my Strong workout history into Gymthetic?',
        a: "Not automatically — Gymthetic's import only reads its own exported JSON format. You'd start a fresh log, though your Strong history remains in Strong if you keep that app installed.",
      },
      {
        q: 'Does Gymthetic sync across my phone and laptop like Strong does?',
        a: "Not automatically. Use the Tracker page's Export button to download your data as JSON, then Import it on another device/browser to carry it over manually.",
      },
    ],
  },
  {
    slug: 'hevy-alternative',
    competitor: 'Hevy',
    title: 'Hevy Alternative: A Free Workout Tracker With No Account',
    description: 'A free, no-signup alternative to Hevy for logging lifts, tracking 1RM trends, and planning a split — no social feed, no account.',
    intro: "Hevy has grown popular for its social workout-sharing feed and large built-in exercise GIF library, on top of standard logging. If the social layer isn't what you're after and you'd rather skip creating an account, Gymthetic handles the actual logging and calculator side for free.",
    comparison: [
      { dimension: 'Account required', competitor: 'Yes — email or social login', gymthetic: 'No' },
      { dimension: 'Where your data lives', competitor: 'Their servers (cloud sync, shareable to a social feed)', gymthetic: 'Your browser only — nothing leaves your device' },
      { dimension: 'Cost', competitor: 'Free tier plus a Hevy Pro subscription for deeper analytics', gymthetic: 'Every feature free' },
      { dimension: 'Social features', competitor: 'Workout feed, following other lifters, routine sharing', gymthetic: 'None — this is a personal tool, not a social app' },
      { dimension: 'Exercise database size', competitor: 'Large, with GIF demonstrations', gymthetic: '47+ exercises with written technique, common mistakes, and plateau tips per lift' },
      { dimension: 'Built-in calculators', competitor: '1RM tracking', gymthetic: '1RM, TDEE/macros, plate math, warm-up ramp, plateau breaker, strength standards' },
      { dimension: 'Cross-device sync', competitor: 'Yes, via account', gymthetic: 'No — Export/Import JSON is the manual equivalent' },
    ],
    whenCompetitorBetter: [
      'You actually want the social feed — sharing workouts or following training partners.',
      "You want the largest possible built-in exercise library with GIF demonstrations rather than written technique notes.",
      'You train across several devices and want automatic sync without a manual export step.',
    ],
    howToSwitch: [
      'Decide on a split (see the push/pull/legs guide) or recreate a Hevy routine in Templates.',
      'Start logging in the Tracker — reps, weight, and an optional RPE per set.',
      'Check Strength Standards once you have a few logged sessions, to see where your lifts sit relative to typical levels.',
    ],
    faqs: [
      {
        q: 'Does Gymthetic have a social feed like Hevy?',
        a: 'No. Gymthetic has no accounts and no shared data between visitors — your data stays local to your own browser, which structurally rules out a social feed.',
      },
      {
        q: 'Is there a free tier limit on Gymthetic, like Hevy Pro vs. free?',
        a: 'No tiers at all — tracker, calculators, templates, goals, and badges are the same for every visitor, free.',
      },
    ],
  },
  {
    slug: 'stronglifts-alternative',
    competitor: 'StrongLifts 5x5',
    title: 'StrongLifts 5x5 Alternative: Free Tracking Beyond One Program',
    description: "A free alternative to StrongLifts 5x5 for lifters who want flexible programming and a full exercise library, not just one fixed 5x5 progression.",
    intro: "StrongLifts 5x5 is purpose-built around a single linear-progression program — five sets of five reps on a small rotation of compound lifts. That focus is its strength for a beginner who wants zero decisions to make. If you want to run a different split, or your own mix of exercises, Gymthetic's templates and library aren't locked to one program.",
    comparison: [
      { dimension: 'Program scope', competitor: 'One fixed program: 5x5 linear progression on a handful of lifts', gymthetic: 'Full exercise library across 8 muscle groups, any split you want to build' },
      { dimension: 'Account required', competitor: 'No account needed for basic use', gymthetic: 'No account, ever' },
      { dimension: 'Cost', competitor: 'Free version with limited customization (plates, units); Pro unlocks more', gymthetic: 'Every feature free' },
      { dimension: 'Flexibility', competitor: 'Deliberately rigid — that is the product', gymthetic: 'Build and save your own routines in Templates, log any exercise in the library' },
      { dimension: 'Built-in calculators', competitor: 'Plate math for its own program', gymthetic: '1RM, TDEE/macros, plate math, warm-up ramp, plateau breaker, strength standards' },
      { dimension: 'Cross-device sync', competitor: 'Account-based sync available', gymthetic: 'No — Export/Import JSON is the manual equivalent' },
    ],
    whenCompetitorBetter: [
      "You specifically want the 5x5 program and nothing else — its rigidity is a feature for a first-time lifter who doesn't want to make programming decisions.",
      'You want a guided, opinionated progression scheme rather than a toolkit you assemble yourself.',
    ],
    howToSwitch: [
      'If you want to keep running 5x5, rebuild it once as a Template (squat/bench/row one day, squat/press/deadlift the next) and reuse it indefinitely.',
      'If you want more variety, read the beginner workout plan guide for a slightly broader 3-day structure.',
      'Log every session in the Tracker so progressive overload is based on your actual numbers, not memory.',
    ],
    faqs: [
      {
        q: 'Can I run the exact 5x5 program on Gymthetic?',
        a: "Yes — build it once as a saved Template (sets/reps per exercise) and use \"Log entire session\" each time it comes around, rather than re-entering it from scratch.",
      },
      {
        q: 'Does Gymthetic auto-progress my weight like StrongLifts does?',
        a: 'Partially — the Tracker suggests your next weight (+2.5kg if you hit target reps last time), but you confirm it rather than it being fully automatic for a fixed program.',
      },
    ],
  },
  {
    slug: 'jefit-alternative',
    competitor: 'JEFIT',
    title: 'JEFIT Alternative: A Simpler, Ad-Free Workout Tracker',
    description: 'A free, no-account, no-ads-in-the-tracker alternative to JEFIT for logging lifts and planning routines.',
    intro: "JEFIT's biggest strength is the sheer size of its exercise database and community workout plans. That breadth comes with a free tier that shows ads and an account requirement. If you want a smaller, deeper exercise library (with full technique and plateau notes per lift) without ads interrupting your actual training screens, Gymthetic is a lighter alternative.",
    comparison: [
      { dimension: 'Account required', competitor: 'Yes', gymthetic: 'No' },
      { dimension: 'Ads', competitor: 'Shown in the free tier; removed with Elite subscription', gymthetic: 'None on the Tracker or calculators — ads only appear on content pages like Blog/Guides' },
      { dimension: 'Exercise database size', competitor: 'Very large, broad coverage', gymthetic: '47+ exercises, fewer in number but each with full how-to, common mistakes, and plateau-specific tips' },
      { dimension: 'Community features', competitor: 'Workout plan sharing, community', gymthetic: 'None — personal tool, no backend' },
      { dimension: 'Built-in calculators', competitor: '1RM tracking', gymthetic: '1RM, TDEE/macros, plate math, warm-up ramp, plateau breaker, strength standards' },
      { dimension: 'Cross-device sync', competitor: 'Yes, via account', gymthetic: 'No — Export/Import JSON is the manual equivalent' },
    ],
    whenCompetitorBetter: [
      'You want the largest possible exercise database, including less common machines/variations.',
      'You want community-shared workout plans to browse and copy.',
    ],
    howToSwitch: [
      'Browse the exercise library by muscle group and confirm your usual lifts are covered.',
      'Build your routine as a Template, or use Today\'s Focus for a randomized session by muscle group.',
      'Start logging — no account screen, no ad between sets.',
    ],
    faqs: [
      {
        q: 'Does Gymthetic have ads like the JEFIT free tier?',
        a: 'Ads only appear on content pages (Blog, Guides) — never on the Tracker, calculators, or any page you use mid-workout.',
      },
      {
        q: 'Is Gymthetic\'s exercise library as big as JEFIT\'s?',
        a: "No — JEFIT's database is considerably larger. Gymthetic trades breadth for depth: fewer exercises, each with full technique, common-mistake, and plateau-breaking notes.",
      },
    ],
  },
]

export function getAlternativeBySlug(slug: string): AlternativeEntry | undefined {
  return ALTERNATIVES.find((a) => a.slug === slug)
}
