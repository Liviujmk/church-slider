import { ipcMain } from 'electron'

import { addSongToPlaylist, Response } from '../db/playlists/queries'
import { LyricsDB } from '../types'

export const addSongToPlaylistHandler = () => {
  ipcMain.handle(
    'add-song-to-a-playlist',
    async (_event, playlistId: string, newSong: LyricsDB): Promise<Response> => {
      try {
        return await addSongToPlaylist(playlistId, newSong)
      } catch {
        return { status: 'Error', message: 'Could not add song' }
      }
    }
  )
}
