export type Lyric = {
  title: string
  slides: Slides
}

export type Slides = {
  [key: string]: string[]
}
