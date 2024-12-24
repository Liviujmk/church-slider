import { FitText } from '@/components/fit-text'
import useFullDarkMode from '@/store/useFullDarkMode'

type ResponsiveSlideProps = {
  slideNumber?: string
  currentSlide?: number
  lyric: string[]
  live?: boolean
}

export const ResponsiveSlide = ({
  slideNumber,
  currentSlide,
  lyric,
  live = false
}: ResponsiveSlideProps) => {
  const { fullDarkMode } = useFullDarkMode()

  return (
    <div
      data-slide-number={slideNumber && parseInt(slideNumber)}
      className={`${slideNumber && parseInt(slideNumber) === currentSlide && 'ring-2 ring-[#006BE9]'} border p-[2.19px] ${fullDarkMode ? 'dark:bg-white dark:text-black' : ''}`}
    >
      <div
        className={`${live ? 'w-[clamp(200px,28vw,600px)]' : 'w-[clamp(200px,24vw,600px)]'}  flex items-center justify-center overflow-hidden text-center aspect-video`}
      >
        <FitText>
          {lyric.map((line, index) => (
            <h2
              key={index}
              className="font-[Arial] font-semibold text-wrap select-none leading-none"
            >
              {line}
            </h2>
          ))}
        </FitText>
      </div>
    </div>
  )
}
