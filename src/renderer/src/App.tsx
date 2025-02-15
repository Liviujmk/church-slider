import LivePage from './pages/live'
import { Route, HashRouter, Routes } from 'react-router-dom'

import './global.css'
import BaseLayout from './layouts/base-layout'
import LibraryPage from './pages/library'
import StudioPage from './pages/create'
import PresentationPage from './pages/presentation'
import SettingsPage from './pages/settings'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<LivePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="create" element={<StudioPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/presentation" element={<PresentationPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
