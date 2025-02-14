'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { FitText } from '@/components/fit-text'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { SimplySong } from '@/types'

interface PreviewCreatedSongProps {
  song: SimplySong | null
  isOpen: boolean
  onClose: () => void
}

export const PreviewCreatedSong = ({ song, isOpen, onClose }: PreviewCreatedSongProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[70%] h-[85%] p-0 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              {song && (
                <>
                  <h2 className="p-4 text-2xl font-bold text-center border-b">{song.title}</h2>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(song.slides).map(([slideNumber, lines]) => (
                        <motion.div
                          key={Number.parseInt(slideNumber)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: Number.parseInt(slideNumber) * 0.1 }}
                          className="flex items-center justify-center p-2 border rounded-lg shadow aspect-video"
                        >
                          <FitText maxFontSize={100}>
                            <div className="text-center">
                              {lines.map((line, index) => (
                                <h3
                                  key={index}
                                  className="font-semibold leading-tight select-none text-wrap"
                                >
                                  {line}
                                </h3>
                              ))}
                            </div>
                          </FitText>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
