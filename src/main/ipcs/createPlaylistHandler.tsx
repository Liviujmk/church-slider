import { ipcMain } from 'electron'

import { createPlaylist, Response } from '../db/playlists/queries'

export const createPlaylistHandler = () => {
  ipcMain.handle('create-playlist', async (_event, title: string): Promise<Response> => {
    try {
      return await createPlaylist(title)
    } catch (error) {
      console.error('Error in updating document:', error)
      return { status: 'Error', message: 'Failed to create the playlist' }
    }
  })
}
