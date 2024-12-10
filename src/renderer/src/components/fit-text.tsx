import { useFitText } from '@/hooks/use-fit-text'

interface FitTextProps {
  children: React.ReactNode
  className?: string
}

export const FitText = ({ children, className = '' }: FitTextProps) => {
  const { fontSize, textRef } = useFitText()

  return (
    <div
      ref={textRef}
      className={`w-full h-full flex flex-col justify-center ${className}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {children}
    </div>
  )
}
