import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debounceValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearInterval(timeout)
  }, [value])

  return debounceValue
}
