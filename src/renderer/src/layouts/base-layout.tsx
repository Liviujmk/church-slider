import TitleBar from '@/components/titlebar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TitleBar />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  )
}

export default BaseLayout
