import { ipcMain } from 'electron'

import { deletePlaylist, Response } from '../db/playlists/queries'

export const deletePlaylistHandler = () => {
  ipcMain.handle('delete-playlist', async (_event, playlistId: string): Promise<Response> => {
    try {
      return await deletePlaylist(playlistId)
    } catch {
      return { status: 'Error', message: 'Could not delete playlist' }
    }
  })
}
