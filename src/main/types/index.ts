type Slides = {
  [key: string]: string[]
}

export type Lyric = {
  title: string
  slides: Slides
}

export type Command = {
  type: string
  data: Lyric
}
