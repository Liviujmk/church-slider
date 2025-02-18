import { CreateSongResponse } from './index'
type Slides = {
  [key: string]: string[]
}

export type Lyric = {
  playlist?: boolean
  title: string
  slides: Slides
  lyricsCount: number
}

export type LyricsDB = Lyric & {
  _id: string
  _rev: string
}

export type Command = {
  type: string
  data: LyricsDB
}

export type AppState = {
  withClock: boolean
}

export type DocumentsResponse = {
  data: LyricsDB[]
  totalCount: number
}

export type FileProcessingResponse =
  | {
      success: true
      message: string
      data: Lyric[]
    }
  | {
      success: false
      message: string
      data: null
    }
  | undefined

export type CreateSongResponse = {
  success: boolean
  message: string
  error: unknown
  song: LyricsDB | null
}

export type RemoveSongResponse = {
  success: boolean
  message: string
  error: unknown
}
