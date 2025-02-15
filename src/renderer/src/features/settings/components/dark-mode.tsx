import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Moon, Sun } from 'lucide-react'

const DarkMode = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="theme-toggle" className="text-base font-medium">
          Dark Mode
        </Label>
        <p className="text-sm text-muted-foreground">Toggle the application&apos;s visual style.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Sun className="w-4 h-4" />
        <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        <Moon className="w-4 h-4" />
      </div>
    </div>
  )
}

export default DarkMode
