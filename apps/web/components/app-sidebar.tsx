"use client"

import * as React from "react"
"use client"

import Link from "next/link"
import * as React from "react"

const groups = [
  {
    title: "Partitioning",
    icon: "📁",
    items: [
      { key: "kmeans", label: "K-Means (The Classic)" },
      { key: "kmedoids", label: "K-Medoids (Robust to outliers)" },
      { key: "meanshift", label: "Mean Shift (No k required)" },
      { key: "fuzzycmeans", label: "Fuzzy C-Means (Soft clustering)" },
    ],
  },
  {
    title: "Density",
    icon: "📁",
    items: [
      { key: "dbscan", label: "DBSCAN (The Classic)" },
      { key: "hdbscan", label: "HDBSCAN (Must have)" },
      { key: "optics", label: "OPTICS (Variable density)" },
    ],
  },
  {
    title: "Hierarchical",
    icon: "📁",
    items: [
      { key: "agglomerative", label: "Agglomerative (Bottom-up)" },
      { key: "birch", label: "BIRCH (For large datasets)" },
      { key: "bisecting_kmeans", label: "Bisecting K-Means" },
    ],
  },
  {
    title: "Spectral & Probabilistic",
    icon: "📁",
    items: [
      { key: "gmm", label: "Gaussian Mixture (GMM)" },
      { key: "spectral", label: "Spectral Clustering" },
      { key: "affinity", label: "Affinity Propagation (New)" },
    ],
  },
]

export default function AppSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <div className="mb-6 font-bold text-lg">Clustering</div>

      <nav className="flex-1 overflow-auto">
        {groups.map((g) => (
          <div key={g.title} className="mb-4">
            <div className="px-2 py-1 text-sm font-medium text-slate-600 flex items-center gap-2">
              <span>{g.icon}</span>
              <span>{g.title}</span>
            </div>
            <ul className="mt-2 space-y-1">
              {g.items.map((it) => (
                <li key={it.key}>
                  <Link
                    href={`/dashboard/clustering?algorithm=${it.key}`}
                    className="block px-3 py-2 rounded hover:bg-slate-100"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto text-xs text-slate-500">Select an algorithm to load controls</div>
    </aside>
  )
}
