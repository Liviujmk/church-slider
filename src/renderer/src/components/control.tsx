import { useEffect, useState } from 'react'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const Control = () => {
  const [currentSlide, setCurrentSlide] = useState<number | null>(null)
  const [totalSlides, setTotalSlides] = useState<number | null>(null)

  const sendCommand = (command: string) => {
    window.electronAPI.sendToPresentation(command)
  }

  useEffect(() => {
    window.electronAPI.onSlideData((_, { currentSlide, totalSlides }) => {
      setCurrentSlide(currentSlide)
      setTotalSlides(totalSlides)
    })
  }, [])

  return (
    <div className="flex flex-col justify-between h-full p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">This is the title</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex size-2.5 bg-green-500 rounded-full"></span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-green-500">Live</span>
        </div>
      </div>
      <div className="mb-4">
        {currentSlide && totalSlides ? (
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
                Diapozitiv {currentSlide} din {totalSlides}
              </p>
              <Progress value={(currentSlide / totalSlides) * 100} className="h-2 rounded-none" />
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
        ) : null}
      </div>
    </div>
  )
}

export default Control
