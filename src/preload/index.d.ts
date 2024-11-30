export interface IElectronAPI {
  minimizeWindow: () => void
  toggleFullscreenWindow: () => void
  closeWindow: () => void
  sendToPresentation: (command: string) => void
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) => void
  readFilesFromDirectory: (folderPath: string) => Promise<string[]>
  openDialog: () => Electron.OpenDialogReturnValue
  readFile: (folderPath: string) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
