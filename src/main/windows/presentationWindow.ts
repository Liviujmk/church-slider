import { BrowserWindow, screen } from 'electron'
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
    skipTaskbar: true,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  presentationWindow.loadURL('http://localhost:5173/presentation')

  presentationWindow.once('ready-to-show', () => {
    presentationWindow.show()
  })

  return presentationWindow
}
