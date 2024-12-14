import { useState, useEffect } from 'react'
import { RxSlash } from 'react-icons/rx'
import { motion, AnimatePresence } from 'framer-motion'

import { ScrollArea } from './ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import Song from '@/components/song'

import { Song as SongType } from '@/types'
import { useDebounce } from '@/hooks/use-debounce'
import { useSearchInputStore } from '@/store/useSearchInputStore'

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
      <div className="px-4 pt-4 mb-4">
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
      <ScrollArea className="flex-grow px-4">
        {error ? (
          <p className="text-sm text-center text-red-500">{error}</p>
        ) : (
          <AnimatePresence mode="wait">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <motion.div
                  key={song._id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.05,
                    ease: 'easeOut'
                  }}
                >
                  <Song song={song} />
                </motion.div>
              ))
            ) : debouncedSearch ? (
              <motion.p
                className="text-center text-neutral-500"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.15, delay: 0.05, ease: 'easeOut' }}
              >
                Niciun rezultat găsit. Încearcă o altă căutare!
              </motion.p>
            ) : null}
          </AnimatePresence>
        )}
      </ScrollArea>
    </div>
  )
}

export default GlobalSearch
