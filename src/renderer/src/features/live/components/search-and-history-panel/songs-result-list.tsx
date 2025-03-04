import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '../loading-skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

import Song from '../song'
import { Song as SongType } from '@/types'

interface SongsResultListProps {
  error: string | null
  pending: boolean
  debouncedSearch: string
  songs: SongType[]
}

export const SongsResultList = ({
  error,
  pending,
  debouncedSearch,
  songs
}: SongsResultListProps) => {
  if (error) {
    return (
      <div className="p-1 px-3 mt-2 space-y-4">
        <p className="text-sm text-center text-red-500">{error}</p>
      </div>
    )
  }

  if (pending && debouncedSearch) {
    return (
      <div className="p-4 mt-2 space-y-4">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <ScrollArea className="p-3 pb-0">
      <div className="p-1">
        {songs.length > 0
          ? songs.map((song) => (
              <div key={song._id} className={`rounded-xl px-1.5 py-[2px]`}>
                <Song song={song} />
              </div>
            ))
          : debouncedSearch &&
            !pending && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-center text-gray-500">
                  Nu am găsit niciun rezultat pentru căutarea ta.
                </p>
                <Button asChild className="bg-blue-600 rounded-xl hover:bg-blue-500" size="sm">
                  <Link to="/create">Creează</Link>
                </Button>
              </div>
            )}
      </div>
    </ScrollArea>
  )
}
