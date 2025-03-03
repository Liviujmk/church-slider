import { ipcMain } from 'electron'

import { getSongsFromDailyPlaylist, GetResponse } from '../db/daily-playlist/queries'

export const getDailySongsHandler = () => {
  ipcMain.handle('get-daily-songs', async (): Promise<GetResponse> => {
    try {
      return await getSongsFromDailyPlaylist()
    } catch (error) {
      return { status: 'error', message: 'Failed to get playlists' }
    }
  })
}
