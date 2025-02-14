import { create } from 'zustand'
import { SimplySong } from '@/types'

type CreatedSong = {
  song: SimplySong | null
  loadSong: (song: SimplySong) => void
  deleteSong: () => void
}

export const useCreatedSong = create<CreatedSong>((set) => ({
  song: null,
  loadSong: (song) => set({ song }),
  deleteSong: () => set({ song: null })
}))
