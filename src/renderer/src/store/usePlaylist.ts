import { create } from 'zustand'

import { Playlist } from '@/api/use-playlists'

interface PlaylistStore {
  selectedPlaylist: Playlist | null
  setSelectedPlaylist: (playlist: Playlist) => void
}

export const usePlaylist = create<PlaylistStore>((set) => ({
  selectedPlaylist: null,
  setSelectedPlaylist: (playlist: Playlist) => set({ selectedPlaylist: playlist })
}))
