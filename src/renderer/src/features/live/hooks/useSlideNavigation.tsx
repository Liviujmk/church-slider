import { useEffect } from 'react'

export const useSlideNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.code === 'Space') {
        window.electronAPI.sendToPresentation('next')
      } else if (event.key === 'ArrowLeft') {
        window.electronAPI.sendToPresentation('prev')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
