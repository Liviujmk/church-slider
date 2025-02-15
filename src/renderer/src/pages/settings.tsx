import { PresentationThemePicker } from '@/features/settings/components/presentation-theme-picker'
import { SettingCard } from '@/features/settings/components/setting-card'
import DarkMode from '@/features/settings/components/dark-mode'
import WithClock from '@/features/settings/components/with-clock'

import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

const SettingsPage = () => {
  return (
    <ScrollArea className="h-[calc(100vh-1.75rem)] container px-12 mx-auto ">
      <div className="pt-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-6 pb-8 md:grid-cols-2">
        <SettingCard title="Appearance">
          <DarkMode />
        </SettingCard>
        <SettingCard title="Waiting Mode">
          <WithClock />
        </SettingCard>
        <SettingCard title="Theme">
          <PresentationThemePicker />
        </SettingCard>
      </div>
    </ScrollArea>
  )
}

export default SettingsPage
