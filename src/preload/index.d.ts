import { Command, Lyric } from '../main/types/index'

export interface IElectronAPI {
  minimizeWindow: () => void
  toggleFullscreenWindow: () => void
  closeWindow: () => void
  sendToPresentation: (command: string) => void
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) => void
  readFilesFromDirectory: (folderPath: string) => Promise<string[]>
  openDialog: () => Electron.OpenDialogReturnValue
  readFile: (folderPath: string) => Promise<Lyric>
  sendLyricsToPresentation: (command: { type: string; data?: Lyric }) => void
  onPresentationCommand: (callback: (event: Event, arg: Command) => void) => Electron.IpcRenderer
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
