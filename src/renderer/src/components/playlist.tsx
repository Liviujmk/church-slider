import { useEffect } from 'react'

// import { RxDragHandleDots2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa6'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { LyricDB } from '@/types'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const Playlist = () => {
  const { songs, loadSongs, deleteSongFromPlaylist } = usePlaylistSongs()
  const { song: activeSong, add } = useActiveSongPresentation()

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songs = await window.electronAPI.getAllSongsFromPlaylist()
        loadSongs(songs)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    getAllSongs()
  }, [loadSongs])

  const handlePresentation = async (song: LyricDB) => {
    try {
      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song
      })

      add(song)
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-2">
        {songs.map((song) => (
          <div key={song._id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div>
                <div className="max-w-[248px] font-semibold line-clamp-1">{song.title}</div>
                <Badge variant="secondary" className="rounded-md bg-[#F1F1F1] text-neutral-600">
                  {Object.keys(song.slides).length} strofe
                </Badge>
              </div>
            </div>
            {song._id !== activeSong?._id ? (
              <div className="flex items-center gap-1 text-nowrap">
                <Button
                  size="icon"
                  className="bg-[#F1F1F1] size-6 hover:bg-neutral-200"
                  onClick={() => handlePresentation(song)}
                >
                  <AiOutlinePlus className="text-blue-500" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-6"
                  onClick={() => {
                    window.electronAPI.deleteASongFromPlaylist(song._id)
                    deleteSongFromPlaylist(song._id)
                  }}
                >
                  <FaTrash className="text-red-500" />
                </Button>
              </div>
            ) : (
              <span className="pr-3 text-sm font-semibold text-green-500">Live</span>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default Playlist
