export type Slides = {
  [key: string]: string[]
}

export type Song = {
  _id: string
  _rev: string
  lyricsCount: number
  slides: Slides
  title: string
}

export type SimplySong = Omit<Song, '_id' | '_rev'>
