import { useState, useEffect } from 'react'
import { RxSlash } from 'react-icons/rx'

import { ScrollArea } from './ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import Song from '@/components/song'

import { Song as SongType } from '@/types'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { addSongToPlaylist, song } = usePlaylistSongs()

  const debouncedSearch = useDebounce(searchQuery)
  const ref = useSearchInputStore((state) => state.searchInputRef)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

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
    const fetchResults = async () => {
      if (debouncedSearch.trim() === '' || debouncedSearch.length < 3) {
        setSongs([])
        setActiveIndex(null)

        return
      }

      try {
        const songs = await window.electronAPI.onSearchSongsByTitle(debouncedSearch)
        setSongs(songs)
      } catch (error) {
        setError('A apărut o eroare în timpul căutării.')
      }
    }

    fetchResults()
  }, [debouncedSearch])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    console.log('DOOM')
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, songs])

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 mb-3">
        <div className="relative mx-auto max-w-[500px]">
          <Input
            ref={ref}
            className="pr-16 shadow h-11 rounded-xl placeholder:text-neutral-400"
            placeholder="Caută cântări"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div
            className={`absolute p-1 transform -translate-y-1/2 rounded-lg right-2 top-1/2 ${!searchQuery && 'bg-neutral-100'}`}
          >
            {!searchQuery ? (
              <RxSlash className="text-gray-400 pointer-events-none" size={18} />
            ) : (
              <Button
                className="p-0 text-red-500 hover:bg-transparent"
                variant="ghost"
                onClick={() => setSearchQuery('')}
              >
                Șterge
              </Button>
            )}
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow px-3">
        {error ? (
          <p className="text-sm text-center text-red-500">{error}</p>
        ) : (
          <div className="p-1">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <div
                  key={song._id}
                  className={`rounded-lg px-1.5 py-[2px] ${activeIndex === index ? 'ring-2 ring-blue-600' : 'border border-transparent'}`}
                >
                  <Song song={song} />
                </div>
              ))
            ) : debouncedSearch ? (
              <p className="text-center text-neutral-500">
                Niciun rezultat găsit. Încearcă o altă căutare!
              </p>
            ) : null}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default GlobalSearch
