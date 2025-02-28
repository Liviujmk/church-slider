import { CirclePlus, MoreVertical, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import Playlist from '@/features/live/components/playlist'
import { SwitchPlaylist } from '@/features/live/components/switch-playlist'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DeletePlaylistForm } from './delete-playlist-form'
import { CreatePlaylistForm } from './create-playlist-form'
import { BaseDialog } from '@/components/base-dialog'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { useToast } from '@/hooks/use-toast'
import { usePlaylists } from '@/api/use-playlists'
import { usePlaylist } from '@/store/usePlaylist'
import { Badge } from '@/components/ui/badge'

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
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="flex size-8 data-[state=open]:bg-muted" variant="ghost" size="sm">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="p-0">
              <button
                onClick={() => setCreatePlaylistOpen(true)}
                className="flex items-center w-full gap-2 p-1.5 font-medium"
              >
                <CirclePlus className="size-4" /> Create
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <button
                onClick={() => setDeletePlaylistOpen(true)}
                className="flex items-center w-full gap-2 p-1.5 font-medium text-destructive"
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
