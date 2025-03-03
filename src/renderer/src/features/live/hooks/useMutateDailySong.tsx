import { Song } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addSongToDailyPlaylist = async (song: Omit<Song, '_rev'>) => {
  const response = await window.electronAPI.addSongToDailyPlaylist(song)

  return response
}

export const useMutateDailySong = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['add-song-to-daily-playlist'],
    mutationFn: (song: Omit<Song, '_rev'>) =>
      addSongToDailyPlaylist({
        _id: song._id,
        title: song.title,
        slides: song.slides,
        lyricsCount: song.lyricsCount
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-songs'] })
    }
  })

  return mutate
}
