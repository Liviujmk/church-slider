'use client'

import { Check, Paintbrush } from 'lucide-react'
import { useState, useEffect } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { useFont } from '../context/font-context'
import { FitText } from '@/components/fit-text'
import { Input } from '@/components/ui/input'

export type Theme = {
  name: string
  background: string
  text: string
}

const predefinedThemes: Theme[] = [
  { name: 'Light', background: '#ffffff', text: '#000000' },
  { name: 'Dark', background: '#000000', text: '#ffffff' },
  { name: 'Sepia', background: '#f4ecd8', text: '#5b4636' },
  { name: 'Forest', background: '#2c3e50', text: '#ecf0f1' },
  { name: 'Ocean', background: '#1a5f7a', text: '#ffffff' },
  { name: 'Lavender', background: '#e6e6fa', text: '#4b0082' }
]

export const PresentationThemePicker = () => {
  const { getItem, setItem } = useLocalStorage('presentationTheme')
  const { live } = useActiveSongPresentation()
  const { font } = useFont()

  const [selectedTheme, setSelectedTheme] = useState<Theme>(predefinedThemes[0])
  const [customBackground, setCustomBackground] = useState('#ffffff')
  const [customText, setCustomText] = useState('#000000')

  useEffect(() => {
    const savedTheme = getItem()

    if (savedTheme) {
      setSelectedTheme(savedTheme)
      setCustomBackground(savedTheme.background)
      setCustomText(savedTheme.text)
    }
  }, [])

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme)
    setItem(theme)
  }

  const handleCustomThemeChange = () => {
    const customTheme = {
      name: 'Custom',
      background: customBackground,
      text: customText
    }
    setSelectedTheme(customTheme)
    setItem(customTheme)
  }

  return (
    <div className="grid gap-16 md:grid-cols-2">
      <Tabs defaultValue="preset" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preset">Teme Predefinite</TabsTrigger>
          <TabsTrigger value="custom">Temă Personalizată</TabsTrigger>
        </TabsList>
        <TabsContent value="preset" className="space-y-4">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {predefinedThemes.map((theme) => (
              <Button
                disabled={live !== null}
                key={theme.name}
                variant="outline"
                className={`h-20 relative disabled:cursor-not-allowed overflow-hidden ${selectedTheme.name === theme.name ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleThemeChange(theme)}
              >
                <div
                  className="absolute inset-0 opacity-80"
                  style={{ backgroundColor: theme.background }}
                />
                <span className="relative font-medium" style={{ color: theme.text }}>
                  {theme.name}
                </span>
                {selectedTheme.name === theme.name && (
                  <Check className="absolute w-4 h-4 bottom-2 right-2" />
                )}
              </Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Background Color</label>
              <div className="flex mt-1.5 space-x-2">
                <div className="relative">
                  <div
                    className="w-10 h-10 border rounded-md cursor-pointer"
                    style={{ backgroundColor: customBackground }}
                  />
                  <input
                    disabled={live !== null}
                    type="color"
                    value={customBackground}
                    onChange={(e) => setCustomBackground(e.target.value)}
                    className="absolute inset-x-0 w-10 h-10 opacity-0 cursor-pointer inset-y-1"
                  />
                </div>
                <Input
                  disabled={live !== null}
                  type="text"
                  value={customBackground}
                  onChange={(e) => setCustomBackground(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-md bg-background"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Text Color</label>
              <div className="flex mt-1.5 space-x-2 relative">
                <div className="relative">
                  <div
                    className="w-10 h-10 border rounded-md cursor-pointer"
                    style={{ backgroundColor: customText }}
                  />
                  <input
                    disabled={live !== null}
                    type="color"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="absolute inset-x-0 w-10 h-10 opacity-0 cursor-pointer inset-y-1"
                  />
                </div>
                <Input
                  disabled={live !== null}
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-md bg-background"
                />
              </div>
            </div>
            <Button onClick={handleCustomThemeChange} className="w-full" disabled={live !== null}>
              <Paintbrush className="w-4 h-4 mr-2" />
              Apply Custom Theme
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      <div className="space-y-2">
        <label className="text-sm font-medium">Previzualizare</label>
        <div
          className="flex items-center justify-center p-6 font-bold text-center border rounded-lg aspect-video bg-muted"
          style={{
            backgroundColor: selectedTheme.background,
            color: selectedTheme.text,
            containerType: 'inline-size'
          }}
        >
          <FitText maxFontSize={260} fontFamily={font} className="justify-center p-1 leading-none">
            <p>1. Prin lunga noastră pribegie,</p>
            <p>Cu Tine, Doamne, am umblat,</p>
            <p>Și-n întristări și-n bucurie</p>
            <p>Mereu ne-ai binecuvântat.</p>
          </FitText>
        </div>
      </div>
    </div>
  )
}
