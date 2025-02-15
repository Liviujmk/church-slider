import { useTime } from 'react-timer-hook'

import { cn } from '@/lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export function Clock({ className, ...props }: DivProps) {
  const { minutes, hours } = useTime()

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return (
    <div className={cn(className)} {...props}>
      <span>{formattedHours}</span>:<span>{formattedMinutes}</span>
    </div>
  )
}
