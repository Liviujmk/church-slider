export type Lyric = {
  _id?: string
  title: string
  slides: Slides
}

export type LyricDB = Lyric & {
  _rev: string
}

export type Slides = {
  [key: string]: string[]
}
