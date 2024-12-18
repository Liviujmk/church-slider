import { Outlet } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import TitleBar from '@/components/titlebar'

const BaseLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen tracking-tight">
        <TitleBar />
        <main className="h-full mt-7">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout
