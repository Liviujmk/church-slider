import { useEffect, useRef, useState } from 'react'
import { PiMusicNoteFill } from 'react-icons/pi'
import { IoEyeSharp } from 'react-icons/io5'
import { AiOutlinePlus } from 'react-icons/ai'

import FilterBar from '@/features/library/components/filter-bar'
import SearchPanel from '@/features/library/components/search-panel'
import { useToast } from '@/hooks/use-toast'
import { removeDiacritics } from '@/lib/utils'
import { Song as SongType } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import CustomPagination from '@/features/library/components/pagination'

type CustomSong = {
  data: SongType[]
  totalCount: number
}

const LibraryPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 20

  const [songs, setSongs] = useState<CustomSong>()
  const [filter, setFilter] = useState<string>('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const { toast } = useToast()

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
      console.log(currentPage)
      try {
        const songs = await window.electronAPI.sendAllSongs(currentPage, pageSize)
        console.log({ songs })
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

  const handleUpdate = async (docId: string) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(docId)

      if (response.success) {
        toast({
          description: 'Playlistul live a fost actualizat cu succes!'
        })
      } else {
        toast({
          variant: 'destructive',
          description:
            'A apărut o problemă la actualizarea playlistului. Te rugăm să încerci din nou.'
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'A apărut o problemă la actualizarea playlistului. Te rugăm să încerci din nou.'
      })
    }
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [filter])

  return (
    <ScrollArea className="h-[calc(100vh-1.75rem)] max-w-screen-xl p-4 mx-auto">
      <SearchPanel onChange={(event) => setFilter(event.filter)} ref={searchInputRef} />
      {songs && songs?.data.length > 0 && (
        <div className="my-4">
          <FilterBar onChange={(layout) => setLayout(layout)} layout={layout}>
            <h2 className="text-xl font-semibold">Descoperă Melodiile</h2>
          </FilterBar>
        </div>
      )}
      {layout === 'grid' ? (
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4 justify-center">
          {filteredSongs?.map((song, index) => (
            <li key={index} className="text-neutral-500 max-w-[308px]">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full h-[124px] bg-[#F7F7F7] dark:bg-neutral-900 rounded-lg">
                  <PiMusicNoteFill size={56} className="text-neutral-400" />
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <div className="text-xs">{Object.keys(song.slides).length} strofe</div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#EDEDED] dark:bg-neutral-900 dark:text-neutral-200 p-1 rounded-md">
                      <IoEyeSharp />
                    </button>
                    <button
                      className="bg-[#EDEDED] dark:bg-neutral-900 p-1 rounded-md"
                      onClick={() => {
                        if (song._id) handleUpdate(song._id)
                      }}
                    >
                      <AiOutlinePlus className="text-blue-500" />
                    </button>
                  </div>
                </div>
                <div className="w-full text-sm font-medium text-neutral-600 dark:text-neutral-200 line-clamp-1">
                  {song.title.replace('.pptx', '')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSongs?.map((song, index) => (
            <li key={index} className="flex items-start justify-between text-neutral-500">
              <div className="w-full">
                <div className="w-full dark:text-neutral-200 text-sm font-medium text-neutral-600 max-w-[300px]">
                  {song.title.replace('.pptx', '')}
                </div>
                <div className="text-xs">{Object.keys(song.slides).length} strofe</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-[#EDEDED] dark:bg-neutral-900 dark:text-neutral-200 p-1 rounded-md"
                  onClick={() => console.log('open')}
                >
                  <IoEyeSharp />
                </button>
                <button
                  className="bg-[#EDEDED] dark:bg-neutral-900 p-1 rounded-md"
                  onClick={() => {
                    if (song._id) handleUpdate(song._id)
                  }}
                >
                  <AiOutlinePlus className="text-blue-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {songs && songs.data.length > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </ScrollArea>
  )
}

export default LibraryPage
