"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ClusterControls } from "@/components/cluster-controls"
import axios from "axios"
import ClusterPlot from "@/components/cluster-plot"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect } from "react"
import { SectionCards } from "@/components/section-cards"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"

export default function ClusteringPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialK = Number(searchParams.get("k") || "3")
  const [k, setK] = useState(initialK)
  const pathname = usePathname()
  const [dimension, setDimension] = useState<"2d" | "3d">("2d")
  const [helpOpen, setHelpOpen] = useState(false)

  const algorithm = searchParams.get("algorithm") || "kmeans"
  const algDisplayNameMap: Record<string, string> = {
    kmeans: "K-Means Clustering",
    kmedoids: "K-Medoids",
    meanshift: "Mean Shift",
    fuzzycmeans: "Fuzzy C-Means",
    dbscan: "DBSCAN",
    hdbscan: "HDBSCAN",
    optics: "OPTICS",
    agglomerative: "Agglomerative",
    birch: "BIRCH",
    bisecting_kmeans: "Bisecting K-Means",
    gmm: "Gaussian Mixture (GMM)",
    spectral: "Spectral Clustering",
    affinity: "Affinity Propagation",
  }
  const algorithmTitle = algDisplayNameMap[algorithm] ?? algorithm

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
        {/* Top KPI cards */}
        <SectionCards />

        {/* Header: Algorithm title and toggles */}
        <div className="flex items-center justify-between bg-white p-4 rounded shadow">
          <div>
            <h2 className="text-xl font-semibold">{algorithmTitle}</h2>
            <p className="text-sm text-slate-500">Visualization and controls for {algorithmTitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md bg-slate-50 p-1">
              <button
                onClick={() => setDimension("2d")}
                className={`px-3 py-1 rounded ${dimension === "2d" ? "bg-white shadow" : "text-slate-600"}`}
              >
                2D
              </button>
              <button
                onClick={() => setDimension("3d")}
                className={`px-3 py-1 rounded ${dimension === "3d" ? "bg-white shadow" : "text-slate-600"}`}
              >
                3D
              </button>
            </div>
            <button onClick={() => setHelpOpen(true)} className="px-3 py-1 rounded bg-sky-600 text-white">Help</button>
          </div>
        </div>
        <div className="flex h-[500px] w-full items-center justify-center rounded-xl border bg-slate-50 shadow-sm relative overflow-hidden">
          {isFetching ? (
             <div className="animate-pulse text-primary font-bold">Training Model...</div>
          ) : data ? (
            <ClusterPlot points={data.points} />
          ) : (
            <span className="text-muted-foreground">Adjust parameters and hit Run</span>
          )}
        </div>

        {/* Help Drawer (vaul-based) */}
        <Drawer open={helpOpen} onOpenChange={setHelpOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>What is {algorithmTitle}?</DrawerTitle>
              <DrawerDescription>
                A short overview and guidance for {algorithmTitle}.
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 text-sm text-slate-700 space-y-3">
              <p>
                This panel contains a brief description, common hyperparameters, and tips for interpreting results.
              </p>
              <p>
                Example: For K-Means, choose `k` based on domain knowledge or silhouette scores. For DBSCAN, tune epsilon and minSamples.
              </p>
            </div>

            <div className="p-4">
              <DrawerClose asChild>
                <button className="w-full rounded bg-slate-100 py-2">Close</button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}