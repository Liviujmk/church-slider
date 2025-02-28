import { Music, Trash } from 'lucide-react'
import { useState } from 'react'

import { DeleteConfirmationDialog } from './delete-confirm-dialog'
import { AddInAPlaylist } from '@/components/add-in-a-playlist'
import { SongLyricsTrigger } from '@/components/song-lyrics'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { Song } from '@/types'
import { cn } from '@/lib/utils'

type ListLayoutProps = {
  songs: Song[]
  isCompact: boolean
}

export const ListLayout = ({ songs, isCompact }: ListLayoutProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [songToDelete, setSongToDelete] = useState<Song | null>(null)

  return (
    <ul className={cn('space-y-2', isCompact && 'space-y-0')}>
      {songs?.map((song, index) => (
        <li
          key={song._id}
          className={cn(
            'group',
            index % 2 === 0 ? 'bg-background' : isCompact && 'bg-muted/30',
            isCompact && 'hover:bg-muted transition-colors duration-200'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between rounded-lg',
              isCompact ? 'py-1 px-2' : 'p-3'
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full bg-primary/10 text-primary',
                    isCompact ? 'w-8 h-8' : 'w-12 h-12'
                  )}
                >
                  <Music className={cn(isCompact ? 'w-4 h-4' : 'w-6 h-6')} />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <p
                  className={cn(
                    'font-medium leading-5 truncate text-foreground',
                    isCompact ? 'text-[13px]' : 'text-sm'
                  )}
                >
                  {song.title.replace('.pptx', '')}
                </p>
                {!isCompact && (
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {song.lyricsCount} verses
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div
              className={cn(
                'flex items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100',
                isCompact ? 'space-x-1' : 'space-x-2'
              )}
            >
              <SongLyricsTrigger song={song} />
              <AddInAPlaylist song={song} />
              <Button
                variant="ghost"
                size="icon"
                className={cn(isCompact ? 'w-6 h-6' : 'w-8 h-8')}
                onClick={() => {
                  setSongToDelete(song)
                  setIsDeleteDialogOpen(true)
                }}
              >
                <Trash className={cn(isCompact ? 'w-3 h-3' : 'w-4 h-4', 'text-destructive')} />
              </Button>
            </div>
          </div>
          {!isCompact && index < songs.length - 1 && <Separator className="my-2" />}
        </li>
      ))}
      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        songToDelete={songToDelete}
      />
    </ul>
  )
}
