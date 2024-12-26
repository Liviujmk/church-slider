import { useEffect, useState } from 'react'
import { PiMusicNotesFill } from 'react-icons/pi'
import { ImLast } from 'react-icons/im'
import { RxSlash } from 'react-icons/rx'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Song from '@/features/live/components/song'

import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import { Song as SongType } from '@/types'

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestionSongs, setSuggestionSongs] = useState<SongType[] | null>(null)
  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { addSongToPlaylist, song } = usePlaylistSongs()
  const { getItem } = useLocalStorage('playback')
  const [playback, setPlayback] = useState<SongType | undefined>(() => getItem())

  useEffect(() => {
    const updatedPlayback = getItem()
    setPlayback(updatedPlayback)
  }, [getItem])

  const debouncedSearch = useDebounce(searchQuery)
  const ref = useSearchInputStore((state) => state.searchInputRef)

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
            className="pr-16 shadow h-11 rounded-xl placeholder:text-neutral-400 placeholder:dark:text-neutral-700"
            placeholder="Caută cântări"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div
            className={`absolute p-1 transform -translate-y-1/2 rounded-lg right-2 top-1/2 ${!searchQuery && 'bg-neutral-100 dark:bg-neutral-900'}`}
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
            ) : (
              playback && (
                <div className="mt-1">
                  <div>
                    <div className="flex items-center gap-2 pb-2 mb-3">
                      <ImLast className="text-neutral-600 dark:text-neutral-400 size-[18px]" />
                      <h2 className="font-semibold leading-none dark:text-neutral-400 text-neutral-600">
                        Ultima redare
                      </h2>
                    </div>
                    <div className="pb-2 -mt-1 border-b">
                      <Song song={playback} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 pb-2 mt-3 mb-3">
                      <PiMusicNotesFill className="text-neutral-600 dark:text-neutral-400 size-5" />
                      <h2 className="font-semibold leading-none dark:text-neutral-400 text-neutral-600">
                        Sugestii
                      </h2>
                    </div>
                    <div className="pb-2 -mt-2">
                      {suggestionSongs &&
                        suggestionSongs.map((song, index) => (
                          <div
                            key={song._id}
                            className={`rounded-lg px-1.5 py-[2px] ${activeIndex === index ? 'ring-2 ring-blue-600' : 'border border-transparent'}`}
                          >
                            <Song song={song} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default GlobalSearch
