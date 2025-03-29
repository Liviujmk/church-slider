import { useEffect, useRef, useState, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Copy, Music, ChevronDown, ChevronUp, Trash2, Edit2 } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useSongPreviewStore } from '@/store/useSongPreviewDialog'
import { ErrorFallback } from './error-fallback'
import type { Slides } from '@/types'
import { cn } from '@/lib/utils'

export const SongPreviewDialog = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SongPreviewContent />
    </ErrorBoundary>
  )
}

const SongPreviewContent = () => {
  const { song, showDialog, closeDialog } = useSongPreviewStore()
  const [editedSlides, setEditedSlides] = useState(song?.slides || {})
  const [editedTitle, setEditedTitle] = useState(song?.title || '')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (song) {
      setEditedSlides(song.slides)
      setEditedTitle(song.title)
      setHasChanges(false)
    }
  }, [song])

  const checkForChanges = useCallback(() => {
    if (!song) return false
    const titleChanged = editedTitle !== song.title
    const slidesChanged = JSON.stringify(editedSlides) !== JSON.stringify(song.slides)
    return titleChanged || slidesChanged
  }, [song, editedTitle, editedSlides])

  useEffect(() => {
    setHasChanges(checkForChanges())
  }, [checkForChanges])

  const { mutate } = useMutation({
    mutationKey: song ? ['update-song', song._id] : ['update-song'],
    mutationFn: async () => {
      if (!song) return
      setSaving(true)

      try {
        const response = await window.electronAPI.updateSong(song._id, editedSlides, editedTitle)
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
      const text = Object.values(song.slides)
        .map((stanza) => stanza.join('\n'))
        .join('\n\n')

      await navigator.clipboard.writeText(text)

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
          <DialogContent className="max-w-3xl shadow-lg bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 border-neutral-200 dark:border-neutral-800">
            <DialogHeader className="space-y-2">
              <div className="flex items-center">
                <Music className="w-5 h-5 mr-2 text-blue-500" />
                {isEditingTitle ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    className="text-2xl font-bold"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center">
                    <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      {editedTitle}
                    </DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
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
                  className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border-neutral-200 dark:border-neutral-700"
                  onClick={handleCopy}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiază</span>
                </Button>
              </div>
              <SongLyrics
                editedSlides={editedSlides}
                setEditedSlides={setEditedSlides}
                setHasChanges={setHasChanges}
              />
            </DialogDescription>

            <DialogFooter className="mt-6">
              <Button
                className="flex items-center gap-2 px-6 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg"
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

export const SongLyrics = ({
  editedSlides,
  setEditedSlides,
  setHasChanges
}: {
  editedSlides: Slides
  setEditedSlides: React.Dispatch<React.SetStateAction<Slides>>
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const refs = useRef<Record<string, HTMLParagraphElement[]>>({})
  const [expandedStanzas, setExpandedStanzas] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Initialize all stanzas as expanded
    if (editedSlides) {
      const initialExpandState = Object.keys(editedSlides).reduce(
        (acc, key) => {
          acc[key] = true
          return acc
        },
        {} as Record<string, boolean>
      )
      setExpandedStanzas(initialExpandState)
    }
  }, [editedSlides])

  const handleEdit = (stanzaKey: string, lineIndex: number, newText: string) => {
    setEditedSlides((prevSlides) => {
      const newSlides = {
        ...prevSlides,
        [stanzaKey]: prevSlides[stanzaKey].map((line, i) => (i === lineIndex ? newText : line))
      }
      setHasChanges(true)
      return newSlides
    })
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLParagraphElement>,
    stanzaKey: string,
    lineIndex: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const currentNode = range.startContainer
      const currentOffset = range.startOffset

      if (currentNode.nodeType !== Node.TEXT_NODE) return

      const currentText = currentNode.textContent || ''
      const textBeforeCursor = currentText.substring(0, currentOffset)
      const textAfterCursor = currentText.substring(currentOffset)

      setEditedSlides((prevSlides) => {
        const newSlides = { ...prevSlides }
        newSlides[stanzaKey][lineIndex] = textBeforeCursor
        newSlides[stanzaKey].splice(lineIndex + 1, 0, textAfterCursor)
        setHasChanges(true)
        return newSlides
      })

      setTimeout(() => {
        const newLineRef = refs.current[stanzaKey]?.[lineIndex + 1]
        if (newLineRef) {
          newLineRef.focus()
          if (textAfterCursor) {
            const newRange = document.createRange()
            newRange.setStart(newLineRef.firstChild || newLineRef, 0)
            newRange.collapse(true)
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(newRange)
          }
        }
      }, 0)
    }

    if (e.key === 'Backspace') {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const isAtStart = range.startOffset === 0 && range.endOffset === 0

      if (isAtStart && lineIndex > 0) {
        e.preventDefault()

        // Salvăm poziția cursorului în rândul anterior
        const prevLineRef = refs.current[stanzaKey]?.[lineIndex - 1]
        const prevLineLength = prevLineRef?.textContent?.length || 0

        setEditedSlides((prevSlides) => {
          const newSlides = { ...prevSlides }
          const currentLineText = newSlides[stanzaKey][lineIndex]

          // Adaugă textul la sfârșitul liniei anterioare
          newSlides[stanzaKey][lineIndex - 1] += currentLineText

          // Șterge linia curentă
          newSlides[stanzaKey].splice(lineIndex, 1)

          setHasChanges(true)
          return newSlides
        })

        setTimeout(() => {
          if (prevLineRef) {
            prevLineRef.focus()
            // Restabilim cursorul în poziția corectă (la sfârșitul textului original)
            const newRange = document.createRange()
            const textNode = prevLineRef.firstChild || prevLineRef
            newRange.setStart(textNode, prevLineLength)
            newRange.collapse(true)
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(newRange)
          }
        }, 0)
      } else if (e.currentTarget.innerText === '' && lineIndex > 0) {
        e.preventDefault()
        setEditedSlides((prevSlides) => {
          const newSlides = { ...prevSlides }
          newSlides[stanzaKey].splice(lineIndex, 1)
          setHasChanges(true)
          return newSlides
        })

        setTimeout(() => {
          refs.current[stanzaKey]?.[lineIndex - 1]?.focus()
        }, 0)
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      refs.current[stanzaKey]?.[lineIndex + 1]?.focus()
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      refs.current[stanzaKey]?.[lineIndex - 1]?.focus()
    }
  }

  const toggleStanza = (key: string) => {
    setExpandedStanzas((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const deleteStanza = (key: string) => {
    if (window.confirm('Ești sigur că vrei să ștergi această strofă?')) {
      setEditedSlides((prevSlides) => {
        const newSlides = { ...prevSlides }
        delete newSlides[key]
        setHasChanges(true)
        return newSlides
      })

      setExpandedStanzas((prev) => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }
  }

  if (!editedSlides) return null

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-6">
        {Object.entries(editedSlides).map(([key, stanza], index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="overflow-hidden border rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700"
            key={key}
          >
            <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800">
              <div
                className="flex items-center flex-1 cursor-pointer"
                onClick={() => toggleStanza(key)}
              >
                <h3 className="flex items-center font-semibold text-neutral-700 dark:text-neutral-200">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {index + 1}
                  </span>
                  Strofa {index + 1}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteStanza(key)
                  }}
                  title="Șterge strofa"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleStanza(key)
                  }}
                >
                  {expandedStanzas[key] ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {expandedStanzas[key] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white dark:bg-neutral-900/50">
                    {stanza.map((line, lineIndex) => (
                      <div
                        className={cn(
                          'py-1.5 px-2 mb-1 rounded-md transition-colors duration-200',
                          'focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/30 focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-700',
                          'hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                        )}
                        key={lineIndex}
                        contentEditable
                        suppressContentEditableWarning
                        ref={(el) => {
                          if (!refs.current[key]) refs.current[key] = []
                          if (el) refs.current[key][lineIndex] = el
                        }}
                        onBlur={(e) => handleEdit(key, lineIndex, e.target.innerText)}
                        onKeyDown={(e) => handleKeyDown(e, key, lineIndex)}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}
