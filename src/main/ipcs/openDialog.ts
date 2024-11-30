import { ipcMain, dialog } from 'electron/main'

export function openDialog() {
  ipcMain.handle('open-file-system', async (): Promise<Electron.OpenDialogReturnValue> => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    return result
  })
}
