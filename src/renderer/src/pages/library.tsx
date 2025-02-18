import { useEffect, useRef, useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { LayoutBar } from '@/features/library/components/layout-bar'
import GridLayout from '@/features/library/components/grid-layout'
import ListLayout from '@/features/library/components/list-layout'
import CustomPagination from '@/features/library/components/pagination'
import SearchPanel from '@/features/library/components/search-panel'
import { removeDiacritics } from '@/lib/utils'
import { Song as SongType } from '@/types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useLocalStorage } from '@/hooks/use-local-storage'

type CustomSong = {
  data: SongType[]
  totalCount: number
}

const LibraryPage = () => {
  const { getItem } = useLocalStorage('isCompact')

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [songs, setSongs] = useState<CustomSong>()
  const [filter, setFilter] = useState<string>('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [pageSize, setPageSize] = useState(20)
  const [isCompact, setIsCompact] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

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

    const compact = getItem()
    if (compact) setIsCompact(compact)
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
            <LayoutBar
              setIsCompact={setIsCompact}
              isCompact={isCompact}
              onChange={(layout) => setLayout(layout)}
              layout={layout}
            >
              <h2 className="text-xl font-semibold">Descoperă Melodiile</h2>
            </LayoutBar>
          </div>
          {layout === 'grid' ? (
            <GridLayout filteredSongs={filteredSongs} />
          ) : (
            <ListLayout filteredSongs={filteredSongs} isCompact={isCompact} />
          )}
          {filteredSongs && filteredSongs?.length > 0 && (
            <div className="flex mt-6">
              <div className="flex items-center flex-1 gap-2">
                <span>Rânduri pe pagină</span>
                <Select
                  defaultValue="20"
                  onValueChange={(value) => {
                    setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="20" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
              <div className="flex-1" />
            </div>
          )}
        </>
      )}
    </ScrollArea>
  )
}

export default LibraryPage
