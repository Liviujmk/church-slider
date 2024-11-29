import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'

export default function Deck({
  options,
  children
}: {
  options?: object
  children: React.ReactNode
}) {
  const deckRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log('Boom')
  }, [])

  useEffect(() => {
    const deck = new Reveal(deckRef.current as HTMLElement, {
      hash: false,
      controls: false,
      progress: false,
      overview: false,
      transition: 'none',
      ...options
    })
    deck.initialize()

    window.electronAPI.onCommand((_, command: string) => {
      if (command === 'next') {
        deck.next()
        // deck.getState().indexh
      }
      if (command === 'prev') {
        deck.prev()
        // deck.getTotalSlides()
      }
    })
  }, []) // Ensure this runs only once on mount

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">{children}</div>
    </div>
  )
}
