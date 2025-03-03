import { v4 as uuidv4 } from 'uuid'

import { Slides } from '../../types/index'
import { dbDailyPlaylist } from '../db'

export type Song = {
  _id: string
  title: string
  slides: Slides
  lyricsCount: number
}

export type PostResponse =
  | {
      status: 'success'
      message: string
      song: Song
    }
  | {
      status: 'error'
      message: string
    }

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
}
export const addSongToDailyPlaylist = async (song: Song): Promise<PostResponse> => {
  try {
    const uniqueId = uuidv4()

    const songWithDate = { ...song, _id: uniqueId, date: getCurrentDate(), timestamp: Date.now() }

    const response = await dbDailyPlaylist.post(songWithDate)

    if (!response.ok) {
      throw new Error('Something failed!')
    }

    return { status: 'success', message: 'Song added to the daily playlist', song: song }
  } catch (err) {
    throw new Error('Could not add song in daily playlist')
  }
}

export type GetResponse =
  | {
      status: 'success'
      message: string
      songs: Song[]
    }
  | { status: 'error'; message: string }

export const getSongsFromDailyPlaylist = async (): Promise<GetResponse> => {
  try {
    const response = await dbDailyPlaylist.allDocs({ include_docs: true })
    const currentDate = getCurrentDate()

    const songs: (Song & { timestamp?: number })[] = []

    for (const row of response.rows) {
      const song = row.doc as Song & { date: string; timestamp?: number }

      if (!(song.date === currentDate)) {
        try {
          const doc = await dbDailyPlaylist.get(song._id)
          await dbDailyPlaylist.remove(doc)
        } catch {
          throw new Error('Something failed')
        }
      } else {
        songs.push({
          _id: song._id,
          title: song.title,
          slides: song.slides,
          lyricsCount: song.lyricsCount,
          timestamp: song.timestamp || 0
        })
      }
    }

    songs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))

    return { status: 'success', message: 'Songs fetched successfully', songs }
  } catch (error) {
    throw new Error('Failed to get songs from daily playlist')
  }
}
