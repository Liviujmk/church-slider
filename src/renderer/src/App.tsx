import { Route, HashRouter, Routes } from 'react-router-dom'
import LivePage from './pages/live'

import PresentationPage from './pages/presentation'
import SettingsPage from './pages/settings'
import LibraryPage from './pages/library'
import StudioPage from './pages/studio'
import BaseLayout from './base-layout'

import './global.css'

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
