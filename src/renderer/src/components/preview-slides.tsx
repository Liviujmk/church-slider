import { useEffect, useRef } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { ResponsiveSlide } from '@/components/responsive-slide'

const PreviewSlides = () => {
  const { live, currentSlide } = useActiveSongPresentation()

  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current && live) {
      const slideElement = scrollRef.current.querySelector(`[data-slide-number="${currentSlide}"]`)
      if (slideElement) {
        slideElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        })
      }
    }

    console.log({ live })
  }, [currentSlide, live])

  return (
    <div className="flex h-full select-none">
      {live && currentSlide ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between px-4 py-2 font-semibold">
            <h2>Previzualizare strofe</h2>
            <span className="text-sm text-muted-500">
              {Object.values(live.slides).length} strofe
            </span>
          </div>
          <ScrollArea ref={scrollRef} className="whitespace-nowrap">
            <div className="flex w-full px-4 pb-4 space-x-2.5">
              {Object.entries(live.slides).map(([slideNumber, lines]) => (
                <div
                  onClick={() => {
                    window.electronAPI.goToSlide(parseInt(slideNumber) - 1)
                  }}
                  className="hover:cursor-pointer"
                >
                  <ResponsiveSlide
                    key={parseInt(slideNumber)}
                    currentSlide={currentSlide}
                    slideNumber={slideNumber}
                    lyric={lines}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full border">
          <p className="mx-auto font-semibold select-none w-fit text-muted-500">
            Nicio previzualizare
          </p>
        </div>
      )}
    </div>
  )
}

export default PreviewSlides
