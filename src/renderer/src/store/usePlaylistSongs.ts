import { create } from 'zustand'
import { LyricDB } from '@/types'

type PlaylistSongs = {
  songs: LyricDB[]
  loadSongs: (songs: LyricDB[]) => void
  addSongToPlaylist: (song: LyricDB) => void
  deleteSongFromPlaylist: (songId: string) => void
}

export const usePlaylistSongs = create<PlaylistSongs>((set) => ({
  songs: [],
  loadSongs: (songs) => set({ songs }),
  addSongToPlaylist: (song) => set((state) => ({ songs: [...state.songs, song] })),
  deleteSongFromPlaylist: (songId) =>
    set((state) => ({
      songs: state.songs.filter((song) => song._id !== songId)
    }))
}))
