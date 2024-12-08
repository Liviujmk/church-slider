import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

const PreviewSlides = () => {
  const { song } = useActiveSongPresentation()

  return (
    <div className="h-full">
      <div>PreviewSlides</div>
      <div className="flex w-full h-full gap-2 overflow-auto">
        {song &&
          Object.entries(song.slides).map(([key, lines]) => (
            <div
              key={key}
              className="border rounded-lg min-w-[200px] aspect-video flex flex-col items-center justify-center font-bold"
            >
              {lines.map((line, index) => (
                <h2 key={line + index.toString()} className="text-xs">
                  {line}
                </h2>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default PreviewSlides
