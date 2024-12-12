import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import TitleBar from '@/components/titlebar'

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen tracking-tight">
      <TitleBar />
      <main className="h-full mt-7">
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}

export default BaseLayout
