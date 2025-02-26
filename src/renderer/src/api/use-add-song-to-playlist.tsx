import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'

const addSongToPlaylist = async (playlistId: string, newSong: Song) => {
  const response = await window.electronAPI.addSongToAPlaylist(playlistId, newSong)
  if (response.status === 'Error') {
    throw new Error(response.message)
  }

  return response
}

export const useAddSongToPlaylist = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationKey: ['add-song-to-playlist'],
    mutationFn: ({ playlistId, song }: { playlistId: string; song: Song }) =>
      addSongToPlaylist(playlistId, song),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      toast({
        title: 'Melodie adăugată cu succes!',
        description: 'Melodia a fost adăugată playlistului selectat. 🎶'
      })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ups! Ceva n-a mers bine.',
        description: 'Nu am putut adăuga melodia. Încearcă din nou.'
      })
    }
  })
}
