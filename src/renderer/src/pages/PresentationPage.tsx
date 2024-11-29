import Deck from '@/components/deck'
import Slide from '@/components/Slide'
import { useState } from 'react'

const PresentationPage = (): JSX.Element => {
  const [data] = useState(Array.from({ length: 10 }, (_, i) => `Slide ${i + 1}`))

  return (
    <div className="h-screen">
      <div className="h-full">
        <Deck>
          {data.map((slide) => (
            <Slide key={slide}>
              <p className="text-[9.5vw] tracking-tighter leading-[10vw] font-bold md:text-[10vw] lg:text-[10.2vw] xl:text-[10.3vw]">
                {slide}
              </p>
            </Slide>
          ))}
        </Deck>
      </div>
    </div>
  )
}

export default PresentationPage
