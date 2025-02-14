import { FaFileImport } from 'react-icons/fa6'
import { ImSpinner2 } from 'react-icons/im'
import { useState } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

import { SimplySong } from '@/types'

export const ImportSongs = () => {
  const [songs, setSongs] = useState<SimplySong[]>([])
  const [pending, setPending] = useState(false)

  const avaibleSongs = songs.length > 0

  const handleOpenDialog = async () => {
    setPending(true)
    const files = await window.electronAPI.openMultipleFiles()

    try {
      if (files?.success && files.data.length > 0) {
        setSongs((prevSongs) => [...prevSongs, ...files.data])
      }
      setPending(false)
    } catch {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 max-w-screen-lg mx-auto overflow-hidden">
      <div
        className={`mb-4 flex flex-col items-center justify-center ${avaibleSongs ? 'py-8 border rounded border-dashed' : 'h-full'} gap-2`}
      >
        <div className="pb-2 text-center">
          <h2 className="font-semibold">Importă direct PowerPoint-uri existente</h2>
          <p className="text-sm text-neutral-500">Doar fișiere .pptx sunt acceptate.</p>
        </div>
        {pending ? (
          <ImSpinner2 className="animate-spin size-5" />
        ) : (
          <Button
            className="flex items-center bg-[#006BE9] dark:text-white dark:hover:bg-blue-700 rounded-xl"
            onClick={handleOpenDialog}
          >
            <FaFileImport />{' '}
            <span className="leading-none">{avaibleSongs ? 'Importă și mai mult' : 'Importă'}</span>
          </Button>
        )}
      </div>
      {avaibleSongs && (
        <ScrollArea className="flex-grow pr-3">
          <p className="pb-2 text-sm text-neutral-500">{songs.length} cântări importate</p>
          <div className="gap-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
            {songs.map((song, index) => (
              <div
                key={song.title + index}
                className="p-2 rounded bg-neutral-100 dark:bg-neutral-900"
              >
                <p className="text-sm font-semibold line-clamp-1">{song.title}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
