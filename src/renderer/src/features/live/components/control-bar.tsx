import { TbPresentationOff } from 'react-icons/tb'

import { Button } from '@/components/ui/button'

import presentationIcon from '../../../../assets/icons/Vector.svg'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song as SongType } from '@/types/index'
import { useClock } from '@/store/useClock'

const ControlBar = () => {
  const {
    song,
    goLive,
    live,
    stopLive,
    setInfoSlide,
    delete: deleteActiveSong
  } = useActiveSongPresentation()

  const { clock } = useClock()

  const handleDistroyWindow = () => {
    if (clock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()

    setInfoSlide(null, null)
    deleteActiveSong()

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
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <h2 className="font-bold">Prezentare</h2>
      <div className="space-x-2">
        <Button
          className={`${song !== null && 'ring-2 ring-offset-1 ring-[#006BE9]'} space-x-1 rounded-xl bg-[#006BE9] hover:bg-[#66E200] hover:ring-[#66E200] dark:text-white`}
          onClick={() => song && handleGoLive(song)}
          disabled={song === null || !(live === null)}
        >
          <img src={presentationIcon} alt="Icon" width={16} />
          <span>Go Live</span>
        </Button>
        <Button
          className="space-x-1 text-red-500 duration-200 border-red-500 rounded-xl hover:bg-red-500 hover:text-white"
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
