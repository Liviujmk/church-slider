import { RiDragDropLine } from 'react-icons/ri'

const CurrentSlide = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="mb-2 font-semibold text-muted-500">Nimic in live</h2>
      <div className="flex items-center justify-center h-full border border-dashed rounded-lg border-neutral-400">
        <RiDragDropLine size={24} className="text-muted-500" />
      </div>
    </div>
  )
}

export default CurrentSlide
