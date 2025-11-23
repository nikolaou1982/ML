"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

type Point = { x: number; y: number; color?: string; label?: string }

export default function ClusterPlot({ points }: { points: Point[] }) {
  const trace = useMemo(() => {
    return {
      x: points.map((p) => p.x),
      y: points.map((p) => p.y),
      mode: "markers",
      marker: { color: points.map((p) => p.color || "steelblue"), size: 6 },
      text: points.map((p) => p.label || ""),
      type: "scattergl",
    }
  }, [points])

  const layout = useMemo(
    () => ({
      autosize: true,
      margin: { l: 20, r: 20, t: 20, b: 20 },
      hovermode: "closest",
    }),
    []
  )

  return (
    <div className="bg-white rounded shadow p-4 h-[600px]">
      <Plot data={[trace]} layout={layout} useResizeHandler style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
