import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song } from '@/types/index'

export const useGoLive = () => {
  const { goLive, setInfoSlide, currentSlide } = useActiveSongPresentation()

  const handleGoLive = async (song: Song) => {
    try {
      goLive()

      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song,
        startSlide: currentSlide ? currentSlide - 1 : undefined
      })

      window.electronAPI.onSlideData((_, { currentSlide, totalSlides }) => {
        if (currentSlide !== null && totalSlides !== null) {
          setInfoSlide(currentSlide, totalSlides)
        }
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return handleGoLive
}
