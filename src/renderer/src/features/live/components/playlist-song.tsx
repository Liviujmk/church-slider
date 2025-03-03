import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { RxDragHandleDots2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { FaTrash } from 'react-icons/fa6'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LiveBounce } from '@/features/live/components/live-bounce'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

import { usePlaylist } from '@/store/usePlaylist'
import { Song } from '@/types'
import { useDeleteSong } from '../api/use-delete-song'
import { useSongPreviewStore } from '@/store/useSongPreviewDialog'

const PlaylistSong = ({ song }: { song: Song }) => {
  const { selectedPlaylist, setSelectedPlaylist } = usePlaylist()

  const {
    song: activeSong,
    addInPreview,
    live,
    setInfoSlide,
    resetPreviewCurrentSlide,
    delete: deletePreviewSong
  } = useActiveSongPresentation()
  const { mutate } = useDeleteSong()
  const { setSong } = useSongPreviewStore()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: song._id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging && {
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      zIndex: '100'
    })
  }

  const handleDeleteSong = () => {
    if (selectedPlaylist) {
      mutate(
        { playlistId: selectedPlaylist._id, songId: song._id },
        {
          onSuccess: (data) => {
            if (!data.id) return

            const updatedSongs = selectedPlaylist.songs.filter((s) => {
              return s._id !== data.id
            })

            const updatedPlaylist = { ...selectedPlaylist, songs: updatedSongs }

            setSelectedPlaylist(updatedPlaylist)
          }
        }
      )
    }
  }

  const handleDeleteFromPreview = () => {
    setInfoSlide(null, null)
    deletePreviewSong()
    resetPreviewCurrentSlide()
  }

  return (
    <div
      ref={setNodeRef}
      key={song._id}
      className="flex items-center justify-between gap-4"
      style={style}
    >
      <div className="flex items-center gap-1.5">
        <div {...attributes} {...listeners}>
          <RxDragHandleDots2 size={21} className="text-muted-500 hover:cursor-grab" />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <h2
              onClick={() => {
                setSong(song)
              }}
              className="max-w-[300px] font-semibold line-clamp-1"
            >
              {song.title}
            </h2>
            <Badge
              variant="secondary"
              className="block w-fit rounded-md bg-[#F1F1F1] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {song.lyricsCount} strofe
            </Badge>
          </div>
        </div>
      </div>
      {song._id !== activeSong?._id ? (
        <div className="flex items-center gap-1 text-nowrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-[#F1F1F1] dark:bg-neutral-900 size-6 hover:bg-neutral-200"
                  onClick={() => {
                    addInPreview(song)
                  }}
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
            asChild
            variant="ghost"
            className="size-4 hover:cursor-pointer"
            onClick={handleDeleteSong}
          >
            <FaTrash className="text-red-500 dark:hover:bg-transparent hover:text-red-700" />
          </Button>
        </div>
      ) : song._id !== live?._id ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-amber-500 hover:text-red-500 size-8"
                onClick={handleDeleteFromPreview}
              >
                <IoMdClose size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">Închide previzualizarea</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="flex items-center gap-2 pr-3 text-sm font-semibold text-green-500">
          <LiveBounce />
          <span className="leading-none">Live</span>
        </span>
      )}
    </div>
  )
}

export default PlaylistSong
