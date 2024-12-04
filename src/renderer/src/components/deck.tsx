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
    if (deckRef.current) {
      const deck = new Reveal(deckRef.current as HTMLElement, {
        hash: false,
        controls: false,
        progress: false,
        overview: false,
        transition: 'none',
        disableLayout: true,
        ...options
      })

      deck.initialize().then(() => console.log('Reveal.js initialized successfully'))

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
    }

    return undefined
  }, [children, options])

  return (
    <div className="!h-screen reveal" ref={deckRef}>
      <div className="flex items-center justify-center slides">{children}</div>
    </div>
  )
}
