import { create } from 'zustand'

type Clock = {
  clock: boolean
  setClock: (clock: boolean) => void
}

export const useClock = create<Clock>((set) => ({
  clock: false,
  setClock: (clock: boolean) => set({ clock })
}))
