import { RiDragDropLine } from 'react-icons/ri'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

import { ResponsiveSlide } from '@/components/responsive-slide'
import Control from '@/components/control'

const CurrentSlide = () => {
  const { song, live } = useActiveSongPresentation()

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="mb-2 font-semibold text-muted-500">
        {live ? <span>{song?.title}</span> : song ? 'Previzualizare' : 'Nimic live'}
      </h2>
      {!live ? (
        <div className="flex items-center justify-center border border-dashed rounded aspect-video border-neutral-400 max-w-[400px] relative left-1/2 -translate-x-1/2">
          <RiDragDropLine size={24} className="text-muted-500" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between w-full h-full">
          <ResponsiveSlide
            lyric={Object.values(live.slides)[0]}
            currentSlide={1}
            slideNumber="1"
            live
          />
          <Control />
        </div>
      )}
    </div>
  )
}

export default CurrentSlide
