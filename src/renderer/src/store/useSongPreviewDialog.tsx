import { create } from 'zustand'
import { Song } from '@/types'

type SongPreviewStore = {
  song: Song | null
  showDialog: boolean
  setSong: (song: Song) => void
  closeDialog: () => void
}

export const useSongPreviewStore = create<SongPreviewStore>((set) => ({
  song: null,
  showDialog: false,
  setSong: (song) => set({ song, showDialog: true }),
  closeDialog: () => set({ showDialog: false, song: null })
}))
