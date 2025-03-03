import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useFont } from '../context/font-context'
import { cn } from '@/lib/utils'

const fonts = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { label: 'Arial Black', value: 'Arial Black, sans-serif' }
]

export function FontNamePicker() {
  const { live } = useActiveSongPresentation()
  const { font, setFont } = useFont()
  const [open, setOpen] = useState(false)

  const handleFontChange = (currentValue: string) => {
    setFont(currentValue)
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Alege fontul pentru fereastra de prezentare.</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={live !== null}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {font ? fonts.find((fontObj) => fontObj.value === font)?.label : 'Selectează font...'}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Cautare font..." />
            <CommandList>
              <CommandEmpty>Fontul nu a fost găsit.</CommandEmpty>
              <CommandGroup>
                {fonts.map((fontObj) => (
                  <CommandItem key={fontObj.value} onSelect={() => handleFontChange(fontObj.value)}>
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        font === fontObj.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {fontObj.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="p-4 border rounded-md">
        <p style={{ fontFamily: font }}>
          Previzualizare Font - Lorem ipsum dolor sit amet consectetur
        </p>
      </div>
    </div>
  )
}
