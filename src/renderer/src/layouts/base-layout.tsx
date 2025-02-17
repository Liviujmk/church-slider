import { Outlet } from 'react-router-dom'

import { FontProvider } from '@/features/settings/context/font-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import TitleBar from '@/components/titlebar'

const BaseLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FontProvider>
        <div className="flex flex-col h-screen tracking-tight">
          <TitleBar />
          <main className="h-full pt-7">
            <Outlet />
            <Toaster />
          </main>
        </div>
      </FontProvider>
    </ThemeProvider>
  )
}

export default BaseLayout
