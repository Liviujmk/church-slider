import { TbLayoutList, TbLayoutListFilled } from 'react-icons/tb'
import { IoGrid, IoGridOutline } from 'react-icons/io5'

import { useLocalStorage } from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import compact from '@/assets/icons/compact.svg'
import expand from '@/assets/icons/expand.svg'

type LayoutBarProps = {
  children: React.ReactNode
  onChange: (layout: 'grid' | 'list') => void
  layout?: 'grid' | 'list'
  isCompact: boolean
  setIsCompact: (value: boolean) => void
}

export const LayoutBar = ({
  children,
  onChange,
  layout,
  isCompact,
  setIsCompact
}: LayoutBarProps) => {
  const { setItem } = useLocalStorage('isCompact')

  const handleClick = () => {
    setIsCompact(!isCompact)
    setItem(!isCompact)
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div>{children}</div>
      <div className="flex items-center gap-1">
        {layout === 'list' ? (
          <div className="hover:cursor-pointer">
            {isCompact ? (
              <img src={expand} onClick={handleClick} />
            ) : (
              <img src={compact} onClick={handleClick} />
            )}
          </div>
        ) : null}
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
