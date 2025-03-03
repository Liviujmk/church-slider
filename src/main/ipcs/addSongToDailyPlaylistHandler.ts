import { ipcMain } from 'electron'

import { addSongToDailyPlaylist, PostResponse, Song } from '../db/daily-playlist/queries'

export const addSongToDailyPlaylistHandler = () => {
  ipcMain.handle(
    'add-song-to-daily-playlist',
    async (_event, song: Song): Promise<PostResponse> => {
      try {
        return await addSongToDailyPlaylist(song)
      } catch {
        return { status: 'error', message: 'Could not add song' }
      }
    }
  )
}
