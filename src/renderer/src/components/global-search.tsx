import { RxSlash } from 'react-icons/rx'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Song as SongType } from '@/types'
import Song from './song'
import { ScrollArea } from './ui/scroll-area'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import { Button } from './ui/button'

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery)
  const [songs, setSongs] = useState<SongType[]>([])
  const [error, setError] = useState<string | null>(null)
  const ref = useSearchInputStore((state) => state.searchInputRef)

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
        const songs = await window.electronAPI.onSearchSongsByTitle(debouncedSearch)
        setSongs(songs)
      } catch (error) {
        setError('A apărut o eroare în timpul căutării.')
      }
    }

    fetchResults()
  }, [debouncedSearch])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
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

      <ScrollArea className="flex-grow px-4">
        {error ? (
          <p className="text-sm text-center text-red-500">{error}</p>
        ) : songs.length > 0 ? (
          songs.map((song) => <Song key={song._id} song={song} />)
        ) : debouncedSearch ? (
          <p className="text-center">Niciun rezultat găsit. Încearcă o altă căutare!</p>
        ) : null}
      </ScrollArea>
    </div>
  )
}

export default GlobalSearch
