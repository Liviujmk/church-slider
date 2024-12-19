import { forwardRef } from 'react'

import { RxSlash } from 'react-icons/rx'
import songKey1 from '../../../../assets/images/notes-1.svg'
import songKey2 from '../../../../assets/images/note-2.svg'

import { Input } from '@/components/ui/input'

type SearchPanelProps = {
  onChange: (params: { filter: string }) => void
}

const SearchPanel = forwardRef<HTMLInputElement, SearchPanelProps>(({ onChange }, ref) => {
  return (
    <div className="relative h-[254px] bg-[#F7F7F7] dark:bg-neutral-900 rounded-2xl text-[#232323]">
      <div className="flex flex-col items-center py-6">
        <h2 className="text-[32px] font-bold dark:text-neutral-200">
          Find Christian <span className="underline text-neutral-500">Songs</span>
        </h2>
      </div>
      <img src={songKey1} alt="" className="absolute left-[200px] top-[40px]" />
      <img src={songKey2} alt="" className="absolute right-[200px]" />
      <div className="max-w-md py-6 mx-auto">
        <div className="sticky top-0">
          <Input
            ref={ref}
            className="pr-8 border shadow h-11 rounded-xl placeholder:text-neutral-400 dark:placeholder:text-neutral-700 dark:text-neutral-200"
            placeholder="Caută cântări"
            onChange={(event) =>
              onChange({
                filter: event.target.value
              })
            }
          />
          <div className="absolute p-1 transform -translate-y-1/2 rounded-lg right-2 top-1/2 bg-neutral-100 dark:bg-neutral-800">
            <RxSlash className="text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>
    </div>
  )
})

SearchPanel.displayName = 'SearchPanel'

export default SearchPanel
