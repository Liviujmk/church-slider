import { LyricDB } from '@/types'
import { Button } from './ui/button'
import { AiOutlinePlus } from 'react-icons/ai'
import { Badge } from './ui/badge'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'

type SongProps = {
  song: LyricDB
}

const Song = ({ song }: SongProps) => {
  const { addSongToPlaylist } = usePlaylistSongs()

  const handleUpdate = async (docId: string) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(docId)

      if (response.success) {
        console.log('Document updated successfully!')
        addSongToPlaylist(song)
      } else {
        console.error('Error updating document:', response.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      <div className="flex items-center gap-2">
        <div>
          <div className="max-w-[248px] font-semibold line-clamp-1">{song.title}</div>
          <Badge variant="secondary" className="rounded-md bg-[#F1F1F1] text-neutral-600">
            {Object.keys(song.slides).length} strofe
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 text-nowrap">
        <Button
          size="icon"
          className="bg-[#F1F1F1] size-6 hover:bg-neutral-200"
          onClick={() => {
            if (song._id) handleUpdate(song._id)
          }}
        >
          <AiOutlinePlus className="text-blue-500" />
        </Button>
      </div>
    </div>
  )
}

export default Song
