import { Separator } from '@/components/ui/separator'

import WithClock from '@/features/settings/components/with-clock'

const SettingsPage = () => {
  return (
    <div className="max-w-screen-xl p-6 mx-auto tracking-tight 2xl:p-0">
      <h1 className="text-[20px] font-semibold">Settings</h1>
      <p className="text-sm font-semibold text-neutral-500">Manage settings and preferences.</p>
      <Separator className="my-8" />
      <WithClock />
    </div>
  )
}

export default SettingsPage
