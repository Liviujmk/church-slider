'use client'

import type React from 'react'

import { useEffect, useState } from 'react'

import { SongsResultList } from './songs-result-list'
import { SearchInput } from '@/features/live/components/search-and-history-panel/search-input'

import { useDebounce } from '@/hooks/use-debounce'
import type { Song as SongType } from '@/types'

export const SearchAndResult = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const debouncedSearch = useDebounce(searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim() === '' || debouncedSearch.length < 3) {
        setSongs([])
        return
      }

      try {
        setPending(true)
        const songs = await window.electronAPI.onSearchSongsByTitle(debouncedSearch)
        setSongs(songs)
        setPending(false)
      } catch (error) {
        setPending(false)
        setError('A apărut o eroare în timpul căutării.')
      }
    }

    fetchResults()
  }, [debouncedSearch])

  const showResults = pending || (debouncedSearch && debouncedSearch.length >= 3)

  return (
    <>
      <div className="px-4 pt-4">
        <SearchInput
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {showResults && (
        <SongsResultList
          debouncedSearch={debouncedSearch}
          songs={songs}
          pending={pending}
          error={error}
        />
      )}
    </>
  )
}
