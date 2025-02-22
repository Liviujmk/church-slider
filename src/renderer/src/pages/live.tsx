import { useRef } from 'react'

import {
  LivePreviewSlidesPanel,
  LiveSearchPanel,
  LivePlaylistPanel,
  CurrentSlide,
  ControlBar
} from '@/features/live/components'

import { useSlideNavigation } from '@/features/live/hooks/useSlideNavigation'
import { useEscapeKey } from '@/features/live/hooks/useDistroyPresentation'
import { useSearchInput } from '@/features/live/hooks/useSearchInput'
import { useAppState } from '@/features/live/hooks/useAppState'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useLocalStorage } from '@/hooks/use-local-storage'

const LOCAL_STORAGE_KEY = 'livePreviewPanelSize'

const LivePage = () => {
  useSearchInput()
  useAppState()
  useSlideNavigation()
  useEscapeKey()

  const { getItem, setItem } = useLocalStorage(LOCAL_STORAGE_KEY)
  const panelSizeRef = useRef<number>(getItem() ?? 36)

  const handleResize = (size: number) => {
    panelSizeRef.current = size
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
      <ResizableHandle />
      <ResizablePanel
        defaultSize={panelSizeRef.current}
        minSize={20}
        maxSize={50}
        onResize={handleResize}
      >
        <LivePreviewSlidesPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default LivePage
