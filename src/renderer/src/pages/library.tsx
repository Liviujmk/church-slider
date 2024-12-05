import { useEffect, useRef, useState } from 'react'

import { PiMusicNoteFill } from 'react-icons/pi'
import { IoEyeSharp } from 'react-icons/io5'
import { AiOutlinePlus } from 'react-icons/ai'

import { removeDiacritics } from '@/lib/utils'
import FilterBar from '@/components/filter-bar'
import SearchPanel from '@/components/search-panel'

import { Lyric } from '@/types'

const LibraryPage = () => {
  const [songs, setSongs] = useState<Lyric[]>([])
  const [filter, setFilter] = useState<string>('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const searchInputRef = useRef<HTMLInputElement>(null)

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
        const songs = await window.electronAPI.sendAllSongs()
        if (songs) setSongs(songs)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    getAllSongs()
  }, [])

  const handleFileRead = async (song: Lyric): Promise<void> => {
    try {
      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  const filteredSongs = songs.filter((song) =>
    removeDiacritics(song.title.toLowerCase()).includes(removeDiacritics(filter.toLowerCase()))
  )

  return (
    <div className="max-w-screen-xl p-4 mx-auto">
      <SearchPanel onChange={(event) => setFilter(event.filter)} ref={searchInputRef} />
      {songs.length > 0 && (
        <div className="my-4">
          <FilterBar onChange={(layout) => setLayout(layout)} layout={layout}>
            <h2 className="text-xl font-semibold tracking-tight">Toate Cântările</h2>
          </FilterBar>
        </div>
      )}
      {layout === 'grid' ? (
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4 justify-center">
          {filteredSongs?.map((song, index) => (
            <li key={index} className="text-neutral-500 max-w-[308px]">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full h-[124px] bg-[#F7F7F7] rounded-lg">
                  <PiMusicNoteFill size={56} className="text-neutral-400" />
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <div className="text-xs">{Object.keys(song.slides).length} strofe</div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#EDEDED] p-1 rounded-md">
                      <IoEyeSharp />
                    </button>
                    <button
                      className="bg-[#EDEDED] p-1 rounded-md"
                      onClick={() => handleFileRead(song)}
                    >
                      <AiOutlinePlus className="text-blue-500" />
                    </button>
                  </div>
                </div>
                <div className="w-full text-sm font-medium text-neutral-600">
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
                <div className="w-full text-sm font-medium text-neutral-600 max-w-[300px]">
                  {song.title.replace('.pptx', '')}
                </div>
                <div className="text-xs">{Object.keys(song.slides).length} strofe</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#EDEDED] p-1 rounded-md" onClick={() => console.log('open')}>
                  <IoEyeSharp />
                </button>
                <button
                  className="bg-[#EDEDED] p-1 rounded-md"
                  onClick={() => handleFileRead(song)}
                >
                  <AiOutlinePlus className="text-blue-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LibraryPage
