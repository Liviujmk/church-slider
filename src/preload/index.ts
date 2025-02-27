import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

import {
  AppState,
  Command,
  Lyric,
  LyricsDB,
  DocumentsResponse,
  CreateSongResponse,
  RemoveSongResponse
} from '../main/types'
import { Response, ResponseGetPlaylists } from '../main/db/playlists/queries'

contextBridge.exposeInMainWorld('electronAPI', {
  reloadApp: () => ipcRenderer.send('reload-app'),
  minimizeWindow: () => ipcRenderer.send('minimize'),
  toggleFullscreenWindow: () => ipcRenderer.send('toggle-fullscreen'),
  closeWindow: () => ipcRenderer.send('close'),
  sendToPresentation: (command: string) =>
    ipcRenderer.send('send-command-to-presentation', command),
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) =>
    ipcRenderer.on('presentation-command', callback),
  readFilesFromDirectory: (folderPath: string) =>
    ipcRenderer.invoke('read-files-from-directory', folderPath),
  openMultipleFiles: () => ipcRenderer.invoke('open-multiple-files'),
  sendLyricsToPresentation: (command: {
    type: string
    data?: Lyric
    startSlide: number | undefined
  }) => ipcRenderer.send('send-to-presentation', command),
  onPresentationCommand: (callback: (event: IpcRendererEvent, arg: Command) => void) =>
    ipcRenderer.on('start-presentation', callback),
  sendAllSongs: (page: number, pageSize?: number): Promise<DocumentsResponse | undefined> =>
    ipcRenderer.invoke('send-all-songs', page, pageSize),
  sendSlideData: (currentSlide: number, totalSlides: number) => {
    ipcRenderer.send('update-slide-info', { currentSlide, totalSlides })
  },
  onSlideData: (
    callback: (event: IpcRendererEvent, data: { currentSlide: number; totalSlides: number }) => void
  ) => {
    ipcRenderer.on('get-update-slide', callback)
  },
  getAppState: (): Promise<AppState | null> => ipcRenderer.invoke('appState:get'),
  setAppState: (newState: AppState): Promise<AppState | null> =>
    ipcRenderer.invoke('appState:set', newState),
  distroyPresentationWindow: () => ipcRenderer.send('distroy-presentation-window'),
  sendShowClock: (distroy: boolean) => ipcRenderer.send('send-distroy-presentation', distroy),
  onShowClock: (callback: (message: boolean) => void) => {
    ipcRenderer.on('action-distroy-presentation', (_event, message: boolean) => {
      callback(message)
    })
  },
  onSearchSongsByTitle: (title: string): Promise<LyricsDB[]> =>
    ipcRenderer.invoke('search-songs-by-title', title),
  deleteASongFromPlaylist: (songId: string) => ipcRenderer.send('remove-from-playlist', songId),
  createSong: (song: Lyric): Promise<CreateSongResponse> => ipcRenderer.invoke('create-song', song),
  removeSong: (id: string): Promise<RemoveSongResponse> => ipcRenderer.invoke('remove-song', id),
  sendSlides: (slides: string) => ipcRenderer.send('slides-data', slides),
  onReceiveSlides: (callback: (slides: string) => void) => {
    ipcRenderer.on('receive-slides-data', (_event, slides) => callback(slides))
  },
  goToSlide: (slideNumber: number) => ipcRenderer.send('go-to-slide', slideNumber),
  onReceiveNumberOfSlide: (callback: (numberOfSlide: number) => void) =>
    ipcRenderer.on('change-slide', (_event, numberOfSlide: number) => callback(numberOfSlide)),
  getSuggestionsSongs: (): Promise<LyricsDB[]> => ipcRenderer.invoke('suggestion-songs'),
  createPlaylist: (title: string): Promise<Response> =>
    ipcRenderer.invoke('create-playlist', title),
  getPlaylists: (): Promise<ResponseGetPlaylists> => ipcRenderer.invoke('get-playlists'),
  addSongToAPlaylist: (playlistId: string, newSong: LyricsDB): Promise<Response> =>
    ipcRenderer.invoke('add-song-to-a-playlist', playlistId, newSong),
  deleteSongFromPlaylist: (playlistId: string, songId: string): Promise<Response> =>
    ipcRenderer.invoke('delete-song-from-a-playlist', playlistId, songId),
  deletePlaylist: (playlistId: string): Promise<Response> =>
    ipcRenderer.invoke('delete-playlist', playlistId),
  reorderPlaylist: (id: string, songs: LyricsDB[]): Promise<Response> =>
    ipcRenderer.invoke('reorder-playlist', id, songs)
})
