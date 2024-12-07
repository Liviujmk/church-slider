import { ipcMain } from 'electron'

import { searchSongsByTitle } from '../db/queries'

export const SearchSongsByTitleHandler = () => {
  ipcMain.handle('search-songs-by-title', async (_event, title: string) => {
    try {
      const docs = await searchSongsByTitle(title)
      return docs
    } catch (error) {
      return []
    }
  })
}
