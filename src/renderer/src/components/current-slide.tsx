import { RiDragDropLine } from 'react-icons/ri'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

import Control from '@/components/control'
import { LiveBounce } from '@/components/live-bounce'
import { ResponsiveSlide } from '@/components/responsive-slide'

const CurrentSlide = () => {
  const { song, live, currentSlide } = useActiveSongPresentation()

  return (
    <div className="flex flex-col h-full px-4 py-3">
      <h2 className="mb-4 font-semibold">
        {live ? (
          <span className="flex items-center w-full gap-2 py-1 pl-1 leading-none">
            <LiveBounce />
            {song?.title}
          </span>
        ) : song ? (
          'Previzualizare'
        ) : (
          'Nimic live'
        )}
      </h2>
      {!song ? (
        <div className="flex items-center justify-center border border-dashed rounded aspect-video border-neutral-400 max-w-[400px] relative left-1/2 -translate-x-1/2">
          <RiDragDropLine size={24} className="text-muted-500" />
        </div>
      ) : !live || !currentSlide ? (
        <div className="flex flex-col items-center justify-between w-full h-full">
          <ResponsiveSlide lyric={Object.values(song.slides)[0]} live />
          <Control />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between w-full h-full">
          <ResponsiveSlide lyric={Object.values(live.slides)[currentSlide - 1]} live />
          <Control />
        </div>
      )}
    </div>
  )
}

export default CurrentSlide
