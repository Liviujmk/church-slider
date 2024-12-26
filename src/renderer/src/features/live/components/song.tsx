import { MdPlaylistAdd } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Song as SongType } from '@/types'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'

const Song = ({ song }: { song: SongType }) => {
  const { songs, addSongToPlaylist } = usePlaylistSongs()

  const isSongInPlaylist = songs.some((existingSong) => existingSong._id === song._id)

  const handleUpdate = async (docId: string) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(docId)

      if (response.success) {
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
          <div className="max-w-[300px] font-semibold line-clamp-1 text-sm">{song.title}</div>
          <Badge
            variant="secondary"
            className="rounded-md bg-[#F1F1F1] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
          >
            {song.lyricsCount} strofe
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 text-nowrap">
        {!isSongInPlaylist ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="p-1 cursor-pointer size-8"
                  onClick={() => {
                    if (song._id) handleUpdate(song._id)
                  }}
                >
                  <MdPlaylistAdd className="text-blue-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adaugă în playlistul live</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-sm font-semibold text-blue-600 select-none">Adăugat</span>
        )}
      </div>
    </div>
  )
}

export default Song
