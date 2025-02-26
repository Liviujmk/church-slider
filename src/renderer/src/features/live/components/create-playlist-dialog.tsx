import { IoMdAdd } from 'react-icons/io'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import * as z from 'zod'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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

export const CreatePlaylistDialog = () => {
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
  const [open, setOpen] = useState(false)

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <IoMdAdd className="text-blue-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Creează un nou playlist</AlertDialogTitle>
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
              </form>
            </Form>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? 'Se creează...' : 'Creează'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
