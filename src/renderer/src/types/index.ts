export type Slides = {
  [key: string]: string[]
}

export type Song = {
  _id: string
  _rev: string
  playlist?: boolean
  slides: Slides
  title: string
  lyricsCount: number
}

export type SimplySong = Omit<Song, '_id' | '_rev' | 'playlist'>
