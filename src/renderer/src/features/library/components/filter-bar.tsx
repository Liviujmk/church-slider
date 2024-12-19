import { TbLayoutListFilled } from 'react-icons/tb'
import { HiViewGrid } from 'react-icons/hi'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type FilterBarProps = {
  children: React.ReactNode
  onChange: (layout: 'grid' | 'list') => void
  layout?: 'grid' | 'list'
}

const FilterBar = ({ children, onChange }: FilterBarProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>{children}</div>
      <ToggleGroup type="single" defaultValue="grid" className="gap-0 rounded-full">
        <ToggleGroupItem
          value="list"
          className="w-full rounded-l-full"
          onClick={() => onChange('list')}
        >
          <TbLayoutListFilled />
          <span>List</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="grid"
          className="flex w-full rounded-r-full"
          onClick={() => onChange('grid')}
        >
          <HiViewGrid size={24} />
          <span>Grid</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default FilterBar
