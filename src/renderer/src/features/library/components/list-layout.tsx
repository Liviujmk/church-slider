import { Music, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { SongLyricsTrigger } from '@/components/song-lyrics'
import type { Song } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

type ListLayoutProps = {
  filteredSongs: Song[] | undefined
}

const ListLayout = ({ filteredSongs }: ListLayoutProps) => {
  const { songs, addSongToPlaylist } = usePlaylistSongs()
  const { toast } = useToast()

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
    <ul className="space-y-2">
      {filteredSongs?.map((song, index) => (
        <li key={song._id} className="group">
          <div className="flex items-center justify-between p-3 transition-colors duration-200 rounded-lg hover:bg-muted">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Music className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium leading-5 truncate text-foreground">
                  {song.title.replace('.pptx', '')}
                </p>
                <div className="flex items-center mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {song.lyricsCount} verses
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <SongLyricsTrigger song={song} />
              {!songs.some((playlistSong) => playlistSong._id === song._id) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => {
                          if (song._id) handleUpdate(song)
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to playlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          {index < filteredSongs.length - 1 && <Separator className="my-2" />}
        </li>
      ))}
    </ul>
  )
}

export default ListLayout
