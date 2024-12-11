import { FitText } from '@/components/fit-text'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const HelpPage = () => {
  const { song } = useActiveSongPresentation()

  return (
    <div className="h-full">
      <ScrollArea className="whitespace-nowrap">
        <div className="flex p-4 space-x-4 w-max">
          {song &&
            Object.entries(song.slides).map(([slideNumber, lines]) => (
              <div key={parseInt(slideNumber)} className="border p-[2.19px] w-fit">
                <div className="w-[300px] aspect-video flex items-center justify-center overflow-hidden text-center">
                  <FitText>
                    {lines.map((line, index) => (
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
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default HelpPage
