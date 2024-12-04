import { useTime } from 'react-timer-hook'

export default function TimerClock() {
  const { minutes, hours } = useTime()

  return (
    <div className="mb-16 mr-16 font-bold text-neutral-800 text-[180px]">
      <span>{hours}</span>:<span>{minutes}</span>
    </div>
  )
}
