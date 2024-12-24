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

export const readAllPptxFiles = async (directoryPath: string) => {
  const files = await fs.readdir(directoryPath)
  const pptxFiles = files.filter((file) => file.endsWith('.pptx'))

  const songs: Lyric[] = []

  for (const pptxFile of pptxFiles) {
    const filePath = path.join(directoryPath, pptxFile)

    try {
      const fileData = await fs.readFile(filePath)
      const uint8Array = new Uint8Array(fileData)

      const zip = await JSZip.loadAsync(uint8Array)

      // Filter the slides from the pptx file
      const slideNames = Object.keys(zip.files).filter(
        (name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      )

      const slidesContent = await Promise.all(
        slideNames
          .map((slideName) => zip.files[slideName]?.async('string'))
          .filter((content) => !!content)
      )

      const slides = slidesContent.reduce((acc, content, index) => {
        const stanzaNumber = index + 1

        acc[stanzaNumber] = extractVersesFromXML(content)
        return acc
      }, {})

      const title = pptxFile.replace('.pptx', '')

      songs.push({
        title,
        slides
      })
    } catch (err) {
      console.error(`Error reading PPTX file "${pptxFile}":`, err)

      continue
    }
  }

  return songs
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

      console.log(filePath)
      const title = filePath.split(path.sep).pop()?.replace('.pptx', '') || 'Unknown Title'

      songs.push({
        title,
        slides
      })
    } catch (err) {
      console.error(`Error reading PPTX file "${filePath}":`, err)
      continue
    }
  }

  return songs
}
