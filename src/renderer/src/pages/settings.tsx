import { Separator } from '@/components/ui/separator'

import DarkMode from '@/features/settings/components/dark-mode'
import WithClock from '@/features/settings/components/with-clock'

const SettingsPage = () => {
  return (
    <div className="max-w-screen-xl p-6 mx-auto 2xl:px-0">
      <h1 className="text-[20px] font-semibold">Settings</h1>
      <p className="text-sm font-semibold text-neutral-500">Manage settings and preferences.</p>
      <Separator className="my-8" />
      <div className="flex flex-col gap-4">
        <WithClock />
        <DarkMode />
      </div>
    </div>
  )
}

export default SettingsPage
