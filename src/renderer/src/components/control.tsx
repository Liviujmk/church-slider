import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const Control = () => {
  const { live, setInfoSlide, numberOfSlides, currentSlide } = useActiveSongPresentation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (live) {
      setIsLoading(true)

      window.electronAPI.onSlideData((_, { currentSlide, totalSlides }) => {
        console.log('Received Slide Data:', { currentSlide, totalSlides })

        if (currentSlide !== null && totalSlides !== null) {
          setInfoSlide(currentSlide, totalSlides)
        }
      })

      setIsLoading(false)
    }
  }, [live, currentSlide, numberOfSlides])

  const sendCommand = (command: string) => {
    window.electronAPI.sendToPresentation(command)
  }

  return (
    <div>
      {live && (
        <div className="mb-4">
          {isLoading ? (
            <div className="flex items-center justify-center gap-4">
              <BeatLoader size={12} color="#006BE9" />
            </div>
          ) : (
            currentSlide &&
            numberOfSlides && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  asChild
                  size="icon"
                  className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
                  variant="outline"
                  onClick={() => sendCommand('prev')}
                >
                  <MdArrowLeft size={20} />
                </Button>
                <div className="space-y-2">
                  <p className="mx-auto font-semibold select-none w-fit">
                    Slide <motion.span>{currentSlide}</motion.span> din {numberOfSlides}
                  </p>
                  <Progress
                    value={(currentSlide / numberOfSlides) * 100}
                    className="h-2 rounded-none w-[120px]"
                  />
                </div>
                <Button
                  asChild
                  size="icon"
                  className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
                  variant="outline"
                  onClick={() => sendCommand('next')}
                >
                  <MdArrowRight size={20} />
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Control
