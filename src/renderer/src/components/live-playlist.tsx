import Playlist from './playlist'

const LivePlaylist = () => {
  return (
    <div className="flex flex-col h-full select-none">
      <h2 className="px-4 pt-4 mb-3 font-semibold leading-none text-muted-500">Playlist live</h2>
      <div className="flex-grow py-2 pl-4">
        <Playlist />
      </div>
    </div>
  )
}

export default LivePlaylist
