import { useEffect } from 'react'
import { useClock } from '@/store/useClock'

export const useAppState = () => {
  const { setClock } = useClock()

  useEffect(() => {
    window.electronAPI.getAppState().then((value) => {
      if (!value) return
      setClock(value.withClock)
    })
  }, [])
}
