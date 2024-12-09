import { ipcMain } from 'electron/main'
import { getAllPlaylistDocuments } from '../db/queries'

export const getAllSongsFromPlaylist = () => {
  ipcMain.handle('get-all-songs-from-playlist', async () => {
    try {
      const result = await getAllPlaylistDocuments()
      return result
    } catch {
      throw new Error('A apărut o eroare la accesarea bazei de date')
    }
  })
}
