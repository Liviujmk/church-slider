import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import TitleBar from '@/components/titlebar'

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <TitleBar />
      <main className="h-full mt-10">
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}

export default BaseLayout
