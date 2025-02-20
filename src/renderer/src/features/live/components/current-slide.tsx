import { AnimatePresence, motion } from 'framer-motion'
import { GrPowerReset } from 'react-icons/gr'
import { useMemo } from 'react'

import { ResponsiveSlide } from '@/features/live/components/responsive-slide'
import { LiveBounce } from '@/features/live/components/live-bounce'
import Control from '@/features/live/components/control'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const CurrentSlide = () => {
  const {
    song,
    live,
    currentSlide,
    setInfoSlide,
    delete: deletePreviewSong
  } = useActiveSongPresentation()
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } }
  }

  const handleDeleteFromPreview = () => {
    setInfoSlide(null, null)
    deletePreviewSong()
  }

  const lyric = useMemo(() => {
    if (!song) return null
    if (currentSlide) {
      return Object.values(song.slides)[currentSlide - 1]
    }
    return Object.values(song.slides)[0]
  }, [song, live, currentSlide])

  return (
    <div className="flex flex-col h-full px-4 py-3 select-none">
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
      <AnimatePresence mode="wait">
        {!song ? (
          <motion.div
            key="no-song"
            className="flex items-center justify-center border border-dashed aspect-video border-neutral-400 dark:border-neutral-600 max-w-[400px] relative left-1/2 -translate-x-1/2"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        ) : !live || !currentSlide ? (
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

export default CurrentSlide
