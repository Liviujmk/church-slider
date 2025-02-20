import Reveal, { Options } from 'reveal.js'
import { useEffect, useRef } from 'react'

import 'reveal.js/dist/reveal.css'

type DeckProps = {
  options?: Options
  children: React.ReactNode
  startSlide?: number
}

export default function Deck({ options, children, startSlide = 0 }: DeckProps) {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deck = new Reveal(deckRef.current as HTMLElement, {
      hash: false,
      controls: false,
      progress: false,
      overview: false,
      transition: 'none',
      disableLayout: true,
      ...options
    })

    deck.initialize().then(() => {
      const slides = deck.getSlidesElement()?.innerHTML
      if (slides) window.electronAPI.sendSlides(slides)

      if (startSlide > 0 && startSlide < deck.getTotalSlides()) {
        deck.slide(startSlide)
      }
    })

    const updateSlideData = (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { indexh } = event as any
      const totalSlides = deck.getTotalSlides()
      const currentSlide = indexh + 1
      window.electronAPI.sendSlideData(currentSlide, totalSlides)
    }

    window.electronAPI.onReceiveNumberOfSlide((numberOfSlide) => {
      if (numberOfSlide >= 0 && numberOfSlide < deck.getTotalSlides()) {
        deck.slide(numberOfSlide)
      }
    })

    deck.on('ready', updateSlideData)
    deck.on('slidechanged', updateSlideData)

    const commandHandler = (_, command: string) => {
      if (command === 'next') deck.next()
      if (command === 'prev') deck.prev()
    }

    window.electronAPI.onCommand(commandHandler)

    return () => {
      deck.off('ready', updateSlideData)
      deck.off('slidechanged', updateSlideData)
      deck.destroy()
    }
  }, [])

  return (
    <div className="h-full reveal" ref={deckRef}>
      <div className="h-full slides">{children}</div>
    </div>
  )
}
