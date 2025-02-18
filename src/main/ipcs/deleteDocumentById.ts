import { ipcMain } from 'electron'

import { deleteDocumentById } from '../db/queries'

export const deleteSongById = () => {
  ipcMain.handle('remove-song', async (_event, docId: string) => {
    try {
      const response = await deleteDocumentById(docId)
      return response
    } catch (error) {
      return {
        success: false,
        message: 'A apărut o eroare!',
        error
      }
    }
  })
}
