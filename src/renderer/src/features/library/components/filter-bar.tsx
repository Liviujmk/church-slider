import { IoGrid } from 'react-icons/io5'
import { IoGridOutline } from 'react-icons/io5'
import { TbLayoutList } from 'react-icons/tb'
import { TbLayoutListFilled } from 'react-icons/tb'

import { Button } from '@/components/ui/button'

type FilterBarProps = {
  children: React.ReactNode
  onChange: (layout: 'grid' | 'list') => void
  layout?: 'grid' | 'list'
}

const FilterBar = ({ children, onChange, layout }: FilterBarProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>{children}</div>
      <div className="flex gap-1">
        <Button
          onClick={() => onChange('list')}
          variant="ghost"
          size="icon"
          asChild
          className="p-1 cursor-pointer size-8"
        >
          {layout === 'list' ? <TbLayoutListFilled /> : <TbLayoutList />}
        </Button>
        <Button
          onClick={() => onChange('grid')}
          variant="ghost"
          size="icon"
          asChild
          className="p-1 cursor-pointer size-8"
        >
          {layout === 'grid' ? <IoGrid /> : <IoGridOutline />}
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
