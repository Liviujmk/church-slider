import { v4 as uuidv4 } from 'uuid'

import { db, dbPlaylists } from './db'
import { Lyric, LyricsDB, DocumentsResponse, Slides } from '../types'
import { Playlist } from './playlists/queries'

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

      await db.bulkDocs(normalizedChunk)
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

export type GenericResponse = {
  status: 'Success' | 'Error'
  message: string
}

export const updateSong = async (
  songId: string,
  updateSong: Slides,
  editedTitle: string
): Promise<GenericResponse> => {
  try {
    const song = await db.get(songId)
    const newLyricsCount = Object.keys(updateSong).length

    console.log(Object.keys(updateSong).length)
    await db.put({ ...song, slides: updateSong, lyricsCount: newLyricsCount, title: editedTitle })

    const playlistsResult = await dbPlaylists.allDocs({ include_docs: true })
    const playlists = playlistsResult.rows.map((row) => row.doc as Playlist)

    for (const playlist of playlists) {
      const songIndex = playlist.songs.findIndex((s) => s._id === songId)
      if (songIndex !== -1) {
        playlist.songs[songIndex].slides = updateSong
        playlist.songs[songIndex].lyricsCount = newLyricsCount
        playlist.songs[songIndex].title = editedTitle

        await dbPlaylists.put(playlist)
      }
    }

    return { status: 'Success', message: 'Song updated successfully in all locations' }
  } catch (error) {
    console.error('Error updating song:', error)
    return { status: 'Error', message: 'Failed to update song' }
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
