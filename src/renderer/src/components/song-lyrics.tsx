import { IoEyeSharp } from 'react-icons/io5'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Song } from '@/types'

type SongLyricsProps = {
  song: Song
}

export const SongLyricsTrigger = ({ song }: SongLyricsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#EDEDED] dark:bg-neutral-900 dark:text-neutral-200 p-1 rounded-md">
          <IoEyeSharp />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{song.title}</DialogTitle>
          <DialogDescription>
            <SongLyrics song={song} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export const SongLyrics = ({ song }: SongLyricsProps) => {
  return (
    <ScrollArea className="h-[500px] mt-4">
      {Object.entries(song.slides).map(([key, stanza], index) => (
        <div className="mb-2" key={key}>
          <h3 className="mb-1 font-semibold text-neutral-300">Strofa {index + 1}</h3>
          <div className="pl-4 border-l-2">
            {stanza.map((line, lineIndex) => (
              <p className="mb-2 leading-none" key={lineIndex}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}
