export default function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      className={`text-lg leading-none transition-colors ${
        active ? 'text-orange-500' : 'text-neutral-300 hover:text-orange-400 dark:text-neutral-600'
      }`}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
