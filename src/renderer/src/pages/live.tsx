import { useEffect, useRef } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import CurrentSlide from '@/features/live/components/current-slide'
import LivePlaylist from '@/features/live/components/live-playlist'
import LiveSearch from '@/features/live/components/live-search'
import PreviewSlides from '@/features/live/components/preview-slides'
import ControlBar from '@/features/live/components/control-bar'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import { useClock } from '@/store/useClock'

const LivePage = () => {
  const { setInfoSlide, stopLive, live } = useActiveSongPresentation()
  const { clock: hasClock, setClock } = useClock()
  const { delete: deleteActiveSong } = useActiveSongPresentation()

  const searchInputRef = useRef<HTMLInputElement>(null)

  const setSearchInputRef = useSearchInputStore((state) => state.setSearchInputRef)

  useEffect(() => {
    setSearchInputRef(searchInputRef)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    window.electronAPI.getAppState().then((value) => {
      if (!value) return
      setClock(value.withClock)
    })
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.code === 'Space')
        window.electronAPI.sendToPresentation('next')
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
        window.electronAPI.sendToPresentation('prev')
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleDistroyWindow = () => {
    if (hasClock) window.electronAPI.sendShowClock(true)
    else window.electronAPI.distroyPresentationWindow()
    setInfoSlide(null, null)
    deleteActiveSong()
    if (live) stopLive()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleDistroyWindow()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleDistroyWindow, hasClock])

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} minSize={24} maxSize={40}>
            <LiveSearch />
          </ResizablePanel>
          <ResizableHandle className="mt-[2px] w-[.5px]" />
          <ResizablePanel defaultSize={65} className="flex flex-col">
            <ControlBar />
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={24}>
                <LivePlaylist />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} minSize={40} maxSize={70}>
                <CurrentSlide />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35} minSize={20} maxSize={50}>
        <PreviewSlides />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default LivePage
