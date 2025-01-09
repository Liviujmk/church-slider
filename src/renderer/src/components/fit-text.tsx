import useFitText from 'use-fit-text'

interface FitTextProps {
  children: React.ReactNode
  className?: string
  maxFontSize?: number
}

export const FitText = ({ children, className, maxFontSize = 2000 }: FitTextProps) => {
  const { ref, fontSize } = useFitText({
    maxFontSize
  })

  return (
    <div
      ref={ref}
      className={`w-full h-full flex flex-col justify-center ${className}`}
      style={{ fontSize }}
    >
      {children}
    </div>
  )
}
