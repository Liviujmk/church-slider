import { useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { FaFileImport } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SimplySong } from '@/types'

const CreatePage = () => {
  const [songs, setSongs] = useState<SimplySong[]>([])
  const avaibleSongs = songs.length > 0

  const handleOpenDialog = async () => {
    const files = await window.electronAPI.openMultipleFiles()

    if (files?.success && files.data.length > 0) {
      setSongs((prevSongs) => [...prevSongs, ...files.data])
    }
  }

  return (
    <div className="h-full p-4">
      <div className="flex h-full gap-4">
        <div className="w-[360px] space-y-2 flex flex-col">
          <h2 className="font-semibold">Scrie o cântare</h2>
          <Input placeholder="Titlul..." />
          <Textarea
            className="flex-1 resize-none"
            placeholder="Scrie sau lipește strofele aici..."
          />
          <div className="flex justify-between">
            <GrPowerReset />
            <Button className="bg-[#006BE9] dark:hover:bg-blue-700 dark:text-white rounded-xl">
              Creează
            </Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 max-w-screen-lg mx-auto overflow-hidden">
          <div
            className={`mb-4 flex flex-col items-center justify-center ${avaibleSongs ? 'py-8 border rounded border-dashed' : 'h-full'} gap-2`}
          >
            <div className="pb-2 text-center">
              <h2 className="font-semibold">Importă direct PowerPoint-uri existente</h2>
              <p className="text-sm text-neutral-500">Doar fișiere .pptx sunt acceptate.</p>
            </div>
            <Button
              className="flex items-center bg-[#006BE9] dark:text-white dark:hover:bg-blue-700 rounded-xl"
              onClick={handleOpenDialog}
            >
              <FaFileImport />{' '}
              <span className="leading-none">
                {avaibleSongs ? 'Importă și mai mult' : 'Importă'}
              </span>
            </Button>
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
      </div>
    </div>
  )
}

export default CreatePage
