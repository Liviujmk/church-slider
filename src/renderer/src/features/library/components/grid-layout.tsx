import { PiMusicNoteFill } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'

import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'
import { SongLyricsTrigger } from '@/components/song-lyrics'
import { usePlaylistSongs } from '@/store/usePlaylistSongs'

type ListLayoutProps = {
  filteredSongs: Song[] | undefined
}

const GridLayout = ({ filteredSongs }: ListLayoutProps) => {
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
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(240px,1fr))] gap-4 justify-center">
      {filteredSongs?.map((song, index) => (
        <li key={index} className="text-neutral-500 max-w-[308px]">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full h-[124px] bg-[#F7F7F7] dark:bg-neutral-900 rounded-lg">
              <PiMusicNoteFill size={56} className="text-neutral-400" />
            </div>
            <div className="flex items-center justify-between w-full mt-1">
              <div className="text-xs">{song.lyricsCount} strofe</div>
              <div className="flex items-center gap-2">
                <SongLyricsTrigger song={song} />
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
            </div>
            <div className="w-full text-sm font-medium text-neutral-600 dark:text-neutral-200 line-clamp-1">
              {song.title.replace('.pptx', '')}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridLayout
