import { ipcMain } from 'electron/main'
import { getAllPlaylistDocuments } from '../db/queries'

export const getAllSongsFromPlaylist = () => {
  ipcMain.handle('get-all-songs-from-playlist', async () => {
    try {
      const result = await getAllPlaylistDocuments()
      return result
    } catch (error) {
      console.error('Error fetching songs:', error)
      return []
    }
  })
}
