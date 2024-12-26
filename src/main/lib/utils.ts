import fs from 'fs/promises'
import path from 'path'
import JSZip from 'jszip'
import { DOMParser } from 'xmldom'

import { Lyric } from '../types'

const extractVersesFromXML = (slideContent) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(slideContent, 'application/xml')

  const verses = xmlDoc.getElementsByTagNameNS(
    'http://schemas.openxmlformats.org/drawingml/2006/main',
    't'
  )

  return Array.from(verses).map((verse) => verse.textContent || '')
}

export const readPowerPointFiles = async (filePaths: string[]): Promise<Lyric[]> => {
  const songs: Lyric[] = []

  for (const filePath of filePaths) {
    try {
      const fileData = await fs.readFile(filePath)
      const uint8Array = new Uint8Array(fileData)

      const zip = await JSZip.loadAsync(uint8Array)

      const slideNames = Object.keys(zip.files).filter(
        (name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      )

      const slidesContent = (
        await Promise.all(slideNames.map((slideName) => zip.files[slideName]?.async('string')))
      ).filter((content) => !!content)

      const slides = slidesContent.reduce(
        (acc, content, index) => {
          const stanzaNumber = index + 1
          acc[stanzaNumber] = extractVersesFromXML(content as string)
          return acc
        },
        {} as { [key: string]: string[] }
      )

      const title = filePath.split(path.sep).pop()?.replace('.pptx', '') || 'Unknown Title'
      const keys = Object.keys(slides)
      const lyricsCount = Number(keys[keys.length - 1])

      songs.push({
        title,
        slides,
        lyricsCount
      })
    } catch (err) {
      console.error(`Error reading PPTX file "${filePath}":`, err)
      continue
    }
  }

  return songs
}
