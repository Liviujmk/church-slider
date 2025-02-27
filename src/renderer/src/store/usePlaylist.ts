import { create } from 'zustand'

import { Playlist } from '@/api/use-playlists'
import { Song } from '@/types'

interface PlaylistStore {
  selectedPlaylist: Playlist | null
  setSelectedPlaylist: (playlist: Playlist) => void
  reorderSongs: (newSongs: Song[]) => void
}

export const usePlaylist = create<PlaylistStore>((set) => ({
  selectedPlaylist: null,
  setSelectedPlaylist: (playlist: Playlist) => set({ selectedPlaylist: playlist }),
  reorderSongs: (newSongs: Song[]) =>
    set((state) => {
      if (!state.selectedPlaylist) return state
      return { selectedPlaylist: { ...state.selectedPlaylist, songs: newSongs } }
    })
}))
