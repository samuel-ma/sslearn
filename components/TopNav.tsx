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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  Monitor,
  CommandIcon,
  Trophy,
  Clock,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react"
import { useTheme } from "next-themes"

const searchSuggestions = [
  { id: 1, title: "Advanced Mathematics", type: "quiz", category: "Math", icon: "🔢", difficulty: "Hard" },
  { id: 2, title: "Physics Fundamentals", type: "course", category: "Science", icon: "⚛️", difficulty: "Medium" },
  { id: 3, title: "World History Timeline", type: "quiz", category: "History", icon: "🏛️", difficulty: "Easy" },
  { id: 4, title: "English Grammar Mastery", type: "course", category: "English", icon: "📚", difficulty: "Medium" },
  { id: 5, title: "Chemistry Reactions", type: "quiz", category: "Chemistry", icon: "🧪", difficulty: "Hard" },
  { id: 6, title: "Biology Basics", type: "course", category: "Biology", icon: "🧬", difficulty: "Easy" },
]

const notifications = [
  {
    id: 1,
    title: "New quiz available",
    description: "Advanced Mathematics quiz is now live",
    time: "2 min ago",
    unread: true,
    type: "success",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Achievement unlocked",
    description: "You've completed 10 quizzes this week!",
    time: "1 hour ago",
    unread: true,
    type: "achievement",
    icon: Trophy,
  },
  {
    id: 3,
    title: "Study reminder",
    description: "Don't forget your daily study goal",
    time: "3 hours ago",
    unread: false,
    type: "reminder",
    icon: Clock,
  },
  {
    id: 4,
    title: "Course update",
    description: "New chapter added to Physics course",
    time: "5 hours ago",
    unread: false,
    type: "info",
    icon: Info,
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-50 border-green-200"
    case "Medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "Hard":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "success":
      return "text-green-600"
    case "achievement":
      return "text-yellow-600"
    case "reminder":
      return "text-blue-600"
    case "info":
      return "text-gray-600"
    default:
      return "text-gray-600"
  }
}

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length
  const filteredSuggestions = searchSuggestions.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase()),
  )

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Sidebar Trigger */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 hover:bg-accent/60 transition-colors duration-200" />
          <Separator orientation="vertical" className="h-5 bg-border/60" />
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          {/* Search */}
          <div className="flex-1 max-w-lg">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:bg-accent/60 border-border/60 h-10 rounded-xl transition-all duration-200 hover:shadow-sm bg-background/50 backdrop-blur-sm"
                >
                  <Search className="mr-3 h-4 w-4 text-muted-foreground/70" />
                  <span className="hidden sm:inline font-medium">Search courses, quizzes...</span>
                  <span className="sm:hidden font-medium">Search...</span>
                  <div className="ml-auto flex items-center gap-1">
                    <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded-md border bg-muted/50 px-2 font-mono text-[11px] font-medium opacity-100 sm:flex">
                      <CommandIcon className="h-3 w-3" />K
                    </kbd>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[420px] p-0 rounded-xl border-border/50 shadow-xl enhanced-dropdown" align="start">
                <Command className="rounded-xl">
                  <CommandInput
                    placeholder="Search courses, quizzes, topics..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                    className="h-12 border-0 focus:ring-0"
                  />
                  <CommandList className="max-h-80">
                    <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                      No results found for "{searchValue}"
                    </CommandEmpty>
                    <CommandGroup heading="Suggestions" className="p-2">
                      {filteredSuggestions.map((item) => (
                        <CommandItem
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer dropdown-item"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span className="capitalize">{item.type}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle - Single Click */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Toggle between light and dark mode only
                setTheme(theme === "dark" ? "light" : "dark")
              }}
              className={`h-9 w-9 rounded-full transition-all duration-300 ${theme === "dark" ? "theme-toggle-dark" : "theme-toggle-light"}`}
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl hover:bg-accent/60 transition-all duration-200 relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 border-2 border-background">
                      {unreadCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-84 rounded-xl border-border/50 shadow-xl enhanced-dropdown">
                <DropdownMenuLabel className="flex items-center justify-between p-4 border-b border-border/50">
                  <span className="font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {unreadCount} new
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon
                    return (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex items-start gap-3 p-4 cursor-pointer border-b border-border/30 last:border-0 dropdown-item"
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${getNotificationColor(notification.type)} bg-current/10`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-medium flex items-center gap-2">
                              {notification.title}
                              {notification.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </div>
                <div className="p-3 border-t border-border/50">
                  <Button variant="ghost" className="w-full text-sm rounded-lg">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-xl hover:bg-accent/60 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 rounded-xl border-border/50 shadow-xl enhanced-dropdown" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">john@example.com</p>
                      <Badge
                        variant="outline"
                        className="w-fit mt-2 text-xs bg-green-50 text-green-700 border-green-200"
                      >
                        Premium Member
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-2">
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-3 dropdown-item">
                    <User className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-3 dropdown-item">
                    <Settings className="h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-3 dropdown-item">
                    <TrendingUp className="h-4 w-4" />
                    <span>Progress Report</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="mx-2" />
                <div className="p-2">
                  <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-3 cursor-pointer p-3 dropdown-item">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
