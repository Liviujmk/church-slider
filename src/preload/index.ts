import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

import { Command, Lyric } from '../main/types'

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('minimize'),
  toggleFullscreenWindow: () => ipcRenderer.send('toggle-fullscreen'),
  closeWindow: () => ipcRenderer.send('close'),
  sendToPresentation: (command: string) =>
    ipcRenderer.send('send-command-to-presentation', command),
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) =>
    ipcRenderer.on('presentation-command', callback),
  readFilesFromDirectory: (folderPath: string) =>
    ipcRenderer.invoke('read-files-from-directory', folderPath),
  openDialog: () => ipcRenderer.invoke('open-file-system'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-content-from-file', filePath),
  sendLyricsToPresentation: (command: { type: string; data?: Lyric }) =>
    ipcRenderer.send('send-to-presentation', command),
  onPresentationCommand: (callback: (event: IpcRendererEvent, arg: Command) => void) =>
    ipcRenderer.on('start-presentation', callback),
  sendAllSongs: (): Promise<Lyric[] | undefined> => ipcRenderer.invoke('send-all-songs')
})
