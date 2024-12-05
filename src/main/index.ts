import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'

import { handleWindowControls } from './ipcs/fullscreenHandler'
import { createMainWindow } from './windows/mainWindow'
import { createPresentationWindow } from './windows/presentationWindow'
// import { readAllPptxFiles } from './lib/utils'
// import { loadSongsIntoDb } from './db/queries'

function initializeApp(): void {
  const mainWindow = createMainWindow()
  handleWindowControls(mainWindow)

  const presentationWindow = createPresentationWindow()

  mainWindow.on('close', () => {
    if (presentationWindow) {
      presentationWindow.close()
    }
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
    // handling global shortcuts
  })

  initializeApp()

  // const directoryPath = 'D:\\Cantari'

  // readAllPptxFiles(directoryPath)
  //   .then((songs) => {
  //     console.log(`Loading ${songs.length} songs...`)
  //     loadSongsIntoDb(songs)
  //   })
  //   .catch((err) => console.error('Error:', err))

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) initializeApp()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
