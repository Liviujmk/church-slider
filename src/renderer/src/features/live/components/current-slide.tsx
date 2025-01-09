import { motion, AnimatePresence } from 'framer-motion'
import { GrPowerReset } from 'react-icons/gr'
import { CgDarkMode } from 'react-icons/cg'
import { useMemo } from 'react'

import Control from '@/features/live/components/control'
import { LiveBounce } from '@/features/live/components/live-bounce'
import { ResponsiveSlide } from '@/features/live/components/responsive-slide'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useTheme } from '@/components/theme-provider'
import useFullDarkMode from '@/store/useFullDarkMode'
import CustomTooltip from '@/components/custom-tooltip'

const CurrentSlide = () => {
  const {
    song,
    live,
    currentSlide,
    setInfoSlide,
    delete: deletePreviewSong
  } = useActiveSongPresentation()
  const { theme } = useTheme()

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
    if (live && currentSlide) {
      return Object.values(live.slides)[currentSlide - 1]
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
                {theme === 'dark' && <ToggleFullDarkMode />}
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
              {theme === 'dark' && <ToggleFullDarkMode />}
            </div>
            <Control />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ToggleFullDarkMode = ({ className }: { className?: string }) => {
  const { toggleFullDarkMode, fullDarkMode } = useFullDarkMode()

  return (
    <CustomTooltip label="Nu va afecta fereastra de prezentare!">
      <CgDarkMode
        size={22}
        onClick={() => toggleFullDarkMode()}
        className={`${className} ${fullDarkMode ? 'rotate-180' : ''} cursor-pointer`}
      />
    </CustomTooltip>
  )
}

export default CurrentSlide
