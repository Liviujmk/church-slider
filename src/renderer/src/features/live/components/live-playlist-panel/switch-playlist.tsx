import { Playlist } from '@/api/use-playlists'
import { usePlaylist } from '@/store/usePlaylist'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useLocalStorage } from '@/hooks/use-local-storage'

export const SwitchPlaylist = ({ playlists }: { playlists: Playlist[] }) => {
  const { setItem, getItem } = useLocalStorage('selectedPlaylist')

  const savedPlaylistId = getItem() || 'playlist-live'

  const { setSelectedPlaylist } = usePlaylist()

  const handleSelectPlaylist = (id: string) => {
    const selected = playlists?.find((p) => p._id === id)

    if (selected) {
      setSelectedPlaylist(selected)
      setItem(id)
    } else {
      if (playlists) {
        setItem(playlists[0]._id)
      }
    }
  }

  return (
    <Select onValueChange={handleSelectPlaylist} value={savedPlaylistId}>
      <SelectTrigger className="px-0 py-0 text-base border-none shadow-none focus:ring-0">
        <SelectValue placeholder="Selectează un playlist" />
      </SelectTrigger>
      <SelectContent>
        {playlists?.map((playlist) => (
          <SelectItem key={playlist._id} value={playlist._id}>
            {playlist.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
