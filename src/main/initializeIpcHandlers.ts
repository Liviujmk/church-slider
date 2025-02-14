import { getStateForApp, setStateForApp } from './ipcs/appState'
import { addSongToPlaylist } from './ipcs/addSongToPlaylist'
import { getAllSongsFromPlaylist } from './ipcs/getAllSongsFromPlaylist'
import { openDialog } from './ipcs/openDialog'
import { readFilesFromDirectory } from './ipcs/readFilesFromDirectory'
import { sendAllSongs } from './ipcs/sendAllSongs'
import { SearchSongsByTitleHandler } from './ipcs/searchSongsByTitle'
import { deleteASongFromPlaylist } from './ipcs/deleteASongFromPlaylist'
import { getSuggestions } from './ipcs/getSuggestions'
import { createSong } from './ipcs/createSong'

export const initializeIpcHandlers = () => {
  openDialog()
  readFilesFromDirectory()
  sendAllSongs()
  addSongToPlaylist()
  createSong()
  getAllSongsFromPlaylist()
  setStateForApp()
  getStateForApp()
  SearchSongsByTitleHandler()
  deleteASongFromPlaylist()
  getSuggestions()
}
