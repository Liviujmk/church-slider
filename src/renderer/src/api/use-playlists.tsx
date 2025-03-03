import { useQuery } from '@tanstack/react-query'

import { Song } from '@/types'

export type Playlist = {
  _id: string
  title: string
  songs: Song[]
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  const response = await window.electronAPI.getPlaylists()

  if (response.status === 'Error') {
    throw new Error(response.message || 'Failed to load playlists')
  }

  return response.data || []
}

export const usePlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
    refetchOnWindowFocus: 'always'
  })
}
