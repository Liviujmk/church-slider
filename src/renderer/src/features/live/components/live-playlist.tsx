import Playlist from '@/features/live/components/playlist'

const LivePlaylistPanel = () => {
  return (
    <div className="flex flex-col h-full select-none">
      <h2 className="px-4 pt-4 mb-3 font-semibold leading-none text-muted-500">Playlist live</h2>
      <div className="flex-1 pl-4 overflow-hidden">
        <Playlist />
      </div>
    </div>
  )
}

export default LivePlaylistPanel
