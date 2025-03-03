import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

import { Playlist } from './playlists/queries'
import { Song } from './daily-playlist/queries'

PouchDB.plugin(pouchdbFind)

type DailySong = Song & { date: string; timestamp: number }

export const db = new PouchDB('database/songs')
export const dbPlaylists = new PouchDB<Omit<Playlist, '_id'>>('database/playlists-songs')
export const dbDailyPlaylist = new PouchDB<DailySong>('database/daily-songs')

db.createIndex({
  index: { fields: ['title', 'title_normalized'] }
})
