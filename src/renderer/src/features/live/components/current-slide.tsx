import { motion, AnimatePresence } from 'framer-motion'

import { GrPowerReset } from 'react-icons/gr'

import Control from '@/features/live/components/control'
import { LiveBounce } from '@/features/live/components/live-bounce'
import { ResponsiveSlide } from '@/features/live/components/responsive-slide'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const CurrentSlide = () => {
  const { song, live, currentSlide } = useActiveSongPresentation()

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } }
  }

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
      <AnimatePresence mode="wait">
        {!song ? (
          <motion.div
            key="no-song"
            className="flex items-center justify-center border border-dashed rounded aspect-video border-neutral-400 max-w-[400px] relative left-1/2 -translate-x-1/2 dark:bg-white"
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
              <ResponsiveSlide lyric={Object.values(song.slides)[0]} live />
              <GrPowerReset className="dark:text-neutral-200" />
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
            {<ResponsiveSlide lyric={Object.values(live.slides)[currentSlide - 1]} live />}
            <Control />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CurrentSlide
