import { Eraser, Eye } from 'lucide-react'
import { FaArrowUpLong, FaRegPaste } from 'react-icons/fa6'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { processSongVerses } from '../lib/utils'
import { useToast } from '@/hooks/use-toast'
import { createSongSchema } from '../schema'
import { cn } from '@/lib/utils'
import { useCreatedSong } from '@/store/useCreatedSong'
import { PreviewCreatedSong } from './preview-created-song'

export const WriteSong = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { loadSong } = useCreatedSong()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof createSongSchema>>({
    resolver: zodResolver(createSongSchema),
    mode: 'onSubmit'
  })

  const handleVersesChange = (event: React.ChangeEvent<HTMLTextAreaElement> | string) => {
    const inputValue = typeof event === 'string' ? event : event.target.value
    form.setValue('verses', inputValue)

    const lines = inputValue.split('\n').map((line) => line.trim())
    if (lines.length > 0) {
      let firstLine = lines[0]

      firstLine = firstLine.replace(/^\d+\.\s*/, '')
      firstLine = firstLine.replace(/^\/:\s*/, '')
      firstLine = firstLine.replace(/\s*:\s*\/$/, '')
      firstLine = firstLine.replace(/[.,!?-]+$/, '')

      form.setValue('title', firstLine)
    }
  }

  const hasTitleError = !!form.formState.errors.title
  const hasVersesError = !!form.formState.errors.verses

  async function onSubmit(values: z.infer<typeof createSongSchema>) {
    const song = processSongVerses(values)

    previewVerses()

    await window.electronAPI.createSong(song).then((result) => {
      if (result.success) {
        form.reset({
          title: '',
          verses: ''
        })

        toast({
          title: 'Cântarea a fost creată cu succes!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Ceva nu a mers bine. Te rugăm să încerci din nou.'
        })
      }
    })
  }

  const previewVerses = () => {
    const verses = form.getValues('verses')
    const title = form.getValues('title')

    if (verses && title) {
      const song = processSongVerses({ verses, title })
      loadSong(song)
      setIsPreviewOpen(true)
    }
  }

  return (
    <div className="w-[380px] space-y-2 flex flex-col">
      <h2 className="font-semibold">Scrie o cântare</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col h-full gap-y-2"
        >
          <div
            className={cn(
              'flex flex-col h-full border rounded-xl',
              hasTitleError && hasVersesError && 'border-red-400'
            )}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder="Titlul..."
                      {...field}
                      className={cn(
                        'flex w-full h-10 px-3 text-base outline-none rounded-xl border-input bg-background ring-offset-background placeholder:text-muted-foreground font-semibold border-b rounded-b-none',
                        hasTitleError &&
                          'bg-red-50 dark:bg-red-950 placeholder:text-red-500 border-b-red-400'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verses"
              render={({ field }) => (
                <FormItem className="h-[calc(100%-94px)]">
                  <FormControl className="shadow-none">
                    <Textarea
                      className={cn(
                        'h-full py-2 border-b border-t-0 border-l-0 border-r-0 resize-none textarea-scrollbar focus-visible:ring-0 text-muted-foreground rounded-none',
                        hasVersesError &&
                          'bg-red-50 dark:bg-red-950 placeholder:text-red-500 border-b-red-400'
                      )}
                      placeholder="Lipește versurile aici"
                      {...field}
                      onChange={(e) => {
                        handleVersesChange(e)
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="absolute inline-flex justify-between right-2 bottom-2 left-2">
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    form.reset({
                      title: '',
                      verses: ''
                    })
                  }}
                >
                  <Eraser />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={async () => {
                    const result = await navigator.clipboard.readText()

                    form.setValue('verses', result)
                    handleVersesChange(result)
                  }}
                >
                  <FaRegPaste />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={previewVerses}
                >
                  <Eye />
                  <span className="text-xs ">Preview</span>
                </Button>
              </div>
              <Button type="submit" size="icon" className="rounded-full">
                <FaArrowUpLong />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <PreviewCreatedSong
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        song={useCreatedSong.getState().song}
      />
    </div>
  )
}
