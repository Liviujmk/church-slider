import { TbPresentationOff } from 'react-icons/tb'

import { Button } from '@/components/ui/button'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

import { useClock } from '@/store/useClock'
import { PresentationIcon } from '@/assets/icons'
import { useGoLive } from '../hooks/useGoLive'
import { useMutateDailySong } from '../hooks/useMutateDailySong'
import { Song } from '@/types'

export const ControlBar = () => {
  const {
    song,
    live,
    stopLive,
    setInfoSlide,
    delete: deleteActiveSong
  } = useActiveSongPresentation()
  const mutate = useMutateDailySong()

  const goLive = useGoLive()
  const { clock } = useClock()

  const handleGoLive = (song: Song) => {
    goLive(song)
    if (song) mutate(song)
  }

  const handleDistroyWindow = () => {
    if (clock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()

    setInfoSlide(null, null)
    deleteActiveSong()

    if (live) stopLive()
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b select-none">
      <h2 className="font-bold">Prezentare</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="live"
          onClick={() => song && handleGoLive(song)}
          disabled={song === null || !(live === null)}
        >
          <PresentationIcon size={16} />
          <span>Go Live</span>
        </Button>
        <Button
          className={`space-x-1 duration-200 text-destructive rounded-xl hover:bg-destructive hover:text-destructive-foreground border-destructive ${live && 'bg-[#e60000] text-white border-none dark:hover:bg-[#ff3232]'}`}
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
