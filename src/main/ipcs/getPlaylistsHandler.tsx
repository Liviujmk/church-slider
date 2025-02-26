import { ipcMain } from 'electron'

import { getPlaylists, ResponseGetPlaylists } from '../db/playlists/queries'

export const getPlaylistsHandler = () => {
  ipcMain.handle('get-playlists', async (): Promise<ResponseGetPlaylists> => {
    try {
      return await getPlaylists()
    } catch (error) {
      console.error('Error in getting playlists:', error)
      return { status: 'Error', message: 'Failed to get playlists' }
    }
  })
}
