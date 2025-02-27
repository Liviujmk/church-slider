import { ipcMain } from 'electron'

import { reorderSongsInPlaylist, Response } from '../db/playlists/queries'
import { LyricsDB } from '../types'

export const reorderPlaylistHandler = () => {
  ipcMain.handle(
    'reorder-playlist',
    async (_event, id: string, songs: LyricsDB[]): Promise<Response> => {
      try {
        return await reorderSongsInPlaylist(id, songs)
      } catch (error) {
        console.error('Error in reorder playlist:', error)
        return { status: 'Error', message: 'Failed to reorder playlist' }
      }
    }
  )
}
