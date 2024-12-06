import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'

import { handleWindowControls } from './ipcs/fullscreenHandler'
import { createMainWindow } from './windows/mainWindow'
import { createPresentationWindow } from './windows/presentationWindow'
import { Command } from './types'
import { getAppState } from './db/app-state'
// import { readAllPptxFiles } from './lib/utils'
// import { loadSongsIntoDb } from './db/queries'

async function initializeApp() {
  let presentationWindow: BrowserWindow | null = null
  const clock = await getAppState()

  const mainWindow = createMainWindow()
  handleWindowControls(mainWindow)

  if (clock && clock.withClock) {
    presentationWindow = createPresentationWindow()

    ipcMain.on('send-distroy-presentation', (_event, distroy: boolean) => {
      presentationWindow?.webContents.send('action-distroy-presentation', distroy)
    })
  }

  if (!clock?.withClock) {
    ipcMain.on('distroy-presentation-window', () => {
      if (presentationWindow) presentationWindow.destroy()
    })
  }

  ipcMain.on('send-to-presentation', (_event, command: Command) => {
    if (!presentationWindow || presentationWindow.isDestroyed()) {
      presentationWindow = createPresentationWindow()
      presentationWindow.webContents.once('did-finish-load', () => {
        presentationWindow?.webContents.send('start-presentation', command)
      })
    } else {
      presentationWindow.webContents.send('start-presentation', command)
    }
  })

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
