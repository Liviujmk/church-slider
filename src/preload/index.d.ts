export interface IElectronAPI {
  minimizeWindow: () => void
  toggleFullscreenWindow: () => void
  closeWindow: () => void
  sendToPresentation: (command: string) => void
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
