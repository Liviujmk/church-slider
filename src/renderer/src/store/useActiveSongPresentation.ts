import { create } from 'zustand'
import { Song } from '@/types'

type ActiveSongPresentation = {
  song: Song | null
  previewCurrentSlide: number
  addInPreview: (song: Song) => void
  delete: () => void
  currentSlide: number | null
  numberOfSlides: number | null
  setInfoSlide: (currentSlide: number | null, totalSlides: number | null) => void
  live: Song | null
  goLive: () => void
  stopLive: () => void
  setPreviewCurrentSlide: (value: number) => void
  resetPreviewCurrentSlide: () => void
}

export const useActiveSongPresentation = create<ActiveSongPresentation>((set) => ({
  song: null,
  currentSlide: null,
  numberOfSlides: null,
  previewCurrentSlide: 1,
  live: null,
  addInPreview: (song) => set(() => ({ song })),
  delete: () => set(() => ({ song: null })),
  setInfoSlide: (currentSlide, numberOfSlides) => set({ currentSlide, numberOfSlides }),
  goLive: () => set((state) => ({ live: state.song })),
  stopLive: () => set(() => ({ live: null })),
  setPreviewCurrentSlide: (value) => set({ previewCurrentSlide: value }),
  resetPreviewCurrentSlide: () => set({ previewCurrentSlide: 1 })
}))
