import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ResponsiveSlide } from '@/features/live/components/responsive-slide'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

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
  }, [currentSlide, live])

  const slideAnimation = {
    initial: () => ({ opacity: 0, x: -50 }),
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  }

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
            <div className="flex w-full px-4 pb-4 space-x-2.5 mt-1">
              <AnimatePresence>
                {Object.entries(live.slides).map(([slideNumber, lines]) => (
                  <motion.div
                    key={slideNumber}
                    onClick={() => {
                      window.electronAPI.goToSlide(parseInt(slideNumber) - 1)
                    }}
                    className="hover:cursor-pointer"
                    initial="initial"
                    animate="animate"
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.3, ease: 'easeIn' }
                    }}
                    custom={parseInt(slideNumber) - 1}
                    variants={slideAnimation}
                  >
                    <ResponsiveSlide
                      key={parseInt(slideNumber)}
                      currentSlide={currentSlide}
                      slideNumber={slideNumber}
                      lyric={lines}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <p className="mx-auto text-sm font-semibold select-none text-stone-400 w-fit">
            Nicio previzualizare
          </p>
        </div>
      )}
    </div>
  )
}

export default PreviewSlides
