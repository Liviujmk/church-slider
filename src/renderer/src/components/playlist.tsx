import { useEffect, useState } from 'react'

import { RxDragHandleDots2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa6'
import { BsEyeFill } from 'react-icons/bs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { LyricDB } from '@/types'

const Playlist = () => {
  const [songs, setSongs] = useState<LyricDB[]>([])

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        const songs = await window.electronAPI.getAllSongsFromPlaylist()
        if (songs) setSongs(songs)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    getAllSongs()
  }, [])

  const handlePresentation = async (song: LyricDB) => {
    try {
      window.electronAPI.sendLyricsToPresentation({
        type: 'display-content',
        data: song
      })
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <div>
      {songs.map((song) => (
        <div key={song._id} className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <RxDragHandleDots2 size={20} />
            <div>
              <div className="max-w-[248px] font-semibold line-clamp-1">{song.title}</div>
              <Badge variant="secondary" className="rounded-lg bg-[#F1F1F1]">
                {Object.keys(song.slides).length} strofe
              </Badge>
            </div>
          </div>
          <div className="space-x-2">
            <Button
              size="icon"
              className="bg-[#F1F1F1] size-6 hover:bg-neutral-200"
              onClick={() => {}}
            >
              <BsEyeFill className="text-neutral-500" />
            </Button>
            <Button
              size="icon"
              className="bg-[#F1F1F1] size-6 hover:bg-neutral-200"
              onClick={() => handlePresentation(song)}
            >
              <AiOutlinePlus className="text-blue-500" />
            </Button>
            <Button size="icon" variant="ghost" className="size-6">
              <FaTrash className="text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Playlist
