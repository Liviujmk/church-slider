import { useEffect, useState } from 'react'

import { Playlist } from '@/features/live/components/live-playlist-panel/playlist'
import { SwitchPlaylist } from '@/features/live/components/live-playlist-panel/switch-playlist'
import { CreatePlaylistForm } from './create-playlist-form'
import { DeletePlaylistForm } from './delete-playlist-form'
import { BaseDialog } from '@/components/base-dialog'
import { PlaylistActions } from './playlist-actions'
import { Badge } from '@/components/ui/badge'

import { usePlaylists } from '@/api/use-playlists'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useToast } from '@/hooks/use-toast'
import { usePlaylist } from '@/store/usePlaylist'

export const LivePlaylistPanel = () => {
  const { data: playlists, isError } = usePlaylists()

  const { setSelectedPlaylist, selectedPlaylist } = usePlaylist()
  const { getItem, setItem } = useLocalStorage('selectedPlaylist')
  const { toast } = useToast()

  const [isCreatePlaylistOpen, setCreatePlaylistOpen] = useState(false)
  const [isDeletePlaylistOpen, setDeletePlaylistOpen] = useState(false)

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
        <div className="flex items-center gap-2">
          <h2 className="font-semibold leading-none text-muted-500">
            {playlists && <SwitchPlaylist playlists={playlists} />}
          </h2>
          {selectedPlaylist && selectedPlaylist.songs.length > 0 && (
            <Badge variant="secondary">{selectedPlaylist.songs.length} </Badge>
          )}
        </div>
        <PlaylistActions
          setCreatePlaylistOpen={setCreatePlaylistOpen}
          setDeletePlaylistOpen={setDeletePlaylistOpen}
        />
      </div>
      <div className="flex-1 pl-4 overflow-hidden">
        <Playlist />
      </div>
      <>
        <BaseDialog
          title="Confirmati ștergerea"
          isOpen={isDeletePlaylistOpen}
          setOpen={setDeletePlaylistOpen}
          description="Sunteți sigur că doriți să ștergeți playlistul? Această acțiune nu poate fi anulată."
        >
          <DeletePlaylistForm setOpen={setDeletePlaylistOpen} />
        </BaseDialog>
        <BaseDialog
          title="Creează un nou playlist"
          isOpen={isCreatePlaylistOpen}
          setOpen={setCreatePlaylistOpen}
        >
          <CreatePlaylistForm setOpen={setCreatePlaylistOpen} />
        </BaseDialog>
      </>
    </div>
  )
}
