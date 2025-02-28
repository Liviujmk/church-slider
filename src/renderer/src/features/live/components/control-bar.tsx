import { TbPresentationOff } from 'react-icons/tb'

import { Button } from '@/components/ui/button'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song as SongType } from '@/types/index'
import { useClock } from '@/store/useClock'
import { PresentationIcon } from '@/assets/icons'
import { usePlaylist } from '@/store/usePlaylist'

export const ControlBar = () => {
  const {
    song,
    goLive,
    live,
    stopLive,
    setInfoSlide,
    currentSlide,
    delete: deleteActiveSong
  } = useActiveSongPresentation()
  const { setLastSong } = usePlaylist()
  const { clock } = useClock()

  const handleDistroyWindow = () => {
    if (clock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()

    setInfoSlide(null, null)
    deleteActiveSong()

    setLastSong(song)

    if (live) stopLive()
  }

  const handleGoLive = async (song: SongType) => {
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
          className={`space-x-1 duration-200 text-destructive rounded-xl hover:bg-destructive hover:text-destructive-foreground ${live && 'bg-red-700 text-white'}`}
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
