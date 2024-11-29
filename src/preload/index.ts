// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('minimize'),
  toggleFullscreenWindow: () => ipcRenderer.send('toggle-fullscreen'),
  closeWindow: () => ipcRenderer.send('close'),
  sendToPresentation: (command: string) =>
    ipcRenderer.send('send-command-to-presentation', command),
  onCommand: (callback: (event: Electron.IpcRendererEvent, command: string) => void) =>
    ipcRenderer.on('presentation-command', callback)
})
