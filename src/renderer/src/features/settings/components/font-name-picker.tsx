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

import { cn } from '@/lib/utils'
import { useFont } from '../context/font-context'

const fonts = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Palatino', value: 'Palatino, serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Bookman', value: 'Bookman, serif' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { label: 'Arial Black', value: 'Arial Black, sans-serif' }
]

export function FontNamePicker() {
  const { font, setFont } = useFont()
  const [open, setOpen] = useState(false)

  const handleFontChange = (currentValue: string) => {
    setFont(currentValue)
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose the font for the application interface.
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {font ? fonts.find((fontObj) => fontObj.value === font)?.label : 'Select font...'}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search font..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
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
        <p className="text-sm">Font Preview</p>
        <p className="mt-4 text-lg" style={{ fontFamily: font }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquid ea ullam sed at
          sapiente!
        </p>
      </div>
    </div>
  )
}
