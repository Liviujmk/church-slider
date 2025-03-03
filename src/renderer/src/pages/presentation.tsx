import { useEffect, useState } from 'react'

import { Theme } from '@/features/settings/components/presentation-theme-picker'
import Slide from '@/features/presentation/components/slide'
import Deck from '@/features/presentation/components/deck'

import { FitText } from '@/components/fit-text'
import { Clock } from '@/components/clock'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { Song as SongType } from '@/types/index'
import { useClock } from '@/store/useClock'
import { cn } from '@/lib/utils'

const PresentationPage = (): JSX.Element => {
  const { getItem } = useLocalStorage('presentationTheme')
  const { clock, setClock } = useClock()
  const { getItem: getFont } = useLocalStorage('presentation-font')
  const font = getFont()

  const [theme, setTheme] = useState<Theme>({
    name: 'Default',
    background: 'white',
    text: 'black'
  })
  const [data, setData] = useState<SongType>()
  const [startSlide, setStartSlide] = useState<number | undefined>(undefined)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const theme: Theme = getItem()
    if (theme) setTheme(theme)

    window.electronAPI.onPresentationCommand((_event, arg) => {
      setData(arg.data)
      setStartSlide(arg.startSlide)
    })

    window.electronAPI.onShowClock((message) => {
      if (message) setData(undefined)
    })

    window.electronAPI.getAppState().then((value) => {
      if (!value) return
      setClock(value.withClock)
    })
  }, [])

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setIsReady(true)
      }, 50)
    }
  }, [data])

  return (
    <div
      className="h-screen max-h-screen overflow-hidden"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {data ? (
        <Deck startSlide={startSlide}>
          {Object.entries(data.slides).map(([slideNumber, lines]) => (
            <Slide key={parseInt(slideNumber)}>
              <FitText>
                <div
                  className={cn('flex-grow flex flex-col justify-center p-12')}
                  style={{
                    opacity: isReady ? 1 : 0
                  }}
                >
                  {lines.map((line, index) => (
                    <h2
                      key={index}
                      className="font-semibold leading-none select-none text-wrap"
                      style={{ fontFamily: font! }}
                    >
                      {line}
                    </h2>
                  ))}
                </div>
                {data.lyricsCount === Number(slideNumber) && (
                  <div className="self-center pt-8 pb-1 text-2xl font-bold">Amin!</div>
                )}
              </FitText>
            </Slide>
          ))}
        </Deck>
      ) : clock ? (
        <div className="relative h-full">
          <Clock className="absolute bottom-20 right-20 font-bold text-[140px] leading-none" />
        </div>
      ) : null}
    </div>
  )
}

export default PresentationPage
