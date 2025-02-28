import { Pencil } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slides, Song } from '@/types'
import { CopyButton } from './copy-button'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

type SongLyricsProps = {
  song: Song
}

export const SongLyricsTrigger = ({ song }: SongLyricsProps) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [editedSlides, setEditedSlides] = useState(song.slides)

  const { mutate } = useMutation({
    mutationKey: ['update-song', song._id],
    mutationFn: async () => {
      const response = await window.electronAPI.updateSong(song._id, editedSlides)
      if (response.status === 'Success') {
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
        setOpen(false)
        toast({
          title: 'Cântarea a fost actualizată cu succes.'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Ups. A intervenit o problemă. Incearcă din nou'
        })
      }
    }
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mr-1">
          <Pencil className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <h2>{song.title}</h2>
            <CopyButton song={song} />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <SongLyrics editedSlides={editedSlides} setEditedSlides={setEditedSlides} />
        </DialogDescription>
        <DialogFooter>
          <Button className="bg-blue-600 hover:bg-blue-500 rounded-xl" onClick={() => mutate()}>
            Salvează modificările
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const SongLyrics = ({
  editedSlides,
  setEditedSlides
}: {
  editedSlides: Slides
  setEditedSlides: React.Dispatch<React.SetStateAction<Slides>>
}) => {
  const refs = useRef<Record<string, HTMLParagraphElement[]>>({})

  const handleEdit = (stanzaKey: string, lineIndex: number, newText: string) => {
    setEditedSlides((prevSlides) => ({
      ...prevSlides,
      [stanzaKey]: prevSlides[stanzaKey].map((line, i) => (i === lineIndex ? newText : line))
    }))
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLParagraphElement>,
    stanzaKey: string,
    lineIndex: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      setEditedSlides((prevSlides) => {
        const newSlides = { ...prevSlides }
        newSlides[stanzaKey].splice(lineIndex + 1, 0, '')
        return newSlides
      })

      setTimeout(() => {
        const newRef = refs.current[stanzaKey]?.[lineIndex + 1]
        newRef?.focus()
      }, 0)
    }

    if (e.key === 'Backspace' && e.currentTarget.innerText === '' && lineIndex > 0) {
      e.preventDefault()

      setEditedSlides((prevSlides) => {
        const newSlides = { ...prevSlides }
        newSlides[stanzaKey].splice(lineIndex, 1)
        return newSlides
      })

      setTimeout(() => {
        refs.current[stanzaKey]?.[lineIndex - 1]?.focus()
      }, 0)
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

  if (!editedSlides) return

  return (
    <ScrollArea className="h-[500px] mt-4">
      {Object.entries(editedSlides).map(([key, stanza], index) => (
        <div className="mb-2" key={key}>
          <h3 className="mb-1 font-semibold text-neutral-300">Strofa {index + 1}</h3>
          <div className="pl-4 border-l-2">
            {stanza.map((line, lineIndex) => (
              <p
                className="mb-2 leading-none focus:outline-none"
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
              </p>
            ))}
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}
