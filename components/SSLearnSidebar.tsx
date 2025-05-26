"use client"

import type * as React from "react"
import { BookOpen, GraduationCap, BarChart3, Settings, Trophy, Users, Brain, History, FolderOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Learning Hub",
    url: "/learn",
    icon: BookOpen,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: Brain,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Quiz History",
    url: "/quiz-history",
    icon: History,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function SSLearnSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader className="h-16">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="w-full justify-start px-0 hover:bg-accent/50 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <Link href="/" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-base">SS-Learn</span>
                  <span className="text-xs text-muted-foreground">Learning Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-6 flex flex-col h-full border-t">
        <SidebarMenu className="gap-1 mt-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.url || 
                            (item.url !== "/" && pathname?.startsWith(item.url));
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`h-10 px-3 transition-colors duration-200 ${
                    isActive 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className="size-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
} 