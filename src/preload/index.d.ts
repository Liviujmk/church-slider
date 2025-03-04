import {
  AppState,
  Command,
  CreateSongResponse,
  DocumentsResponse,
  FileProcessingResponse,
  Lyric,
  LyricsDB
} from '../main/types/index'
import { Response, ResponseGetPlaylists } from '../main/db/playlists/queries'
import { GenericResponse } from '../main/db/queries'
import { GetResponse, PostResponse } from 'src/main/db/daily-playlist/queries'

export interface IElectronAPI {
  reloadApp: () => void
  minimizeWindow: () => void
  toggleFullscreenWindow: () => void
  closeWindow: () => void
  sendToPresentation: (command: string) => void
  onCommand: (callback: (event: IpcRendererEvent, command: string) => void) => void
  readFilesFromDirectory: (folderPath: string) => Promise<string[]>
  openMultipleFiles: () => Promise<FileProcessingResponse>
  sendLyricsToPresentation: (command: {
    type: string
    data?: Lyric
    startSlide: number | undefined
  }) => void
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
  removeSong: (id: string) => Promise<RemoveSongResponse>
  createPlaylist: (title: string) => Promise<Response>
  getPlaylists: () => Promise<ResponseGetPlaylists>
  addSongToAPlaylist: (playlistId: string, newSong: LyricsDB) => Promise<Response>
  deleteSongFromPlaylist: (playlistId: string, songId: string) => Promise<Response>
  deletePlaylist: (playlistId: string) => Promise<Response>
  reorderPlaylist: (id: string, songs: LyricsDB[]) => Promise<Response>
  updateSong: (songId: string, updatedSong: Slides, editedTitle: string) => Promise<GenericResponse>
  addSongToDailyPlaylist: (song: Song) => Promise<PostResponse>
  getDailySongs: () => Promise<GetResponse>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
