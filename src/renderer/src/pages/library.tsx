import { useEffect, useRef, useState } from 'react'
import { PiMusicNoteFill } from 'react-icons/pi'
import { IoEyeSharp } from 'react-icons/io5'
import { AiOutlinePlus } from 'react-icons/ai'

import { Button } from '@/components/ui/button'

import { removeDiacritics } from '../lib/utils'
import FilterBar from '../components/filter-bar'
import SearchPanel from '@/components/search-panel'

export interface Lyric {
  title: string
  slides: Slides
}

export interface Slides {
  [key: string]: string[]
}

const LibraryPage = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [folderPath, setFolderPath] = useState<string | null>(null)
  const [files, setFiles] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchFiles = async (): Promise<void> => {
      if (!folderPath) return

      try {
        const fileList = await window.electronAPI.readFilesFromDirectory(folderPath)

        setFiles(fileList)
      } catch (err) {
        setError('Eroare la citirea fișierelor')
      }
    }

    fetchFiles()
  }, [folderPath])

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

  const handleFileRead = async (filePath: string): Promise<void> => {
    try {
      const content = await window.electronAPI.readFile(`${folderPath}\\${filePath}`)

      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: content
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  const handleOpenFileSystem = async (): Promise<void> => {
    const result = await window.electronAPI.openDialog()

    setFolderPath(result.filePaths[0])
  }

  const [filter, setFilter] = useState<string>('')

  const filteredFiles = files.filter((item) =>
    removeDiacritics(item.toLowerCase()).includes(removeDiacritics(filter.toLowerCase()))
  )

  return (
    <div className="max-w-screen-xl p-4 mx-auto">
      <SearchPanel onChange={(event) => setFilter(event.filter)} ref={searchInputRef} />
      {files.length === 0 && (
        <div className="flex flex-col items-center mt-10">
          <Button
            onClick={handleOpenFileSystem}
            className="px-8 rounded-full hover:ring-2 hover:ring-offset-2"
          >
            Open
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      {files.length > 0 && (
        <div className="my-4">
          <FilterBar onChange={(layout) => setLayout(layout)} layout={layout}>
            <h2 className="text-xl font-semibold tracking-tight">Toate Cântările</h2>
          </FilterBar>
        </div>
      )}
      {layout === 'grid' ? (
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4 justify-center">
          {filteredFiles?.map((file, index) => (
            <li key={index} className="text-neutral-500 max-w-[308px]">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full h-[124px] bg-[#F7F7F7] rounded-lg">
                  <PiMusicNoteFill size={56} className="text-neutral-400" />
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <div className="text-xs">4 strofe</div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#EDEDED] p-1 rounded-md">
                      <IoEyeSharp />
                    </button>
                    <button
                      className="bg-[#EDEDED] p-1 rounded-md"
                      onClick={() => handleFileRead(file)}
                    >
                      <AiOutlinePlus className="text-blue-500" />
                    </button>
                  </div>
                </div>
                <div className="w-full text-sm font-medium text-neutral-600">
                  {file.replace('.pptx', '')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFiles?.map((file, index) => (
            <li key={index} className="flex items-start justify-between text-neutral-500">
              <div className="w-full">
                <div className="w-full text-sm font-medium text-neutral-600 max-w-[300px]">
                  {file.replace('.pptx', '')}
                </div>
                <div className="text-xs">4 strofe</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-[#EDEDED] p-1 rounded-md" onClick={() => console.log('open')}>
                  <IoEyeSharp />
                </button>
                <button
                  className="bg-[#EDEDED] p-1 rounded-md"
                  onClick={() => handleFileRead(file)}
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
