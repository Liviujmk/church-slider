import { useEffect } from 'react'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useClock } from '@/store/useClock'

export const useEscapeKey = () => {
  const { setInfoSlide, stopLive, live, delete: deleteActiveSong } = useActiveSongPresentation()
  const { clock: hasClock } = useClock()

  const handleDistroyWindow = () => {
    if (hasClock) {
      window.electronAPI.sendShowClock(true)
    } else {
      window.electronAPI.distroyPresentationWindow()
    }
    setInfoSlide(null, null)
    deleteActiveSong()
    if (live) stopLive()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDistroyWindow()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleDistroyWindow, hasClock])
}
