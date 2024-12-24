import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useEffect } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import PlaylistSong from '@/features/live/components/playlist-song'

import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { useToast } from '@/hooks/use-toast'

const Playlist = () => {
  const { toast } = useToast()
  const { songs, loadSongs, reorderSongs } = usePlaylistSongs()

  useEffect(() => {
    if (songs.length === 0) {
      const getAllSongs = async () => {
        try {
          const songs = await window.electronAPI.getAllSongsFromPlaylist()
          loadSongs(songs)
        } catch (error) {
          toast({
            variant: 'destructive',
            description: 'A apărut o problemă la accesarea playlistului.'
          })
        }
      }

      getAllSongs()
    }
  }, [songs.length, loadSongs, toast])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = songs.findIndex((item) => item._id === active.id)
      const newIndex = songs.findIndex((item) => item._id === over.id)

      const reorderedSongs = arrayMove(songs, oldIndex, newIndex)

      reorderSongs(reorderedSongs)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={songs.map((song) => song._id)}>
        <ScrollArea className="h-full pr-4 -ml-1">
          <div>
            {songs.length > 0 ? (
              songs.map((song) => (
                <div key={song._id} className="py-2">
                  <PlaylistSong song={song} />
                </div>
              ))
            ) : (
              <div className="absolute text-sm font-semibold -translate-x-1/2 text-stone-400 top-1/2 left-1/2">
                Niciun cântec în playlist
              </div>
            )}
          </div>
        </ScrollArea>
      </SortableContext>
    </DndContext>
  )
}

export default Playlist
