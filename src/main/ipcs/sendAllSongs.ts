import { ipcMain } from 'electron'
import { Lyric } from '../types'
import { getAllDocuments } from '../db/queries'

export const sendAllSongs = () => {
  ipcMain.handle('send-all-songs', async (): Promise<Lyric[] | undefined> => {
    try {
      const result = await getAllDocuments()
      return result
    } catch (error) {
      console.error('Error fetching songs:', error)
      return []
    }
  })
}
