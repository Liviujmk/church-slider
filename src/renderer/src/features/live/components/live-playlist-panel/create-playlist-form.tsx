import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be 50 characters or less')
})

const createPlaylist = async (title: string) => {
  const response = await window.electronAPI.createPlaylist(title)
  if (response.status === 'Error') {
    throw new Error(response.message)
  }

  return response
}

export const CreatePlaylistForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-Playlist'],
    mutationFn: createPlaylist,
    onSuccess: () => {
      form.reset({ title: '' })
      toast({
        title: 'Playlist creat cu succes!',
        description: 'Gata, poți adăuga cântări acum. 🎵'
      })
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ups! Ceva n-a mers bine.',
        description: 'Nu am putut crea playlistul. Încearcă din nou.'
      })
    }
  })

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values.title)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Playlist Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter playlist title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? 'Se creează...' : 'Creează'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
