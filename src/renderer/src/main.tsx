import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PresentationPage from './pages/PresentationPage'
import LibraryPage from './pages/library'
import SettingsPage from './pages/settings'
import HelpPage from './pages/help'

import './global.css'
import BaseLayout from './layouts/base-layout'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
)
