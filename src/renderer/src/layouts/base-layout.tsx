import TitleBar from '@/components/titlebar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <TitleBar />
      <main className="h-full mt-10">
        <Outlet />
      </main>
    </div>
  )
}

export default BaseLayout
