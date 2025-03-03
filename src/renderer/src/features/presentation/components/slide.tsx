import { PropsWithChildren } from 'react'

export default function Slide({ children }: PropsWithChildren) {
  return (
    <section className="flex items-center justify-center h-full overflow-hidden">
      {children}
    </section>
  )
}
