"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Video,
  Laptop,
  Menu,
} from "lucide-react"
import { useTheme } from "next-themes"
import { SearchModal } from "./search-modal"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    title: "Assignment Due Soon",
    description: "Chemistry Lab Report due in 2 hours",
    time: "2 min ago",
    unread: true,
    type: "urgent",
    icon: Clock,
  },
  {
    id: 2,
    title: "New Course Available",
    description: "Advanced Data Structures course is now live",
    time: "1 hour ago",
    unread: true,
    type: "success",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    description: "You've completed 15 quizzes this month!",
    time: "3 hours ago",
    unread: true,
    type: "achievement",
    icon: Trophy,
  },
  {
    id: 4,
    title: "Live Class Starting",
    description: "Physics lecture starts in 30 minutes",
    time: "25 min ago",
    unread: false,
    type: "info",
    icon: Video,
  },
  {
    id: 5,
    title: "Quiz Completed",
    description: "Great job on the Math quiz! Score: 95%",
    time: "5 hours ago",
    unread: false,
    type: "success",
    icon: CheckCircle,
  },
]

const getNotificationColor = (type: string) => {
  switch (type) {
    case "urgent":
      return "text-red-600"
    case "success":
      return "text-green-600"
    case "achievement":
      return "text-yellow-600"
    case "info":
      return "text-blue-600"
    default:
      return "text-gray-600"
  }
}

export default function SSLearnTopNav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length

  if (!mounted) return null

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-3 px-3 sm:px-6">
          {/* Sidebar Trigger */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-8 w-8" />
            <Separator orientation="vertical" className="h-5 hidden sm:block" />
          </div>

          <div className="flex items-center justify-between w-full gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <Button
                variant="outline"
                onClick={() => setSearchOpen(true)}
                className="w-full justify-start text-muted-foreground h-9 px-3"
              >
                <Search className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline truncate">Search courses, quizzes...</span>
                <span className="sm:hidden">Search</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex ml-auto">
                  ⌘K
                </kbd>
              </Button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                }}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs bg-red-500 hover:bg-red-600 border-2 border-background">
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[calc(100vw-1rem)] sm:w-80 rounded-xl overflow-hidden">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <div className="max-h-[50vh] sm:max-h-80 overflow-y-auto">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon
                      return (
                        <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${getNotificationColor(notification.type)} bg-current/10`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className="text-sm font-medium flex items-center gap-2">
                                {notification.title}
                                {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8">
                      View all notifications
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 sm:h-9 rounded-full p-0">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl overflow-hidden p-0 enhanced-dropdown" align="end" forceMount>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-slate-800/50 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs text-muted-foreground mt-1">john.doe@student.edu</p>
                        <Badge variant="outline" className="mt-2 text-xs bg-green-50 text-green-700 border-green-200 w-fit">
                          Pro
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link href="/profile" passHref legacyBehavior>
                      <DropdownMenuItem className="rounded-lg focus:bg-accent/50 focus:text-accent-foreground dropdown-item">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings" passHref legacyBehavior>
                      <DropdownMenuItem className="rounded-lg focus:bg-accent/50 focus:text-accent-foreground dropdown-item">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/analytics" passHref legacyBehavior>
                      <DropdownMenuItem className="rounded-lg focus:bg-accent/50 focus:text-accent-foreground dropdown-item">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Progress</span>
                      </DropdownMenuItem>
                    </Link>
                  </div>
                  <div className="border-t border-border/30 p-2">
                    <DropdownMenuItem className="rounded-lg text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dropdown-item">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
} 