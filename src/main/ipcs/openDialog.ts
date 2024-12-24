import { ipcMain, dialog } from 'electron/main'
import { readPowerPointFiles } from '../lib/utils'
import { loadSongsIntoDb } from '../db/queries'

export function openDialog() {
  ipcMain.handle('open-multiple-files', async () => {
    try {
      const result = await dialog.showOpenDialog({
        title: 'Selectează fișiere PPT sau PPTX',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'PowerPoint Files', extensions: ['pptx'] }]
      })

      const filePaths = result.filePaths

      if (result.canceled || !filePaths.length) return

      const songs = await readPowerPointFiles(filePaths)
      await loadSongsIntoDb(songs)

      return { success: true, message: 'Cântările selectate au fost înregistrate', data: songs }
    } catch (error) {
      return { success: false, message: 'A apărut o eroare la procesarea fișierelor.', data: null }
    }
  })
}
