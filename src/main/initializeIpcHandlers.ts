import { createPlaylistHandler } from './ipcs/createPlaylistHandler'
import { createSong } from './ipcs/createSong'
import { deleteASongFromPlaylist } from './ipcs/deleteASongFromPlaylist'
import { deleteSongById } from './ipcs/deleteDocumentById'
import { getPlaylistsHandler } from './ipcs/getPlaylistsHandler'
import { getStateForApp, setStateForApp } from './ipcs/appState'
import { getSuggestions } from './ipcs/getSuggestions'
import { openDialog } from './ipcs/openDialog'
import { readFilesFromDirectory } from './ipcs/readFilesFromDirectory'
import { SearchSongsByTitleHandler } from './ipcs/searchSongsByTitle'
import { sendAllSongs } from './ipcs/sendAllSongs'
import { addSongToPlaylistHandler } from './ipcs/addSongToPlaylistHandler'
import { deletePlaylistHandler } from './ipcs/deletePlaylistHandler'
import { deleteSongFromPlaylistHandler } from './ipcs/deleteSongFromPlaylistHandler'

export const initializeIpcHandlers = () => {
  openDialog()
  readFilesFromDirectory()
  sendAllSongs()
  createSong()
  setStateForApp()
  getStateForApp()
  SearchSongsByTitleHandler()
  deleteASongFromPlaylist()
  getSuggestions()
  deleteSongById()
  createPlaylistHandler()
  getPlaylistsHandler()
  addSongToPlaylistHandler()
  deletePlaylistHandler()
  deleteSongFromPlaylistHandler()
}
