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
          className="rounded-l-full w-14"
          onClick={() => onChange('list')}
        >
          List
        </ToggleGroupItem>
        <ToggleGroupItem
          value="grid"
          className="rounded-r-full w-14"
          onClick={() => onChange('grid')}
        >
          Grid
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default FilterBar
