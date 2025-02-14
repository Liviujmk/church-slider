import { WriteSong } from '@/features/create/components/create-song'
import { ImportSongs } from '@/features/create/components/import-songs'

const StudioPage = () => {
  return (
    <div className="flex h-full gap-4 p-4">
      <WriteSong />
      <ImportSongs />
    </div>
  )
}

export default StudioPage
