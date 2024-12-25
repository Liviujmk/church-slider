import { useEffect } from 'react'
import useFitText from 'use-fit-text'

const HelpPage = () => {
  const { fontSize, ref } = useFitText({
    maxFontSize: 1000
  })

  useEffect(() => {
    console.log(fontSize)
  }, [fontSize])

  return (
    <div
      ref={ref}
      style={{ fontSize, height: '200px', width: '100%' }}
      className="font-bold text-center border font-[Arial] leading-none grid place-content-center p-4"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  )
}

export default HelpPage
