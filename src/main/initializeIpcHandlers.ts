import { openDialog } from './ipcs/openDialog'
import { readContentFromFile } from './ipcs/readContentFromFile'
import { readFilesFromDirectory } from './ipcs/readFilesFromDirectory'

export const initializeIpcHandlers = () => {
  openDialog()
  readFilesFromDirectory()
  readContentFromFile()
}
