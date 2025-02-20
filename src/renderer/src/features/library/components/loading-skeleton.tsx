import { Skeleton } from '@/components/ui/skeleton'

export const LoadingSkeleton = () => {
  return (
    <div className="mt-8 space-y-4">
      {Array.from({
        length: 20
      }).map((_, i) => (
        <Skeleton className="w-full h-10 rounded-lg" key={i} />
      ))}
    </div>
  )
}
