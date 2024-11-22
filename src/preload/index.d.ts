import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electronAPI: ElectronAPI & {
      minimizeWindow: () => void
      toggleFullscreenWindow: () => void
      closeWindow: () => void
    }
  }
}
