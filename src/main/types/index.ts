type Slides = {
  [key: string]: string[]
}

export type Lyric = {
  playlist?: boolean
  title: string
  slides: Slides
}

export type Command = {
  type: string
  data: Lyric
}

export type LyricsDB = Lyric & {
  _id: string
  _rev: string
}

export type AppState = {
  withClock: boolean
}
