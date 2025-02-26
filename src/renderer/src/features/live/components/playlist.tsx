// import { DndContext } from '@dnd-kit/core'
// import { SortableContext } from '@dnd-kit/sortable'

import { ScrollArea } from '@/components/ui/scroll-area'
import PlaylistSong from '@/features/live/components/playlist-song'

import { usePlaylist } from '@/store/usePlaylist'

const Playlist = () => {
  const { selectedPlaylist } = usePlaylist()

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event

  //   if (over && active.id !== over.id) {
  //     const oldIndex = songs.findIndex((item) => item._id === active.id)
  //     const newIndex = songs.findIndex((item) => item._id === over.id)

  //     const reorderedSongs = arrayMove(songs, oldIndex, newIndex)

  //     reorderSongs(reorderedSongs)
  //   }
  // }

  // TODO: Implement sort with drag and drop

  return (
    <ScrollArea className="h-full pr-4 -ml-1">
      <div>
        {selectedPlaylist && selectedPlaylist.songs.length > 0 ? (
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
  )
}

export default Playlist
