import { Skeleton } from '@/components/ui/skeleton'
import { Layout } from '@/pages/library'

export const LoadingSkeleton = ({ layout }: { layout: Layout }) => {
  return (
    <div className="mt-8 space-y-4">
      {layout === 'list' ? (
        Array.from({
          length: 10
        }).map((_, i) => <Skeleton className="w-full h-10 rounded-lg" key={i} />)
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({
            length: 8
          }).map((_, i) => (
            <Skeleton key={i} className="h-[240px] rounded-xl flex flex-col"></Skeleton>
          ))}
        </div>
      )}
    </div>
  )
}
