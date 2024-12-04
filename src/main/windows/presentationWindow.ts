import { BrowserWindow, ipcMain, screen } from 'electron/main'
import { join } from 'path'
import { Command } from '../types'

export function createPresentationWindow(): BrowserWindow {
  const displays = screen.getAllDisplays()

  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  )

  const windowPosition = externalDisplay ? externalDisplay.bounds : { x: 0, y: 0 }

  const presentationWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    x: windowPosition.x,
    y: windowPosition.y,
    fullscreen: true,
    frame: false,
    skipTaskbar: true,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  ipcMain.on('send-to-presentation', (_event, command: Command) => {
    if (presentationWindow && !presentationWindow.isDestroyed()) {
      presentationWindow.webContents.send('start-presentation', command)
    }
  })

  presentationWindow.loadURL('http://localhost:5173/presentation')

  presentationWindow.once('ready-to-show', () => {
    presentationWindow.show()
  })

  ipcMain.on('send-command-to-presentation', (_event, command) => {
    if (presentationWindow && !presentationWindow.isDestroyed()) {
      presentationWindow.webContents.send('presentation-command', command)
    }
  })

  return presentationWindow
}
