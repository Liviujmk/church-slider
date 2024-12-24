import { ipcMain } from 'electron'
import { DocumentsResponse } from '../types'
import { getAllDocuments } from '../db/queries'

export const sendAllSongs = () => {
  ipcMain.handle(
    'send-all-songs',
    async (_event, page: number, pageSize?: number): Promise<DocumentsResponse | undefined> => {
      try {
        const result = await getAllDocuments(page, pageSize)
        return result
      } catch (error) {
        console.error('Error fetching songs:', error)
        return
      }
    }
  )
}
