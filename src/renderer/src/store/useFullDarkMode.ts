import { create } from 'zustand'

type FullDarkMode = {
  fullDarkMode: boolean
  toggleFullDarkMode: () => void
}

const useFullDarkMode = create<FullDarkMode>((set) => ({
  fullDarkMode: false,
  toggleFullDarkMode: () => set((state) => ({ fullDarkMode: !state.fullDarkMode }))
}))

export default useFullDarkMode
