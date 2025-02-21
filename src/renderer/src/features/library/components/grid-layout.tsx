import { useState } from 'react'
import { Music, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { Song } from '@/types'
import { SongLyricsTrigger } from '@/components/song-lyrics'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type GridLayoutProps = {
  filteredSongs: Song[]
}

export const GridLayout = ({ filteredSongs }: GridLayoutProps) => {
  const { songs, addSongToPlaylist } = usePlaylistSongs()
  const { toast } = useToast()
  const [hoveredSong, setHoveredSong] = useState<string | null>(null)

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredSongs.map((song) => (
        <Card
          key={song._id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredSong(song._id)}
          onMouseLeave={() => setHoveredSong(null)}
        >
          <CardContent className="p-0">
            <div className="relative flex items-center justify-center aspect-square bg-muted group h-[160px] w-full">
              <Music className="w-16 h-16 transition-opacity duration-300 text-muted-foreground/50 group-hover:opacity-0" />
              {hoveredSong === song._id && (
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100">
                  <SongLyricsTrigger song={song} />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <div className="flex items-center justify-between w-full mb-2">
              <Badge variant="secondary">{song.lyricsCount} verses</Badge>
              {!songs.some((playlistSong) => playlistSong._id === song._id) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (song._id) handleUpdate(song)
                        }}
                      >
                        <Plus className="w-4 h-4 text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to playlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <h3 className="text-sm font-semibold line-clamp-2">
              {song.title.replace('.pptx', '')}
            </h3>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
