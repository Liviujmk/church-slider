import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'

const FormSchema = z.object({
  withClock: z.boolean()
})

const WithClock = () => {
  const [clock, setClock] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withClock: clock
    }
  })

  useEffect(() => {
    const getClockState = async () => {
      const result = await window.electronAPI.getAppState()
      if (!result) return

      setClock(result.withClock)
      form.reset({ withClock: result.withClock })
    }

    getClockState()
  }, [])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await window.electronAPI.setAppState({ withClock: data.withClock })
    console.log('Form submitted:', result)
  }

  return (
    <div className="flex justify-between">
      <div>
        <h1 className="font-semibold text-[18px]">Mod așteptare</h1>
        <p className="text-sm font-semibold text-neutral-500">Mod inactiv cu afișaj ceas.</p>
        <div className="flex items-end justify-end p-6 border rounded-lg aspect-video max-w-[450px] w-[400px] mt-4">
          <span className="text-5xl font-semibold">17:55</span>
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
