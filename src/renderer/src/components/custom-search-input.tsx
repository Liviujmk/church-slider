import { RxSlash } from 'react-icons/rx'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchInputStore } from '@/store/useSearchInputStore'
import { useActiveSongPresentation } from '@/store/useActiveSongPresentation'

type CustomSearchInputProps = {
  searchQuery: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setSearchQuery: (value: React.SetStateAction<string>) => void
}

const CustomSearchInput = ({
  searchQuery,
  handleSearchChange,
  setSearchQuery
}: CustomSearchInputProps) => {
  const ref = useSearchInputStore((state) => state.searchInputRef)
  const { live } = useActiveSongPresentation()

  return (
    <div className="relative mx-auto max-w-[500px]">
      <Input
        disabled={live !== null}
        ref={ref}
        className="pr-16 shadow h-11 rounded-xl placeholder:text-neutral-400 placeholder:dark:text-neutral-700"
        placeholder="Caută cântări"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div
        className={`absolute p-1 transform -translate-y-1/2 rounded-lg right-2 top-1/2 ${!searchQuery && 'bg-neutral-100 dark:bg-neutral-900'}`}
      >
        {!searchQuery ? (
          <RxSlash className="text-gray-400 pointer-events-none" size={18} />
        ) : (
          <Button
            className="p-0 text-red-500 hover:bg-transparent"
            variant="ghost"
            onClick={() => setSearchQuery('')}
          >
            Șterge
          </Button>
        )}
      </div>
    </div>
  )
}

export default CustomSearchInput
