import { useEffect, useRef } from 'react'

import {
  ControlBar,
  CurrentSlide,
  LivePlaylistPanel,
  LivePreviewSlidesPanel,
  LiveSearchPanel
} from '@/features/live/components'

import { useAppState } from '@/features/live/hooks/useAppState'
import { useEscapeKey } from '@/features/live/hooks/useDistroyPresentation'
import { useSearchInput } from '@/features/live/hooks/useSearchInput'
import { useSlideNavigation } from '@/features/live/hooks/useSlideNavigation'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useGoLive } from '@/features/live/hooks/useGoLive'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const LivePage = () => {
  const { song, live } = useActiveSongPresentation()
  const handleGoLive = useGoLive()
  useSearchInput()
  useAppState()
  useSlideNavigation()
  useEscapeKey()

  const { getItem: getLivePreviewSlidesPanelSize, setItem: setLivePreviewSlidesPanelSize } =
    useLocalStorage('livePreviewPanelSize')
  const { getItem: getLiveSearchPanelSize, setItem: setLiveSearchPanelSize } =
    useLocalStorage('liveSearchPanelSize')
  const { getItem: getLivePlaylistPanelSize, setItem: setLivePlaylistPanelSize } =
    useLocalStorage('livePlaylistPanelSize')

  const livePreviewSlidesPanelSizeRef = useRef<number>(getLivePreviewSlidesPanelSize() ?? 36)
  const liveSearchPanelSizeRef = useRef<number>(getLiveSearchPanelSize() ?? 36)
  const livePlaylistPanelSizeRef = useRef<number>(getLivePlaylistPanelSize() ?? 36)

  const handleResizeLivePreviewSlidesPanel = (size: number) => {
    livePreviewSlidesPanelSizeRef.current = size
    setLivePreviewSlidesPanelSize(size)
  }
  const handleResizeLiveSearchPanel = (size: number) => {
    liveSearchPanelSizeRef.current = size
    setLiveSearchPanelSize(size)
  }
  const handleResizeLivePlaylistPanel = (size: number) => {
    livePlaylistPanelSizeRef.current = size
    setLivePlaylistPanelSize(size)
  }

  useEffect(() => {
    if (live) return

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'f') {
        if (!song) return
        handleGoLive(song)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleGoLive, song, live])

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            minSize={24}
            maxSize={40}
            defaultSize={liveSearchPanelSizeRef.current}
            onResize={handleResizeLiveSearchPanel}
          >
            <LiveSearchPanel />
          </ResizablePanel>
          <ResizableHandle className="mt-[2px] w-[.5px]" />
          <ResizablePanel defaultSize={65} className="flex flex-col">
            <ControlBar />
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                defaultSize={livePlaylistPanelSizeRef.current}
                minSize={24}
                onResize={handleResizeLivePlaylistPanel}
              >
                <LivePlaylistPanel />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} minSize={40} maxSize={70}>
                <CurrentSlide />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={livePreviewSlidesPanelSizeRef.current}
        onResize={handleResizeLivePreviewSlidesPanel}
        minSize={20}
        maxSize={50}
      >
        <LivePreviewSlidesPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default LivePage
