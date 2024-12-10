import { create } from 'zustand'
import { Song as SongType } from '@/types'

type PlaylistSongs = {
  songs: SongType[]
  loadSongs: (songs: SongType[]) => void
  addSongToPlaylist: (song: SongType) => void
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
