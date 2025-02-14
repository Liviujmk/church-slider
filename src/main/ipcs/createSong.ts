import { ipcMain } from 'electron'

import { loadSongIntoDb } from '../db/queries'
import { Lyric } from '../types'

export const createSong = () => {
  ipcMain.handle('create-song', async (_event, song: Lyric) => {
    try {
      const result = await loadSongIntoDb(song)

      return result
    } catch (error) {
      return {
        success: false,
        message: 'A apărut o eroare!',
        error
      }
    }
  })
}
