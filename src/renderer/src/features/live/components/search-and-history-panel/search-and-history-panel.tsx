import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchAndResult } from '@/features/live/components/search-and-history-panel/search-and-result'
import { TodayPlayedSongs } from './today-played-songs'

export const SearchAndHistoryPanel = () => {
  return (
    <div className="flex flex-col h-full select-none">
      <div className="flex items-center p-4 border-b">
        <h2 className="font-bold">Cântări</h2>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <SearchAndResult />
        <ScrollArea className="flex-1 px-3 py-2">
          <TodayPlayedSongs />
        </ScrollArea>
      </div>
    </div>
  )
}
