import { ipcMain } from 'electron'

import { deleteSongFromPlaylist, Response } from '../db/playlists/queries'

export const deleteSongFromPlaylistHandler = () => {
  ipcMain.handle(
    'delete-song-from-a-playlist',
    async (_event, playlistId: string, songId: string): Promise<Response> => {
      try {
        return await deleteSongFromPlaylist(playlistId, songId)
      } catch {
        return { status: 'Error', message: 'Could not delete song from the playlist' }
      }
    }
  )
}
