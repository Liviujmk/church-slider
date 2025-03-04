import { ipcMain } from 'electron'

import { updateSong, GenericResponse } from '../db/queries'
import { Slides } from '../types'

export const updateSongIdHandler = () => {
  ipcMain.handle(
    'update-song-by-id',
    async (_event, songId: string, song: Slides, editedTitle: string): Promise<GenericResponse> => {
      try {
        return await updateSong(songId, song, editedTitle)
      } catch (error) {
        return { status: 'Error', message: 'Failed to update the song' }
      }
    }
  )
}
