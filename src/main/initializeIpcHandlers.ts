import { createPlaylistHandler } from './ipcs/createPlaylistHandler'
import { createSong } from './ipcs/createSong'
import { deleteSongById } from './ipcs/deleteDocumentById'
import { getPlaylistsHandler } from './ipcs/getPlaylistsHandler'
import { getStateForApp, setStateForApp } from './ipcs/appState'
import { openDialog } from './ipcs/openDialog'
import { readFilesFromDirectory } from './ipcs/readFilesFromDirectory'
import { SearchSongsByTitleHandler } from './ipcs/searchSongsByTitle'
import { sendAllSongs } from './ipcs/sendAllSongs'
import { addSongToPlaylistHandler } from './ipcs/addSongToPlaylistHandler'
import { deletePlaylistHandler } from './ipcs/deletePlaylistHandler'
import { deleteSongFromPlaylistHandler } from './ipcs/deleteSongFromPlaylistHandler'
import { reorderPlaylistHandler } from './ipcs/reorderPlaylistHandler'
import { updateSongIdHandler } from './ipcs/updateSongByIdHandler'
import { getDailySongsHandler } from './ipcs/getDailySongsHandler'
import { addSongToDailyPlaylistHandler } from './ipcs/addSongToDailyPlaylistHandler'

export const initializeIpcHandlers = () => {
  openDialog()
  readFilesFromDirectory()
  sendAllSongs()
  createSong()
  setStateForApp()
  getStateForApp()
  SearchSongsByTitleHandler()
  deleteSongById()
  createPlaylistHandler()
  getPlaylistsHandler()
  addSongToPlaylistHandler()
  deletePlaylistHandler()
  deleteSongFromPlaylistHandler()
  reorderPlaylistHandler()
  updateSongIdHandler()
  getDailySongsHandler()
  addSongToDailyPlaylistHandler()
}
