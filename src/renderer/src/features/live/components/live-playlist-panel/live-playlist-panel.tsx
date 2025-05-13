'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

import { Playlist } from '@/features/live/components/live-playlist-panel/playlist'
import { SwitchPlaylist } from '@/features/live/components/live-playlist-panel/switch-playlist'
import { CreatePlaylistForm } from './create-playlist-form'
import { DeletePlaylistForm } from './delete-playlist-form'
import { BaseDialog } from '@/components/base-dialog'
import { PlaylistActions } from './playlist-actions'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { usePlaylists } from '@/api/use-playlists'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useToast } from '@/hooks/use-toast'
import { usePlaylist } from '@/store/usePlaylist'

export const LivePlaylistPanel = () => {
  const { data: playlists, isError } = usePlaylists()

  const { setSelectedPlaylist, selectedPlaylist } = usePlaylist()
  const { getItem, setItem } = useLocalStorage('selectedPlaylist')
  const { toast } = useToast()

  const [isCreatePlaylistOpen, setCreatePlaylistOpen] = useState(false)
  const [isDeletePlaylistOpen, setDeletePlaylistOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (playlists && playlists.length > 0) {
      const savedPlaylistId = getItem()

      const foundPlaylist = playlists.find((p) => p._id === savedPlaylistId)
      if (foundPlaylist) {
        setSelectedPlaylist(foundPlaylist)
      } else {
        setSelectedPlaylist(playlists[0])
        setItem(playlists[0]._id)
      }
    }
  }, [playlists])

  if (isError) {
    toast({
      title: 'Failed to load playlists',
      description: 'An error occurred while retrieving playlists. Please try again.',
      variant: 'destructive'
    })
  }

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
    if (isSearchVisible) {
      setSearchQuery('')
    }
  }

  return (
    <div className="flex flex-col h-full select-none">
      <div className="relative flex items-center justify-between px-4 pt-3 pb-1" ref={containerRef}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold leading-none text-muted-500">
              {playlists && <SwitchPlaylist playlists={playlists} />}
            </h2>
          </div>
          {selectedPlaylist && selectedPlaylist.songs.length > 0 && (
            <Badge variant="outline" className="rounded-md">
              {selectedPlaylist.songs.length}{' '}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <AnimatePresence>
            {isSearchVisible && (
              <motion.div
                className="absolute right-[96px] flex items-center"
                initial={{ width: 0 }}
                animate={{ width: 'calc(100% - 110px)' }}
                exit={{ width: 40 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ originX: 1 }}
              >
                <div className="relative flex items-center w-full h-8">
                  <Input
                    type="text"
                    placeholder="Caută cântări..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-8 text-sm border-blue-500 rounded-lg focus-visible:ring-0"
                    autoFocus
                  />
                  <Search className="absolute pointer-events-none right-2 size-4 text-muted-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="z-10 w-8 h-8 p-0" onClick={toggleSearch}>
            {isSearchVisible ? (
              <X className="size-5 text-muted-500" />
            ) : (
              <Search className="size-5 text-muted-500" />
            )}
          </Button>
          <PlaylistActions
            setCreatePlaylistOpen={setCreatePlaylistOpen}
            setDeletePlaylistOpen={setDeletePlaylistOpen}
          />
        </div>
      </div>

      <div className="flex-1 pl-4 overflow-hidden">
        <Playlist searchQuery={searchQuery} />
      </div>
      <>
        <BaseDialog
          title="Confirmati ștergerea"
          isOpen={isDeletePlaylistOpen}
          setOpen={setDeletePlaylistOpen}
          description="Sunteți sigur că doriți să ștergeți playlistul? Această acțiune nu poate fi anulată."
        >
          <DeletePlaylistForm setOpen={setDeletePlaylistOpen} />
        </BaseDialog>
        <BaseDialog
          title="Creează un nou playlist"
          isOpen={isCreatePlaylistOpen}
          setOpen={setCreatePlaylistOpen}
        >
          <CreatePlaylistForm setOpen={setCreatePlaylistOpen} />
        </BaseDialog>
      </>
    </div>
  )
}
