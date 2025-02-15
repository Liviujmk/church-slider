import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Clock } from '@/components/clock'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useClock } from '@/store/useClock'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Theme } from './presentation-theme-picker'
import { cn } from '@/lib/utils'

const FormSchema = z.object({
  withClock: z.boolean()
})

const WithClock = () => {
  const { clock, setClock } = useClock()
  const { song } = useActiveSongPresentation()

  const { getItem } = useLocalStorage('presentationTheme')
  const [theme, setTheme] = useState<Theme>({
    name: 'Default',
    background: 'white',
    text: 'black'
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withClock: clock
    }
  })

  useEffect(() => {
    const theme: Theme = getItem()
    if (theme) setTheme(theme)
  }, [getItem])

  useEffect(() => {
    const getClockState = async () => {
      try {
        const result = await window.electronAPI.getAppState()

        if (!result) {
          const defaultState = { withClock: false }
          await window.electronAPI.setAppState(defaultState)
          setClock(defaultState.withClock)
          form.reset({ withClock: defaultState.withClock })
        } else {
          setClock(result.withClock)
          form.reset({ withClock: result.withClock })
        }
      } catch (error) {
        console.error('Eroare la obținerea stării aplicației:', error)
      }
    }

    getClockState()
  }, [])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await window.electronAPI.setAppState({ withClock: data.withClock })
    if (result) {
      setClock(result.withClock)
      window.electronAPI.reloadApp()

      if (!result.withClock) window.electronAPI.distroyPresentationWindow()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-base font-medium">Clock Display</div>
          <p className="text-sm text-muted-foreground">Show clock in waiting mode.</p>
        </div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="withClock"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value)
                      form.handleSubmit(onSubmit)()
                    }}
                    disabled={song !== null}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div
        className={cn(
          'relative flex items-center justify-center p-6 border rounded-lg aspect-video bg-muted'
        )}
        style={{
          backgroundColor: clock ? theme.background : 'hsl(var(--muted))',
          color: theme.text
        }}
      >
        {clock && <Clock className="absolute text-6xl font-bold bottom-8 right-8" />}
        {!clock && <p className="text-muted-foreground">Clock disabled</p>}
      </div>
    </div>
  )
}

export default WithClock
