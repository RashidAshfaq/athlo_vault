import { AthleteLayout } from "@/components/athlete-layout"

export default function SmartContractLoading() {
  return (
    <AthleteLayout title="Smart Contract" description="Loading your smart contract...">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 bg-slate-800 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-48 animate-pulse"></div>
          </div>
          <div className="h-10 bg-slate-800 rounded w-32 animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-900/50 border-slate-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-20 animate-pulse"></div>
                  <div className="h-6 bg-slate-800 rounded w-16 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-slate-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-slate-900/50 border-slate-800/50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="h-6 bg-slate-800 rounded w-48 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </AthleteLayout>
  )
}
