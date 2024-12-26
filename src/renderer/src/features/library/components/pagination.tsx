import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

type CustomPaginationType = {
  currentPage: number
  totalPages: number
  setCurrentPage: (index: number) => void
}

const CustomPagination = ({ currentPage, totalPages, setCurrentPage }: CustomPaginationType) => {
  return (
    <Pagination className="mt-8 select-none hover:cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          />
        </PaginationItem>
        {Array.from({ length: totalPages })
          .map((_, index) => index)
          .filter((page) => {
            if (page === 0 || page === totalPages - 1) {
              return true
            }

            if (page >= currentPage - 1 && page <= currentPage + 1) {
              return true
            }
            return false
          })
          .reduce<number[]>((acc, page, idx, array) => {
            if (idx > 0 && page - array[idx - 1] > 1) {
              acc.push(-1)
            }
            acc.push(page)
            return acc
          }, [])
          .map((page, index) =>
            page === -1 ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination