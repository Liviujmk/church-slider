import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

// Importarea icoanei
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const win = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 600,
    minHeight: 370,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      devTools: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  // win.setMinimumSize(600, 400)

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // win.webContents.openDevTools()

  ipcMain.on('minimizeApp', () => win.minimize())

  ipcMain.on('maximizeApp', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('closeApp', () => {
    win.close()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
