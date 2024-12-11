import { useEffect, useState } from 'react'

import { FitText } from '@/components/fit-text'
import TimerClock from '@/components/clock'
import Deck from '@/components/deck'
import Slide from '@/components/slide'
import { Song as SongType } from '@/types/index'

const PresentationPage = (): JSX.Element => {
  const [data, setData] = useState<SongType>()
  const [clock, setClock] = useState<boolean>(false)

  useEffect(() => {
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
    <div className="h-screen max-h-screen overflow-hidden">
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
          <TimerClock className="font-bold text-neutral-800 text-[180px] leading-none" />
        </div>
      ) : null}
    </div>
  )
}

export default PresentationPage
