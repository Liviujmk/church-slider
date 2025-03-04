import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { usePlaylist } from '@/store/usePlaylist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface DeletePlaylistFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DeletePlaylistForm = ({ setOpen }: DeletePlaylistFormProps) => {
  const { selectedPlaylist } = usePlaylist()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  if (!selectedPlaylist) return

  const { mutate } = useMutation({
    mutationKey: ['delete-playlist'],
    mutationFn: async () => {
      const response = await window.electronAPI.deletePlaylist(selectedPlaylist._id)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      toast({
        title: 'Playlist șters cu succes!'
      })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ups! Ceva n-a mers bine.',
        description: 'Nu am putut șterge playlistul. Încearcă din nou.'
      })
    }
  })

  const handleDelete = () => {
    mutate()
    setOpen(false)
  }

  return (
    <div className="flex items-center justify-end gap-2 mt-2">
      <Button onClick={() => setOpen(false)} variant="outline" className="rounded-xl">
        Cancel
      </Button>
      <Button onClick={handleDelete} variant="destructive" className="rounded-xl">
        Confirm
      </Button>
    </div>
  )
}
