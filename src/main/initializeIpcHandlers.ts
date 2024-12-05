import { openDialog } from './ipcs/openDialog'
import { readContentFromFile } from './ipcs/readContentFromFile'
import { readFilesFromDirectory } from './ipcs/readFilesFromDirectory'
import { sendAllSongs } from './ipcs/sendAllSongs'

export const initializeIpcHandlers = () => {
  openDialog()
  readFilesFromDirectory()
  readContentFromFile()
  sendAllSongs()
}
