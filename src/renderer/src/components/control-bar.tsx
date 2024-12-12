import { MdModeStandby } from 'react-icons/md'

import { Button } from '@/components/ui/button'

import presentationIcon from '../../assets/icons/Vector.svg'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { Song as SongType } from '@/types/index'
import { useState } from 'react'

const ControlBar = () => {
  const [hasClock] = useState<boolean>(false)

  const { song, setInfoSlide, goLive, live, stopLive } = useActiveSongPresentation()
  const { delete: deleteActiveSong } = useActiveSongPresentation()

  const handleDistroyWindow = () => {
    if (hasClock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()
    setInfoSlide(null, null)
    deleteActiveSong()
    stopLive()
  }

  const handleGoLive = async (song: SongType) => {
    try {
      goLive()

      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <h2 className="font-bold">Prezentare</h2>
      <div className="space-x-3">
        <Button
          className="space-x-1 rounded-xl bg-[#006BE9] hover:bg-[#66E200]"
          onClick={() => song && handleGoLive(song)}
          disabled={song === null || !(live === null)}
        >
          <img src={presentationIcon} alt="Icon" width={16} />
          <span>Go Live</span>
        </Button>
        <Button
          className="space-x-1 rounded-xl"
          variant="outline"
          onClick={handleDistroyWindow}
          disabled={song === null}
        >
          <MdModeStandby size={16} />
          <span>Standby</span>
        </Button>
      </div>
    </div>
  )
}

export default ControlBar
