import {
  AppState,
  Command,
  CreateSongResponse,
  DocumentsResponse,
  FileProcessingResponse,
  Lyric,
  LyricsDB
} from '../main/types/index'

export interface IElectronAPI {
  reloadApp: () => void
  minimizeWindow: () => void
  toggleFullscreenWindow: () => void
  closeWindow: () => void
  sendToPresentation: (command: string) => void
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) => void
  readFilesFromDirectory: (folderPath: string) => Promise<string[]>
  openMultipleFiles: () => Promise<FileProcessingResponse>
  sendLyricsToPresentation: (command: { type: string; data?: Lyric }) => void
  onPresentationCommand: (callback: (event: Event, arg: Command) => void) => Electron.IpcRenderer
  sendAllSongs: (page: number, pageSize?: number) => Promise<DocumentsResponse | undefined>
  sendSlideData: (currentSlide: number, totalSlides: number) => void
  onSlideData: (
    callback: (
      event: IpcRendererEvent,
      data: {
        currentSlide: number
        totalSlides: number
      }
    ) => void
  ) => void
  addSongToPlaylist: (docId: string) => Promise<{
    success: boolean
    error: boolean
  }>
  getAllSongsFromPlaylist: () => Promise<LyricsDB[]>
  getAppState: () => Promise<AppState | null>
  setAppState: (newState: AppState) => Promise<AppState | null>
  distroyPresentationWindow: () => void
  sendShowClock: (distroy: boolean) => void
  onShowClock: (callback: (message: boolean) => void) => void
  onSearchSongsByTitle: (title: string) => Promise<LyricsDB[]>
  deleteASongFromPlaylist: (songId: string) => void
  createSong: (song: Lyric) => Promise<CreateSongResponse>
  sendSlides: (slides: string) => void
  onReceiveSlides: (callback: (slides: string) => void) => void
  goToSlide: (slideNumber: number) => void
  onReceiveNumberOfSlide: (callback: (numberOfSlide: number) => void) => Electron.IpcRenderer
  getSuggestionsSongs: () => Promise<LyricsDB[]>
  removeSong: (id: string) => Promise<RemoveSongResponse>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
