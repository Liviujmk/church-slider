import { Music, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'

import CustomTooltip from '@/features/live/components/custom-tooltip'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { DeleteConfirmationDialog } from './delete-confirm-dialog'
import { AddInAPlaylist } from '@/components/add-in-a-playlist'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { Song } from '@/types'
import { useSongPreviewStore } from '@/store/useSongPreviewDialog'

type GridLayoutProps = {
  filteredSongs: Song[]
}

export const GridLayout = ({ filteredSongs }: GridLayoutProps) => {
  const [hoveredSong, setHoveredSong] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [songToDelete, setSongToDelete] = useState<Song | null>(null)
  const { setSong } = useSongPreviewStore()

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredSongs.map((song) => (
          <Card
            key={song._id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredSong(song._id)}
            onMouseLeave={() => setHoveredSong(null)}
          >
            <CardContent className="p-0">
              <div className="relative flex items-center justify-center aspect-square bg-[#F7F7F7] dark:bg-neutral-900 group h-[160px] w-full">
                <Music className="w-16 h-16 transition-opacity duration-300 text-muted-foreground/50 group-hover:opacity-0" />
                {hoveredSong === song._id && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
                    <button className="mr-1">
                      <Pencil
                        className="size-4"
                        onClick={() => {
                          setSong(song)
                        }}
                      />
                    </button>
                    <CustomTooltip label="Se va șterge definitiv">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => {
                          setSongToDelete(song)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                      </Button>
                    </CustomTooltip>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <div className="flex items-center justify-between w-full mb-2">
                <Badge variant="secondary">{song.lyricsCount} verses</Badge>
                <AddInAPlaylist song={song} />
              </div>
              <h3 className="text-sm font-semibold line-clamp-2">
                {song.title.replace('.pptx', '')}
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        songToDelete={songToDelete}
      />
    </>
  )
}
