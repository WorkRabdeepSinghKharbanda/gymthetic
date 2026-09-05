import { useState } from 'react'
import { getFavorites, toggleFavorite } from '../lib/storage'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites())

  function toggle(slug: string) {
    setFavorites(toggleFavorite(slug))
  }

  return { favorites, isFavorite: (slug: string) => favorites.includes(slug), toggle }
}
