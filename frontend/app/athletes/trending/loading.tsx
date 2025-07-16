import { Skeleton } from "@/components/ui/skeleton"

export default function TrendingLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <div className="flex-1 max-w-5xl mx-auto p-8 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg bg-slate-800" />
        ))}
      </div>
    </div>
  )
}
