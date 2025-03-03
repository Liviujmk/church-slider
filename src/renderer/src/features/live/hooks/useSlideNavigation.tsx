import { useEffect } from 'react'

export const useSlideNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.code === 'Space' || event.code === 'ArrowDown') {
        window.electronAPI.sendToPresentation('next')
      } else if (event.key === 'ArrowLeft' || event.code === 'ArrowUp') {
        window.electronAPI.sendToPresentation('prev')
      }
    }

    window.addEventListener('keyup', handleKeyDown)
    return () => {
      window.removeEventListener('keyup', handleKeyDown)
    }
  }, [])
}
