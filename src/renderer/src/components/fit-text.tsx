import useFitText from 'use-fit-text'

import { cn } from '@/lib/utils'

interface FitTextProps {
  children: React.ReactNode
  className?: string
  maxFontSize?: number
  fontFamily?: string
}

export const FitText = ({
  children,
  className,
  maxFontSize = 2000,
  fontFamily = 'Arial, sans-serif'
}: FitTextProps) => {
  const { ref, fontSize } = useFitText({
    maxFontSize
  })

  return (
    <div
      ref={ref}
      className={cn(`w-full h-full flex flex-col ${className}`)}
      style={{ fontSize, fontFamily }}
    >
      {children}
    </div>
  )
}
