import { Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAddSongToPlaylist } from '@/api/use-add-song-to-playlist'
import { usePlaylists } from '@/api/use-playlists'
import { Song } from '@/types'
import { cn } from '@/lib/utils'

export const AddInAPlaylist = ({ song }: { song: Song }) => {
  const { data: playlists } = usePlaylists()

  const { mutate } = useAddSongToPlaylist()

  if (!playlists) return

  const isInPlaylist = (playlistId: string) => {
    const playlist = playlists?.find((p) => p._id === playlistId)
    return playlist?.songs.some((s: Song) => s._id === song._id) || false
  }

  const handleAddToPlaylist = (id: string) => {
    mutate({ playlistId: id, song })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Plus className={cn('w-4 h-4')} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="start">
        <DropdownMenuLabel>Adaugă într-un playlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {playlists?.map((playlist) => (
          <DropdownMenuItem
            disabled={isInPlaylist(playlist._id)}
            className="cursor-pointer"
            key={playlist._id}
            onClick={() => handleAddToPlaylist(playlist._id)}
          >
            {playlist.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
