import { splitInTwo } from '@/lib/utils'
import { Slides } from '@/types'

export const processSongVerses = (values: { title: string; verses: string }) => {
  const verses: Slides = {}
  let refren: string[] = []
  let index = 1

  const splitedVerses = values.verses.trim().split(/\n\s*\n/)

  for (const verse of splitedVerses) {
    const parts = verse.split('\n').map((line) => line.trim())

    const isRefren =
      parts[0].includes('R:') ||
      parts[0].includes('R.') ||
      parts[0].includes('R :') ||
      parts[0].includes('R .')

    if (isRefren) {
      refren = parts
    }

    if (parts.length >= 8) {
      const [firstHalf, secondHalf] = splitInTwo(parts)

      verses[index++] = firstHalf
      verses[index++] = secondHalf
    } else {
      verses[index++] = parts
    }

    if (!isRefren && refren.length >= 8) {
      const [firstHalf, secondHalf] = splitInTwo(refren)
      verses[index++] = firstHalf
      verses[index++] = secondHalf
    } else if (!isRefren && refren.length >= 4) {
      verses[index++] = refren
    }
  }

  return {
    title: values.title,
    slides: verses,
    lyricsCount: Object.values(verses).length
  }
}
