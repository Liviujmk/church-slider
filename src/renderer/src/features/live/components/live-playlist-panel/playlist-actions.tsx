import { MoreVertical, CirclePlus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

type PlaylistActionsProps = {
  setCreatePlaylistOpen: (value: boolean) => void
  setDeletePlaylistOpen: (value: boolean) => void
}

export const PlaylistActions = ({
  setCreatePlaylistOpen,
  setDeletePlaylistOpen
}: PlaylistActionsProps) => {
  return (
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
            <CirclePlus className="size-4" /> Creează
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <button
            onClick={() => setDeletePlaylistOpen(true)}
            className="flex items-center w-full gap-2 p-1.5 font-medium text-destructive"
          >
            <Trash2 className="size-4" /> Elimină
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
