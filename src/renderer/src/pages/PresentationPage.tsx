import { useEffect, useState } from 'react'

import Clock from '@/components/clock'
import Deck from '@/components/deck'
import Slide from '@/components/slide'

import { Lyric } from './library'

const PresentationPage = (): JSX.Element => {
  const [data, setData] = useState<Lyric>()

  useEffect(() => {
    window.electronAPI.onPresentationCommand((_event, arg) => {
      setData(arg.data)
    })

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setData(undefined)
    })
  }, [])

  return (
    <Deck>
      {data ? (
        Object.entries(data.slides).map(([slideNumber, lines]) => (
          <Slide key={parseInt(slideNumber)}>
            <div className="max-h-screen m-4">
              <div className="r-fit-text">
                {lines.map((line, index) => (
                  <h2 key={index} className="font-[Arial] font-semibold text-wrap">
                    {line}
                  </h2>
                ))}
              </div>
            </div>
          </Slide>
        ))
      ) : (
        <div className="flex items-end justify-end w-full h-full">
          <Clock />
        </div>
      )}
    </Deck>
  )
}

export default PresentationPage
