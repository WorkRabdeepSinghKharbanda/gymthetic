export default function StreakHeatmap({ dates }: { dates: string[] }) {
  const dateSet = new Set(dates)
  const days = 84 // ~12 weeks
  const today = new Date()
  const cells = Array.from({ length: days }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (days - 1 - i))
    const iso = d.toISOString().slice(0, 10)
    return { iso, logged: dateSet.has(iso) }
  })

  return (
    <div className="grid grid-cols-12 gap-1 sm:grid-cols-14">
      {cells.map((cell) => (
        <div
          key={cell.iso}
          title={cell.iso}
          className={`h-3 w-3 rounded-sm ${
            cell.logged ? 'bg-orange-500' : 'bg-neutral-200 dark:bg-neutral-800'
          }`}
        />
      ))}
    </div>
  )
}
