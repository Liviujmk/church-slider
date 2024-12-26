import GlobalSearch from '@/features/live/components/global-search'

const LiveSearchPanel = () => {
  return (
    <div className="flex flex-col h-full select-none">
      <div className="p-4 border-b">
        <h2 className="font-bold">Cântări</h2>
      </div>
      <div className="flex-grow overflow-hidden">
        <GlobalSearch />
      </div>
    </div>
  )
}

export default LiveSearchPanel
