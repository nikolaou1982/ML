"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Send } from "lucide-react"

const categories = [
  {
    title: "Partitioning (Centroid-based)",
    items: [
      { id: "kmeans", title: "K-Means (The Classic)" },
      { id: "kmedoids", title: "K-Medoids (Robust to outliers)" },
      { id: "meanshift", title: "Mean Shift (No k required) (New)" },
      { id: "fuzzycmeans", title: "Fuzzy C-Means (Soft clustering)" },
    ],
  },
  {
    title: "Density-Based (Shape-based)",
    items: [
      { id: "dbscan", title: "DBSCAN (The Classic)" },
      { id: "hdbscan", title: "HDBSCAN (The Modern Standard - Must have)" },
      { id: "optics", title: "OPTICS (Variable density)" },
    ],
  },
  {
    title: "Hierarchical (Tree-based)",
    items: [
      { id: "agglomerative", title: "Agglomerative (Bottom-up)" },
      { id: "birch", title: "BIRCH (For large datasets) (New)" },
      { id: "bisecting_kmeans", title: "Bisecting K-Means (Replaces \"Hierarchical K-Means\")" },
    ],
  },
  {
    title: "Probabilistic & Graph",
    items: [
      { id: "gmm", title: "Gaussian Mixture (GMM) (Elliptical clusters)" },
      { id: "spectral", title: "Spectral Clustering (Graph connectivity)" },
      { id: "affinity", title: "Affinity Propagation (Message passing) (New)" },
    ],
  },
]

const navSecondary = [
  { title: "Support", url: "#", icon: LifeBuoy },
  { title: "Feedback", url: "#", icon: Send },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {categories.map((cat) => (
          <SidebarGroup key={cat.title}>
            <SidebarGroupLabel>{cat.title}</SidebarGroupLabel>
            <SidebarMenu>
              {cat.items.map((it) => (
                <SidebarMenuItem key={it.id ?? it.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard/clustering?algorithm=${it.id}`} className="flex items-center gap-2">
                      <span className="truncate">{it.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}

        <div className="mt-auto">
          <SidebarMenu>
            {navSecondary.map((s) => (
              <SidebarMenuItem key={s.title}>
                <SidebarMenuButton asChild>
                  <a href={s.url} className="flex items-center gap-2">
                    <span className="truncate">{s.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
