import { NothingLive } from './nothing-live'
import { AnimatePresence, motion } from 'framer-motion'
import { GrPowerReset } from 'react-icons/gr'
import { useMemo } from 'react'

import { ResponsiveSlide } from '@/features/live/components/responsive-slide'
import { LiveBounce } from '@/features/live/components/live-bounce'
import { Control } from '@/features/live/components/current-slide-panel/control'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

export const CurrentSlidePanel = () => {
  const {
    song,
    live,
    currentSlide,
    setInfoSlide,
    delete: deletePreviewSong,
    resetPreviewCurrentSlide
  } = useActiveSongPresentation()

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1, duration: 0.01 } }
  }

  const handleDeleteFromPreview = () => {
    setInfoSlide(null, null)
    deletePreviewSong()
    resetPreviewCurrentSlide()
  }

  const lyric = useMemo(() => {
    if (!song) return null
    if (currentSlide) {
      return Object.values(song.slides)[currentSlide - 1]
    }
    return Object.values(song.slides)[0]
  }, [song, live, currentSlide])

  if (!song) {
    return <NothingLive />
  }

  return (
    <div className="flex flex-col h-full px-4 py-3 select-none">
      <h2 className="mb-4 font-semibold">
        {live ? (
          <span className="flex items-center w-full gap-2 py-1 pl-1 leading-none">
            <LiveBounce />
            {song?.title}
          </span>
        ) : (
          'Previzualizare'
        )}
      </h2>
      <AnimatePresence mode="wait">
        {!live || !currentSlide ? (
          <motion.div
            key="preview"
            className="flex flex-col items-center justify-between w-full h-full"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-end gap-1.5">
              {lyric && <ResponsiveSlide lyric={lyric} live maxFontSize={400} />}
              <div className="flex gap-1">
                <GrPowerReset
                  className="cursor-pointer dark:text-neutral-200"
                  size={22}
                  onClick={handleDeleteFromPreview}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="live-slide"
            className="flex flex-col items-center justify-between w-full h-full"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-end gap-1.5">
              {lyric && <ResponsiveSlide lyric={lyric} live maxFontSize={350} />}
            </div>
            <Control />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
