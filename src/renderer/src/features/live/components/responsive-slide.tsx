import { FitText } from '@/components/fit-text'
import useFullDarkMode from '@/store/useFullDarkMode'
import { useEffect, useState } from 'react'

type ResponsiveSlideProps = {
  slideNumber?: string
  currentSlide?: number
  lyric: string[]
  live?: boolean
  maxFontSize?: number
}

export const ResponsiveSlide = ({
  slideNumber,
  currentSlide,
  lyric,
  live = false,
  maxFontSize = 2000
}: ResponsiveSlideProps) => {
  const { fullDarkMode } = useFullDarkMode()
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setTrigger((prev) => prev + 1)
  }, [lyric])

  useEffect(() => {
    console.log(trigger)
  }, [])

  return (
    <div
      data-slide-number={slideNumber && parseInt(slideNumber)}
      className={`${
        slideNumber && parseInt(slideNumber) === currentSlide && 'ring-2 ring-[#006BE9]'
      } border p-1 ${fullDarkMode ? 'dark:bg-white dark:text-black' : ''}`}
    >
      <div
        className={`${
          live ? 'max-w-[clamp(200px,32vw,600px)]' : 'w-[clamp(200px,24vw,600px)]'
        } flex items-center justify-center overflow-hidden text-center p-1  aspect-video`}
      >
        <FitText maxFontSize={maxFontSize}>
          {lyric.map((line, index) => (
            <h2
              key={index}
              className="font-[Arial] font-semibold text-wrap select-none leading-none"
            >
              {line}
            </h2>
          ))}
        </FitText>
      </div>
    </div>
  )
}
