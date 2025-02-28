import { History, Music } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Song from '@/features/live/components/song'
import type { Song as SongType } from '@/types'
import { LoadingSkeleton } from './loading-skeleton'

type SuggestionsSongsProps = {
  playback: SongType
  suggestion: SongType[] | null
  activeIndex: number | null
}

const SuggestionsSongs = ({ playback, suggestion, activeIndex }: SuggestionsSongsProps) => {
  return (
    <div className="pb-3 space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg font-medium">
            <History className="w-5 h-5 mr-2" />
            Ultima redare
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <Song song={playback} />
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium">
            <Music className="w-5 h-5 mr-2" />
            Sugestii
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-4">
          {suggestion ? (
            suggestion.map((song, index) => (
              <div
                key={song._id}
                className={`rounded-lg py-1.5 px-3 transition-all ${
                  activeIndex === index ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                }`}
              >
                <Song song={song} />
              </div>
            ))
          ) : (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SuggestionsSongs
