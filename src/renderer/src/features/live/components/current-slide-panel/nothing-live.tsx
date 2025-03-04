import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function NothingLive() {
  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1, duration: 0.01 } }
  }

  return (
    <div className="flex flex-col h-full px-4 py-3 select-none ">
      <h2 className="mb-4 font-semibold">Nimic live</h2>
      <motion.div
        key="no-song"
        className={cn(
          'flex items-center justify-center border border-dashed aspect-video border-neutral-400 dark:border-neutral-600 relative left-1/2 -translate-x-1/2 max-w-[clamp(200px,32vw,600px)]'
        )}
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />
    </div>
  )
}
