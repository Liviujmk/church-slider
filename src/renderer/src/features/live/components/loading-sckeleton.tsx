import { Skeleton } from '@/components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="flex items-start justify-between">
      <div className="w-[calc(100%-80px)] space-y-2">
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-12 h-5 rounded" />
      </div>
      <Skeleton className="rounded-lg size-6" />
    </div>
  )
}
