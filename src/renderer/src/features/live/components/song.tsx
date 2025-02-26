import { AddInAPlaylist } from '@/components/add-in-a-playlist'
import { PreviewSidesDialog } from './preview-slides-dialog'
import { Badge } from '@/components/ui/badge'
import { Song as SongType } from '@/types'

const Song = ({ song }: { song: SongType }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2">
        <div>
          <PreviewSidesDialog song={song} />
          <Badge
            variant="secondary"
            className="rounded-md bg-[#F1F1F1] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
          >
            {song.lyricsCount} strofe
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 text-nowrap">
        <AddInAPlaylist song={song} />
      </div>
    </div>
  )
}

export default Song
