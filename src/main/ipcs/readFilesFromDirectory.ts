import { ipcMain } from 'electron/main'
import fs from 'fs/promises'

export const readFilesFromDirectory = () => {
  ipcMain.handle('read-files-from-directory', async (_event, folderPath: string) => {
    try {
      const files = await fs.readdir(folderPath)
      return files
    } catch (err) {
      console.error('Eroare la citirea folderului:', err)
      throw err
    }
  })
}
