import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import { useToast } from '@/hooks/use-toast'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import PlaylistSong from './playlist-song'

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
          <div className="space-y-2">
            <AnimatePresence>
              {songs.length > 0 ? (
                songs.map((song) => <PlaylistSong song={song} key={song._id} />)
              ) : (
                <div className="absolute text-sm font-semibold -translate-x-1/2 text-stone-400 top-1/2 left-1/2">
                  Niciun cântec în playlist
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </SortableContext>
    </DndContext>
  )
}

export default Playlist
