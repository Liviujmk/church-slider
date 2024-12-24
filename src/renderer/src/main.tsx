import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import App from './App'
import './global.css'
import BaseLayout from './layouts/base-layout'
import HelpPage from './pages/help'
import LibraryPage from './pages/library'
import CreatePage from './pages/create'
import PresentationPage from './pages/PresentationPage'
import SettingsPage from './pages/settings'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<App />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
      <Route path="/presentation" element={<PresentationPage />} />
    </Routes>
  </Router>
)
