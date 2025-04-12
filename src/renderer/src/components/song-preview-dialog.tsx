'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Edit2, Music, Save } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useSongPreviewStore } from '@/store/useSongPreviewDialog'
import type { Slides } from '@/types'
import { ErrorFallback } from './error-fallback'

export const SongPreviewDialog = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SongPreviewContent />
    </ErrorBoundary>
  )
}

const SongPreviewContent = () => {
  const { song, showDialog, closeDialog } = useSongPreviewStore()
  const [editedLyrics, setEditedLyrics] = useState('')
  const [editedTitle, setEditedTitle] = useState(song?.title || '')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const { toast } = useToast()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (song) {
      setEditedTitle(song.title)
      const lyricsText = Object.values(song.slides)
        .map((stanza) => stanza.join('\n'))
        .join('\n\n')
      setEditedLyrics(lyricsText)
      setHasChanges(false)
    }
  }, [song])

  const checkForChanges = useCallback(() => {
    if (!song) return false
    const titleChanged = editedTitle !== song.title

    const originalLyrics = Object.values(song.slides)
      .map((stanza) => stanza.join('\n'))
      .join('\n\n')
    const lyricsChanged = editedLyrics !== originalLyrics

    return titleChanged || lyricsChanged
  }, [song, editedTitle, editedLyrics])

  useEffect(() => {
    setHasChanges(checkForChanges())
  }, [checkForChanges])

  const { mutate } = useMutation({
    mutationKey: song ? ['update-song', song._id] : ['update-song'],
    mutationFn: async () => {
      if (!song) return
      setSaving(true)

      try {
        const slides: Slides = {}
        const stanzas = editedLyrics.split('\n\n')
        stanzas.forEach((stanza, index) => {
          slides[`stanza${index + 1}`] = stanza.split('\n')
        })

        const response = await window.electronAPI.updateSong(song._id, slides, editedTitle)
        if (response.status === 'Success') {
          queryClient.invalidateQueries({ queryKey: ['playlists'] })
          toast({
            title: 'Cântarea a fost actualizată cu succes.',
            description: 'Modificările au fost salvate.'
          })
          closeDialog()
        } else {
          throw new Error('Failed to update song')
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Ups. A intervenit o problemă.',
          description: 'Incearcă din nou mai târziu.'
        })
      } finally {
        setSaving(false)
      }
    }
  })

  const handleCopy = async () => {
    if (!song) return

    try {
      await navigator.clipboard.writeText(editedLyrics)

      toast({
        title: 'Copiat în clipboard',
        description: 'Textul cântării a fost copiat cu succes.'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Nu s-a putut copia textul',
        description: 'Încearcă din nou.'
      })
    }
  }

  if (!song) return null

  return (
    <AnimatePresence>
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={closeDialog}>
          <DialogContent className="max-w-3xl bg-white shadow-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            <DialogHeader className="space-y-2">
              <div className="flex items-center">
                <Music className="w-5 h-5 mr-2 text-neutral-500 dark:text-neutral-400" />
                {isEditingTitle ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    className="text-xl font-bold"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center">
                    <DialogTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                      {editedTitle}
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </DialogHeader>
            <DialogDescription className="mt-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Editează versurile cântării
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 border-neutral-200 dark:border-neutral-700"
                  onClick={handleCopy}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiază</span>
                </Button>
              </div>
              <Textarea
                value={editedLyrics}
                onChange={(e) => setEditedLyrics(e.target.value)}
                className="h-[400px] text-sm whitespace-pre-wrap border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 resize-none"
                placeholder="Scrie versurile aici...
                
Separă strofele cu o linie goală"
              />
            </DialogDescription>

            <DialogFooter className="mt-6">
              <Button
                className="flex items-center gap-2 px-6 text-white transition-all duration-300 rounded-md bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                onClick={() => mutate()}
                disabled={saving || !hasChanges}
              >
                {saving ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
                    />
                    <span>Se salvează...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvează modificările</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
