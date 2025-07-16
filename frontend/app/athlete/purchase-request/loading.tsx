import { AthleteLayout } from "@/components/athlete-layout"

export default function PurchaseRequestLoading() {
  return (
    <AthleteLayout title="Purchase Requests" description="Loading your purchase requests...">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-slate-800 rounded w-64 animate-pulse"></div>
          <div className="h-4 bg-slate-800 rounded w-48 animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-slate-900/50 border-slate-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-24 animate-pulse"></div>
                  <div className="h-6 bg-slate-800 rounded w-20 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-slate-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Form skeleton */}
        <div className="bg-slate-900/50 border-slate-800/50 rounded-lg p-6">
          <div className="space-y-6">
            <div className="h-6 bg-slate-800 rounded w-48 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-slate-800 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-slate-800 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-32 animate-pulse"></div>
              <div className="h-24 bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </AthleteLayout>
  )
}
