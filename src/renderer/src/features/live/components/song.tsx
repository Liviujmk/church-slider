import { useSongPreviewStore } from '@/store/useSongPreviewDialog'

import { AddInAPlaylist } from '@/components/add-in-a-playlist'
import { Badge } from '@/components/ui/badge'

import { Song as SongType } from '@/types'

const Song = ({ song }: { song: SongType }) => {
  const { setSong } = useSongPreviewStore()

  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2">
        <div>
          <h2
            onClick={() => {
              setSong(song)
            }}
            className="max-w-[300px] font-semibold line-clamp-1"
          >
            {song.title}
          </h2>
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
