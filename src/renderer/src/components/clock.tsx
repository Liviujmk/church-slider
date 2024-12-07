import { cn } from '@/lib/utils'
import { useTime } from 'react-timer-hook'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export default function TimerClock({ className, ...props }: DivProps) {
  const { minutes, hours } = useTime()

  // Formatarea valorilor pentru a include un 0 în față dacă este necesar
  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return (
    <div className={cn(className)} {...props}>
      <span>{formattedHours}</span>:<span>{formattedMinutes}</span>
    </div>
  )
}
