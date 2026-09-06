import { useMemo, useState } from 'react'
import type { LogEntry } from '../lib/storage'

const COMPACT_LIMIT = 20
const PAGE_SIZE = 50

export default function HistoryList({ logs, onDelete }: { logs: LogEntry[]; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [dayFilter, setDayFilter] = useState('')
  const [page, setPage] = useState(0)

  const reversed = useMemo(() => logs.slice().reverse(), [logs])
  const filtered = useMemo(
    () => (dayFilter ? reversed.filter((l) => l.date === dayFilter) : reversed),
    [reversed, dayFilter],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const visible = expanded
    ? filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)
    : filtered.slice(0, COMPACT_LIMIT)

  function toggleExpanded() {
    setExpanded((v) => !v)
    setPage(0)
  }

  return (
    <div>
      {expanded && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            Filter by day
            <input
              type="date"
              value={dayFilter}
              onChange={(e) => {
                setDayFilter(e.target.value)
                setPage(0)
              }}
              className="rounded-lg border border-neutral-300 bg-white px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </label>
          {dayFilter && (
            <button
              onClick={() => setDayFilter('')}
              className="text-xs text-orange-500 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      )}

      <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
        {filtered.length === 0 && (
          <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400">No sessions logged yet.</p>
        )}
        {visible.map((log) => (
          <div key={log.id} className="flex items-center justify-between gap-2 p-3 text-sm">
            <span className="shrink-0 text-neutral-600 dark:text-neutral-300">{log.date}</span>
            <span className="shrink-0 font-medium text-neutral-900 dark:text-white">
              {log.weight}kg × {log.reps}
            </span>
            {log.note && (
              <span className="flex-1 truncate text-xs italic text-neutral-400" title={log.note}>
                {log.note}
              </span>
            )}
            <button onClick={() => onDelete(log.id)} className="shrink-0 text-xs text-neutral-400 hover:text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {logs.length > COMPACT_LIMIT && (
          <button onClick={toggleExpanded} className="text-sm font-medium text-orange-500 hover:underline">
            {expanded ? 'Show less' : `Show all (${logs.length})`}
          </button>
        )}
        {expanded && totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-600 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300"
            >
              Prev
            </button>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="rounded-lg border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-600 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
