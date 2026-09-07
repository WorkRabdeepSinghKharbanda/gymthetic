import { useMemo, useState } from 'react'
import {
  addMeasurement,
  addPhoto,
  deleteMeasurement,
  deletePhoto,
  getMeasurements,
  getPhotos,
  type Measurement,
  type ProgressPhoto,
} from '../lib/storage'
import { useSeo } from '../hooks/useSeo'
import LineChart from '../components/LineChart'
import NumberField from '../components/NumberField'

const METRICS: { key: keyof Measurement; label: string }[] = [
  { key: 'weightKg', label: 'Weight (kg)' },
  { key: 'waistCm', label: 'Waist (cm)' },
  { key: 'chestCm', label: 'Chest (cm)' },
  { key: 'armsCm', label: 'Arms (cm)' },
  { key: 'thighsCm', label: 'Thighs (cm)' },
]

export default function Measurements() {
  useSeo({
    title: 'Body Measurements',
    description: 'Track weight and body measurements over time, plus progress photos to compare side by side.',
    path: '/measurements',
    noindex: true,
  })

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [weightKg, setWeightKg] = useState(0)
  const [waistCm, setWaistCm] = useState(0)
  const [chestCm, setChestCm] = useState(0)
  const [armsCm, setArmsCm] = useState(0)
  const [thighsCm, setThighsCm] = useState(0)
  const [entries, setEntries] = useState<Measurement[]>(() => getMeasurements())
  const [photos, setPhotos] = useState<ProgressPhoto[]>(() => getPhotos())
  const [compareIds, setCompareIds] = useState<string[]>([])

  function optional(n: number): number | undefined {
    return n > 0 ? n : undefined
  }

  function handleAdd() {
    setEntries(
      addMeasurement({
        date,
        weightKg: optional(weightKg),
        waistCm: optional(waistCm),
        chestCm: optional(chestCm),
        armsCm: optional(armsCm),
        thighsCm: optional(thighsCm),
      }),
    )
  }

  function handleDelete(id: string) {
    setEntries(deleteMeasurement(id))
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        setPhotos(addPhoto({ date: new Date().toISOString().slice(0, 10), dataUrl: reader.result as string }))
      } catch {
        alert('Could not save photo — your browser storage is full. Try deleting an older photo first.')
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function handleDeletePhoto(id: string) {
    setPhotos(deletePhoto(id))
    setCompareIds((prev) => prev.filter((i) => i !== id))
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id)
      if (prev.length >= 2) return [prev[1], id]
      return [...prev, id]
    })
  }

  const compared = useMemo(() => photos.filter((p) => compareIds.includes(p.id)), [photos, compareIds])

  const trends = METRICS.map((m) => ({
    ...m,
    points: entries.map((e) => e[m.key]).filter((v): v is number => typeof v === 'number'),
  })).filter((t) => t.points.length >= 2)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Body Measurements</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Track weight and measurements, plus progress photos — stored locally on your device.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Log a check-in</h2>
        <label className="mt-4 block max-w-xs">
          <span className="text-xs font-medium text-neutral-500">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <NumberField label="Weight (kg)" value={weightKg} onChange={setWeightKg} min={0} max={400} />
          <NumberField label="Waist (cm)" value={waistCm} onChange={setWaistCm} min={0} max={300} />
          <NumberField label="Chest (cm)" value={chestCm} onChange={setChestCm} min={0} max={300} />
          <NumberField label="Arms (cm)" value={armsCm} onChange={setArmsCm} min={0} max={100} />
          <NumberField label="Thighs (cm)" value={thighsCm} onChange={setThighsCm} min={0} max={150} />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Save check-in
        </button>
      </div>

      {trends.length > 0 && (
        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Trends</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {trends.map((t) => (
              <div key={t.key}>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t.label}</p>
                <div className="mt-1">
                  <LineChart points={t.points} height={90} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">History</h2>
        <div className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {entries.length === 0 && (
            <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400">No check-ins logged yet.</p>
          )}
          {entries
            .slice()
            .reverse()
            .map((e) => (
              <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
                <span className="text-neutral-600 dark:text-neutral-300">{e.date}</span>
                <span className="flex-1 text-neutral-700 dark:text-neutral-200">
                  {[
                    e.weightKg !== undefined && `${e.weightKg}kg`,
                    e.waistCm !== undefined && `waist ${e.waistCm}cm`,
                    e.chestCm !== undefined && `chest ${e.chestCm}cm`,
                    e.armsCm !== undefined && `arms ${e.armsCm}cm`,
                    e.thighsCm !== undefined && `thighs ${e.thighsCm}cm`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <button onClick={() => handleDelete(e.id)} className="text-xs text-neutral-400 hover:text-red-500">
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Progress photos</h2>
          <label className="cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
            Add photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Pick two photos to compare them side by side.
        </p>

        {photos.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">No photos yet.</p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((p) => (
              <div key={p.id} className="relative">
                <button
                  onClick={() => toggleCompare(p.id)}
                  className={`block w-full overflow-hidden rounded-lg border-2 ${
                    compareIds.includes(p.id) ? 'border-orange-500' : 'border-transparent'
                  }`}
                >
                  <img src={p.dataUrl} alt={`Progress photo from ${p.date}`} className="aspect-square w-full object-cover" />
                </button>
                <p className="mt-1 text-center text-xs text-neutral-500 dark:text-neutral-400">{p.date}</p>
                <button
                  onClick={() => handleDeletePhoto(p.id)}
                  className="absolute right-1 top-1 rounded bg-black/50 px-1.5 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {compared.length === 2 && (
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            {compared.map((p) => (
              <div key={p.id}>
                <img src={p.dataUrl} alt={`Progress photo from ${p.date}`} className="w-full rounded-lg object-cover" />
                <p className="mt-1 text-center text-xs text-neutral-500 dark:text-neutral-400">{p.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
