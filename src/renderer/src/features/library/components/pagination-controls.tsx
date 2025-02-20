import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import CustomPagination from './pagination'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (index: number) => void
  setPageSize: (value: number) => void
  pageSize: number
}

export const PaginationControls = ({
  currentPage,
  setCurrentPage,
  setPageSize,
  totalPages,
  pageSize
}: PaginationControlsProps) => {
  return (
    <div className="flex mt-6">
      <div className="flex items-center flex-1 gap-2">
        <span>Rânduri pe pagină</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="20" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((value, index) => (
              <SelectItem value={value.toString()} key={index}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1" />
    </div>
  )
}
