import { MdArrowLeft, MdArrowRight } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const Control = () => {
  const { song, setInfoSlide, numberOfSlides, currentSlide } = useActiveSongPresentation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    window.electronAPI.onSlideData((_, { currentSlide, totalSlides }) => {
      setInfoSlide(currentSlide, totalSlides)
      setIsLoading(false)
    })
  }, [song])

  const sendCommand = (command: string) => {
    window.electronAPI.sendToPresentation(command)
  }

  return (
    <div className="h-full p-3">
      {song && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tigh">{song.title}</h2>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex size-2.5 bg-green-500 rounded-full"></span>
              </span>
              <span className="text-sm font-semibold tracking-tight text-green-500">Live</span>
            </div>
          </div>
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
                    <p className="font-semibold select-none">
                      Slide {currentSlide} din {numberOfSlides}
                    </p>
                    <Progress
                      value={(currentSlide / numberOfSlides) * 100}
                      className="h-2 rounded-none"
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
        </div>
      )}
    </div>
  )
}

export default Control
