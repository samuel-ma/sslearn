"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, GraduationCap, BarChart3, Settings, Trophy, Users, Brain, History, FolderOpen, Home, Compass, FileText, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation items with better organization
const mainNavItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: Home,
    isActive: true,
  },
  {
    href: "/learn",
    label: "Learning Hub",
    icon: BookOpen,
    badge: "New",
  },
  {
    href: "/quizzes",
    label: "Quizzes",
    icon: Brain,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
]

const secondaryNavItems = [
  {
    href: "/quiz-history",
    label: "Quiz History",
    icon: History,
    isActive: false,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    isActive: false,
  },
  {
    href: "/community",
    label: "Community",
    icon: Users,
    isActive: false,
  },
  {
    href: "/resources",
    label: "Resources",
    icon: FolderOpen,
    isActive: false,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    isActive: false,
  },
]

export function SSLearnSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Track sidebar state
  useEffect(() => {
    const mainContent = document.querySelector('.sidebar-content') as HTMLElement
    if (mainContent) {
      if (isCollapsed) {
        mainContent.classList.add('sidebar-content-collapsed')
        mainContent.classList.remove('sidebar-content-expanded')
      } else {
        mainContent.classList.add('sidebar-content-expanded')
        mainContent.classList.remove('sidebar-content-collapsed')
      }
    }
  }, [isCollapsed])

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon" 
      className="border-r border-border/50 bg-gradient-to-b from-background to-muted/30"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4.5rem",
        } as React.CSSProperties
      }
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-border/50 px-4 flex items-center bg-background/80 backdrop-blur-sm">
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

      <SidebarContent className="px-3 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.label}
                    className="h-11 px-3 rounded-lg data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border data-[active=true]:border-primary/20 hover:bg-accent/60 transition-all duration-200 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center"
                    >
                      <div className="flex h-6 w-6 items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs h-5 px-2 bg-primary/10 text-primary border-primary/20 group-data-[collapsible=icon]:hidden"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Elegant Separator */}
        <div className="my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/40"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground/60 group-data-[collapsible=icon]:hidden">
              Resources
            </span>
          </div>
        </div>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.label}
                    className="h-11 px-3 rounded-lg data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border data-[active=true]:border-primary/20 hover:bg-accent/60 transition-all duration-200 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center"
                    >
                      <div className="flex h-6 w-6 items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/50 p-3 bg-background/80 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 px-3 rounded-lg data-[state=open]:bg-accent hover:bg-accent/60 transition-all duration-200 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
                >
                  <Avatar className="h-8 w-8 shrink-0 border-2 border-primary/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold truncate">John Doe</span>
                    <span className="text-xs text-muted-foreground truncate">Premium Member</span>
                  </div>
                  <div className="ml-auto group-data-[collapsible=icon]:hidden">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Pro
                    </Badge>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@student.edu</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Progress</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
} 