import { create } from 'zustand'
import { LyricDB } from '@/types'

type ActiveSongPresentation = {
  song: LyricDB | null
  add: (song: LyricDB) => void
  delete: () => void
  currentSlide: number | null
  numberOfSlides: number | null
  setInfoSlide: (currentSlide: number | null, totalSlides: number | null) => void
}

export const useActiveSongPresentation = create<ActiveSongPresentation>((set) => ({
  song: null,
  currentSlide: null,
  numberOfSlides: null,
  add: (song) => set(() => ({ song })),
  delete: () => set(() => ({ song: null })),
  setInfoSlide: (currentSlide, numberOfSlides) => set({ currentSlide, numberOfSlides })
}))
