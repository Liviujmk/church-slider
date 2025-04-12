import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

import { PlaylistSong } from '@/features/live/components/live-playlist-panel/playlist-song'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

import { usePlaylist } from '@/store/usePlaylist'
import { Song } from '@/types'

async function mutatePlaylist(id: string, reorderedSongs: Song[]) {
  try {
    await window.electronAPI.reorderPlaylist(id, reorderedSongs)
  } catch (error) {
    console.error('Failed to update playlist:', error)
  }
}

export const Playlist = ({ searchQuery = '' }: { searchQuery: string }) => {
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

  const filteredSongs = searchQuery.trim()
    ? selectedPlaylist.songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedPlaylist.songs

  const hasNoSongs = selectedPlaylist.songs.length === 0
  const hasNoResults = selectedPlaylist.songs.length > 0 && filteredSongs.length === 0

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={filteredSongs.map((song) => song._id)}>
        <ScrollArea className="h-full pr-4 -ml-1">
          <div>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <div key={song._id} className="py-2">
                  <PlaylistSong song={song} />
                </div>
              ))
            ) : hasNoSongs ? (
              <EmptyPlaylist />
            ) : hasNoResults ? (
              <NoSearchResults searchQuery={searchQuery} />
            ) : null}
          </div>
        </ScrollArea>
      </SortableContext>
    </DndContext>
  )
}

function EmptyPlaylist() {
  return (
    <div className="absolute w-full pr-16 -mt-16 space-y-4 -translate-x-1/2 pl-14 top-1/2 left-1/2">
      <p className="text-sm text-center text-stone-400">
        Nu ai adăugat încă nici o strofă. Vizitează librăria pentru a adăuga cântări și a le
        organiza după preferințele tale.
      </p>
      <div className="flex justify-center">
        <Button asChild className="text-white bg-blue-600 rounded-xl hover:bg-blue-500" size="sm">
          <Link to="/library">Adaugă cântări</Link>
        </Button>
      </div>
    </div>
  )
}

function NoSearchResults({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="absolute w-full pr-16 -mt-16 space-y-4 -translate-x-1/2 pl-14 top-1/2 left-1/2">
      <div className="flex flex-col items-center justify-center gap-2">
        <Search className="w-10 h-10 text-stone-300" />
        <p className="text-sm text-center text-stone-400">
          Nu am găsit nicio cântare care să conțină &quot;{searchQuery}&quot;
        </p>
      </div>
    </div>
  )
}
