"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ClusterControls } from "@/components/cluster-controls"
import axios from "axios"
import ClusterPlot from "@/components/cluster-plot"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ClusteringPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialK = Number(searchParams.get("k") || "3")
  const [k, setK] = useState(initialK)
  const pathname = usePathname()

  useEffect(() => {
    // Persist selected `k` to the URL so the view is linkable
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("k", String(k))
    const href = `${pathname}?${params.toString()}`
    router.replace(href)
  }, [k, pathname, router, searchParams])
  
  // This function calls your Python Backend via the Proxy
  // It hits /api/train/kmeans -> http://127.0.0.1:8000/train/kmeans
  const fetchModel = async () => {
    const { data } = await axios.get(`/api/train/kmeans?k=${k}`)
    return data
  }

  // React Query manages the fetching state (loading, error, data)
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["clustering", k],
    queryFn: fetchModel,
    enabled: false // Don't run automatically, wait for button press
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* LEFT COLUMN: Controls */}
      <div className="lg:col-span-1">
        <ClusterControls 
          k={k} 
          setK={setK} 
          onTrain={() => refetch()} 
          isLoading={isFetching} 
        />
      </div>

      {/* RIGHT COLUMN: Visualization */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex h-[500px] w-full items-center justify-center rounded-xl border bg-slate-50 shadow-sm relative overflow-hidden">
          {isFetching ? (
             <div className="animate-pulse text-primary font-bold">Training Model...</div>
          ) : data ? (
            <ClusterPlot points={data.points} />
          ) : (
            <span className="text-muted-foreground">Adjust parameters and hit Run</span>
          )}
        </div>
      </div>
    </div>
  )
}