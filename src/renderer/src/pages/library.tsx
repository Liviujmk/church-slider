import { useEffect, useRef, useState } from 'react'

import { SongsListContainer } from '@/features/library/components/songs-list-container'
import { LayoutBar } from '@/features/library/components/layout-bar'
import SearchPanel from '@/features/library/components/search-panel'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useLayoutPreference } from '@/features/library/hooks/use-layout-preference'

export type Layout = 'grid' | 'list'

const LibraryPage = () => {
  const { layout, setLayout, isCompact, setIsCompact } = useLayoutPreference()
  const [filter, setFilter] = useState<string>('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ScrollArea className="h-[calc(100vh-1.75rem)] max-w-screen-xl p-4 mx-auto">
      <div className="space-y-4">
        <SearchPanel onChange={(event) => setFilter(event.filter)} ref={searchInputRef} />
        <LayoutBar
          setIsCompact={setIsCompact}
          isCompact={isCompact}
          onChange={(layout) => setLayout(layout)}
          layout={layout}
        />
        <SongsListContainer layout={layout} isCompact={isCompact} filter={filter} />
      </div>
    </ScrollArea>
  )
}

export default LibraryPage
