import { SongLyrics } from '@/components/song-lyrics'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Song } from '@/types'

export const PreviewSidesDialog = ({ song }: { song: Song }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <h2 className="max-w-[300px] font-semibold line-clamp-1">{song.title}</h2>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2>{song.title}</h2>
          </DialogTitle>
          <DialogDescription>
            <SongLyrics song={song} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
