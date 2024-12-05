import { useEffect, useState } from 'react'

import Clock from '@/components/clock'
import Deck from '@/components/deck'
import Slide from '@/components/slide'

import { Lyric } from '@/types/index'

const PresentationPage = (): JSX.Element => {
  const [data, setData] = useState<Lyric>()

  useEffect(() => {
    window.electronAPI.onPresentationCommand((_event, arg) => {
      setData(arg.data)
    })

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setData(undefined)
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      {data ? (
        <Deck>
          {Object.entries(data.slides).map(([slideNumber, lines]) => (
            <Slide key={parseInt(slideNumber)}>
              <div className="m-4">
                <div className="r-fit-text">
                  {lines.map((line, index) => (
                    <h2 key={index} className="font-[Arial] font-semibold text-wrap">
                      {line}
                    </h2>
                  ))}
                </div>
              </div>
            </Slide>
          ))}
        </Deck>
      ) : (
        <div className="flex items-end justify-end h-full p-24">
          <Clock />
        </div>
      )}
    </div>
  )
}

export default PresentationPage
