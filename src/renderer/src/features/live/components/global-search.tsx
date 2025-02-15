import { useEffect, useState } from 'react'

import CustomSearchInput from '@/components/custom-search-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Song from '@/features/live/components/song'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { Song as SongType } from '@/types'
import SuggestionsSongs from './suggestions-songs'
import { LoadingSkeleton } from './loading-sckeleton'

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestionSongs, setSuggestionSongs] = useState<SongType[] | null>(null)
  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { addSongToPlaylist, song } = usePlaylistSongs()
  const { getItem } = useLocalStorage('playback')
  const [playback, setPlayback] = useState<SongType | undefined>(() => getItem())

  useEffect(() => {
    const updatedPlayback = getItem()
    setPlayback(updatedPlayback)
  }, [getItem])

  const debouncedSearch = useDebounce(searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {}, [song])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!songs.length) return

    switch (event.key) {
      case 'ArrowDown':
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        )
        break
      case 'ArrowUp':
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0 ? songs.length - 1 : prevIndex - 1
        )
        break
      case 'Enter':
        if (activeIndex !== null) {
          const songId = songs[activeIndex]._id
          const activeSong = song(songId)

          if (!activeSong) handleAddToLivePlaylist(songs[activeIndex])
        }
        break
      default:
        break
    }
  }

  const handleAddToLivePlaylist = async (song: SongType) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(song._id)

      if (response.success) {
        addSongToPlaylist(song)
      } else {
        console.error('Error updating document:', response.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, songs])

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
            <p className="text-sm text-center text-gray-500">Niciun rezultat găsit.</p>
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

export default GlobalSearch
