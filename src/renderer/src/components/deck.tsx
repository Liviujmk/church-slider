import { useEffect, useRef } from 'react'
import Reveal, { Options } from 'reveal.js'

import 'reveal.js/dist/reveal.css'

export default function Deck({
  options,
  children
}: {
  options?: Options
  children: React.ReactNode
}) {
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

    deck.initialize()

    deck.on('ready', (event: Event) => {
      const { indexh } = event

      console.log(deck.getSlides())

      const totalSlides = deck.getTotalSlides()
      const currentSlide = indexh + 1

      window.electronAPI.sendSlideData(currentSlide, totalSlides)
    })

    deck.on('slidechanged', (event: Event) => {
      const { indexh } = event

      const totalSlides = deck.getTotalSlides()
      const currentSlide = indexh + 1

      window.electronAPI.sendSlideData(currentSlide, totalSlides)
    })

    window.electronAPI.onCommand((_, command: string) => {
      if (command === 'next') {
        deck.next()
      }
      if (command === 'prev') {
        deck.prev()
      }
    })

    return () => {
      deck.destroy()
    }
  }, [children, options])

  return (
    <div className="!h-screen reveal" ref={deckRef}>
      <div className="flex items-center justify-center slides">{children}</div>
    </div>
  )
}
