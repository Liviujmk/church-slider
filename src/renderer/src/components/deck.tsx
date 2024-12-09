import Reveal, { Options } from 'reveal.js'
import { useEffect, useRef } from 'react'

import 'reveal.js/dist/reveal.css'

type DeckProps = {
  options?: Options
  children: React.ReactNode
}

export default function Deck({ options, children }: DeckProps) {
  const deckRef = useRef<HTMLDivElement>(null)

  // Todo: Distroy and create a new deck on every presentation
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

    deck.initialize()

    const updateSlideData = (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { indexh } = event as any
      const totalSlides = deck.getTotalSlides()
      const currentSlide = indexh + 1
      window.electronAPI.sendSlideData(currentSlide, totalSlides)
    }

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
  }, [children, options])

  return (
    <div className="!h-screen reveal" ref={deckRef}>
      <div className="flex items-center justify-center slides">{children}</div>
    </div>
  )
}
