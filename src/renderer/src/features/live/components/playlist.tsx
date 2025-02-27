import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { ScrollArea } from '@/components/ui/scroll-area'
import PlaylistSong from '@/features/live/components/playlist-song'

import { usePlaylist } from '@/store/usePlaylist'
import { Song } from '@/types'

async function mutatePlaylist(id: string, reorderedSongs: Song[]) {
  try {
    await window.electronAPI.reorderPlaylist(id, reorderedSongs)
  } catch (error) {
    console.error('Failed to update playlist:', error)
  }
}

const Playlist = () => {
  const { selectedPlaylist, reorderSongs } = usePlaylist()

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!selectedPlaylist) return

    if (over && active.id !== over.id) {
      const oldIndex = selectedPlaylist.songs.findIndex((item) => item._id === active.id)
      const newIndex = selectedPlaylist.songs.findIndex((item) => item._id === over.id)

      const reorderedSongs = arrayMove(selectedPlaylist.songs, oldIndex, newIndex)

      reorderSongs(reorderedSongs)

      await mutatePlaylist(selectedPlaylist._id, reorderedSongs)
    }
  }

  if (!selectedPlaylist) return null

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={selectedPlaylist.songs.map((song) => song._id)}>
        <ScrollArea className="h-full pr-4 -ml-1">
          <div>
            {selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song) => (
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
