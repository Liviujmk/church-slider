import { create } from 'zustand'

interface SearchInputStore {
  searchInputRef: React.RefObject<HTMLInputElement> | null
  setSearchInputRef: (ref: React.RefObject<HTMLInputElement>) => void
}

export const useSearchInputStore = create<SearchInputStore>((set) => ({
  searchInputRef: null,
  setSearchInputRef: (ref) => set({ searchInputRef: ref })
}))
