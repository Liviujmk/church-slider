import { useTime } from 'react-timer-hook'

export default function TimerClock() {
  const { minutes, hours } = useTime()

  return (
    <div className="font-bold text-neutral-800 text-[180px] leading-none">
      <span>{hours}</span>:<span>{minutes}</span>
    </div>
  )
}
