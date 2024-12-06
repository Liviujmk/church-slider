import { useTime } from 'react-timer-hook'

export default function TimerClock() {
  const { minutes, hours } = useTime()

  // Formatarea valorilor pentru a include un 0 în față dacă este necesar
  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return (
    <div className="font-bold text-neutral-800 text-[180px] leading-none">
      <span>{formattedHours}</span>:<span>{formattedMinutes}</span>
    </div>
  )
}
