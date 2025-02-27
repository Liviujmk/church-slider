import { dbPlaylists } from './../db'
import { LyricsDB } from '../../types'

export type Playlist = {
  _id: string
  title: string
  songs: LyricsDB[]
}

export type Response = {
  status: 'Success' | 'Error'
  message: string
  id?: string
}

export const createPlaylist = async (title: string): Promise<Response> => {
  try {
    if (!title) return { status: 'Error', message: 'Title is required' }
    const response = await dbPlaylists.post({ title, songs: [] })

    return { status: 'Success', message: 'Playlist created', id: response.id }
  } catch (err) {
    throw new Error('Failed to create the playlist')
  }
}

export const addSongToPlaylist = async (
  playlistId: string,
  newSong: LyricsDB
): Promise<Response> => {
  try {
    const playlist: Playlist = await dbPlaylists.get(playlistId)
    playlist.songs.push(newSong)

    await dbPlaylists.put(playlist)
    return { status: 'Success', message: 'Song added to the playlist' }
  } catch (err) {
    throw new Error('Could not add song')
  }
}

export const deleteSongFromPlaylist = async (
  playlistId: string,
  songId: string
): Promise<Response> => {
  try {
    const playlist: Playlist = await dbPlaylists.get(playlistId)
    playlist.songs = playlist.songs.filter((song) => song._id !== songId)

    const response = await dbPlaylists.put(playlist)
    return { status: 'Success', message: 'Song deleted from the playlist', id: response.id }
  } catch (err) {
    throw new Error('Could not delete song from the playlist')
  }
}

export const deletePlaylist = async (playlistId: string): Promise<Response> => {
  try {
    const playlist = await dbPlaylists.get(playlistId)
    await dbPlaylists.remove(playlist._id, playlist._rev)

    return { status: 'Success', message: 'Playlist deleted' }
  } catch {
    throw new Error('Could not delete playlist')
  }
}

export type ResponseGetPlaylists = {
  status: 'Success' | 'Error'
  message: string
  data?: Playlist[]
}

export const getPlaylists = async (): Promise<ResponseGetPlaylists> => {
  try {
    const result = await dbPlaylists.allDocs({ include_docs: true })
    const playlists = result.rows.map((row) => row.doc as Playlist)

    if (playlists.length === 0) {
      const defaultPlaylist = await createPlaylist('Playlist Live')
      if (defaultPlaylist.status === 'Success') {
        const newPlaylist = await dbPlaylists.get(defaultPlaylist.id as string)
        playlists.push(newPlaylist as Playlist)
      }
    }

    return { status: 'Success', message: 'Playlists retrieved successfully', data: playlists }
  } catch (err) {
    throw new Error('Failed to get playlists')
  }
}
