import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// import { RxDragHandleDots2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa6'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { usePlaylistSongs } from '@/store/usePlaylistSongs'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useToast } from '@/hooks/use-toast'
import { LiveBounce } from './live-bounce'

const Playlist = () => {
  const { toast } = useToast()
  const { songs, loadSongs, deleteSongFromPlaylist } = usePlaylistSongs()
  const { song: activeSong, addInPreview, live } = useActiveSongPresentation()

  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songs = await window.electronAPI.getAllSongsFromPlaylist()
        loadSongs(songs)
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'A apărut o problemă la accesarea playlistului.'
        })
      }
    }

    getAllSongs()
    setFirstLoad(false)
  }, [loadSongs])

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-2">
        <AnimatePresence>
          {songs.length > 0 ? (
            songs.map((song) => (
              <motion.div
                initial={firstLoad ? {} : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                layout
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { type: 'spring', stiffness: 240, damping: 25 },
                  layout: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                key={song._id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <div className="max-w-[248px] font-semibold line-clamp-1">{song.title}</div>
                    <Badge variant="secondary" className="rounded-md bg-[#F1F1F1] text-neutral-600">
                      {Object.keys(song.slides).length} strofe
                    </Badge>
                  </div>
                </div>
                {song._id !== activeSong?._id ? (
                  <div className="flex items-center gap-1 text-nowrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            className="bg-[#F1F1F1] size-6 hover:bg-neutral-200"
                            onClick={() => addInPreview(song)}
                            disabled={!!live}
                          >
                            <AiOutlinePlus className="text-blue-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold">Adaugă în previzualizare</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-6"
                      onClick={() => {
                        window.electronAPI.deleteASongFromPlaylist(song._id)
                        deleteSongFromPlaylist(song._id)
                      }}
                    >
                      <FaTrash className="text-red-500 size-4" />
                    </Button>
                  </div>
                ) : song._id !== live?._id ? (
                  <span className="pr-3 text-sm font-semibold text-amber-500">Previzualizare</span>
                ) : (
                  <span className="flex items-center gap-2 pr-3 text-sm font-semibold text-green-500">
                    <LiveBounce />
                    <span className="leading-none">Live</span>
                  </span>
                )}
              </motion.div>
            ))
          ) : (
            <div className="absolute text-sm font-semibold -translate-x-1/2 text-stone-400 top-1/2 left-1/2">
              Niciun cântec în playlist
            </div>
          )}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}

export default Playlist
