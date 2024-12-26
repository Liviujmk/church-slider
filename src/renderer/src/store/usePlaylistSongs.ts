import { create } from 'zustand'
import { Song as SongType } from '@/types'

type PlaylistSongs = {
  songs: SongType[]
  loadSongs: (songs: SongType[]) => void
  addSongToPlaylist: (song: SongType) => void
  deleteSongFromPlaylist: (songId: string) => void
  reorderSongs: (songs: SongType[]) => void
  song: (id: string) => SongType | undefined
}

export const usePlaylistSongs = create<PlaylistSongs>((set, get) => ({
  songs: [],
  loadSongs: (songs) => set({ songs }),
  addSongToPlaylist: (song) => set((state) => ({ songs: [...state.songs, song] })),
  deleteSongFromPlaylist: (songId) =>
    set((state) => ({
      songs: state.songs.filter((song) => song._id !== songId)
    })),
  reorderSongs: (songs) => {
    set({ songs })
  },
  song: (id) => {
    const state = get()
    return state.songs.find((song) => song._id === id)
  }
}))
