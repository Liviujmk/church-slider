import { Card, CardContent } from '@/components/ui/card'

export const SettingCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        {children}
      </CardContent>
    </Card>
  )
}
