import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'
import { FitText } from '@/components/fit-text'

const PreviewSlides = () => {
  const { song } = useActiveSongPresentation()

  return (
    <div className="flex flex-col h-full">
      <div>PreviewSlides</div>
      <ScrollArea className="h-full border-4 border-red-500 whitespace-nowrap">
        <div className="flex h-full p-4 space-x-4 border-4 border-blue-600 w-max">
          {song &&
            Object.entries(song.slides).map(([slideNumber, lines]) => (
              <section key={lines + slideNumber} className="p-2 border rounded-lg">
                <FitText className="overflow-hidden aspect-[16/9] max-w-[650px] text-center">
                  {lines.map((line, index) => (
                    <h2 key={index} className="font-[Arial] font-semibold text-wrap select-none">
                      {line}
                    </h2>
                  ))}
                </FitText>
              </section>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default PreviewSlides
