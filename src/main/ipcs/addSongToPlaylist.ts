import { ipcMain } from 'electron'

import { updateDocumentWithPlaylist } from '../db/queries'

export function addSongToPlaylist() {
  ipcMain.handle('add-song-to-playlist', async (_event, docId: string) => {
    try {
      await updateDocumentWithPlaylist(docId)
      return { success: true, error: false }
    } catch (error) {
      console.error('Error in updating document:', error)
      return { success: false, error: true }
    }
  })
}
