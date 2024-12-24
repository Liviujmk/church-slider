import { IoEyeSharp } from 'react-icons/io5'
import { AiOutlinePlus } from 'react-icons/ai'

import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'

type ListLayoutProps = {
  filteredSongs: Song[] | undefined
}

const ListLayout = ({ filteredSongs }: ListLayoutProps) => {
  const { songs, addSongToPlaylist } = usePlaylistSongs()
  const { toast } = useToast()

  const handleUpdate = async (song: Song) => {
    try {
      const response = await window.electronAPI.addSongToPlaylist(song._id)

      if (response.success) {
        addSongToPlaylist(song)
        toast({
          description: 'Playlistul live a fost actualizat cu succes!'
        })
      } else {
        toast({
          variant: 'destructive',
          description:
            'A apărut o problemă la actualizarea playlistului. Te rugăm să încerci din nou.'
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'A apărut o problemă la actualizarea playlistului. Te rugăm să încerci din nou.'
      })
    }
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredSongs?.map((song, index) => (
        <li key={index} className="flex items-start justify-between text-neutral-500">
          <div className="w-full">
            <div className="w-full dark:text-neutral-200 text-sm font-medium text-neutral-600 max-w-[300px] line-clamp-1">
              {song.title.replace('.pptx', '')}
            </div>
            <div className="text-xs">{Object.keys(song.slides).length} strofe</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-[#EDEDED] dark:bg-neutral-900 dark:text-neutral-200 p-1 rounded-md"
              onClick={() => console.log('open')}
            >
              <IoEyeSharp />
            </button>
            {!songs.some((playlistSong) => playlistSong._id === song._id) && (
              <button
                className="bg-[#EDEDED] dark:bg-neutral-900 p-1 rounded-md"
                onClick={() => {
                  if (song._id) handleUpdate(song)
                }}
              >
                <AiOutlinePlus className="text-blue-500" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ListLayout
