import { create } from 'zustand'
import { LyricDB } from '@/types'

type ActiveSongPresentation = {
  song: LyricDB | null
  add: (song: LyricDB) => void
  delete: () => void
}

export const useActiveSongPresentation = create<ActiveSongPresentation>((set) => ({
  song: null,

  add: (song) => set(() => ({ song })),
  delete: () => set(() => ({ song: null }))
}))
