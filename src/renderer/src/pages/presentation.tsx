import { useEffect, useState } from 'react'

import { FitText } from '@/components/fit-text'
import { Clock } from '@/components/clock'
import Deck from '@/features/presentation/components/deck'
import Slide from '@/features/presentation/components/slide'
import { Song as SongType } from '@/types/index'
import { useClock } from '@/store/useClock'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Theme } from '@/features/settings/components/presentation-theme-picker'

const PresentationPage = (): JSX.Element => {
  const { getItem } = useLocalStorage('presentationTheme')
  const { clock, setClock } = useClock()

  const [theme, setTheme] = useState<Theme>({
    name: 'Default',
    background: 'white',
    text: 'black'
  })
  const [data, setData] = useState<SongType>()

  useEffect(() => {
    const theme: Theme = getItem()
    if (theme) setTheme(theme)

    window.electronAPI.onPresentationCommand((_event, arg) => {
      setData(arg.data)
    })

    window.electronAPI.onShowClock((message) => {
      if (message) setData(undefined)
    })

    window.electronAPI.getAppState().then((value) => {
      if (!value) return
      setClock(value.withClock)
    })
  }, [])

  return (
    <div
      className="h-screen max-h-screen overflow-hidden"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {data ? (
        <Deck>
          {Object.entries(data.slides).map(([slideNumber, lines]) => (
            <Slide key={parseInt(slideNumber)}>
              <FitText>
                {lines.map((line, index) => (
                  <h2
                    key={index}
                    className="font-[Arial] font-semibold text-wrap select-none leading-none"
                  >
                    {line}
                  </h2>
                ))}
              </FitText>
            </Slide>
          ))}
        </Deck>
      ) : clock ? (
        <div className="flex items-end justify-end h-full p-24">
          <Clock className="font-bold text-[180px] leading-none" />
        </div>
      ) : null}
    </div>
  )
}

export default PresentationPage
