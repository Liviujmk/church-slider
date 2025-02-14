import { useEffect, useRef, useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import FilterBar from '@/features/library/components/filter-bar'
import GridLayout from '@/features/library/components/grid-layout'
import ListLayout from '@/features/library/components/list-layout'
import CustomPagination from '@/features/library/components/pagination'
import SearchPanel from '@/features/library/components/search-panel'
import { removeDiacritics } from '@/lib/utils'
import { Song as SongType } from '@/types'

type CustomSong = {
  data: SongType[]
  totalCount: number
}

const LibraryPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [songs, setSongs] = useState<CustomSong>()
  const [filter, setFilter] = useState<string>('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const searchInputRef = useRef<HTMLInputElement>(null)
  const pageSize = 20

  useEffect(() => {
    const savedLayout = localStorage.getItem('layout') as 'grid' | 'list' | null
    if (savedLayout) {
      setLayout(savedLayout)
    }
  }, [])

  useEffect(() => {
    if (layout) {
      localStorage.setItem('layout', layout)
    }
  }, [layout])

  useEffect(() => {
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

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songs = await window.electronAPI.sendAllSongs(currentPage, pageSize)
        if (songs) {
          setSongs(songs)
          setTotalPages(Math.ceil(songs.totalCount / pageSize))
        }
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    getAllSongs()
  }, [currentPage, pageSize])

  const filteredSongs =
    songs?.data &&
    songs.data.filter(
      (song) =>
        song?.title &&
        removeDiacritics(song.title.toLowerCase()).includes(removeDiacritics(filter.toLowerCase()))
    )

  useEffect(() => {
    setCurrentPage(0)
  }, [filter])

  return (
    <ScrollArea className="h-[calc(100vh-1.75rem)] max-w-screen-xl p-4 mx-auto">
      <SearchPanel onChange={(event) => setFilter(event.filter)} ref={searchInputRef} />
      {songs && songs?.data.length > 0 && (
        <>
          <div className="my-6">
            <FilterBar onChange={(layout) => setLayout(layout)} layout={layout}>
              <h2 className="text-xl font-semibold">Descoperă Melodiile</h2>
            </FilterBar>
          </div>
          {layout === 'grid' ? (
            <GridLayout filteredSongs={filteredSongs} />
          ) : (
            <ListLayout filteredSongs={filteredSongs} />
          )}
          {filteredSongs && filteredSongs?.length > 0 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </ScrollArea>
  )
}

export default LibraryPage
