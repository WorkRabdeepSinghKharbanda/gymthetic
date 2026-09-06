export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900">
      {message}
    </div>
  )
}
