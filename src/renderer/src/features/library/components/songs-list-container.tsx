import { useEffect, useState } from 'react'

import { PaginationControls } from '@/features/library/components/pagination-controls'
import { NoSearchResults } from '@/features/library/components/no-search-results'
import { LoadingSkeleton } from '@/features/library/components/loading-skeleton'
import { GridLayout } from '@/features/library/components/grid-layout'
import { ListLayout } from '@/features/library/components/list-layout'

import { useDebounce } from '@/hooks/use-debounce'
import { Song } from '@/types'
import { Layout } from '@/pages/library'

type CustomSong = {
  data: Song[]
  totalCount: number
}

interface SongsListContainerProps {
  layout: Layout
  isCompact: boolean
  filter: string
}

export const SongsListContainer = ({ layout, isCompact, filter }: SongsListContainerProps) => {
  const [songs, setSongs] = useState<CustomSong>()
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pending, setPending] = useState(false)
  const [pageSize, setPageSize] = useState(20)

  const debounceFilter = useDebounce(filter)

  useEffect(() => {
    setPending(true)

    const fetchSongs = async () => {
      try {
        let fetchedSongs

        if (debounceFilter) {
          fetchedSongs = await window.electronAPI.onSearchSongsByTitle(debounceFilter)
          setSongs({ data: fetchedSongs, totalCount: fetchedSongs.length })
        } else {
          fetchedSongs = await window.electronAPI.sendAllSongs(currentPage, pageSize)
          if (fetchedSongs) {
            setSongs(fetchedSongs)
            setTotalPages(Math.ceil(fetchedSongs.totalCount / pageSize))
          }
        }

        setPending(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
        setPending(false)
      }
    }

    fetchSongs()
  }, [debounceFilter, currentPage, pageSize])

  if (pending) return <LoadingSkeleton />
  if (!songs || songs.data.length <= 2) return <NoSearchResults />

  return (
    <div>
      {layout === 'grid' ? (
        <GridLayout filteredSongs={songs.data} />
      ) : (
        <ListLayout filteredSongs={songs.data} isCompact={isCompact} />
      )}
      {!filter && (
        <PaginationControls
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      )}
    </div>
  )
}
