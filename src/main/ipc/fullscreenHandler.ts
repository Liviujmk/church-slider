import { ipcMain, BrowserWindow } from 'electron'

export function handleWindowControls(win: BrowserWindow): void {
  ipcMain.on('minimize', () => win.minimize())

  ipcMain.on('toggle-fullscreen', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('close', () => {
    win.close()
  })
}
