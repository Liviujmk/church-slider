import { db } from './db'
import { Lyric, LyricsDB } from '../types'

export const addDocument = async (doc: Lyric) => {
  try {
    const normalizedTitle = normalizeText(doc.title)
    await db.put({ ...doc, title_normalized: normalizedTitle })
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

export const getAllDocuments = async () => {
  try {
    const result = await db.allDocs({ include_docs: true })

    return result.rows.map((row) => {
      const doc = row.doc
      return doc as LyricsDB
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return []
  }
}

export async function loadSongsIntoDb(songs: Lyric[]) {
  const batchSize = 100
  const chunks: Lyric[][] = []

  for (let i = 0; i < songs.length; i += batchSize) {
    chunks.push(songs.slice(i, i + batchSize))
  }

  try {
    for (const chunk of chunks) {
      const normalizedChunk = chunk.map((song) => ({
        ...song,
        title_normalized: normalizeText(song.title)
      }))

      const response = await db.bulkDocs(normalizedChunk)
      console.log(`${response.length} songs loaded successfully.`)
    }
  } catch (err) {
    console.error('Error loading songs into DB:', err)
  }
}

export const updateDocumentWithPlaylist = async (docId: string) => {
  try {
    const doc = await db.get(docId)

    await db.put({
      ...doc,
      _id: docId,
      _rev: doc._rev,
      playlist: true
    })
  } catch (error) {
    console.error('Error updating document:', error)
  }
}

export const removeDocumentFromPlaylist = async (docId: string) => {
  try {
    const doc = await db.get(docId)

    await db.put({
      ...doc,
      _id: docId,
      _rev: doc._rev,
      playlist: false
    })
  } catch (error) {
    console.error('Error removing document from playlist:', error)
  }
}

export const getAllPlaylistDocuments = async () => {
  try {
    const result = await db.find({
      selector: {
        playlist: true
      }
    })

    return result.docs as LyricsDB[]
  } catch {
    throw new Error()
  }
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function searchSongsByTitle(title: string) {
  const normalizedTitle = normalizeText(title)

  try {
    const result = await db.find({
      selector: {
        title_normalized: { $regex: new RegExp(normalizedTitle, 'i') }
      },
      limit: 10
    })
    return result.docs
  } catch (err) {
    throw new Error('Eroare la căutarea cântărilor: ' + err)
  }
}
