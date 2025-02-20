import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'

import { handleWindowControls } from './ipcs/fullscreenHandler'
import { createMainWindow } from './windows/mainWindow'
import { createPresentationWindow } from './windows/presentationWindow'
import { Command } from './types'
import { getAppState } from './db/app-state'

async function initializeApp() {
  let presentationWindow: BrowserWindow | null = null
  let clock = await getAppState()

  const mainWindow = await createMainWindow()
  handleWindowControls(mainWindow)

  if (clock && clock.withClock) {
    if (!presentationWindow) presentationWindow = createPresentationWindow()

    ipcMain.on('send-distroy-presentation', (_event, distroy: boolean) => {
      if (presentationWindow)
        presentationWindow.webContents.send('action-distroy-presentation', distroy)
    })
  }

  ipcMain.on('slides-data', (_event, slides: string) => {
    if (presentationWindow) mainWindow.webContents.send('receive-slides-data', slides)
  })

  ipcMain.on('distroy-presentation-window', () => {
    if (presentationWindow) {
      presentationWindow.destroy()
    }
  })

  ipcMain.on('go-to-slide', (_event, slideNumber: number) => {
    if (presentationWindow) presentationWindow.webContents.send('change-slide', slideNumber)
  })

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

  ipcMain.on('reload-app', async () => {
    if (mainWindow) {
      clock = await getAppState()

      if (clock && clock.withClock) {
        presentationWindow = createPresentationWindow()

        ipcMain.on('send-distroy-presentation', (_event, distroy: boolean) => {
          presentationWindow?.webContents.send('action-distroy-presentation', distroy)
        })
      }

      if (clock && clock.withClock === false) {
        ipcMain.on('distroy-presentation-window', () => {
          if (presentationWindow) {
            presentationWindow.destroy()
          }
        })
      }
    }
  })

  mainWindow.on('close', () => {
    if (presentationWindow) {
      presentationWindow.destroy()
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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
