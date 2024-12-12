import { FitText } from '@/components/fit-text'

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
  return (
    <div
      data-slide-number={slideNumber && parseInt(slideNumber)}
      className={`${slideNumber && parseInt(slideNumber) === currentSlide && '!border-2 border-[#006BE9]'} border p-[2.19px]`}
    >
      <div
        className={`${live ? 'max-w-[400px]' : 'w-[clamp(200px,24vw,600px)]'}  flex items-center justify-center overflow-hidden text-center aspect-video`}
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
