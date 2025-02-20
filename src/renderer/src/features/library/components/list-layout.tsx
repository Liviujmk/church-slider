import { Music, Plus, Trash } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SongLyricsTrigger } from '@/components/song-lyrics'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import type { Song } from '@/types'
import { cn } from '@/lib/utils'

type ListLayoutProps = {
  filteredSongs: Song[] | undefined
  isCompact: boolean
}

export const ListLayout = ({ filteredSongs, isCompact }: ListLayoutProps) => {
  const { songs, addSongToPlaylist } = usePlaylistSongs()
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      const response = await window.electronAPI.removeSong(id)
      if (response.success) window.location.reload()
      else
        toast({
          title: 'Eroare',
          description: 'Cântarea nu s-a șters! Incercați din nou!',
          duration: 3000
        })
    } catch (error) {
      toast({
        title: 'Eroare',
        description: 'A aparut o eroare',
        duration: 3000
      })
    }
  }

  const handleUpdate = async (song: Song) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(song._id)

      if (response.success) {
        addSongToPlaylist(song)
        toast({
          title: 'Success',
          description: 'Live playlist has been updated successfully!',
          duration: 3000
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was a problem updating the playlist. Please try again.',
          duration: 3000
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was a problem updating the playlist. Please try again.',
        duration: 3000
      })
    }
  }

  return (
    <ul className={cn('space-y-2', isCompact && 'space-y-0')}>
      {filteredSongs?.map((song, index) => (
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
              {!songs.some((playlistSong) => playlistSong._id === song._id) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(isCompact ? 'w-6 h-6' : 'w-8 h-8')}
                        onClick={() => {
                          if (song._id) handleUpdate(song)
                        }}
                      >
                        <Plus className={cn(isCompact ? 'w-3 h-3' : 'w-4 h-4')} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to playlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(isCompact ? 'w-6 h-6' : 'w-8 h-8')}
                      onClick={() => {
                        if (song._id) handleDelete(song._id)
                      }}
                    >
                      <Trash
                        className={cn(isCompact ? 'w-3 h-3' : 'w-4 h-4', 'text-destructive')}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end">
                    <p>This operation can&apos;t be undone</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {!isCompact && index < filteredSongs.length - 1 && <Separator className="my-2" />}
        </li>
      ))}
    </ul>
  )
}
