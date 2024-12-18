import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'

const DarkMode = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex justify-between">
      <div>
        <h1 className="font-semibold text-[18px]">Aspect (Modul întunecat)</h1>
        <div className="flex flex-wrap gap-1">
          <p className="text-sm font-semibold text-neutral-500">
            Configurează stilul vizual al aplicației.
          </p>
        </div>
      </div>
      <div>
        <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      </div>
    </div>
  )
}

export default DarkMode