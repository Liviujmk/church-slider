import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import TimerClock from '@/components/clock'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useClock } from '@/store/useClock'

const FormSchema = z.object({
  withClock: z.boolean()
})

const WithClock = () => {
  const { clock, setClock } = useClock()
  const { song } = useActiveSongPresentation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withClock: clock
    }
  })

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
    <div className="flex justify-between">
      <div>
        <h1 className="font-semibold text-[18px] tracking-tighter">Mod așteptare</h1>
        <div className="flex flex-wrap gap-1">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Mod inactiv cu afișaj ceas.
          </p>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-600">
            ({clock ? 'Cu ceas' : 'Fără ceas'})
          </p>
        </div>
        <div className="flex items-end justify-end p-6 border rounded-lg aspect-video max-w-[450px] w-[400px] mt-4 dark:bg-white">
          {clock && <TimerClock className="font-bold text-neutral-800 text-[40px] leading-none" />}
        </div>
      </div>
      <div>
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
    </div>
  )
}

export default WithClock
