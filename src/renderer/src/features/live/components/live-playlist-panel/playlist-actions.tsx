import { MoreVertical, CirclePlus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { usePlaylist } from '@/store/usePlaylist'

type PlaylistActionsProps = {
  setCreatePlaylistOpen: (value: boolean) => void
  setDeletePlaylistOpen: (value: boolean) => void
}

export const PlaylistActions = ({
  setCreatePlaylistOpen,
  setDeletePlaylistOpen
}: PlaylistActionsProps) => {
  const { selectedPlaylist } = usePlaylist()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="flex size-8 data-[state=open]:bg-muted" variant="ghost" size="sm">
          <MoreVertical className="size-4 text-muted-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="p-0">
          <button
            onClick={() => setCreatePlaylistOpen(true)}
            className="flex items-center w-full gap-2 p-1.5 font-medium"
          >
            <CirclePlus className="size-4" /> Creează
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <button
            onClick={() => setDeletePlaylistOpen(true)}
            className="flex items-center w-full gap-2 p-1.5 font-medium text-destructive disabled:text-neutral-300 dark:disabled:text-neutral-700 disabled:cursor-not-allowed"
            disabled={selectedPlaylist?.title === 'Playlist live'}
          >
            <Trash2 className="size-4" /> Elimină
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
