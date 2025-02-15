import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import LivePreviewSlidesPanel from '@/features/live/components/live-preview-slides-panel'
import { useSlideNavigation } from '@/features/live/hooks/useSlideNavigation'
import { useEscapeKey } from '@/features/live/hooks/useDistroyPresentation'
import LiveSearchPanel from '@/features/live/components/live-search-panel'
import LivePlaylistPanel from '@/features/live/components/live-playlist'
import { useSearchInput } from '@/features/live/hooks/useSearchInput'
import CurrentSlide from '@/features/live/components/current-slide'
import { useAppState } from '@/features/live/hooks/useAppState'
import ControlBar from '@/features/live/components/control-bar'
import { useState } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

const LOCAL_STORAGE_KEY = 'livePreviewPanelSize'

const LivePage = () => {
  useSearchInput()
  useAppState()
  useSlideNavigation()
  useEscapeKey()

  const { getItem, setItem } = useLocalStorage(LOCAL_STORAGE_KEY)
  const [panelSize, setPanelSize] = useState<number>(() => getItem() ?? 36)

  const handleResize = (size: number) => {
    setPanelSize(size)
    setItem(size)
  }

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} minSize={24} maxSize={40}>
            <LiveSearchPanel />
          </ResizablePanel>
          <ResizableHandle className="mt-[2px] w-[.5px]" />
          <ResizablePanel defaultSize={65} className="flex flex-col">
            <ControlBar />
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={24}>
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
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={panelSize} minSize={20} maxSize={50} onResize={handleResize}>
        <LivePreviewSlidesPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default LivePage
