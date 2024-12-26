import { useEffect, useRef } from 'react'
import { useSearchInputStore } from '@/store/useSearchInputStore'

export const useSearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const setSearchInputRef = useSearchInputStore((state) => state.setSearchInputRef)

  useEffect(() => {
    setSearchInputRef(searchInputRef)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return searchInputRef
}
