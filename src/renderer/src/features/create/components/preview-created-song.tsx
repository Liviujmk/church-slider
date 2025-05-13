import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FitText } from '@/components/fit-text'

import { SimplySong } from '@/types'

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
          <DialogContent className="max-w-[70%] h-[85%] p-0 flex flex-col">
            <div className="relative flex flex-col h-full">
              {song && (
                <>
                  <h2 className="p-4 text-2xl font-bold text-center border-b">{song.title}</h2>
                  <ScrollArea className="flex-1 px-4">
                    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(song.slides).map(([slideNumber, lines]) => (
                        <motion.div
                          key={Number.parseInt(slideNumber)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: Number.parseInt(slideNumber) * 0.1 }}
                          className="flex items-center justify-center p-3 border rounded-lg shadow aspect-video"
                        >
                          <FitText
                            maxFontSize={200}
                            className="flex flex-col items-center justify-center"
                          >
                            <div className="text-center">
                              {lines.map((line, index) => (
                                <h3
                                  key={index}
                                  className="font-semibold leading-none select-none text-wrap"
                                >
                                  {line}
                                </h3>
                              ))}
                            </div>
                          </FitText>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex justify-between p-4 border-t">
                    <Alert variant="warning" className="w-fit">
                      <AlertDescription className="mt-1">
                        Dacă strofele nu sunt împarțite corect pe slideuri, inserează un rând gol
                        între strofe.
                      </AlertDescription>
                    </Alert>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
