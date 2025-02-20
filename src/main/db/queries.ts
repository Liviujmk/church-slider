import { v4 as uuidv4 } from 'uuid'

import { db } from './db'
import { Lyric, LyricsDB, DocumentsResponse } from '../types'

export const addDocument = async (doc: Lyric) => {
  try {
    const normalizedTitle = normalizeText(doc.title)
    await db.put({ ...doc, title_normalized: normalizedTitle })
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

export const getAllDocuments = async (
  page: number,
  pageSize: number = 20
): Promise<DocumentsResponse> => {
  try {
    const result = await db.allDocs({
      include_docs: true,
      limit: pageSize,
      skip: page * pageSize
    })

    const totalDocs = await db.info()
    const totalCount = totalDocs.doc_count

    return {
      data: result.rows.map((row) => {
        const doc = row.doc
        return doc as LyricsDB
      }),
      totalCount
    }
  } catch (error) {
    return { data: [], totalCount: 0 }
  }
}

// Done
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

    return { success: true, message: `${songs.length} songs loaded successfully.`, error: null }
  } catch (error) {
    console.error('Error loading songs into DB:', error)
    return { success: false, message: 'Failed to load songs into DB', error }
  }
}

export async function loadSongIntoDb(song: Lyric) {
  try {
    const normalizedSong = {
      ...song,
      _id: uuidv4(),
      title_normalized: normalizeText(song.title)
    }

    const response = await db.put(normalizedSong)
    if (response.ok) {
      return {
        success: true,
        message: 'Song loaded successfully.',
        song: normalizedSong,
        error: null
      }
    } else {
      throw new Error('Failed to add the song to the database.')
    }
  } catch (error) {
    console.error('Error loading the song into DB:', error)
    return {
      success: false,
      message: 'Failed to load the song into DB',
      song: null,
      error
    }
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

export const getRandomSongs = async (pageSize: number = 5): Promise<LyricsDB[]> => {
  try {
    const result = await db.allDocs({
      include_docs: true
    })

    const randomSongs = result.rows
      .map((row) => row.doc)
      .filter(isLyricsDB)
      .sort(() => Math.random() - 0.5)
      .slice(0, pageSize) as LyricsDB[]

    return randomSongs
  } catch (error) {
    console.error('Error fetching random songs:', error)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isLyricsDB(obj: any): obj is LyricsDB {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj._id === 'string' &&
    typeof obj._rev === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.slides === 'object' &&
    typeof obj.lyricsCount === 'number'
  )
}

export const deleteDocumentById = async (docId: string) => {
  try {
    const doc = await db.get(docId)
    await db.remove(docId, doc._rev)
    return { success: true, message: 'Document deleted successfully' }
  } catch (error) {
    console.error('Error deleting document:', error)
    return { success: false, message: 'Failed to delete document', error }
  }
}
