import { memo, useEffect, useState } from 'react'

import CustomSearchInput from '@/components/custom-search-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Song from '@/features/live/components/song'
import { useDebounce } from '@/hooks/use-debounce'
import { Song as SongType } from '@/types'
import SuggestionsSongs from './suggestions-songs'
import { LoadingSkeleton } from './loading-skeleton'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { usePlaylist } from '@/store/usePlaylist'

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestionSongs, setSuggestionSongs] = useState<SongType[] | null>(null)
  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { lastSong } = usePlaylist()
  const [playback] = useState<SongType | null>(lastSong)

  const debouncedSearch = useDebounce(searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const fetchSuggestionsSongs = async () => {
      const result = await window.electronAPI.getSuggestionsSongs()
      setSuggestionSongs(result)
    }

    fetchSuggestionsSongs()
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim() === '' || debouncedSearch.length < 3) {
        setSongs([])
        setActiveIndex(null)

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

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 mb-3">
        <CustomSearchInput
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <ScrollArea className="flex-grow px-3">
        <div className="p-1">
          {error ? (
            <p className="text-sm text-center text-red-500">{error}</p>
          ) : pending && debouncedSearch ? (
            <div className="mt-2 space-y-4">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <div
                key={song._id}
                className={`rounded-xl px-1.5 py-[2px] ${
                  activeIndex === index ? 'ring-2 ring-blue-600' : 'border border-transparent'
                }`}
              >
                <Song song={song} />
              </div>
            ))
          ) : debouncedSearch && !pending ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-center text-gray-500">
                Nu am găsit niciun rezultat pentru căutarea ta.
              </p>
              <Button asChild className="bg-blue-600 rounded-xl hover:bg-blue-500" size="sm">
                <Link to="/create">Creează</Link>
              </Button>
            </div>
          ) : (
            playback && (
              <SuggestionsSongs
                activeIndex={activeIndex}
                playback={playback}
                suggestion={suggestionSongs}
              />
            )
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default memo(GlobalSearch)
