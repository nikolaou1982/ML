"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // algorithm groups will be rendered below
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2">
          <div className="text-sm font-semibold mb-2">Clustering</div>

          <div className="mb-4">
            <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
              <span>📁</span>
              <span>Partitioning</span>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">K-Means (The Classic)</a>
                </SidebarMenuButton>
              </li>
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">K-Medoids</a>
                </SidebarMenuButton>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
              <span>📁</span>
              <span>Density</span>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">DBSCAN</a>
                </SidebarMenuButton>
              </li>
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">OPTICS</a>
                </SidebarMenuButton>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
              <span>📁</span>
              <span>Hierarchical</span>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">Agglomerative</a>
                </SidebarMenuButton>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
              <span>📁</span>
              <span>Spectral</span>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <SidebarMenuButton asChild>
                  <a href="#" className="block px-3 py-2 rounded hover:bg-slate-100">Spectral Clustering</a>
                </SidebarMenuButton>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-auto px-2">
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
