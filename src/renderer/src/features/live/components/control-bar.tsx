import { TbPresentationOff } from 'react-icons/tb'

import { Button } from '@/components/ui/button'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song as SongType } from '@/types/index'
import { useClock } from '@/store/useClock'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { PresentationIcon } from '@/assets/icons'

const ControlBar = () => {
  const {
    song,
    goLive,
    live,
    stopLive,
    setInfoSlide,
    delete: deleteActiveSong
  } = useActiveSongPresentation()
  const { getItem, setItem, removeItem } = useLocalStorage('playback')
  const { clock } = useClock()

  const handleDistroyWindow = () => {
    if (clock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()

    setInfoSlide(null, null)
    deleteActiveSong()

    const avaiblePlayback = getItem()
    if (avaiblePlayback) removeItem()
    setItem(song)

    if (live) stopLive()
  }

  const handleGoLive = async (song: SongType) => {
    try {
      goLive()

      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song
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

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b select-none">
      <h2 className="font-bold">Prezentare</h2>
      <div className="flex items-center gap-2">
        <Button
          className="rounded-xl bg-[#006BE9] hover:bg-[#66E200] text-white"
          onClick={() => song && handleGoLive(song)}
          disabled={song === null || !(live === null)}
        >
          <PresentationIcon size={16} />
          <span>Go Live</span>
        </Button>
        <Button
          className="space-x-1 duration-200 text-destructive rounded-xl hover:bg-destructive hover:text-destructive-foreground"
          variant="outline"
          onClick={handleDistroyWindow}
          disabled={live === null}
        >
          <TbPresentationOff size={16} />
          <span>Închide</span>
        </Button>
      </div>
    </div>
  )
}

export default ControlBar
