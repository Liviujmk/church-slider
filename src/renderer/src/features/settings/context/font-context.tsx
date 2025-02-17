import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

type Font = {
  font: string
  setFont: (font: string) => void
}

const FontContext = createContext<Font | undefined>(undefined)

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const { setItem, getItem } = useLocalStorage('presentation-font')

  const [font, setFont] = useState('Arial, sans-serif')

  useEffect(() => {
    const savedFont = getItem() ?? 'Arial, sans-serif'
    setFont(savedFont)
  }, [getItem])

  const handleSetFont = (newFont: string) => {
    setFont(newFont)
    setItem(newFont)
  }

  return (
    <FontContext.Provider value={{ font, setFont: handleSetFont }}>{children}</FontContext.Provider>
  )
}

export const useFont = () => {
  const font = useContext(FontContext)

  if (font === undefined) {
    throw new Error('useFont must be used with a FontContext')
  }

  return font
}
