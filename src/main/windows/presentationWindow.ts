import { BrowserWindow, ipcMain, screen } from 'electron/main'
import { join } from 'path'

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

  // Check if we're in development or production
  if (process.env.NODE_ENV === 'development') {
    presentationWindow.loadURL('http://localhost:5173/presentation')
  } else {
    // In production, load from the dist directory
    presentationWindow.loadFile(
      join(__dirname, '../renderer/index.html'),
      { hash: '/presentation' } // This adds #/presentation to the URL
    )
  }

  presentationWindow.once('ready-to-show', () => {
    presentationWindow.show()
  })

  // ipcMain.on('send-to-presentation', (_event, command: Command) => {
  //   if (presentationWindow && !presentationWindow.isDestroyed()) {
  //     presentationWindow.webContents.send('start-presentation', command)
  //   }
  // })

  ipcMain.on('send-command-to-presentation', (_event, command) => {
    if (presentationWindow && !presentationWindow.isDestroyed()) {
      presentationWindow.webContents.send('presentation-command', command)
    }
  })

  return presentationWindow
}
