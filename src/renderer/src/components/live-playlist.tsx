import Playlist from './playlist'

const LivePlaylist = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="px-4 pt-4 mb-3 font-semibold leading-none text-neutral-400">Playlist live</h2>
      <div className="flex-grow py-2 pl-4 overflow-hidden">
        <Playlist />
      </div>
    </div>
  )
}

export default LivePlaylist
