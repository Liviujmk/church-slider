import { ipcMain } from 'electron'
import { LyricsDB } from '../types'
import { getAllDocuments } from '../db/queries'

export const sendAllSongs = () => {
  ipcMain.handle('send-all-songs', async (): Promise<LyricsDB[] | undefined> => {
    try {
      const result = await getAllDocuments()
      return result
    } catch (error) {
      console.error('Error fetching songs:', error)
      return []
    }
  })
}
