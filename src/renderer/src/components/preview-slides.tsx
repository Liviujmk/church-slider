import { useEffect, useRef } from 'react'

import { FitText } from '@/components/fit-text'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const PreviewSlides = () => {
  const { song, currentSlide } = useActiveSongPresentation()

  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current && song) {
      const slideElement = scrollRef.current.querySelector(`[data-slide-number="${currentSlide}"]`)
      if (slideElement) {
        slideElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        })
      }
    }
  }, [currentSlide, song])

  return (
    <div className="flex h-full">
      {song ? (
        <ScrollArea ref={scrollRef} className="whitespace-nowrap">
          <div className="flex w-full p-4 space-x-4">
            {Object.entries(song.slides).map(([slideNumber, lines]) => (
              <div
                key={parseInt(slideNumber)}
                data-slide-number={parseInt(slideNumber)}
                className={`${parseInt(slideNumber) === currentSlide && '!border-2 border-[#006BE9]'} border p-[2.19px]`}
              >
                <div className="w-[clamp(200px,24vw,600px)] flex items-center justify-center overflow-hidden text-center  aspect-video">
                  <FitText>
                    {lines.map((line, index) => (
                      <h2
                        key={index}
                        className="font-[Arial] font-semibold text-wrap select-none leading-none"
                      >
                        {line}
                      </h2>
                    ))}
                  </FitText>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
