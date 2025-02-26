import { CreatePlaylistDialog } from '@/features/live/components/create-playlist-dialog'
import { SwitchPlaylist } from '@/features/live/components/switch-playlist'
import Playlist from '@/features/live/components/playlist'
import { usePlaylists } from '@/api/use-playlists'
import { useToast } from '@/hooks/use-toast'
import { usePlaylist } from '@/store/usePlaylist'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useEffect } from 'react'

export const LivePlaylistPanel = () => {
  const { data: playlists, isError } = usePlaylists()
  const { setSelectedPlaylist } = usePlaylist()
  const { getItem, setItem } = useLocalStorage('selectedPlaylist')
  const { toast } = useToast()

  useEffect(() => {
    if (playlists && playlists.length > 0) {
      const savedPlaylistId = getItem()

      const foundPlaylist = playlists.find((p) => p._id === savedPlaylistId)
      if (foundPlaylist) {
        setSelectedPlaylist(foundPlaylist)
      } else {
        setSelectedPlaylist(playlists[0])
        setItem(playlists[0]._id)
      }
    }
  }, [playlists])

  if (isError) {
    toast({
      title: 'Failed to load playlists',
      description: 'An error occurred while retrieving playlists. Please try again.',
      variant: 'destructive'
    })
  }

  return (
    <div className="flex flex-col h-full select-none">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold leading-none text-muted-500">
          {playlists ? <SwitchPlaylist playlists={playlists} /> : 'Loading'}
        </h2>
        <CreatePlaylistDialog />
      </div>
      <div className="flex-1 pl-4 overflow-hidden">
        <Playlist />
      </div>
    </div>
  )
}
