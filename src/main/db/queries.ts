import { db } from './db'
import { Lyric, LyricsDB } from '../types'

export const addDocument = async (doc: Lyric) => {
  try {
    const response = await db.put(doc)
    console.log('Document added:', response)
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
      const response = await db.bulkDocs(chunk)
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
  } catch (error) {
    console.error('Error fetching playlist documents:', error)
    return []
  }
}

export async function searchSongsByTitle(title: string) {
  const regex = new RegExp(title, 'i')

  try {
    const result = await db.find({
      selector: { title: { $regex: regex } }
    })
    return result.docs as LyricsDB[]
  } catch (err) {
    throw new Error('Eroare la căutarea cântărilor: ' + err)
  }
}
