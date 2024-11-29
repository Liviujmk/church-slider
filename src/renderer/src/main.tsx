import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import PresentationPage from './pages/PresentationPage'
import HelpPage from './pages/help'
import LibraryPage from './pages/library'
import SettingsPage from './pages/settings'

import App from './App'
import './global.css'
import BaseLayout from './layouts/base-layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<App />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
      <Route path="/presentation" element={<PresentationPage />} />
    </Routes>
  </Router>
)
