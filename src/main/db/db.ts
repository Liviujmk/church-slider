import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

import { Playlist } from './playlists/queries'

PouchDB.plugin(pouchdbFind)

export const db = new PouchDB('database/songs')
export const dbPlaylists = new PouchDB<Omit<Playlist, '_id'>>('database/playlists-songs')

db.createIndex({
  index: { fields: ['title', 'title_normalized'] }
})
