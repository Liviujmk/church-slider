type Slides = {
  [key: string]: string[]
}

export type Lyric = {
  playlist?: boolean
  title: string
  slides: Slides
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
