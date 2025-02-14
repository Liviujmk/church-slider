import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

PouchDB.plugin(pouchdbFind)

export const db = new PouchDB('songs')

db.createIndex({
  index: { fields: ['playlist'] }
})
