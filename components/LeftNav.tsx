"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Trophy,
  Settings,
  History,
  BarChart,
  Zap,
  Compass,
  FileText,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react"

// Navigation items with better organization
const mainNavItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/learn",
    label: "Learn",
    icon: Compass,
    badge: "New",
  },
  {
    href: "/quizzes",
    label: "Quizzes",
    icon: Zap,
  },
  {
    href: "/exams",
    label: "Exams",
    icon: FileText,
  },
]

const secondaryNavItems = [
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  {
    href: "/history",
    label: "History",
    icon: History,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart,
  },
]

export default function LeftNav({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Track sidebar state and update main content padding
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

  // Listen for sidebar toggle clicks
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <Sidebar
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
      {/* Header */}
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

      {/* Content */}
      <SidebarContent className="px-3 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
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
              Progress
            </span>
          </div>
        </div>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
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
              <DropdownMenuContent
                className="w-56 rounded-xl shadow-lg border border-border/50"
                side="top"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="px-3 py-2 cursor-pointer rounded-lg mx-1">
                  <Link href="/profile" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-3 py-2 cursor-pointer rounded-lg mx-1">
                  <Link href="/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer rounded-lg mx-1">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <button
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={handleSidebarToggle}
        className="absolute -right-2 top-1/2 z-40 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-200 hover:scale-110"
      />
    </Sidebar>
  )
}
