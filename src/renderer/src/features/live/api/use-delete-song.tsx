import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'

const deleteSongFromPlaylist = async (playlistId: string, songId: string) => {
  const response = await window.electronAPI.deleteSongFromPlaylist(playlistId, songId)

  if (response.status === 'Error') {
    throw new Error(response.message)
  }

  return response
}

export const useDeleteSong = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) =>
      deleteSongFromPlaylist(playlistId, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      toast({
        title: 'Succes!',
        description: 'Melodia a fost ștearsă cu succes.'
      })
    },
    onError: () => {
      toast({
        title: 'Eroare!',
        description: 'A apărut o problemă la ștergerea melodiei.',
        variant: 'destructive'
      })
    }
  })
}
