import { useEffect } from 'react'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song } from '@/types/index'

export const useGoLive = () => {
  const { goLive, setInfoSlide, currentSlide } = useActiveSongPresentation()

  // Înregistrează listener-ul o singură dată când hook-ul se montează
  useEffect(() => {
    const slideDataHandler = (_, { currentSlide, totalSlides }) => {
      if (currentSlide !== null && totalSlides !== null) {
        setInfoSlide(currentSlide, totalSlides)
      }
    }

    window.electronAPI.onSlideData(slideDataHandler)

    return () => {
      window.electronAPI.removeAllListeners('get-update-slide')
    }
  }, [setInfoSlide])

  const handleGoLive = async (song: Song) => {
    try {
      goLive()

      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song,
        startSlide: currentSlide ? currentSlide - 1 : undefined
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return handleGoLive
}
