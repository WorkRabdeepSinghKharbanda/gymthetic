export interface BlogPost {
  slug: string
  title: string
  date: string // ISO
  description: string
  /** Lite markdown: lines starting "## " render as headings, everything else as a paragraph. */
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: '5-signs-you-need-a-deload-week',
    title: '5 Signs You Need a Deload Week',
    date: '2026-09-08',
    description: 'Persistent soreness, stalled lifts, worse sleep — the tells that say cut volume before you get hurt or burn out.',
    body: [
      "A deload isn't a reward for finishing a hard block — it's a tool to use before things break down. Here are the signs it's time.",
      '## 1. A lift has stalled for 3+ weeks',
      "If you haven't set a new estimated 1RM on a main lift in three or more weeks despite training it consistently, that's the textbook trigger. Gymthetic's tracker flags this automatically once you log a few sessions.",
      '## 2. Warm-up sets feel like work sets',
      "When 60% of your usual working weight starts feeling heavy, that's accumulated fatigue talking, not a sudden strength loss.",
      '## 3. Sleep and motivation are both down',
      "Training performance is downstream of recovery. If you're sleeping worse and dreading sessions you used to enjoy, volume has likely outpaced recovery capacity for a while.",
      '## 4. Nagging joint aches instead of muscle soreness',
      "Muscle soreness fades in a day or two. A joint or tendon ache that lingers and shows up at the start of every session is a sign to back off before it becomes an actual injury.",
      '## 5. RPE keeps creeping up for the same numbers',
      'If a weight that used to feel like RPE 7 now feels like RPE 9, log a couple of sessions with the RPE field in the tracker — a rising trend at the same load is fatigue accumulating, not a fitness problem.',
      '## What to actually do',
      "Cut working volume by 40-50% for a week at the same intensity (weight), not less intensity — this clears fatigue without losing the neural adaptation to heavy loads. Then resume normal programming. If a specific lift is still stuck after the deload, run it through the plateau breaker calculator for next steps.",
    ],
  },
  {
    slug: 'beginner-mistakes-that-kill-progress',
    title: 'Beginner Mistakes That Kill Progress in the Gym',
    date: '2026-09-08',
    description: "The habits that quietly stall a first year of training — none of them are about not working hard enough.",
    body: [
      "Most beginner plateaus aren't an effort problem — they're a handful of habits that quietly cap progress. Here are the common ones.",
      '## Program hopping',
      "Switching programs every few weeks means you never accumulate enough consistent volume on the same lifts to see the adaptation. Pick a split — push/pull/legs is a solid, simple default — and run it for months, not weeks.",
      '## Skipping the same weight for months',
      "If you're not logging weight and reps, you can't tell if you're actually progressing. A tracker (even a simple one) turns 'I think I'm getting stronger' into a number you can act on.",
      '## Chasing weight over form',
      "Adding 5kg by turning a squat into a quarter-squat isn't progress — it caps how much the target muscle actually gets trained, and it's how injuries start. If a rep needs visibly worse form to complete, it's not a rep you should count.",
      '## Never tracking sleep, food, or stress',
      "Training is the stimulus; recovery is where the adaptation actually happens. Chronic under-eating (check a TDEE calculator against what you're actually eating) or poor sleep will cap results no matter how good the program is.",
      '## Treating every set like a max effort',
      "Grinding every set to complete failure accumulates fatigue faster than it builds strength, especially early on. Rating a set's difficulty (RPE 6-10) and leaving a rep or two in reserve most sessions leaves room to actually progress the number week to week.",
      '## The fix',
      'Pick one split, log every session, eat enough, and let a plateau alert (not a hunch) tell you when something needs to change.',
    ],
  },
  {
    slug: 'how-much-protein-do-you-need',
    title: 'How Much Protein Do You Actually Need?',
    date: '2026-09-08',
    description: 'The short answer: less than the supplement industry wants you to think, but not nothing. Here is the actual range.',
    body: [
      "Protein targets get more marketing noise than any other training variable. Here's the range that's actually backed by evidence.",
      '## The short version',
      'For someone training with weights regularly, roughly 1.6-2.2g of protein per kg of bodyweight per day covers the range where most research stops finding additional benefit for muscle growth or retention. Above that, extra protein mostly just replaces other calories.',
      '## Why a range, not one number',
      "Higher intakes (closer to 2.2g/kg) tend to matter more in a calorie deficit, where the body is more likely to break down muscle for energy — protein helps protect against that. In a surplus or maintenance, the lower end of the range is usually enough.",
      '## Spread, not just total',
      'Hitting the daily total in one meal is less useful than spreading it across 3-4 meals — each roughly 0.3-0.4g/kg per meal is enough to maximize the muscle-building response from that meal.',
      '## Put a number on it',
      "Gymthetic's TDEE & Macro calculator estimates a protein target (about 2g/kg) alongside your full calorie and macro split based on your goal — use it as a starting point and adjust from how training and recovery actually feel over a few weeks.",
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function sortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
}
