import { useEffect, useState } from 'react'

import { Theme } from '@/features/settings/components/presentation-theme-picker'
import { useFont } from '@/features/settings/context/font-context'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { FitText } from '@/components/fit-text'

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
  const [trigger, setTrigger] = useState(0)

  const { getItem } = useLocalStorage('presentationTheme')
  const { font } = useFont()

  const [presentaionTheme, setPresentationTheme] = useState<Theme>({
    name: 'Default',
    background: 'white',
    text: 'black'
  })

  useEffect(() => {
    const theme: Theme = getItem()
    if (theme) setPresentationTheme(theme)
  }, [getItem])

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
      } border p-1`}
      style={{
        backgroundColor: presentaionTheme.background,
        color: presentaionTheme.text
      }}
    >
      <div
        className={`${
          live ? 'max-w-[clamp(200px,32vw,600px)]' : 'w-[clamp(200px,24vw,600px)]'
        } flex items-center justify-center overflow-hidden text-center p-1  aspect-video `}
      >
        <FitText maxFontSize={maxFontSize} className="justify-center">
          {lyric.map((line, index) => (
            <h2
              key={index}
              className="font-semibold leading-none select-none text-wrap"
              style={{ fontFamily: font }}
            >
              {line}
            </h2>
          ))}
        </FitText>
      </div>
    </div>
  )
}
