import { useEffect, useRef, useState } from 'react'
import { MdModeStandby } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import Control from '@/components/control'
import LivePlaylist from '@/components/live-playlist'
import LiveSearch from '@/components/live-search'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import presentationIcon from '../../assets/icons/Vector.svg'
import PreviewSlides from '@/components/preview-slides'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const LivePage = () => {
  const [currentSlide, setCurrentSlide] = useState<number | null>(null)
  const [totalSlides, setTotalSlides] = useState<number | null>(null)
  const [hasClock, setClock] = useState<boolean>(false)
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    window.electronAPI.onSlideData((_, { currentSlide, totalSlides }) => {
      setCurrentSlide(currentSlide)
      setTotalSlides(totalSlides)
    })

    window.electronAPI.getAppState().then((value) => {
      if (!value) return
      setClock(value.withClock)
    })
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
    setCurrentSlide(null)
    setTotalSlides(null)
    deleteActiveSong()
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
      <ResizablePanel minSize={70}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={33} minSize={24} maxSize={40}>
            <LiveSearch />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={64} className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <h2 className="font-bold">Prezentare</h2>
              <div className="space-x-3">
                <Button className="space-x-1 rounded-xl bg-[#006BE9] hover:bg-[#66E200]">
                  <img src={presentationIcon} alt="Icon" width={16} />
                  <span>Go Live</span>
                </Button>
                <Button
                  className="space-x-1 rounded-xl"
                  variant="outline"
                  onClick={handleDistroyWindow}
                  disabled={totalSlides === null}
                >
                  <MdModeStandby size={16} />
                  <span>Standby</span>
                </Button>
              </div>
            </div>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={24}>
                <LivePlaylist />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} minSize={24}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={60} minSize={60} maxSize={70}>
                    <div className="flex items-center justify-center h-full p-6">
                      <span className="font-semibold">Three</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={40} minSize={30} maxSize={40} className="h-full">
                    <Control currentSlide={currentSlide} totalSlides={totalSlides} />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel maxSize={30} defaultSize={25} minSize={20}>
        {/* <PreviewSlides /> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default LivePage
