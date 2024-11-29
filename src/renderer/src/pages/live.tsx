import { useEffect } from 'react'
import { MdModeStandby } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import presentationIcon from '../../assets/icons/Vector.svg'
import Control from '@/components/control'

const LivePage = () => {
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

  return (
    <>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel minSize={70}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={33} minSize={24} maxSize={40}>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h2 className="font-bold">Cântări</h2>
                </div>
                <div className="flex items-center justify-center h-full p-6">
                  <span className="font-semibold">One</span>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={64} className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h2 className="font-bold">Prezentare</h2>
                <div className="space-x-3">
                  <Button className="space-x-1 rounded-xl bg-[#00F974] hover:bg-[#00E86C]">
                    <img src={presentationIcon} alt="Icon" width={16} />
                    <span>Go Live</span>
                  </Button>
                  <Button className="space-x-1 rounded-xl" variant="outline">
                    <MdModeStandby size={16} />
                    <span>Standby</span>
                  </Button>
                </div>
              </div>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={24}>
                  <div className="flex items-center justify-center h-full p-6">
                    <span className="font-semibold">Two</span>
                  </div>
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
                      <div className="flex flex-col justify-between h-full p-2">
                        <h2 className="text-lg font-semibold tracking-tight">This is the title</h2>
                        <div>
                          <Control />
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel maxSize={30} defaultSize={25} minSize={20}>
          <div className="flex items-center justify-center h-full p-6">
            <span className="font-semibold">Five</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default LivePage
