import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SongLyrics } from '@/components/song-lyrics'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'

export const PreviewSidesDialog = ({ song }: { song: Song }) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [editedSlides, setEditedSlides] = useState(song.slides)
  const [open, setOpen] = useState(false)

  const { mutate } = useMutation({
    mutationKey: ['update-song', song._id],
    mutationFn: async () => {
      const response = await window.electronAPI.updateSong(song._id, editedSlides)

      if (response.status === 'Success') {
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
        setOpen(false)
        toast({
          title: 'Cântarea a fost actualizată cu succes.'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Ups. A intervenit o problemă. Incearcă din nou'
        })
      }
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <h2 className="max-w-[300px] font-semibold line-clamp-1">{song.title}</h2>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2>{song.title}</h2>
          </DialogTitle>
          <DialogDescription>
            <SongLyrics editedSlides={editedSlides} setEditedSlides={setEditedSlides} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-blue-600 hover:bg-blue-500 rounded-xl" onClick={() => mutate()}>
            Salvează modificările
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
