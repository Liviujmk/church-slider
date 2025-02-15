import { ImLast } from 'react-icons/im'
import { PiMusicNotesFill } from 'react-icons/pi'

import Song from '@/features/live/components/song'
import { Song as SongType } from '@/types'
import { LoadingSkeleton } from './loading-sckeleton'

type SuggestionsSongsProps = {
  playback: SongType
  suggestion: SongType[] | null
  activeIndex: number | null
}

const SuggestionsSongs = ({ playback, suggestion, activeIndex }: SuggestionsSongsProps) => {
  return (
    <div className="mt-1">
      <div>
        <div className="flex items-center gap-2 pb-2 mb-3">
          <ImLast className="text-neutral-600 dark:text-neutral-400 size-[18px]" />
          <h2 className="font-semibold leading-none dark:text-neutral-400 text-neutral-600">
            Ultima redare
          </h2>
        </div>
        <div className="pb-2 -mt-1 border-b">
          <Song song={playback} />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 pb-2 mt-3 mb-3">
          <PiMusicNotesFill className="text-neutral-600 dark:text-neutral-400 size-5" />
          <h2 className="font-semibold leading-none dark:text-neutral-400 text-neutral-600">
            Sugestii
          </h2>
        </div>
        <div className="pb-2 -mt-2">
          {suggestion ? (
            suggestion.map((song, index) => (
              <div
                key={song._id}
                className={`rounded-lg px-1.5 py-[2px] ${activeIndex === index ? 'ring-2 ring-blue-600' : 'border border-transparent'}`}
              >
                <Song song={song} />
              </div>
            ))
          ) : (
            <div className="space-y-4">
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SuggestionsSongs
