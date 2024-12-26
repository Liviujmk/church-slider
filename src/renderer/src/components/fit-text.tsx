import useFitText from 'use-fit-text'

interface FitTextProps {
  children: React.ReactNode
  className?: string
}

export const FitText = ({ children, className }: FitTextProps) => {
  const { ref, fontSize } = useFitText({
    maxFontSize: 2000
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
